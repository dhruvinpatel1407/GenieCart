import * as actions from "../actiontypes";

// Reusable function to fetch data from multiple URLs
export const fetchDataFromUrls = async (urls) => {
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));

    // Check for any failed responses
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    });

    // Fetch and return the JSON data from each response
    return await Promise.all(responses.map((response) => response.json()));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// export default fetchDataFromUrls;

// Action to fetch Groceries data
export const GetGroceriesData = () => async (dispatch) => {
  try {
    const data = await fetchDataFromUrls([
      "https://dummyjson.com/products/category/groceries",
    ]);
    // console.log(data[0].products);
    dispatch({
      type: actions.GET_GROCERIES,
      payload: { Groceries: data[0] },
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
}; 

// Action to fetch Accessories data
export const GetAccessoriesData = () => async (dispatch) => {
  try {
    const data = await fetchDataFromUrls([
      "https://dummyjson.com/products/category/sports-accessories",
      "https://dummyjson.com/products/category/sunglasses",
    ]);
    dispatch({
      type: actions.GET_SPORT_ITEMS,
      payload: {
        Sunglasses: data[1],
        SportAccessories: data[0],
      },
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
};

// Action to fetch Furniture data
export const GetFurnitureData = () => async (dispatch) => {
  try {
    const data = await fetchDataFromUrls([
      "https://dummyjson.com/products/category/furniture",
      "https://dummyjson.com/products/category/home-decoration",
      "https://dummyjson.com/products/category/kitchen-accessories",
    ]);
    dispatch({
      type: actions.GET_FURNITURE,
      payload: {
        Furniture: data[0],
        HomeDecorarion: data[1],
        KitchenAccessories: data[2],
      },
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
};

// Action to fetch Electronics data
export const GetElectronicsData = () => async (dispatch) => {
  try {
    const data = await fetchDataFromUrls([
      "https://dummyjson.com/products/category/laptops",
      "https://dummyjson.com/products/category/smartphones",
      "https://dummyjson.com/products/category/tablets",
      "https://dummyjson.com/products/category/mobile-accessories",
    ]);
    dispatch({
      type: actions.GET_ELECTRONICS,
      payload: {
        Laptops: data[0],
        SmartPhones: data[1],
        Tablets: data[2],
        Mobile_Accessories: data[3],
      },
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
};

// Action to fetch Men's Items data
export const GetMensItemsData = () => async (dispatch) => {
  try {
    const data = await fetchDataFromUrls([
      "https://dummyjson.com/products/category/mens-shirts",
      "https://dummyjson.com/products/category/mens-shoes",
      "https://dummyjson.com/products/category/mens-watches",
    ]);
    dispatch({
      type: actions.GET_MENS_ITEMS,
      payload: {
        shirts: data[0],
        shoes: data[1],
        watches: data[2],
      },
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
};

// Action to fetch Women's Items data
export const GetWomensItemsData = () => async (dispatch) => {
  try {
    const data = await fetchDataFromUrls([
      "https://dummyjson.com/products/category/womens-dresses",
      "https://dummyjson.com/products/category/Womens-shoes",
      "https://dummyjson.com/products/category/Womens-watches",
      "https://dummyjson.com/products/category/Womens-bags",
      "https://dummyjson.com/products/category/Womens-jewellery",
      "https://dummyjson.com/products/category/beauty",
      "https://dummyjson.com/products/category/fragrances",
      "https://dummyjson.com/products/category/skin-care",
    ]);
    dispatch({
      type: actions.GET_WOMENS_ITEMS,
      payload: {
        Dresses: data[0],
        shoes: data[1],
        watches: data[2],
        Bags: data[3],
        Jewellery: data[4],
        Beauty: data[5],
        Fragrances: data[6],
        Skin_Care: data[7],
      },
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
};

// Reusable action for adding/removing from wishlist or cart
export const addToWishlist = (product) => ({
  type: actions.ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (productId) => ({
  type: actions.REMOVE_FROM_WISHLIST,
  payload: productId,
});

export const addToCart = (product) => ({
  type: actions.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: actions.REMOVE_FROM_CART,
  payload: productId,
});

export const removeAllFromCart = (productId) => ({
  type: actions.REMOVEALL_FROM_CART,
  payload: productId,
});

// Action to add user data
export const adduser = (user) => ({
  type: actions.ADD_USER,
  payload: user,
});

// Fetch all data from multiple categories
export const fetchAllData = () => async (dispatch) => {
  try {
    const urls = [
      "https://dummyjson.com/products/category/groceries",
      "https://dummyjson.com/products/category/laptops",
      "https://dummyjson.com/products/category/smartphones",
      "https://dummyjson.com/products/category/tablets",
      "https://dummyjson.com/products/category/mobile-accessories",
      "https://dummyjson.com/products/category/furniture",
      "https://dummyjson.com/products/category/home-decoration",
      "https://dummyjson.com/products/category/kitchen-accessories",
      "https://dummyjson.com/products/category/sports-accessories",
      "https://dummyjson.com/products/category/sunglasses",
      "https://dummyjson.com/products/category/mens-shirts",
      "https://dummyjson.com/products/category/mens-shoes",
      "https://dummyjson.com/products/category/mens-watches",
      "https://dummyjson.com/products/category/womens-dresses",
      "https://dummyjson.com/products/category/Womens-shoes",
      "https://dummyjson.com/products/category/Womens-watches",
      "https://dummyjson.com/products/category/Womens-bags",
      "https://dummyjson.com/products/category/Womens-jewellery",
      "https://dummyjson.com/products/category/beauty",
      "https://dummyjson.com/products/category/fragrances",
      "https://dummyjson.com/products/category/skin-care",
    ];

    const data = await fetchDataFromUrls(urls);
    dispatch({
      type: actions.FETCH_ALL_ITEMS,
      payload: data.flat(), // Combine all category data into a single array
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERROR,
      payload: error.message,
    });
  }
};
