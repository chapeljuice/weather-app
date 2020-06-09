import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import Loading from './../Loading';
import Results from './../Results';
import './index.scss';

class Search extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      isLoading: false,
      forecastResults: { list: []},
      searchQuery: 'Seattle',
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
  
  // function that gets search results data and saves to state
  getSearchResults = ( searchQuery = this.state.searchQuery.replace(/\s+/g, '') ) => {
    // when fetching display the loading spinner
    this.setState({
      isLoading: true
    });

    fetch( `https://api.openweathermap.org/data/2.5/weather?appid=e3fe0d170e923c48368b1987d5c09ad8&units=${ this.state.tempUnit }&cnt=40&q=${ searchQuery }` )
      .then( response => response.json() )
      .then( data => {
        console.log( 'Weather data for ' + searchQuery + ': ', data );
        this.setState({
          isLoading: false,
          todaysWeather: data
        });
      })

    fetch( `https://api.openweathermap.org/data/2.5/forecast?appid=e3fe0d170e923c48368b1987d5c09ad8&units=${ this.state.tempUnit }&cnt=40&q=${ searchQuery }` )
      .then( response => response.json() )
      .then( data => {
        console.log( 'Weather data for ' + searchQuery + ': ', data );
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
        { isLoading ? <Loading /> : <Results forecast={forecastResults} today={todaysWeather} tempUnit={tempUnit} /> }
      </div>
    )
  }

}

export default Search;