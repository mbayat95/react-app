import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/data', { data: inputValue });
      console.log('Data sent');
    } catch (error) {
      console.error('Error sending data', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data');
      console.log('Data fetched', response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

export default App;
