import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import WishlistButton from "../pages/dashboard/components/products/components/WishlistButton";
import Cookies from "js-cookie";
import { vi, describe, it, expect } from "vitest";


vi.mock("js-cookie");

const renderWithRedux = (
  ui,
  { initState = {}, store = createStore((state) => state, initState) } = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("WishlistButton Component", () => {
  it("should render a White heart when the product is not in the wishlist", () => {
    const product = { id: 1, name: "Chair", price: 100 };
    renderWithRedux(<WishlistButton product={product} />, {
      initState: { WishList: [] },
    });

    // Check for empty heart (FaRegHeart)
    expect(screen.getByRole("button")).toContainElement(screen.getByTestId("FaRegHeart"));
  });

  it("should render a Red heart when the product is in the wishlist", () => {
    const product = { id: 1, name: "Chair", price: 100 };
    renderWithRedux(<WishlistButton product={product} />, {
      initState: { WishList: [{ id: 1, name: "Chair", price: 100 }] },
    });

    // Check for filled heart (FaHeart)
    expect(screen.getByRole("button")).toContainElement(screen.getByTestId("FaHeart"));
  });

  it("should show notification when the user is not logged in", async () => {
    const product = { id: 1, name: "Chair", price: 100 };

    // Mocking cookies.get to simulate a user being logged out
    Cookies.get = vi.fn().mockReturnValue(null); // Mimic logged-out state

    renderWithRedux(<WishlistButton product={product} />, {
      initState: { WishList: [] },
    });

    fireEvent.click(screen.getByRole("button"));

    // Check if the notification message is displayed
    expect(screen.getByText("You must be logged in to manage your wishlist.")).toBeInTheDocument();

    // Wait for notification to disappear after 3 seconds
    await waitFor(() => {
      expect(screen.queryByText("You must be logged in to manage your wishlist.")).toBeNull();
    }, { timeout: 4000 });
  });

  it("should dispatch addToWishlist when the product is not in the wishlist and the user is logged in", async () => {
    const product = { id: 1, title: "Chair", price: 100 };

    Cookies.get = vi.fn().mockReturnValue("valid-auth-token"); // Mimic logged-in state

    const store = createStore(
      (state = { WishList: [] }, action) => {
        if (action.type === "ADD_TO_WISHLIST") {
          return { WishList: [...state.WishList, action.payload] }; // Fix to use payload
        }
        return state;
      },
      { WishList: [] }
    );

    renderWithRedux(<WishlistButton product={product} />, { store });

    // Click the "add to wishlist" button
    fireEvent.click(screen.getByTestId("FaRegHeart"));

    // Wait for the action to be dispatched and for the state to update
    await waitFor(() => {
      // Ensure the product is added to the wishlist
      expect(store.getState().WishList).toHaveLength(1);
      expect(store.getState().WishList[0]).toEqual(product);
    }, { timeout: 5000 });

    // Check if the heart is now filled after adding the product
    expect(screen.getByTestId("FaHeart")).toBeInTheDocument();
  });
  
  it("should dispatch removeFromWishlist when the product is in the wishlist and the user is logged in", async () => {
    const product = { id: 1, title: "Chair", price: 100 };
  
    Cookies.get = vi.fn().mockReturnValue("valid-auth-token"); // Mimic logged-in state
  
    const store = createStore(
      (state = { WishList: [{ id: 1, title: "Chair", price: 100 }] }, action) => {
        if (action.type === "REMOVE_FROM_WISHLIST") {
          return {
            ...state,
            WishList: state.WishList.filter(item => item.id !== action.payload), // Correct payload usage
          };
        }
        return state;
      },
      { WishList: [{ id: 1, title: "Chair", price: 100 }] }
    );
  
    renderWithRedux(<WishlistButton product={product} />, { store });
  
    // Initially, the product should be in the wishlist
    expect(store.getState().WishList).toHaveLength(1);
  
    // Simulate a click on the heart to remove the product
    fireEvent.click(screen.getByTestId("FaHeart"));
  
    // Wait for the action to be dispatched and the state to update
    await waitFor(() => {
      // Ensure the product is removed from the wishlist
      expect(store.getState().WishList).toHaveLength(0);
    }, { timeout: 5000 });
  
    // Check if the heart icon is now the empty heart (FaRegHeart) after removal
    expect(screen.getByTestId("FaRegHeart")).toBeInTheDocument();
  });
  
  
});
