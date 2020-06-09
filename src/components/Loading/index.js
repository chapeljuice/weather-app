import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

const Loading = () => {

  return (
    <div className="loading">
      <FontAwesomeIcon icon="sun" spin />
    </div>
  )
}

export default Loading;