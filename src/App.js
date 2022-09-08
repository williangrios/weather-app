import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

function App() {

  const [search, setSearch] = useState('');
  const [allData, setAllData] = useState({
    city: '',
    country: '',
    temperature: '',
    humidity: '',
    minTemperature: '',
    weatherIcons: ''
  })

  useEffect(() => {
    //we add what we want to happen AFTER rendering
    //fetch the database infos the API call of weather
    fetchData('');
  }, [])

  const fetchData = async (city) => {

    try{
      const APIKEY = '11f926d6a2459cd6f84c3a5a920b7011';
      const query = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
      const result = await axios.get(query)
      await setAllData({
        city:result.data.name,
        country:result.data.sys.country,
        temperature:result.data.main.temp,
        humidity:result.data.main.humidity,
        minTemperature:result.data.main.temp_min,
        weatherIcons:result.data.weather[0].icon
      })
      console.log(allData.weatherIcons)
    }
    catch(e){
       if (e.message ==='Request failed with status code 400'){
        setAllData({
          city: ''
        });
       } else if(e.message === 'Request failed with status code 404'){
        alert('Cidade não encontrada')
       }

    }
    
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit =  (e) => {
    e.preventDefault();
    fetchData(search);
  }

  return (
    <main>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input type='text' name='city' placeholder='Digite o nome da cidade' value={search} onChange={handleChange}></input>
          <button for='city'>Buscar</button>
        </form>
        <section>
          {allData.city === '' ?
            <div className='header-div'>
              <h3>Pesquise o nome da cidade!</h3>
            </div>
          : 
            <div>
              <div className='header-div'>
                  <img id='imgWeather' src={ 'http://openweathermap.org/img/wn/' + allData.weatherIcons + '@2x.png'}/>
              </div>
              <div className='weather-description'>
                <h1>{allData.city}</h1>
                <h3>{allData.country}</h3>
                <div className='weather-data'>
                  <div className='weather-box'>
                    <h3>Temperatura</h3>
                    <p>{allData.temperature.toFixed(1)} C°</p>
                  </div>
                  <div className='weather-box'>
                    <h3>Temperatura mínima</h3>
                    <p>{allData.minTemperature.toFixed(1)}  C°</p> 
                  </div>
                  <div className='weather-box'>
                    <h3>Humidade</h3>
                    <p>{allData.humidity.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            </div>
          }
          
        </section>
      </div>
    </main>
  );
}

export default App;
