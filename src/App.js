import "./App.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [lpgPrices, setLpgPrices] = useState([]);
  const [benzinPrices, setBenzinPrices] = useState([]);
  const [dieselPrices, setDieselPrices] = useState([]);

  useEffect(() => {
    var baseUrl = "https://api.collectapi.com/gasPrice/";
    var lpgUrl = baseUrl + "turkeyLpg?city=ankara";
    var dieselUrl = baseUrl + "turkeyDiesel?city=ankara";
    var benzinUrl = baseUrl + "turkeyGasoline?city=ankara";

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

      axios.get(lpgUrl, bodyParameters, config).then((response) => {
        setLpgPrices(response.data.result);
      });

      axios.get(benzinUrl, bodyParameters, config).then((response) => {
        console.log(response);
        setBenzinPrices(response.data.result);
      });

      axios.get(dieselUrl, bodyParameters, config).then((response) => {
        console.log(response);
        setDieselPrices(response.data.result);
      });
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="benzin-prices">
        <h1>Benzin Fiyatları</h1>
        <ul>
          {benzinPrices.map((item) => {
            console.log(item);
            return (
              <li>
                {item.marka} - {item.benzin} ₺
              </li>
            );
          })}
        </ul>
      </div>
      <div className="diesel-prices">
        <h1>Dizel Fiyatları</h1>
        <ul>
          {dieselPrices.map((item) => {
            return (
              <li>
                {item.marka} - {item.dizel} ₺
              </li>
            );
          })}
        </ul>
      </div>
      <div className="lpg-prices">
        <h1>LPG Fiyatları</h1>
        <ul>
          {lpgPrices.map((item) => {
            return (
              <li>
                {item.marka} - {item.lpg} ₺
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
