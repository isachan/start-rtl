// import { render, screen } from '@testing-library/react';
import { render, screen } from './custom-render';

import App from './App';

// use describe, it pattern
describe('<App />', () => {
  it('Renders <App /> component correctly', () => {
    render(<App />);
    expect(
      screen.getByText(/Getting started with React testing library/i)
    ).toBeInTheDocument();
  });
});
