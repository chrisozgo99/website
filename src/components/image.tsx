import React from 'react';

export function Card({ title }: { title: string }) {
  return (
    <div
      style={{
        width: '160px',
      }}
    >
      <div>
        <div>{title}</div>
      </div>
      <div
        style={{
          height: '200px',
        }}
      />
    </div>
  );
}
