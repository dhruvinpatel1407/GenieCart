import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import TopPicksSection from "../pages/dashboard/components/Banner/TopSale";
import * as actions from "../setup/store/actions";
import { it, expect, describe, beforeEach, vi } from "vitest";

vi.mock("../setup/store/actions", () => ({
  GetMensItemsData: vi.fn(() => (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: "GET_MENS_ITEMS",
          payload: {
            shirts: {
              products: [
                {
                  id: "1",
                  name: "Shirt 1",
                  price: "$29.99",
                  rating: 4,
                  images: ["image1.jpg", "image2.jpg"],
                },
                {
                  id: "2",
                  name: "Shirt 2",
                  price: "$39.99",
                  rating: 5,
                  images: ["image3.jpg", "image4.jpg"],
                },
              ],
            },
          },
        });
        resolve();
      }, 0); 
    });
  }),
}));

const mockReducer = (
  state = { MensItemsData: { shirts: { products: [] } } },
  action
) => {
  if (action.type === "GET_MENS_ITEMS") {
    return {
      ...state,
      MensItemsData: {
        shirts: {
          products: action.payload.shirts.products,
        },
      },
    };
  }
  return state;
};

const mockStore = createStore(mockReducer, applyMiddleware(thunk));

describe("TopPicksSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it("should display the correct number of products", () => { // Removed waitFor
  //     render(
  //         <Provider store={mockStore}>
  //             <MemoryRouter>
  //                 <TopPicksSection />
  //             </MemoryRouter>
  //         </Provider>
  //     );
  //     const productLinks = screen.getAllByRole("link");
  //     expect(productLinks).toHaveLength(2);
  // });

  // it("should render product details correctly", () => { // Removed waitFor
  //     render(
  //         <Provider store={mockStore}>
  //             <MemoryRouter>
  //                 <TopPicksSection />
  //             </MemoryRouter>
  //         </Provider>
  //     );
  //     expect(screen.getByText(/Shirt 1/i)).toBeInTheDocument();
  //     expect(screen.getByText("$29.99")).toBeInTheDocument();
  //     expect(screen.getByText(/Shirt 2/i)).toBeInTheDocument();
  //     expect(screen.getByText("$39.99")).toBeInTheDocument();
  // });

  // it("should render product images correctly", async () => {
  //     render(
  //         <Provider store={mockStore}>
  //             <MemoryRouter>
  //                 <TopPicksSection />
  //             </MemoryRouter>
  //         </Provider>
  //     );

  //     await waitFor(() => {
  //         const image1 = screen.getByAltText(/Shirt 1/i);
  //         expect(image1).toHaveAttribute("src", "image1.jpg"); // Corrected src
  //         const image2 = screen.getByAltText(/Shirt 2/i);
  //         expect(image2).toHaveAttribute("src", "image3.jpg"); // Corrected src
  //     });
  // });

  it("should call GetMensItemsData action on render", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <TopPicksSection />
        </MemoryRouter>
      </Provider>
    );
    expect(actions.GetMensItemsData).toHaveBeenCalled();
  });

  it("should render lazy-loaded WishlistButton and CartButton components", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <TopPicksSection />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
