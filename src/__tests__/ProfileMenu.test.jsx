import { render, fireEvent, screen, waitFor, cleanup } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../setup/store/reducers/reducer";
import ProfileMenu from "../components/header/component/ProfileMenu";
import { vi,describe, it , expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { thunk } from "redux-thunk";
import Cookies from "js-cookie";

afterEach(cleanup);

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const initialState = {
  user: {
    loggedIn: true,
    userName: "Test User",
  },
};

describe("ProfileMenu Component", () => {
  it("should render the profile button", async () => {
    renderWithRedux(
      <MemoryRouter>
        <ProfileMenu dataTestId="profile-button" />
      </MemoryRouter>,
      { initialState }
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile-button")).toBeInTheDocument();
    });
  });

  it("should show user name and logout button when the user is logged in", async () => {
    Cookies.get = vi.fn().mockReturnValue("Test User");

    renderWithRedux(
      <MemoryRouter>
        <ProfileMenu dataTestId="profile-button" />
      </MemoryRouter>,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("profile-button"));

    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toHaveTextContent("Test User");
      expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
    });
  });

  it("should logout the user when the logout button is clicked", async () => {
    Cookies.get = vi.fn().mockReturnValue("Test User");
    Cookies.remove = vi.fn();

    const mockLocation = { pathname: "/login" };
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    renderWithRedux(
      <MemoryRouter>
        <ProfileMenu dataTestId="profile-button" />
      </MemoryRouter>,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("profile-button"));

    await waitFor(() => {
      expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("logout-btn"));

    await waitFor(() => {
      expect(Cookies.remove).toHaveBeenCalledWith("user");
      expect(mockLocation.pathname).toBe("/login");
    });
  });

  it("should toggle the profile menu visibility when clicking the profile button", async () => {
    renderWithRedux(
      <MemoryRouter>
        <ProfileMenu dataTestId="profile-button" />
      </MemoryRouter>,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("profile-button"));

    await waitFor(() => {
      expect(screen.getByTestId("profile-menu")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("profile-button"));

    await waitFor(() => {
      expect(screen.queryByTestId("profile-menu")).toBeNull();
    });
  });

  it("should close the profile menu if clicked outside", async () => {
    renderWithRedux(
      <MemoryRouter>
        <ProfileMenu dataTestId="profile-button" />
      </MemoryRouter>,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("profile-button"));

    expect(screen.getByTestId("profile-menu")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByTestId("profile-menu")).toBeNull();
    });
  });
});
