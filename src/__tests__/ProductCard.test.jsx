import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { describe, it, expect } from "vitest";
import ProductList from "../pages/dashboard/components/products/components/ProductCard";

const mockReducer = (state = { WishList: [], cart: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const mockStore = createStore(mockReducer);

describe("ProductList", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Product 1",
      price: "10.00",
      rating: 4,
      images: ["image1.jpg"],
      category: "furniture",
    },
    {
      id: 2,
      title: "Product 2",
      price: "20.00",
      rating: 3,
      images: ["image2.jpg"],
      category: "furniture",
    },
    {
      id: 3,
      title: "Product 3",
      price: "30.00",
      rating: 5,
      images: ["image3.jpg"],
      category: "furniture",
    },
    {
      id: 4,
      title: "Product 4",
      price: "40.00",
      rating: 2,
      images: ["image4.jpg"],
      category: "furniture",
    },
    {
      id: 5,
      title: "Product 5",
      price: "50.00",
      rating: 1,
      images: ["image5.jpg"],
      category: "furniture",
    },
    {
      id: 6,
      title: "Product 6",
      price: "60.00",
      rating: 5,
      images: ["image6.jpg"],
      category: "furniture",
    },
    {
      id: 7,
      title: "Product 7",
      price: "70.00",
      rating: 4,
      images: ["image7.jpg"],
      category: "furniture",
    },
    {
      id: 8,
      title: "Product 8",
      price: "80.00",
      rating: 3,
      images: ["image8.jpg"],
      category: "furniture",
    },
    {
      id: 9,
      title: "Product 9",
      price: "90.00",
      rating: 4,
      images: ["image9.jpg"],
      category: "furniture",
    },
    {
      id: 10,
      title: "Product 10",
      price: "100.00",
      rating: 5,
      images: ["image10.jpg"],
      category: "furniture",
    },
    {
      id: 11,
      title: "Product 11",
      price: "100.00",
      rating: 5,
      images: ["image11.jpg"],
      category: "furniture",
    },
    {
      id: 12,
      title: "Product 12",
      price: "100.00",
      rating: 5,
      images: ["image12.jpg"],
      category: "furniture",
    },
    {
      id: 13,
      title: "Product 13",
      price: "100.00",
      rating: 5,
      images: ["image13.jpg"],
      category: "furniture",
    },
    {
      id: 14,
      title: "Product 14",
      price: "100.00",
      rating: 5,
      images: ["image14.jpg"],
      category: "furniture",
    },
    {
      id: 15,
      title: "Product 15",
      price: "100.00",
      rating: 5,
      images: ["image15.jpg"],
      category: "furniture",
    },
    {
      id: 16,
      title: "Product 16",
      price: "100.00",
      rating: 5,
      images: ["image16.jpg"],
      category: "furniture",
    },
    {
      id: 17,
      title: "Product 17",
      price: "100.00",
      rating: 5,
      images: ["image17.jpg"],
      category: "furniture",
    },
  ];

  it("should render the product list correctly", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductList products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("$10.00")).toBeInTheDocument();

        expect(screen.getByRole("navigation")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("should paginate products correctly", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductList products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 16")).toBeNull();

    fireEvent.click(screen.getByTestId("next-btn"));

    expect(screen.queryByText("Product 1")).toBeNull();
    expect(screen.getByText("Product 16")).toBeInTheDocument();
  });

  it("should render the wishlist and cart buttons", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductList products={mockProducts} />
        </MemoryRouter>
      </Provider>
    );

    const wishlistButton = screen.getAllByTestId("wishlist-cart-btn");

    expect(wishlistButton[0]).toBeInTheDocument();
  });
});
