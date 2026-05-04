"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainNav() {
    const category = ["Home", "News", "Sports", "Entertainment", "Health", "Technology", "World", "Business"];
    const trend = ["Donald Trump is no more!", "Joe Biden wins!", "Indian BJP wins again!", "Bangladesh Has a plan!"];
    const mblcategory = ["Home", "News", "Sports", "Entertainment","World"];
    
    // বর্তমানে কোন ক্যাটাগরি সিলেক্টেড আছে তার জন্য স্টেট
    const [activeTab, setActiveTab] = useState("Home");

    // বর্তমানে কোন নিউজটি দেখা যাবে তার ইনডেক্স
    const [index, setIndex] = useState(0);

    // নিউজ পরিবর্তনের জন্য টাইমার
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % trend.length);
        }, 3000); 
        
        return () => clearInterval(timer);
    }, [trend.length]);

    return (
        <div className='fixed w-full z-50'>
            <div className='flex items-center justify-center h-10 bg-[#20252d]'>
                <div className='font-mono text-xl font-semibold text-green-400'>Raf </div><span className='font-mono text-xl text-gray-100'>News</span>
            </div>
            {/* ক্যাটাগরি মেনু */}
            <div className='hidden lg:flex items-center justify-between h-10 bg-[#252a33] text-gray-900 px-15 border-b border-gray-700'>
                {category.map((cat) => (
                    <div 
                        key={cat}
                        onClick={() => setActiveTab(cat)} // ক্লিক করলে একটিভ ট্যাব চেঞ্জ হবে
                        className={`h-full flex items-center px-2 transition-all duration-300 tracking-tight cursor-pointer text-sm font-medium
                            ${activeTab === cat 
                                ? "text-green-400 border-b-2 border-green-400" // একটিভ হলে সবুজ বর্ডার এবং সাদা টেক্সট
                                : "text-[#c8cace] hover:text-white"
                            }`}
                    >
                        {cat}
                    </div>
                ))}
            </div>
                
            <div className='lg:hidden flex items-center justify-between h-10 bg-[#252a33] text-gray-900 px-10 border-b border-gray-700'>
                {mblcategory.map((cat) => (
                    <div 
                        key={cat}
                        onClick={() => setActiveTab(cat)} // ক্লিক করলে একটিভ ট্যাব চেঞ্জ হবে
                        className={`h-full flex items-center px-2 transition-all duration-300 tracking-tight cursor-pointer text-sm font-medium
                            ${activeTab === cat 
                                ? "text-green-400 border-b-2 border-green-400" // একটিভ হলে সবুজ বর্ডার এবং সাদা টেক্সট
                                : "text-[#c8cace] hover:text-white"
                            }`}
                    >
                        {cat}
                    </div>
                ))}
            </div>

            {/* ব্রেকিং নিউজ সেকশন */}
            <div className='flex items-center justify-between px-15 py-2 bg-[#1a1e24]'>
                <div className='flex items-center gap-2'>
                    <span className="font-bold text-green-400 text-sm">Breaking News :</span>
                    
                    <div className="h-6 overflow-hidden flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="text-red-500 font-semibold text-sm"
                            >
                                {trend[index]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* সার্চ বার */}
                <div className='hidden lg:inline-block bg-gray-300 text-white rounded-full px-2 border border-gray-700'>
                    <input 
                        className='bg-transparent outline-none px-2 py-1 text-sm placeholder:text-gray-800' 
                        type="text" 
                        placeholder='Search' 
                    />
                </div>
            </div>
        </div>
    );
}