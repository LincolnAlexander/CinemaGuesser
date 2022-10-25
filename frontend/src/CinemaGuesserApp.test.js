import { render, screen } from '@testing-library/react';
import CinemaGuesser from './CinemaGuesserApp';

test('renders learn react link', () => {
  render(<CinemaGuesserApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
