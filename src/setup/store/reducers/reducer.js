import * as actions from "../actiontypes";

// Initial state with structured data for each category and other entities
export const initState = {
  error: null,
  GroceriesData: [],
  ElectronicsData: [],
  SportData: [],
  FurnitureData: [],
  MensItemsData: [],
  WomensItemsData: [],
  WishList: [],
  cart: [],
  User: [],
  AllItemsData2: [],  // Stores all items fetched from all categories
};

// Reducer function to handle various actions
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.GET_ELECTRONICS:
      return { ...state, ElectronicsData: action.payload };

    case actions.GET_GROCERIES:
      return { ...state, GroceriesData: action.payload };

    case actions.GET_SPORT_ITEMS:
      return { ...state, SportData: action.payload };

    case actions.GET_FURNITURE:
      return { ...state, FurnitureData: action.payload };

    case actions.GET_MENS_ITEMS:
      return { ...state, MensItemsData: action.payload };

    case actions.GET_WOMENS_ITEMS:
      return { ...state, WomensItemsData: action.payload };

    // Add to wishlist, avoiding duplicates based on product ID 
    case actions.ADD_TO_WISHLIST:{
      const itemExistsInWishlist = state.WishList.some(
        (item) => item.id === action.payload.id
      );
     if (!itemExistsInWishlist) {
        return { ...state, WishList: [...state.WishList, action.payload] };
      }
      return state; } 
 
    // Remove from wishlist
    case actions.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        WishList: state.WishList.filter((item) => item.id !== action.payload),
      };

    // Add to cart with quantity management
    case actions.ADD_TO_CART: {
      const existingProductInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProductInCart) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      } }

    // Remove from cart with quantity management
    case actions.REMOVE_FROM_CART:{
      const productInCart = state.cart.find((item) => item.id === action.payload);
      if (productInCart.quantity > 1) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      }}

    // Remove all instances of a product from the cart
    case actions.REMOVEALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    // Add user to the User state
    case actions.ADD_USER:
      return {
        ...state,
        User: [...state.User, action.payload], 
      };

    // Store combined data from all categories
    case actions.FETCH_ALL_ITEMS:
      return {
        ...state,
        AllItemsData2: action.payload,
      };

    // Handle errors
    case actions.GET_ERROR:
      return { ...state, error: action.payload };

    // Default case to return unchanged state
    default:
      return state;
  }
};

export default reducer;
 