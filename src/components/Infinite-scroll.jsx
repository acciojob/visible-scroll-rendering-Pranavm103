import React from 'react'
import { useState, useRef } from 'react';


export default function InfiniteScroll() {
    const totalItems = 100;
  const itemHeight = 100;
  const containerHeight = 500;

  const scrollRef = useRef(null);

  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: 5,
  });

  const items = Array.from({ length: totalItems }, (_, index) => ({
    title: `Item ${index + 1}`,
    desc: "Lorem ipsum dolor sit amet.",
  }));

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;

    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.ceil(containerHeight / itemHeight);

    setVisibleRange({ start, end });
  };

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);
  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{
        height: "500px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      {/* Top Spacer */}
      <div style={{ height: visibleRange.start * itemHeight }} />

      {/* Visible Items */}
      {visibleItems.map((item, index) => (
        <div
          key={visibleRange.start + index}
          style={{
            height: `${itemHeight}px`,
            marginBottom: "10px",
          }}
        >
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
        </div>
      ))}

      {/* Bottom Spacer */}
      <div style={{ height: (totalItems - visibleRange.end) * itemHeight }} />
    </div>
  )
}
