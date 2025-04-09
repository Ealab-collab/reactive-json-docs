import { render, screen } from '@testing-library/react';
import DevApp from './DevApp';

test('renders learn react link', () => {
  render(<DevApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
