import os  
import modal  
import pymongo  
from fastapi import Query  
  
app = modal.App("oblivious-youtube")  
image = modal.Image.debian_slim().pip_install("fastapi", "pymongo")  
  
@app.function(image=image, secrets=[modal.Secret.from_dotenv()])  
@modal.web_endpoint(method="GET", docs=True)  
def top_videos(limit: int = Query(10, ge=1, le=100)) -> any:  
    import pymongo  
    from pymongo import MongoClient  
  
    # Connect to MongoDB  
    client = pymongo.MongoClient(os.getenv("MONGODB_URI"))  
    try:  
        client.admin.command("ping")  
    except Exception as e:  
        return f"NOT OK: Unable to connect to MongoDB - {str(e)}"  
  
    # Access the database and collection  
    db_name = os.getenv("MONGODB_DATABASE", "default_db")  
    collection_name = os.getenv("MONGODB_COLLECTION", "yt-transcripts")  
    db = client[db_name]  
    collection = db[collection_name]  
  
    try:  
        pipeline = [  
            # Step 1: Match documents that have the required fields  
            { '$match': {  
                'ai_summary': { '$ne': None },
                'youtube_metadata.title': { '$exists': True },  
                'youtube_metadata.description': { '$exists': True },  
                'youtube_metadata.thumbnails': { '$exists': True, '$ne': [] },  
            }},  
            # Step 2: Sort by view_count in descending order  
            { '$sort': { 'youtube_metadata.view_count': -1 } },  
            # Step 3: Group by video_id (source) and take the first document (highest view_count)  
            { '$group': {  
                '_id': '$source',  
                'youtube_metadata': { '$first': '$youtube_metadata' },  
                'source': { '$first': '$source' },  
                'ai_summary': { '$first': '$ai_summary' },
                'timestamp_str': { '$first': '$timestamp_str' }
            }},  
            # Step 4: Project necessary fields and get the last thumbnail  
            { '$project': {  
                'source': 1,  
                'ai_summary': 1,
                'youtube_metadata.title': 1,  
                'youtube_metadata.description': 1,  
                'youtube_metadata.view_count': 1,  
                'youtube_metadata.like_count': 1,  
                'timestamp_str': 1,
                'thumbnail': { '$arrayElemAt': [ '$youtube_metadata.thumbnails', -1 ] }  
            }},  
            # Step 5: Sort again by view_count after grouping  
            { '$sort': { 'youtube_metadata.view_count': -1 } },  
            # Step 6: Limit the results  
            { '$limit': limit },  
        ]  
    
        # Execute the aggregation pipeline  
        top_videos_cursor = collection.aggregate(pipeline)  
    
        top_videos = []  
        for video in top_videos_cursor:  
            top_video_data = {  
                'video_id': video.get('source'),  
                'title': video.get('youtube_metadata', {}).get('title'),  
                'description': video.get('ai_summary'),  
                'view_count': video.get('youtube_metadata', {}).get('view_count'),  
                'like_count': video.get('youtube_metadata', {}).get('like_count'),  
                'thumbnail': video.get('thumbnail'),
                'timestamp_str': video.get('timestamp_str')
            }  
            top_videos.append(top_video_data)  
    
        # Return the list of top videos grouped by video_id  
        return top_videos  
    
    except Exception as e:  
        return f"Error retrieving top videos: {str(e)}"  

