import React from 'react';
import ReactDOM, { render, unmountComponentAtNode, shallow } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Search from './index.js';
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('search form should render correctly', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Search />, container);
  });
  const label = container.querySelector('label');
  expect(label.textContent).toBe('Search a location:');
});