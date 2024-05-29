import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../LoginPage'; // Adjust the import according to your file structure
import { server, rest } from 'msw';
import { setupServer } from 'msw/node';

// Set up mock server for API calls
const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginPage Component', () => {
  
  test('renders login page with necessary elements', () => {
    render(<LoginPage />);
    
    // Check if the login form is rendered
    expect(screen.getByRole('form')).toBeInTheDocument();
    
    // Check if email input is rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    
    // Check if password input is rendered
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Check if login button is rendered
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows validation messages when inputs are invalid', () => {
    render(<LoginPage />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    // Check for validation messages
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  test('submits form with valid inputs', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    // Check if form is submitted correctly
    expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
    // Additional checks can be made here, such as API calls or navigation
  });

  test('displays error message on failed login', async () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);
    
    // Check for error message
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('allows form inputs to be cleared', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Clear the inputs
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    
    // Check if inputs are cleared
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

});
