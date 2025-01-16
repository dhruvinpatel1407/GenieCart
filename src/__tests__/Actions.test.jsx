import { describe, it, expect, vi } from 'vitest';
import * as actions from '../setup/store/actions/index';
import * as actionTypes from '../setup/store/actiontypes';
import { waitFor } from "@testing-library/react";

describe('Action Creators', () => {
  
  it('should fetch Groceries data from real API and create GetGroceriesData action', async () => {
    const mockDispatch = vi.fn();
    const response = await fetch("https://dummyjson.com/products/category/groceries");
    const mockData = await response.json();
    await actions.GetGroceriesData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_GROCERIES,
        payload: { Groceries: mockData },
      });
    }, { timeout: 3000 });
  });

  it('should fetch Accessories data from real API and create GetAccessoriesData action', async () => {
    const mockDispatch = vi.fn();
    const response1 = await fetch("https://dummyjson.com/products/category/sports-accessories");
    const response2 = await fetch("https://dummyjson.com/products/category/sunglasses");
    const mockData1 = await response1.json();
    const mockData2 = await response2.json();
    await actions.GetAccessoriesData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_SPORT_ITEMS,
        payload: {
          Sunglasses: mockData2,
          SportAccessories: mockData1,
        },
      });
    }, { timeout: 3000 });
  });

  it('should fetch Furniture data from real API and create GetFurnitureData action', async () => {
    const mockDispatch = vi.fn();
    const response1 = await fetch("https://dummyjson.com/products/category/furniture");
    const response2 = await fetch("https://dummyjson.com/products/category/home-decoration");
    const response3 = await fetch("https://dummyjson.com/products/category/kitchen-accessories");
    const mockData1 = await response1.json();
    const mockData2 = await response2.json();
    const mockData3 = await response3.json();
    await actions.GetFurnitureData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_FURNITURE,
        payload: {
          Furniture: mockData1,
          HomeDecorarion: mockData2,
          KitchenAccessories: mockData3,
        },
      });
    }, { timeout: 3000 });
  });

  it('should fetch Electronics data from real API and create GetElectronicsData action', async () => {
    const mockDispatch = vi.fn();
    const response1 = await fetch("https://dummyjson.com/products/category/laptops");
    const response2 = await fetch("https://dummyjson.com/products/category/smartphones");
    const response3 = await fetch("https://dummyjson.com/products/category/tablets");
    const response4 = await fetch("https://dummyjson.com/products/category/mobile-accessories");
    const mockData1 = await response1.json();
    const mockData2 = await response2.json();
    const mockData3 = await response3.json();
    const mockData4 = await response4.json();
    await actions.GetElectronicsData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_ELECTRONICS,
        payload: {
          Laptops: mockData1,
          SmartPhones: mockData2,
          Tablets: mockData3,
          Mobile_Accessories: mockData4,
        },
      });
    }, { timeout: 3000 });
  });

  it('should fetch Mens Items data from real API and create GetMensItemsData action', async () => {
    const mockDispatch = vi.fn();
    const response1 = await fetch("https://dummyjson.com/products/category/mens-shirts");
    const response2 = await fetch("https://dummyjson.com/products/category/mens-shoes");
    const response3 = await fetch("https://dummyjson.com/products/category/mens-watches");
    const mockData1 = await response1.json();
    const mockData2 = await response2.json();
    const mockData3 = await response3.json();
    await actions.GetMensItemsData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_MENS_ITEMS,
        payload: {
          shirts: mockData1,
          shoes: mockData2,
          watches: mockData3,
        },
      });
    }, { timeout: 3000 });
  });

  it('should fetch Womens Items data from real API and create GetWomensItemsData action', async () => {
    const mockDispatch = vi.fn();
    const response1 = await fetch("https://dummyjson.com/products/category/womens-dresses");
    const response2 = await fetch("https://dummyjson.com/products/category/Womens-shoes");
    const response3 = await fetch("https://dummyjson.com/products/category/Womens-watches");
    const response4 = await fetch("https://dummyjson.com/products/category/Womens-bags");
    const response5 = await fetch("https://dummyjson.com/products/category/Womens-jewellery");
    const response6 = await fetch("https://dummyjson.com/products/category/beauty");
    const response7 = await fetch("https://dummyjson.com/products/category/fragrances");
    const response8 = await fetch("https://dummyjson.com/products/category/skin-care");
    const mockData1 = await response1.json();
    const mockData2 = await response2.json();
    const mockData3 = await response3.json();
    const mockData4 = await response4.json();
    const mockData5 = await response5.json();
    const mockData6 = await response6.json();
    const mockData7 = await response7.json();
    const mockData8 = await response8.json();
    await actions.GetWomensItemsData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_WOMENS_ITEMS,
        payload: {
          Dresses: mockData1,
          shoes: mockData2,
          watches: mockData3,
          Bags: mockData4,
          Jewellery: mockData5,
          Beauty: mockData6,
          Fragrances: mockData7,
          Skin_Care: mockData8,
        },
      });
    }, { timeout: 8000 });
  });

  it('should handle errors in GetGroceriesData when the real API call fails', async () => {
    const mockDispatch = vi.fn();
    const mockError = new Error('Failed to fetch data from API');

    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn().mockRejectedValueOnce(mockError);

    await actions.GetGroceriesData()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: actionTypes.GET_ERROR,
        payload: mockError.message,
      });
    }, { timeout: 3000 });

    globalThis.fetch = originalFetch;
  });

  it('should create an addToWishlist action', () => {
    const product = { id: 1, name: 'Product 1' };
    const action = actions.addToWishlist(product);
    expect(action).toEqual({
      type: actionTypes.ADD_TO_WISHLIST,
      payload: product,
    });
  });

  it('should create a removeFromWishlist action', () => {
    const productId = 1;
    const action = actions.removeFromWishlist(productId);
    expect(action).toEqual({
      type: actionTypes.REMOVE_FROM_WISHLIST,
      payload: productId,
    });
  });

  it('should create an addToCart action', () => {
    const product = { id: 1, name: 'Product 1' };
    const action = actions.addToCart(product);
    expect(action).toEqual({
      type: actionTypes.ADD_TO_CART,
      payload: product,
    });
  });

  it('should create a removeFromCart action', () => {
    const productId = 1;
    const action = actions.removeFromCart(productId);
    expect(action).toEqual({
      type: actionTypes.REMOVE_FROM_CART,
      payload: productId,
    });
  });

  it('should create a removeAllFromCart action', () => {
    const productId = 1;
    const action = actions.removeAllFromCart(productId);
    expect(action).toEqual({
      type: actionTypes.REMOVEALL_FROM_CART,
      payload: productId,
    });
  });

  it('should create an adduser action', () => {
    const user = { id: 1, name: 'John Doe' };
    const action = actions.adduser(user);
    expect(action).toEqual({
      type: actionTypes.ADD_USER,
      payload: user,
    });
  });
});
