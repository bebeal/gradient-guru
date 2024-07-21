'use client'

import { Terminal, Tweet } from '@/components';
import React from 'react';

const tweetData = [
  {
    id: "1775175303284797538",
    title: "Tweet Component(with Video Embed)"
  },
  {
    id: "1768058551031800134",
    title: "Tweet Component"
  },
  {
    id: "1776335603115741310",
    title: "Tweet Component"
  },
];

const TweetDemoItem = ({ id, title }: { id: string; title: string }) => {
  const code = `<Tweet id="${id}" />`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 rounded-lg">
      <div className="flex flex-col border border-primary rounded bg-tertiary p-4">
        <div className="text-lg font-bold mb-4 w-full text-center">{title}</div>
        <Terminal language="javascript" className="h-24">{code}</Terminal>
      </div>
      <div className="min-h-[400px] flex items-center justify-center bg-tertiary p-4 border border-primary rounded">
        <Tweet id={id} />
      </div>
    </div>
  );
};

const MultiTweetDemo = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Multi-Tweet Demo</h1>
      <div className="space-y-8">
        {tweetData.map((tweet, index) => (
          <TweetDemoItem key={index} {...tweet} />
        ))}
      </div>
    </div>
  );
};

export default MultiTweetDemo;
