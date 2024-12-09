import os    
import logging    
import traceback    
from dotenv import load_dotenv    
from pymongo import MongoClient    
import scrapetube     
from langchain_ollama import OllamaEmbeddings    
import ray    
from yt_dlp import YoutubeDL    
import requests  
  
load_dotenv()    
ray.init()    
        
# Configure logging    
logging.basicConfig(    
    level=logging.INFO,    
    format='%(asctime)s [%(levelname)s] %(message)s',    
    handlers=[    
        logging.StreamHandler()    
    ]    
)    
logger = logging.getLogger(__name__)    
  
def get_youtube_video_metadata_and_transcripts(video_id, languages=['en']):  
    """  
    Given a YouTube video ID, returns a dictionary containing the video's metadata  
    and transcripts (subtitles) for the specified languages.  
    """  
    url = f"https://www.youtube.com/watch?v={video_id}"  
    ydl_opts = {  
        'skip_download': True,  
        'writesubtitles': True,  
        'subtitleslangs': languages,  
        'subtitlesformat': 'best',  
        'writeautomaticsub': True,  
    }  
    try:  
        with YoutubeDL(ydl_opts) as ydl:  
            info_dict = ydl.extract_info(url, download=False)  
  
            # Get available subtitles  
            subtitles = info_dict.get('subtitles', {})  
            automatic_captions = info_dict.get('automatic_captions', {})  
            all_subtitles = {**automatic_captions, **subtitles}  
  
            # Download the subtitles content  
            transcripts = {}  
            for lang in languages:  
                if lang in all_subtitles:  
                    # Get the subtitle URL (the last format is usually the best)  
                    subtitle_info = all_subtitles[lang][-1]  
                    subtitle_url = subtitle_info['url']  
                    # Download the subtitle content  
                    response = requests.get(subtitle_url)  
                    if response.status_code == 200:  
                        transcripts[lang] = response.text  
                    else:  
                        transcripts[lang] = None  
                else:  
                    transcripts[lang] = None  
  
            # Add the transcripts to the metadata dictionary  
            info_dict['transcripts'] = transcripts  
  
            return info_dict  
    except Exception as e:  
        logger.error(f"An error occurred while fetching metadata and transcripts for video {video_id}: {e}")  
        return None  
  
@ray.remote    
def process_single_video_transcript(video_id, CONFIG):    
    import time    
    import traceback    
    import logging    
    from pymongo import MongoClient    
    from langchain.text_splitter import RecursiveCharacterTextSplitter    
    from langchain_mongodb import MongoDBAtlasVectorSearch    
    from langchain_ollama import OllamaEmbeddings    
    from yt_dlp import YoutubeDL    
    import requests  
  
    # Configure logging for Ray workers    
    logging.basicConfig(    
        level=logging.INFO,    
        format='%(asctime)s [%(levelname)s] %(message)s',    
        handlers=[    
            logging.StreamHandler()    
        ]    
    )    
    logger = logging.getLogger(__name__)    
  
    def get_youtube_video_metadata_and_transcripts(video_id, languages=['en']):  
        """  
        Given a YouTube video ID, returns a dictionary containing the video's metadata  
        and transcripts (subtitles) for the specified languages.  
        """  
        url = f"https://www.youtube.com/watch?v={video_id}"  
        ydl_opts = {  
            'skip_download': True,  
            'writesubtitles': True,  
            'subtitleslangs': languages,  
            'subtitlesformat': 'best',  
            'writeautomaticsub': True,  
        }  
        try:  
            with YoutubeDL(ydl_opts) as ydl:  
                info_dict = ydl.extract_info(url, download=False)  
  
                # Get available subtitles  
                subtitles = info_dict.get('subtitles', {})  
                automatic_captions = info_dict.get('automatic_captions', {})  
                all_subtitles = {**automatic_captions, **subtitles}  
  
                # Download the subtitles content  
                transcripts = {}  
                for lang in languages:  
                    if lang in all_subtitles:  
                        # Get the subtitle URL (the last format is usually the best)  
                        subtitle_info = all_subtitles[lang][-1]  
                        subtitle_url = subtitle_info['url']  
                        # Download the subtitle content  
                        response = requests.get(subtitle_url)  
                        if response.status_code == 200:  
                            transcripts[lang] = response.text  
                        else:  
                            transcripts[lang] = None  
                    else:  
                        transcripts[lang] = None  
  
                # Add the transcripts to the metadata dictionary  
                info_dict['transcripts'] = transcripts  
  
                return info_dict  
        except Exception as e:  
            logger.error(f"An error occurred while fetching metadata and transcripts for video {video_id}: {e}")  
            return None  
  
    try:  
        # Initialize embeddings model    
        embeddings = OllamaEmbeddings(model="nomic-embed-text")    
  
        # MongoDB setup    
        client = MongoClient(os.getenv("MONGODB_URI"))    
        db_name = os.getenv("MONGODB_DATABASE", "default_db")    
        collection_name = os.getenv("MONGODB_COLLECTION", "yt-transcripts")    
        unprocessed_collection_name = os.getenv("MONGODB_UNPROCESSED_COLLECTION", "yt-unprocessed")    
        db = client[db_name]    
        collection = db[collection_name]    
        unprocessed_collection = db[unprocessed_collection_name]    
  
        # Get metadata and transcripts    
        info_dict = get_youtube_video_metadata_and_transcripts(video_id, languages=['en'])    
        if not info_dict or not info_dict.get('transcripts'):  
            logger.warning(f"No transcripts available for video {video_id}. Skipping.")    
  
            # Store in unprocessed collection    
            unprocessed_collection.update_one(    
                {"videoId": video_id},    
                {"$set": {    
                    "videoId": video_id,    
                    "reason": "No transcript available",    
                    "config": str(CONFIG["TYPE"] + ":" + CONFIG["ID"]),    
                    "timestamp": time.time(),    
                }},    
                upsert=True    
            )    
            client.close()  
            return    
  
        # Extract transcripts    
        transcripts = info_dict['transcripts']  
        transcript_text = ''  
        for lang, content in transcripts.items():  
            if content:  
                transcript_text += content + '\n'  
  
        if not transcript_text.strip():  
            logger.warning(f"No valid transcript content for video {video_id}. Skipping.")    
  
            # Store in unprocessed collection    
            unprocessed_collection.update_one(    
                {"videoId": video_id},    
                {"$set": {    
                    "videoId": video_id,    
                    "reason": "No valid transcript content",    
                    "config": str(CONFIG["TYPE"] + ":" + CONFIG["ID"]),    
                    "timestamp": time.time(),    
                }},    
                upsert=True    
            )    
            client.close()  
            return    
  
        # Create Document    
        from langchain.docstore.document import Document    
        document = Document(page_content=transcript_text)  
  
        # Add metadata    
        document.metadata = {  
            "timestamp": time.time(),  
            "timestamp_str": time.strftime("%Y-%m-%d %H:%M:%S %Z", time.localtime(time.time())),  
            "config": str(CONFIG["TYPE"] + ":" + CONFIG["ID"]),  
            "source": video_id,  
            "youtube_metadata": {  
                "title": info_dict.get('title'),  
                "description": info_dict.get('description'),  
                "upload_date": info_dict.get('upload_date'),  
                "uploader": info_dict.get('uploader'),  
                "uploader_id": info_dict.get('uploader_id'),  
                "uploader_url": info_dict.get('uploader_url'),  
                "channel_id": info_dict.get('channel_id'),  
                "channel_url": info_dict.get('channel_url'),  
                "duration": info_dict.get('duration'),  
                "view_count": info_dict.get('view_count'),  
                "like_count": info_dict.get('like_count'),  
                "categories": info_dict.get('categories'),  
                "tags": info_dict.get('tags'),  
                "webpage_url": info_dict.get('webpage_url'),  
                "thumbnails": info_dict.get('thumbnails'),  
                # Add any other metadata fields you need  
            }  
        }  
  
        # Split the transcript into chunks    
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2750, chunk_overlap=250)    
        docs = text_splitter.split_documents([document])    
  
        # Delete previous transcripts for this video_id    
        collection.delete_many({"source": video_id})    
  
        # Create vector store from documents    
        vector_store = MongoDBAtlasVectorSearch(    
            embedding=embeddings,    
            collection=collection    
        )    
        vector_store.add_documents(docs)    
  
        logger.info(f"Successfully processed video {video_id}")    
        client.close()    
  
    except Exception as e:    
        error_message = traceback.format_exc()    
        logger.error(f"An error occurred while processing video {video_id}: {error_message}")    
  
        # Store in unprocessed collection    
        unprocessed_collection.update_one(    
            {"videoId": video_id},    
            {"$set": {    
                "videoId": video_id,    
                "reason": error_message,    
                "config": str(CONFIG["TYPE"] + ":" + CONFIG["ID"]),    
                "timestamp": time.time(),    
            }},    
            upsert=True    
        )    
  
        client.close()    
  
def main():    
    # Configuration    
    CONFIG = {    
        "TYPE": "PLAYLIST",    
        "ID": "PLED25F943F8D6081C"    
    }    
  
    try:    
        # Initialize embeddings model    
        embeddings = OllamaEmbeddings(model="nomic-embed-text")    
  
        # MongoDB setup    
        client = MongoClient(os.getenv("MONGODB_URI"))    
        db_name = os.getenv("MONGODB_DATABASE", "default_db")    
        collection_name = os.getenv("MONGODB_COLLECTION", "yt-transcripts")    
        unprocessed_collection_name = os.getenv("MONGODB_UNPROCESSED_COLLECTION", "yt-unprocessed")    
        db = client[db_name]    
        collection = db[collection_name]    
        unprocessed_collection = db[unprocessed_collection_name]    
  
        # Ensure collection exists    
        if collection_name not in db.list_collection_names():    
            # Create collection by inserting a dummy document    
            collection.insert_one({"_id": "dummy"})    
            collection.delete_one({"_id": "dummy"})    
            logger.info(f"Collection '{collection_name}' created.")    
  
        # Retrieve videos based on configuration    
        videos = get_videos(CONFIG)    
        if not videos:    
            logger.info("No videos retrieved. Exiting.")    
            return    
        logger.info(f"Total videos found: {len(videos)}.")    
  
        # Get lists of already processed and unprocessable videos    
        existing_sources_cursor = collection.find({"config": str(CONFIG["TYPE"] + ":" + CONFIG["ID"])}, {"source": 1})    
        existing_sources = set(doc["source"] for doc in existing_sources_cursor)    
        unprocessed_videos_cursor = unprocessed_collection.find({"config": str(CONFIG["TYPE"] + ":" + CONFIG["ID"])}, {"videoId":1})    
        unprocessed_videos = set(doc["videoId"] for doc in unprocessed_videos_cursor)    
  
        logger.info(f"Already processed sources: {len(existing_sources)}")    
        logger.info(f"Already unprocessable videos: {len(unprocessed_videos)}")    
  
        # Remove these from the videos list    
        videos_to_check = [    
            video for video in videos    
            if video["videoId"] not in existing_sources and video["videoId"] not in unprocessed_videos    
        ]    
        logger.info(f"Remaining videos after excluding existing and unprocessable: {len(videos_to_check)}")    
  
        if not videos_to_check:    
            logger.info("No new videos to process. Exiting.")    
            return    
  
        # Extract video IDs    
        video_ids = [video["videoId"] for video in videos_to_check]    
  
        logger.info(f"Processing the following {len(video_ids)} videos:")    
        for vid in video_ids:    
            logger.info(f"- {vid}")    
  
        # Process video transcripts and store in vector store in parallel using Ray    
        tasks = []    
        for video_id in video_ids:    
            task = process_single_video_transcript.remote(video_id, CONFIG)    
            tasks.append(task)    
  
        # Wait for all tasks to complete    
        # Process in batches to manage resources    
        batch_size = 100  # Adjust based on your system's capabilities    
        total_batches = (len(tasks) + batch_size - 1) // batch_size    
        for i in range(0, len(tasks), batch_size):    
            batch_tasks = tasks[i:i+batch_size]    
            ray.get(batch_tasks)    
            logger.info(f"Completed batch {i // batch_size + 1} of {total_batches}")    
  
        logger.info(f"Completed processing {len(video_ids)} videos.")    
  
        # Close MongoDB connection    
        client.close()    
    except Exception as e:    
        error_message = traceback.format_exc()    
        logger.error(f"An error occurred in the main function: {error_message}")    
  
def get_videos(config):    
    """    
    Retrieve videos based on the provided configuration.    
    """    
    try:    
        if config["TYPE"] == "CHANNEL":    
            return list(scrapetube.get_channel(config["ID"]))    
        elif config["TYPE"] == "SEARCH":    
            return list(scrapetube.get_search(config["ID"]))    
        elif config["TYPE"] == "PLAYLIST":    
            return list(scrapetube.get_playlist(config["ID"]))    
        else:    
            raise ValueError("Invalid CONFIG TYPE")    
    except Exception as e:    
        logger.error(f"An error occurred while retrieving videos: {e}")    
        return []    
  
if __name__ == "__main__":    
    main()    
