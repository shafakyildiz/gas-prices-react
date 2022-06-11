import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    var apiUrl = "https://api.collectapi.com/gasPrice/turkeyLpg?city=ankara";
    var apiKey = "1FkC4bAfQ1jh0Tb9Hxx9ET:2W9TQ6qj8A6SBw4UOpJQzv";
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

      axios.get(apiUrl, bodyParameters, config).then((response) => {
        console.log(response);
        setData(response.data.result);
      });
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {data.map((item) => {
            console.log(item.lpg);
            return (
              <li>
                {item.marka} - {item.lpg}
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
