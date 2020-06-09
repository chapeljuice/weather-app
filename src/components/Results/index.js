import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import './index.scss';

const Results = ( props ) => {

  console.log( 'PROPS: ', props );

  const tempUnit = props.tempUnit === 'imperial' ? 'F' : 'C';
  const speedUnit = props.tempUnit === 'imperial' ? 'MPH' : 'KPH';
  const { today, forecast } = props;

  // helper function for getting background image
  const getBackground = ( id ) => {
    const tempId = String( id );

    // if statement for determining background image
    // I would add more instances, if I had more time
    if ( tempId.charAt(0) === '3' || tempId.charAt(0) === '5' ) {
      // raining
      return './../images/rain.jpeg';
    } else if ( tempId.charAt(0) === '2' ) {
      // thundering
      return './../images/thunder.png';
    } else if ( tempId.charAt(0) === '6' ) {
      // snowing
      return './../images/snow.jpg';
    } else if ( tempId === '781' ) {
      // tornado
      return './../images/windy.png';
    } else if ( tempId === '800' ) {
      // clear skies
      return './../images/clear.jpeg';
    } else if ( Number( tempId ) > 800 ) {
      // clouds
      return './../images/clouds.jpeg';
    }
  }

  return (
    <div className="results-container">
      {
        today.weather ? ( <div>
          <p className="section-title">Today's weather in <a href={`https://maps.google.com/maps?q=${ today.coord.lat },${ today.coord.lon }`} target="_blank" rel="noopener noreferrer" className="text-link">{ today.name }</a>:</p>
          <a href={`https://maps.google.com/maps?q=${ today.coord.lat },${ today.coord.lon }`} target="_blank" rel="noopener noreferrer" className="btn link-out">View Map of Location</a>
          <div className="weather-today" style={{ backgroundImage: `url(${ getBackground( today.weather[0].id ) })`, backgroundSize: 'cover' }}>
            <div className="today result">
              <p className="date">
                {moment( today.dt, 'X' ).format( 'M/D' )}
              </p>
              <img src={`http://openweathermap.org/img/wn/${ today.weather[0].icon }@2x.png`} alt={ today.weather[0].description } />
              <p className="current-temp"><span>Currently</span>{ Math.round( today.main.temp ) }&deg; { tempUnit }</p>
              <p className="desc">{ today.weather[0].description }</p>
            </div>
            <div className="details">
              <span className="temps">
                <p><span>Today's High</span>{ Math.round( today.main.temp_max ) }&deg; { tempUnit }</p>
                <p><span>Today's Low</span>{ Math.round( today.main.temp_min ) }&deg; { tempUnit }</p>
              </span>
              <span className="others">
                <p><span>Humidity</span>{ today.main.humidity }%</p>
                <p><span>Wind Speed</span>{ Math.round( today.wind.speed ) } { speedUnit } <FontAwesomeIcon  icon="arrow-alt-circle-up" transform={{rotate: today.wind.deg}} /></p>
              </span>
              <span className="others">
                <p><span>Sunrise</span>{ moment( today.sys.sunrise, 'X' ).format( 'LT' ) }</p>
                <p><span>Sunset</span>{ moment( today.sys.sunset, 'X' ).format( 'LT' ) }</p>
              </span>
            </div>
          </div>
        </div>) : <p className="no-data">Hrm, can't get the current weather right now.<br />Try a different search.</p>
      }


      {
        forecast.list ? ( <div>
          <p className="section-title">5-day forecast:</p>
          <ul className="results">
          {
            forecast.list.filter(( day, index, Arr) => {
              // the free API service doesn't return exactly what I want
              // so I'm returning 40 items, but only want to return 
              // one consistent hour of the day (I am chosing 6:00 PM)
              return day.dt_txt.substr(day.dt_txt.length - 8) === '18:00:00';
            }).map(( day, index ) => {
              const weatherOfTheDay = day.weather[0];
              const weatherIcon = weatherOfTheDay.icon;
              const currentTemp = Math.round( day.main.temp );
              const dayOfWeek = day.dt;

              return (
                <li key={index} className="day-item" style={{ backgroundImage: `url(${ getBackground( weatherOfTheDay.id ) })`, backgroundSize: 'cover' }}>
                  <div className="forecast result">
                    <p className="date">
                      {moment( dayOfWeek, 'X' ).format( 'M/D' )}
                    </p>
                    <img src={`http://openweathermap.org/img/wn/${ weatherIcon }@2x.png`} alt={ weatherOfTheDay.description } />
                    <p className="current-temp">{ currentTemp }&deg; { tempUnit }</p>
                    <p className="desc">{ weatherOfTheDay.description }</p>
                    <div className="temps">
                      <p><span>High</span>{ Math.round( day.main.temp_max ) }&deg; { tempUnit }</p>
                      <p><span>Low</span>{ Math.round( day.main.temp_min ) }&deg; { tempUnit }</p>
                    </div>
                  </div>
                </li>
              )
            })
          }
          </ul>
        </div>) : <p className="no-data">Hrm, can't get the 5-day forecast right now.<br />Try a different search.</p>
      }
    </div>
  )
}

export default Results;