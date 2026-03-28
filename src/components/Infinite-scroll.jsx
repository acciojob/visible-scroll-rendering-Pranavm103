import React from 'react'
import { useState, useRef } from 'react';


export default function InfiniteScroll() {
 const totalItems = 1000;
  const itemHeight = 50;
  const visibleCount = 10;

  const scrollRef = useRef(null);

  const [startIndex, setStartIndex] = useState(0);

  const items = Array.from({ length: totalItems }, (_, i) => ({
    title: `Item ${i}`,
    desc: "Lorem ipsum dolor sit amet."
  }));

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    const newStart = Math.floor(scrollTop / itemHeight);
    setStartIndex(newStart);
  };

  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{ height: "500px", overflow: "auto" }}
    >
      <div style={{ height: `${startIndex * itemHeight}px` }} />

      {visibleItems.map((item, index) => (
        <div
          key={startIndex + index}
          style={{ height: `${itemHeight}px` }}
        >
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
        </div>
      ))}

      <div
        style={{
          height: `${(totalItems - (startIndex + visibleCount)) * itemHeight}px`
        }}
      />
    </div>
  )
}
