'use client';
import Image from 'next/image';
import FindRobots from './FindRobots';
import Form from './Form';
import { useState } from 'react';
import { Index, Move, Pole, Robot } from './utils/types';

export default function Home() {
  // pole = N, E, S, W
  // axis = +x, -x, +y, -y

  const [grid, setGrid] = useState<Index>([0, 0]);
  const [robots, setRobots] = useState<Robot[]>([]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center pb-5'>
        <div className='text-2xl font-semibold'>Welcome to Mars!</div>
        <div className='text-lg font-semibold'>Drop your robots</div>
      </div>
      <div className='flex space-x-16'>
        <Form
          setGrid={setGrid}
          grid={grid}
          setRobots={setRobots}
          robots={robots}
        />
        {robots.length > 0 && <FindRobots gridArea={grid} robots={robots} />}
      </div>
    </div>
  );
}
