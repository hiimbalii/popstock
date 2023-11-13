import App from './App';
import React from 'react';
import {render, screen} from '@testing-library/react';

jest.mock('nanoid', () => {
  () => 1;
});
test.skip('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
