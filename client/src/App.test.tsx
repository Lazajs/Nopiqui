import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter as R} from 'react-router-dom'

test('renders learn react link', () => {
  const component = render(
    <R>
      <App />
    </R>
    )
  expect(component.container).toBeInTheDocument()
});
