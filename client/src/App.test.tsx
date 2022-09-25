import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter as R} from 'react-router-dom'

test('Renders the App', () => {
  const component = render(
    <R>
      <App />
    </R>
    )
  expect(component.container).toBeInTheDocument()
});
