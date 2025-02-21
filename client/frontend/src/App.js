import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format.");
      }
      
      const res = await axios.post("https://your-api-url.onrender.com/api/bfhl", parsedData);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or server error.");
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters(checked ? [...selectedFilters, value] : selectedFilters.filter(f => f !== value));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bajaj Finserv API Frontend</h1>
      
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON e.g. { "data": ["A", "2", "B", "3"] }'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {response && (
        <div>
          <h3>Filter Options</h3>
          <label>
            <input type="checkbox" value="numbers" onChange={handleFilterChange} />
            Numbers
          </label>
          <label>
            <input type="checkbox" value="alphabets" onChange={handleFilterChange} />
            Alphabets
          </label>
          <label>
            <input type="checkbox" value="highest_alphabet" onChange={handleFilterChange} />
            Highest Alphabet
          </label>

          <h2>Response</h2>
          <pre>{JSON.stringify(
            Object.fromEntries(Object.entries(response).filter(([key]) => selectedFilters.includes(key))),
            null,
            2
          )}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
