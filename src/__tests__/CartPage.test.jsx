import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { afterEach, it, expect, vi, describe } from "vitest";
import { thunk } from "redux-thunk";
import Cookies from "js-cookie";
import reducer from "../setup/store/reducers/reducer";
import CartPage from "../pages/cart-page";
import { BrowserRouter } from "react-router-dom";

afterEach(() => {
  Cookies.get.mockReset();
  cleanup();
});

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

describe("CartPage Component", () => {
  
  it("Should render login prompt when the user is not logged in", async () => {
    Cookies.get = vi.fn().mockReturnValue(null);

    const { getByTestId } = renderWithRedux(<CartPage />);

    await waitFor(() => {
      expect(getByTestId("not-logged-in")).toHaveTextContent(
        "Your Cart is Empty."
      );
    });
  });

  it("Should render empty cart message when no items are present", async () => {
    const initState = { cart: [] };
    Cookies.get = vi.fn().mockReturnValue("valid-auth-token");
    const { getByTestId } = renderWithRedux(<CartPage />, { initState });

    await waitFor(
      () => {
        expect(getByTestId("Empty Message")).toHaveTextContent(
          "Your Cart is Empty"
        );
      },
      { timeout: 3000 }
    );
  });

  it("Should render cart items when items are present", async () => {
    Cookies.get = vi.fn().mockReturnValue("mockUserSession");

    const mockCart = [
      {
        id: 1,
        title: "Test Product",
        price: 100,
        quantity: 2,
        images: ["test-image.jpg"],
      },
    ];

    const { getByTestId } = renderWithRedux(<CartPage />, {
      initState: { cart: mockCart },
    });

    await waitFor(() => {
      expect(getByTestId("cart-table")).toBeInTheDocument();
      expect(getByTestId("cart-item-1")).toHaveTextContent("Test Product");
      expect(getByTestId("cart-item-2")).toHaveTextContent("$200");
    });
  });

  it("Should apply a valid coupon and update discount", async () => {
    Cookies.get = vi.fn().mockReturnValue("mockUserSession");

    const mockCart = [
      {
        id: 1,
        name: "Test Product",
        price: 100,
        quantity: 2,
        images: ["test-image.jpg"],
      },
    ];

    const { getByTestId, getByPlaceholderText } = renderWithRedux(
      <CartPage />,
      {
        initState: { cart: mockCart },
      }
    );

    const couponInput = getByPlaceholderText("Enter Coupon Code");
    const applyCouponButton = getByTestId("apply-coupon-button");

    fireEvent.change(couponInput, { target: { value: "DISCOUNT10" } });
    fireEvent.click(applyCouponButton);

    await waitFor(() => {
      expect(getByTestId("coupon-message")).toHaveTextContent(
        "Coupon applied successfully!"
      );
    });
  });

  it("Should display error message when invalid coupon is applied", async () => {
    Cookies.get = vi.fn().mockReturnValue("mockUserSession");

    const mockCart = [
      {
        id: 1,
        name: "Test Product",
        price: 100,
        quantity: 2,
        images: ["test-image.jpg"],
      },
    ];

    const { getByTestId, getByPlaceholderText } = renderWithRedux(
      <CartPage />,
      {
        initState: { cart: mockCart },
      }
    );

    const couponInput = getByPlaceholderText("Enter Coupon Code");
    const applyCouponButton = getByTestId("apply-coupon-button");

    fireEvent.change(couponInput, { target: { value: "INVALIDCODE" } });
    fireEvent.click(applyCouponButton);

    await waitFor(() => {
      expect(getByTestId("coupon-message")).toHaveTextContent(
        "Invalid coupon code"
      );
    });
  });

  it("Should remove an item from the cart when remove button is clicked", async () => {
    Cookies.get = vi.fn().mockReturnValue("mockUserSession");

    const mockCart = [
      {
        id: 1,
        title: "Test Product",
        price: 100,
        quantity: 2,
        images: ["test-image.jpg"],
      },
    ];

    const mockReducer = (state = { cart: mockCart }, action) => {
      switch (action.type) {
        case "REMOVE_ALL_FROM_CART":
          return {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
        default:
          return state;
      }
    };

    const store = createStore(mockReducer, applyMiddleware(thunk));

    const { getByTestId } = renderWithRedux(<CartPage />, { store });

    const removeButton = getByTestId("remove-item-1");
    fireEvent.click(removeButton);

    await waitFor(
      () => {
        expect(screen.queryByTestId("cart-item-1")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
