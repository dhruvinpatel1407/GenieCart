import reducer, { initState } from "../setup/store/reducers/reducer";
import * as actions from "../setup/store/actiontypes";
import { describe, it, expect } from "vitest";

describe("Reducer Tests", () => {
  it("should return the initial state", () => {
    const action = { type: "UNKNOWN" };
    const state = reducer(undefined, action);
    expect(state).toEqual(initState);
  });

  it("should handle GET_ELECTRONICS action", () => {
    const action = {
      type: actions.GET_ELECTRONICS,
      payload: [{ id: 1, name: "Electronics Item" }],
    };
    const state = reducer(initState, action);
    expect(state.ElectronicsData).toEqual(action.payload);
  });

  it("should handle GET_GROCERIES action", () => {
    const action = {
      type: actions.GET_GROCERIES,
      payload: [{ id: 2, name: "Grocery Item" }],
    };
    const state = reducer(initState, action);
    expect(state.GroceriesData).toEqual(action.payload);
  });

  it("should handle GET_SPORT_ITEMS action", () => {
    const action = {
      type: actions.GET_SPORT_ITEMS,
      payload: [{ id: 3, name: "Sport Item" }],
    };
    const state = reducer(initState, action);
    expect(state.SportData).toEqual(action.payload);
  });

  it("should handle GET_MENS_ITEMS action", () => {
    const action = {
      type: actions.GET_MENS_ITEMS,
      payload: [{ id: 1, name: "Men's Shirt" }],
    };
    const state = reducer(initState, action);
    expect(state.MensItemsData).toEqual(action.payload);
  });

  it("should handle GET_WOMENS_ITEMS action", () => {
    const action = {
      type: actions.GET_WOMENS_ITEMS,
      payload: [{ id: 2, name: "Women's Dress" }],
    };
    const state = reducer(initState, action);
    expect(state.WomensItemsData).toEqual(action.payload);
  });

  it("should handle GET_FURNITURE action", () => {
    const action = {
      type: actions.GET_FURNITURE,
      payload: [{ id: 3, name: "Wooden Table" }],
    };
    const state = reducer(initState, action);
    expect(state.FurnitureData).toEqual(action.payload);
  });

  it("should handle ADD_TO_WISHLIST action", () => {
    const action = {
      type: actions.ADD_TO_WISHLIST,
      payload: { id: 1, name: "Product 1" },
    };

    const state = reducer(initState, action);
    expect(state.WishList).toEqual([action.payload]);
  });

  it("should not add duplicate item to the wishlist", () => {
    const existingState = {
      ...initState,
      WishList: [{ id: 1, name: "Product 1" }],
    };

    const action = {
      type: actions.ADD_TO_WISHLIST,
      payload: { id: 1, name: "Product 1" },
    };

    const state = reducer(existingState, action);
    expect(state.WishList).toEqual([{ id: 1, name: "Product 1" }]);
  });

  it("should handle REMOVE_FROM_WISHLIST action", () => {
    const existingState = {
      ...initState,
      WishList: [{ id: 1, name: "Product 1" }],
    };

    const action = {
      type: actions.REMOVE_FROM_WISHLIST,
      payload: 1,
    };

    const state = reducer(existingState, action);
    expect(state.WishList).toEqual([]);
  });

  it("should handle ADD_TO_CART action", () => {
    const action = {
      type: actions.ADD_TO_CART,
      payload: { id: 1, name: "Product 1", price: 100 },
    };

    const state = reducer(initState, action);
    expect(state.cart).toEqual([{ ...action.payload, quantity: 1 }]);
  });

  it("should increase quantity if the product is already in the cart", () => {
    const existingState = {
      ...initState,
      cart: [{ id: 1, name: "Product 1", price: 100, quantity: 1 }],
    };

    const action = {
      type: actions.ADD_TO_CART,
      payload: { id: 1, name: "Product 1", price: 100 },
    };

    const state = reducer(existingState, action);
    expect(state.cart).toEqual([
      { id: 1, name: "Product 1", price: 100, quantity: 2 },
    ]);
  });

  it("should handle REMOVE_FROM_CART action", () => {
    const existingState = {
      ...initState,
      cart: [{ id: 1, name: "Product 1", price: 100, quantity: 2 }],
    };

    const action = {
      type: actions.REMOVE_FROM_CART,
      payload: 1,
    };

    const state = reducer(existingState, action);
    expect(state.cart).toEqual([
      { id: 1, name: "Product 1", price: 100, quantity: 1 },
    ]);
  });

  it("should remove the product from the cart if quantity is 1", () => {
    const existingState = {
      ...initState,
      cart: [{ id: 1, name: "Product 1", price: 100, quantity: 1 }],
    };

    const action = {
      type: actions.REMOVE_FROM_CART,
      payload: 1,
    };

    const state = reducer(existingState, action);
    expect(state.cart).toEqual([]);
  });

  it("should handle REMOVEALL_FROM_CART action", () => {
    const existingState = {
      ...initState,
      cart: [{ id: 1, name: "Product 1", price: 100 }],
    };

    const action = {
      type: actions.REMOVEALL_FROM_CART,
      payload: 1,
    };

    const state = reducer(existingState, action);
    expect(state.cart).toEqual([]);
  });

  it("should handle ADD_USER action", () => {
    const action = {
      type: actions.ADD_USER,
      payload: { id: 1, name: "John Doe" },
    };

    const state = reducer(initState, action);
    expect(state.User).toEqual([action.payload]);
  });

  it("should handle FETCH_ALL_ITEMS action", () => {
    const action = {
      type: actions.FETCH_ALL_ITEMS,
      payload: [{ id: 1, name: "All Product" }],
    };

    const state = reducer(initState, action);
    expect(state.AllItemsData2).toEqual(action.payload);
  });

  it("should handle GET_ERROR action", () => {
    const action = {
      type: actions.GET_ERROR,
      payload: "Some error occurred",
    };

    const state = reducer(initState, action);
    expect(state.error).toBe("Some error occurred");
  });
});
