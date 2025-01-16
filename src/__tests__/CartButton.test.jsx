import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CartButton from "../pages/dashboard/components/products/components/CartButton";
import Cookies from "js-cookie";
import { describe, vi, it, expect } from "vitest";

vi.mock("js-cookie");

const renderWithRedux = (
  ui,
  { initState = {}, store = createStore((state) => state, initState) } = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("CartButton Component", () => {
  it("should render 'Add to Cart' button when product is not in the cart", () => {
    const product = { id: 1, title: "Chair", price: 100 };
    renderWithRedux(<CartButton product={product} />, {
      initState: { cart: [] },
    });

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("should show quantity controls when the product is in the cart", () => {
    const product = { id: 1, title: "Chair", price: 100 };

    renderWithRedux(<CartButton product={product} />, {
      initState: { cart: [{ id: 1, title: "Chair", price: 100, quantity: 1 }] },
    });

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByTestId("CiSquareMinus")).toBeInTheDocument();
    expect(screen.getByTestId("CiSquarePlus")).toBeInTheDocument();
  });

  it("should show a notification if the user is not logged in and tries to add an item", () => {
    const product = { id: 1, title: "Chair", price: 100 };
    Cookies.get = vi.fn().mockReturnValue(null);

    renderWithRedux(<CartButton product={product} />, {
      initState: { cart: [] },
    });

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(
      screen.getByText("You must be logged in to add items to the cart.")
    ).toBeInTheDocument();
  });

  it("should dispatch addToCart action when 'Add to Cart' button is clicked", async () => {
    const product = { id: 1, title: "Chair", price: 100 };
    Cookies.get = vi.fn().mockReturnValue("valid-auth-token");

    const store = createStore(
      (state = { cart: [] }, action) => {
        if (action.type === "ADD_TO_CART") {
          return { cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        }
        return state;
      },
      { cart: [] }
    );

    renderWithRedux(<CartButton product={product} />, { store });

    fireEvent.click(screen.getByText("Add to Cart"));

    await waitFor(
      () => {
        expect(store.getState().cart).toHaveLength(1);
        expect(store.getState().cart[0]).toEqual({ ...product, quantity: 1 });
      },
      { timeout: 3000 }
    );
  });

  it("should dispatch removeFromCart action when decrement button is clicked", async () => {
    const product = { id: 1, title: "Chair", price: 100 };
    const initialState = {
      cart: [{ id: 1, title: "Chair", price: 100, quantity: 1 }],
    };
    Cookies.get = vi.fn().mockReturnValue("valid-auth-token");

    const store = createStore((state = initialState, action) => {
      if (action.type === "REMOVE_FROM_CART") {
        return {
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      }
      return state;
    }, initialState);

    renderWithRedux(<CartButton product={product} />, { store });

    fireEvent.click(screen.getByTestId("CiSquareMinus"));

    await waitFor(
      () => {
        expect(store.getState().cart).toHaveLength(0);
      },
      { timeout: 3000 }
    );
  });
});
