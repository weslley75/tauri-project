'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import { Counter } from '@/components/counter';
import { Todo } from '@/components/todo';

export default function Greet() {
  const [greeting, setGreeting] = useState('');

  // example conde invoke
  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(result => setGreeting(result))
      .catch(console.error)
  }, [])

  return (
    <>
      {/* <div>{greeting}</div> */}
      <Counter />
      <Todo />
    </>
  );
}