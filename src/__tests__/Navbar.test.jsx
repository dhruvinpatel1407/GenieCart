import { cleanup, render, waitFor } from "@testing-library/react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { afterEach, it, expect, describe } from "vitest";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import reducer from "../setup/store/reducers/reducer";
import Navbar from "../components/header";

const renderWithRedux = (
  component,
  {
    initState,
    store = createStore(reducer, initState, applyMiddleware(thunk)),
  } = {}
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

afterEach(cleanup);

describe("Navbar Component", () => {
  it("should render the Navbar component", () => {
    const { getByTestId } = renderWithRedux(<Navbar />);
    expect(getByTestId("navbar")).toBeInTheDocument();
  });

  it("should render the logo", () => {
    const { getByTestId } = renderWithRedux(<Navbar />);
    expect(getByTestId("logo")).toBeInTheDocument();
    expect(getByTestId("logo-link")).toHaveAttribute("href", "/");
  });

  it("should render Wishlist and Cart Buttons", async () => {
    const { getByTestId } = renderWithRedux(<Navbar />);

    await waitFor(() => {
      expect(getByTestId("wishlist-link")).toBeInTheDocument();
      expect(getByTestId("cart-link")).toBeInTheDocument();
    });
  });

  it("should display the cart badge with item count", async () => {
    const mockState = {
      cart: [{ id: 1, title: "Item 1", quantity: 3 }],
    };

    const { getByTestId } = renderWithRedux(<Navbar />, {
      initState: mockState,
    });

    await waitFor(
      () => {
        expect(getByTestId("cart-badge")).toBeInTheDocument();
      },
      { timeout: 8000 }
    );
  });

  it("should have the Search and Profile buttons", async () => {
    const { getByTestId } = renderWithRedux(<Navbar />);

    const searchButton = getByTestId("search-button");
    const profileButton = getByTestId("profile-button");

    await waitFor(
      () => {
        expect(searchButton).toBeInTheDocument();
        expect(profileButton).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
