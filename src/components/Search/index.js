import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import LoadingHOC from './../HOC/Loading';
import Results from './../Results';
import './index.scss';


const ResultsWithLoading = LoadingHOC(Results);
class Search extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      isLoading: false,
      forecastResults: { list: []},
      searchQuery: 'Seattle',
      showApiData: false,
      tempUnit: 'imperial',
      todaysWeather: { list: []},
    }
  }

  componentDidMount = () => {
    // call to get search result data from OpenWeather API
    this.getSearchResults();
  }

  updateSearchQuery = ( e ) => {
    // save new value to state
    this.setState({
      searchQuery: e.target.value.toLowerCase().trim()
    });
    // call api with updated query
    this.getSearchResults( e.target.value );
  }

  toggleApiData = () => {
    this.setState({
      showApiData: !this.state.showApiData
    })
  }
  
  // function that gets search results data and saves to state
  getSearchResults = ( searchQuery = this.state.searchQuery.replace(/\s+/g, '') ) => {
    // when fetching display the loading spinner
    this.setState({
      isLoading: true
    });

    fetch( `https://api.openweathermap.org/data/2.5/weather?appid=e3fe0d170e923c48368b1987d5c09ad8&units=${ this.state.tempUnit }&cnt=40&q=${ searchQuery }` )
      .then( response => response.json() )
      .then( data => {
        console.log( '---> Current Weather Data for \'' + searchQuery + '\': ', data );
        this.setState({
          isLoading: false,
          todaysWeather: data
        });
      })

    fetch( `https://api.openweathermap.org/data/2.5/forecast?appid=e3fe0d170e923c48368b1987d5c09ad8&units=${ this.state.tempUnit }&cnt=40&q=${ searchQuery }` )
      .then( response => response.json() )
      .then( data => {
        console.log( '---> 5-Day Forecast Data for \'' + searchQuery + '\': ', data );
        this.setState({
          isLoading: false,
          forecastResults: data
        });
      })

  }

  render () {
    const {
      isLoading,
      forecastResults,
      showApiData,
      tempUnit,
      todaysWeather
    } = this.state;

    return (
      <div className="main-content">
        <div className="form">
          <div className="form-group search-input">
            <label htmlFor="locationSearch" className="visually-hidden">Search a location:</label>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              type="text"
              id="locationSearch"
              className="search-input form-input"
              placeholder="Search for location by city"
              autoComplete="off"
              value={this.state.searchQuery}
              onChange={e => this.updateSearchQuery( e )}
            />
          </div>
        </div>
        
        <div className="data-content">
          <ResultsWithLoading forecast={forecastResults} today={todaysWeather} tempUnit={tempUnit} isLoading={isLoading} />
          <button onClick={this.toggleApiData} className="btn">Toggle Raw API Data</button>
          <div className={ showApiData ? 'show' : 'hide' }>
            <p>You can also (more easily) drill down and see the data in the Dev Tools console!</p>
            <code>
              --- TODAY'S WEATHER: ---<br />
              { JSON.stringify( todaysWeather, null, '\t' ) }
            </code>
            <br />
            <code>
              --- 5-DAY FORECAST: ---<br />
              { JSON.stringify( forecastResults, null, '\t' ) }
            </code>
          </div>
        </div>
      </div>
    )
  }

}

export default Search;