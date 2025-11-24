import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

// React functional component with hooks
function MyComponent({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  // Using various React hooks
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value');
    return count * 2;
  }, [count]);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // JSX with component names and attributes
  return (
    <div className="container">
      <h1>Hello, {name || 'World'}!</h1>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      
      <button onClick={handleClick} ref={inputRef}>
        Increment
      </button>
      
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      
      <MyCustomComponent 
        data={count} 
        onAction={() => console.log('Action triggered')} 
      />
      
      {/* Fragment example */}
      <>
        <span>Fragment content</span>
      </>
    </div>
  );
}

// Another React component
function MyCustomComponent({ data, onAction }) {
  return (
    <div>
      <h2>Custom Component</h2>
      <p>Data: {data}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
}

export default MyComponent;