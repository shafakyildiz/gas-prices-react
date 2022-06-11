import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  var apiUrl = "https://api.collectapi.com/gasPrice/turkeyLpg?city=ankara";
  var apiKey = "1FkC4bAfQ1jh0Tb9Hxx9ET:2W9TQ6qj8A6SBw4UOpJQzv";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = `apikey ${apiKey}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: "apikey 1FkC4bAfQ1jh0Tb9Hxx9ET:2W9TQ6qj8A6SBw4UOpJQzv",
        },
      };

      const bodyParameters = {
        key: apiKey,
      };

      axios
        .get(apiUrl, bodyParameters, config)
        .then((response) => console.log(response));
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
