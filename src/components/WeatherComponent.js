import { useState } from 'react';
import '../App.css';
import API from '../shared/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faWind} from '@fortawesome/free-solid-svg-icons'

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const Search = event =>{
        if(event.key === 'Enter'){
            fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
                .then(res => res.json())
                .then (result => 
                    setWeather(result),
                    setQuery(''),
                    console.log(weather)
                );
        }

    };

    const DateBuilder = d =>{
        const days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
    
        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
    
        // getDay() returns a number of a day. Ex: Sunday - 0, Monday - 1, Tuesday - 2 . . . 
        var day = days[d.getDay()];
        var date = d.getDate();
         // getMonth() returns a number of a month. Ex: January - 0, February - 1, March - 2 . . . 
        var month = months[d.getMonth()];
        // getFullYear() returns the year (four digits for dates between year 1000 and 9999) of the specified date
        var year = d.getFullYear();
    
        return `${day}, ${date}, ${month}, ${year}`
    }

    return(
            <div className="weatherMain">
                <main>

                    <h1 className="head">Weather app <FontAwesomeIcon icon={faSun} spin/></h1>

                    <div className="search">
                        <input type="text" className="search-bar" placeholder="Write your city" onChange={e => setQuery(e.target.value)} value={query} onKeyPress={Search}/>
                    </div>
                    
                    {(typeof weather.main != 'undefined') ? (
                        <div>
                            <div className="location-box">
                                <div className="location">{weather.name}, {weather.sys.country}</div>
                                <div className="date">{DateBuilder(new Date())}</div>
                            </div>,

                            <div className="weather-box">
                                <div className="temp">
                                    {Math.round(weather.main.temp)}&#176;C
                                    <div className="feels">Feels like: {Math.round(weather.main.feels_like)}&#176;C</div>
                                    <div className="weather">
                                    <div>{weather.weather[0].main}</div>
                                    {weather.weather[0].main === 'Sunny'? <FontAwesomeIcon icon={faSun} spin/> : <FontAwesomeIcon icon={faCloud} />}
                                    <div className="wind">Wind: {weather.wind.speed}km/h  {weather.wind.speed > 0 ? <FontAwesomeIcon icon={faWind} />: ('')}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    ): ('')}
                </main>
            </div>
        );
}


export default Weather;