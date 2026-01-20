import React from 'react';

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function Card({ children, title }: Props) {
  return (
    <div className='flex flex-col gap-4 p-4 rounded-xl bg-zinc-900 shadow-md'>
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
