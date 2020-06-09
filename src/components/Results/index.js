import React from 'react';
import './index.scss';

const Results = ( props ) => {

  console.log( 'PROPS: ', props );

  const tempUnit = props.tempUnit === 'imperial' ? 'F' : 'C';
  

  return (
    <div className="results-container">
      {
        props.today.weather ? ( <div>
        <p>Today's weather:</p>
          <div className="today result">
            <div className="glance">
              <img src={`http://openweathermap.org/img/wn/${ props.today.weather[0].icon }@2x.png`} alt={ props.today.weather[0].description } />
              <p>{ Math.round( props.today.main.temp ) }&deg; { tempUnit }</p>
              <p className="desc">{ props.today.weather[0].description }</p>
            </div>
            <div className="details">

            </div>
          </div>
        </div>) : <p className="no-data">Hrm, can't get the current weather right now.<br />Try a different search.</p>
      }


      {
        props.forecast.list ? ( <div>
          <p>5-day forecast:</p>
          <ul className="results">
          {
            props.forecast.list.filter(( day, index, Arr) => {
              // the free API service doesn't return exactly what I want
              // so I'm returning 40 items, but only need one out of every 8 of them
              // since 40 (items) / 8 === 5 (days of weather)
              return (index + 3) % 8 === 0;
            }).map(( day, index ) => {
              const weatherOfTheDay = day.weather[0];
              const weatherIcon = weatherOfTheDay.icon;
              const currentTemp = Math.round( day.main.temp ) ;
              return (
                <li key={index} className="forecast result">
                  <img src={`http://openweathermap.org/img/wn/${ weatherIcon }@2x.png`} alt={ weatherOfTheDay.description } />
                  <p>{ currentTemp }&deg; { tempUnit }</p>
                  <p className="desc">{ weatherOfTheDay.description }</p>
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