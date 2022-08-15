import React, {useState} from 'react';
import axios from 'axios';

/* The entire app runs basically here. This function takes the request entered to the
search box and sends it to the backend, then displays the data. The names are self-explanatory.*/

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState();

    const url = 'https://limitless-lake-02513.herokuapp.com/forcasts/' + location;

    const searchLocation = (event) => {
        if(event.key === 'Enter'){
            axios.get(url).then((response)=> {
                setData(response.data)
            })
            setLocation('')
        }
    }

  return (
    <div className="app">
        <div className="search">
            <input
                value={location}
                onChange={event => setLocation(event.target.value)}
                placeholder='Enter a city name'
                onKeyPress={searchLocation}
                type="text"/>
        </div>
        <div className="container">
            <div className="top">
                <div className="location">
                    <p> {data?.location?.name ?? 'Enter a city name'} </p>
                </div>
                <div className="temp">
                    <h1> {Math.ceil(data?.current?.temp_c ?? 0)} °C</h1>
                </div>
                <div className="description">
                    <img src={data?.current?.condition?.icon} />
                    <p> {data?.current?.condition?.text} </p>
                </div>
            </div>

            <div className="bottom">
                <div className="humidity">
                    <p className="bold"> {data?.current?.humidity ?? '0'}% </p>
                    <p> Humidity </p>
                </div>
                <div className="wind">
                    <p className="bold"> {data?.current?.wind_kph ?? '0'} KPH </p>
                    <p> Wind </p>
                </div>
            </div>
            <p className="contact">gamzeyilan1@gmail.com </p>
        </div>
    </div>
  );
}

export default App;
