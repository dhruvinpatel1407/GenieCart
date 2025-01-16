import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { afterEach, it, expect, vi } from "vitest";
import { thunk } from "redux-thunk";
import Cookies from "js-cookie";
import reducer from "../setup/store/reducers/reducer";
import Wishlist from "../pages/wishlist";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  Cookies.get.mockReset();
  cleanup();
});

const renderWithRedux = (
  component,
  { initState, store = createStore(reducer, initState, applyMiddleware(thunk)) } = {}
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

it("Should render login prompt when the user is not logged in", async () => {
  Cookies.get = vi.fn().mockReturnValue(null);

  const { getByTestId } = renderWithRedux(<Wishlist />);

  await waitFor(() => {
    expect(getByTestId("not-logged-in")).toHaveTextContent("You are not logged in.");
  });
});

it("Should render empty wishlist message when no items are present", async () => {
  const initState = { WishList: [], cart: [] };
  Cookies.get = vi.fn().mockReturnValue('valid-auth-token'); 
  const { getByTestId } = renderWithRedux(<Wishlist />, { initState });

  await waitFor(() => {
  expect(getByTestId("Empty Message")).toHaveTextContent("Your wishlist is empty.");
  });
});


it("Should render wishlist items when items are present", async () => {
  Cookies.get = vi.fn().mockReturnValue("mockUserSession");

  const mockWishlist = [
    {
      id: 1,
      name: "Test Item",
      price: 100,
      stock: 10,
      images: ["test-image.jpg"],
    },
  ];

  const {getByTestId } = renderWithRedux(<Wishlist />, {
    initState: { WishList: mockWishlist, cart: [] },
  });

  await waitFor(() => {
    expect(getByTestId("wishlist-table")).toBeInTheDocument();
    expect(getByTestId("wishlist-item-1")).toHaveTextContent("Test Item");
    expect(getByTestId("wishlist-item-1")).toHaveTextContent("$100");
  });
});


it("Should remove an item from the wishlist when the remove button is clicked", async () => {
  Cookies.get = vi.fn().mockReturnValue("mockUserSession");

  const mockWishlist = [
    {
      id: 1,
      name: "Test Item",
      price: 100,
      stock: 10,
      images: ["test-image.jpg"],
    },
  ];

  const mockReducer = (state = { WishList: mockWishlist, cart: [] }, action) => {
    switch (action.type) {
      case "REMOVE_FROM_WISHLIST":
        return { ...state, WishList: state.WishList.filter((item) => item.id !== action.payload) };
      default:
        return state;
    }
  };

  const store = createStore(mockReducer, applyMiddleware(thunk));

  const { getByTestId } = renderWithRedux(<Wishlist />, { store });

  const removeButton = getByTestId("remove-item-1");

  removeButton.click();

  await waitFor(() => {
    expect(screen.queryByTestId("wishlist-item-1")).not.toBeInTheDocument();
  });
});
  