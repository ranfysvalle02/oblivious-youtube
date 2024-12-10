"use client"
import ArticleItem from "@/components/AtricleItem";
import HorizontalScroll from "@/components/HorizontalScroll";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";

export default function Articles() {
  const [articles, setArticles] = React.useState([]);
  useEffect(() => {  
    fetch('https://ranfysvalle02--oblivious-youtube-top-videos.modal.run')  
      .then((response) => response.json())  
      .then((data) => {  
        // Map the API data to match your ArticleItemProps structure  
        const mappedArticles = data.map((item:any) => ({  
          id: item.video_id,  
          imageSrc: `https://img.youtube.com/vi/${item.video_id}/hqdefault.jpg`,  
          title: item.title,  
          summary: item.description || '',  
          field: 'Video',  
          date: item.timestamp_str,  
          writer: item.channel || 'Unknown',  
          status: 'Published',  
          tags: [],  
        }));  
        setArticles(mappedArticles);  
      })  
      .catch((error) => console.error('Error fetching articles:', error));  
  }, []);  
  
  return (
    <div className="">
      <div className="mb-9 flex items-center">
        <h3 className="text-slate-900 text-2xl leading-normal font-semibold">Top Videos</h3>
        <Link className="ml-auto text-violet-500 hover:text-violet-700 text-xl font-semibold" href="">See all</Link>
      </div>
      
      <HorizontalScroll className="mb-10">
        <div className="flex gap-4 sm:gap-8">
          {articles.map((article:any) => (  
              <ArticleItem  
                key={article.id}  
                id={article.id}  
                imageSrc={article.imageSrc}  
                title={article.title}  
                summary={article.summary.slice(0, 200)}  
                field={article.field}  
                date={article.date}  
                writer={article.writer}  
                status={article.status}  
                tags={article.tags}  
              />  
            ))}  
        </div>
      </HorizontalScroll>
    </div>
  )
}
