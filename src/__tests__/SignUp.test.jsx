import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import FormSignup from '../pages/sign-up';
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';
import { describe, it, expect } from 'vitest';

const mockStore = createStore(() => ({
  User: [
    {
      email: 'test@example.com',
      password: 'Password123',
      fullname: 'Test User',
    },
  ],
}));

describe('FormSignup Component', () => {
  it('should render the signup form correctly', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <FormSignup />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });

  it('should show an error message for invalid email', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <FormSignup />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'invalidemail' } });
    fireEvent.blur(screen.getByLabelText(/email address/i));

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  }); 

  it('should show an error message for invalid password', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <FormSignup />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'short' } });
    fireEvent.blur(screen.getByLabelText(/password/i));

    await waitFor(() => {
      expect(screen.getByText(/Password must have 8 characters, including digits,/i)).toBeInTheDocument();
    });
  });

  it('should show toast message for successful signup and redirect to login', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <FormSignup />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ValidPassword123' } });

    fireEvent.click(screen.getByText(/signup/i));

    await waitFor(() => {
      expect(screen.getByText(/Account Created Successfully!/i)).toBeInTheDocument();
    },{timeout : 2000});

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');  
    });
  }); 

  it('should show toast message for email already registered', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <FormSignup />
          <ToastContainer />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123' } });
    
    fireEvent.click(screen.getByText(/signup/i));

    await waitFor(() => {
      expect(screen.getByText(/Email/i)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('should show the "already have an account?" link', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <FormSignup />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
  });
});
