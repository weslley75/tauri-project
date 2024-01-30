import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  const Increment = () => {
    setCount(count + 1);
  }

  const Decrement = () => {
    if (count > 0) setCount(count - 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-between">
        <h1>Counter</h1>
        <p>Count: {count}</p>
      </div>
      <div className="flex gap-4">
        <button className="border-2 border-white px-2 rounded-lg" onClick={Increment}>Increment +</button>
        <button className="border-2 border-white px-2 rounded-lg" onClick={Decrement}>Decrement -</button>
      </div>
    </div>
  )
}