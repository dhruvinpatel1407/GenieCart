import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../setup/store/reducers/reducer";
import FilterList from "../pages/dashboard/components/products/components/Filter";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

const renderWithRedux = (
  component,
  { initState, store = createStore(reducer, initState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const initState = {
  AllItemsData2: {
    electronics: {
      mobiles: {
        products: [
          {
            id: 1,
            title: "Product 1",
            price: 50,
            rating: 4,
            category: "mobiles",
          },
          {
            id: 2,
            title: "Product 2",
            price: 100,
            rating: 5,
            category: "mobiles",
          },
          {
            id: 3,
            title: "Product 3",
            price: 30,
            rating: 3,
            category: "mobiles",
          },
        ],
      },
    },
    fashion: {
      clothing: {
        products: [
          {
            id: 4,
            title: "Product 4",
            price: 80,
            rating: 2,
            category: "clothing",
          },
          {
            id: 5,
            title: "Product 5",
            price: 120,
            rating: 4,
            category: "clothing",
          },
        ],
      },
    },
  },
};

describe("FilterList Component", () => {
  it("should render product list", async () => {
    const mockState = {
      cart: [{ id: 1, title: "Item 1", quantity: 3 }],
      AllItemsData2: {
        mobiles: {
          products: [
            {
              id: 1,
              title: "Product 1",
              price: 100,
              rating: 4.5,
              images: ["image.jpg"],
            },
          ],
        },
        laptops: {
          products: [
            {
              id: 2,
              title: "Product 2",
              price: 500,
              rating: 4.7,
              images: ["image.jpg"],
            },
          ],
        },
      },
    };

    renderWithRedux(
      <MemoryRouter>
        <FilterList
          allProducts={mockState.AllItemsData2}
          dataTestid="product-list"
        />
      </MemoryRouter>,
      { initState: mockState }
    );

    await waitFor(() => {
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  });

  it("should display a message if no products are found based on the selected filters", async () => {
    const noMatchingState = {
      AllItemsData2: {
        electronics: {
          mobiles: {
            products: [],
          },
        },
      },
    };

    renderWithRedux(
      <FilterList
        allProducts={noMatchingState.AllItemsData2}
        dataTestid="product-list"
      />,
      { initState: noMatchingState }
    );

    await waitFor(() => {
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    expect(
      screen.getByText("No products found based on selected filters")
    ).toBeInTheDocument();
  });

  it("should toggle filter visibility when clicking the filter button", async () => {
    renderWithRedux(
      <FilterList
        allProducts={initState.AllItemsData2}
        dataTestid="product-list"
      />,
      { initState: initState }
    );

    fireEvent.click(screen.getByText("Apply Filter"));
    await waitFor(() => {
      expect(screen.getByText("Filters")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Close"));
    await waitFor(() => {
      expect(screen.queryByText("Filters")).toBeNull();
    });
  });
});
