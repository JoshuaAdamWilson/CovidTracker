import React, { useState, useEffect } from 'react';
import './CasesAndDeaths.css'
import axios from 'axios'
import TotalCard from '../cards/TotalCard';


const CasesAndDeaths = () => {
  const [positives, setPositives] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    axios
      .get("https://api.covidtracking.com/v1/us/current.json")
      .then((res) => {
        const data = res.data[0];
        setPositives(data.positive.toLocaleString());
        setDeaths(data.death.toLocaleString());
        setLastUpdate(data.lastModified.split('', 10));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    return (
      <div className="midheader">
        <figure>
          <img 
            src="https://s3.xopic.de/openwho-public/channels/6eOt8B4vkv8b0W9BPb0pwa/logo_v1.png" 
            alt="Virus" 
          />
          <figcaption>"We're here to keep you informed..."</figcaption>
        </figure>
        <TotalCard 
          region="U.S."
          cases={positives} 
          deaths={deaths} 
          date='Last Updated:'
          updated={lastUpdate} 
        />
    </div>
  );
};

export default CasesAndDeaths;
