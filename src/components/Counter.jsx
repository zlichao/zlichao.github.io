import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p>这是一个 React island —— 只有这块会加载 JS</p>
      <button onClick={() => setCount(count + 1)}>点击次数：{count}</button>
    </div>
  );
}
