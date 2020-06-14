import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const LoadingHOC = ( WrappedComponent ) => {

  return ({ isLoading, ...props }) => {

      if ( isLoading ) {
        return (
          <div className="loading">
            <FontAwesomeIcon icon="sun" spin />
          </div>
        )
      } else {
        return <WrappedComponent { ...props } />
      }
  }
}

export default LoadingHOC;