"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BreakingNews() {
    const [news, setNews] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

    const API_KEY = "7d0b7958e9874d9296acd722ef29c3bb"; 
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.articles) {
                    // আমরা পুরো অবজেক্টটাই সেভ করছি যাতে সব তথ্য পাওয়া যায়
                    setNews(data.articles);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to load news:", error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading news...</div>;

    return (
        <div className="max-w-6xl mx-auto p-5 mt-30">
            <h1 className="text-3xl font-bold mb-8 border-b-2 inline-block">
                Todays's Breaking news
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((article, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
                    >
                        {/* ১. ইমেজ সেকশন */}
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
                                alt={article.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* ২. নিউজ কন্টেন্ট */}
                        <div className="p-4 flex flex-col flex-grow">
                            <span className="text-xs font-bold text-red-500 uppercase mb-2">
                                {article.source.name}
                            </span>
                            
                            {/* শিরোনাম */}
                            <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                {article.title}
                            </h2>

                            {/* ডেসক্রিপশন (সাবটাইটেল) */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {article.description || "No description available for this news. Click the link below to read more."}
                            </p>

                            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                                <span className="text-[10px] text-gray-400">
                                    {new Date(article.publishedAt).toLocaleDateString()}
                                </span>
                                
                                {/* অরিজিনাল নিউজ লিঙ্ক */}
                                <a 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 text-sm font-semibold hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}