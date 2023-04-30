import React, { useState } from 'react';

export default function VirtualizedList({
  container,
  numOfItems,
  itemHeight,
  renderItem,
  windowHeight,
  className,
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numOfItems - 1,
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );
  const items = [];
  const CustomTag = `${container}`;

  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          width: '100%',
        },
      })
    );
  }

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <CustomTag
      className={className}
      style={{
        overflowY: 'scroll',
        position: 'relative',
      }}
      onScroll={handleScroll}
    >
      {items}
    </CustomTag>
  );
}
