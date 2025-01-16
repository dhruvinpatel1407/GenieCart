import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { describe, it, expect } from "vitest";
import Formlogin from "../pages/sign-in";
import "@testing-library/jest-dom";

const mockStore = createStore(() => ({
  User: [
    {
      email: "test@example.com",
      password: "Password123",
      fullname: "Test User",
    },
  ],
}));

describe("Formlogin Component", () => {
  it("should render the form correctly", () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getAllByText(/login/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });

  it("should show an error message for invalid email", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "invalidemail" },
    });
    fireEvent.blur(screen.getByLabelText(/email address/i));

    await waitFor(() => {
      expect(screen.getByText(/please enter valid email/i)).toBeInTheDocument();
    });
  });

  it("should show an error message for invalid password", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "short" },
    });
    fireEvent.blur(screen.getByLabelText(/password/i));

    await waitFor(() => {
      expect(
        screen.getByText(/please enter valid password/i)
      ).toBeInTheDocument();
    });
  });

  it("should show toast message for successful login and redirect to dashboard", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getAllByText(/login/i)[1]);

    await waitFor(() => {
      expect(screen.getByText(/successfully logged in/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  it("should show toast message for invalid password", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "ASdf1234" },
    });

    fireEvent.click(screen.getAllByText(/login/i)[1]);

    await waitFor(
      () => {
        const toastMessage = screen.getByText(/Invalid Password/i);
        expect(toastMessage).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });

  it("should show toast message for unregistered email", async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "unregistered@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "SomePassword123" },
    });

    fireEvent.click(screen.getAllByText(/login/i)[1]);

    await waitFor(() => {
      expect(
        screen.getByText(/this email is not registered/i)
      ).toBeInTheDocument();
    });
  });

  it('should show the "forgot password" link', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <Formlogin />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
  });
});
