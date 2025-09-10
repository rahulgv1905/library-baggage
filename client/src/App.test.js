const { render, screen } = require('@testing-library/react');
const App = require('./App');

test('renders main application component', () => {
    render(<App />);
    const linkElement = screen.getByText(/welcome to the library baggage system/i);
    expect(linkElement).toBeInTheDocument();
});

test('checks button functionality', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toBeEnabled();
});