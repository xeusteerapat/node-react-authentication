import React, { useState, useEffect } from 'react';
import axios from '../config/axios';

const App = () => {
  const [counter, setCounter] = useState(0);

  const fetchData = async () => {
    const response = await axios.get('/counters');
    setCounter(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCounter = async counter => {
    const body = {
      counter
    };

    await axios.put('/counters', body);
    fetchData();
  };
  return (
    <div>
      <h1>Counter App</h1>
      <h1>{counter}</h1>
      <button onClick={() => handleCounter(Number(counter) + 1)}>+</button>
      <button onClick={() => handleCounter(Number(counter) - 1)}>-</button>
      <button onClick={() => handleCounter(0)}>reset</button>
    </div>
  );
};

export default App;
