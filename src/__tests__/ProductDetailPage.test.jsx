import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import ProductPage from "../pages/product-detail-page";

const mockReducer = (state = { AllItemsData2: {} }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const mockStore = createStore(mockReducer, {
  AllItemsData2: {
    category: {
      products: [
        {
          id: 1,
          title: "Product 1",
          description: "This is product 1",
          price: "100.00",
          thumbnail: "image1.jpg",
          availabilityStatus: "In Stock",
          rating: 4,
          reviews: [
            { reviewerName: "John Doe", rating: 5, comment: "Great product!" },
          ],
          dimensions: { width: 10, height: 20, depth: 30 },
          weight: 1.5,
          minimumOrderQuantity: 2,
          warrantyInformation: "1 year",
          tags: ["tag1", "tag2"],
          shippingInformation: "Free shipping",
        },
      ],
    },
  },
});

vi.mock("../dashboard/components/products/components/CartButton", () => ({
  __esModule: true,
  default: () => <div>CartButton</div>,
}));

describe("ProductPage", () => {
  it("should render product details", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();

      expect(screen.getByText("This is product 1")).toBeInTheDocument();

      expect(screen.getByText("$100.00")).toBeInTheDocument();

      expect(screen.getByText("In Stock")).toBeInTheDocument();
    });
  });

  it("should render 'Product Not Found' when product does not exist", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/product/999"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("Not Found")).toBeInTheDocument();
      expect(screen.getByTestId("Message")).toBeInTheDocument();
    });
  });

  it("should display the lazy-loaded CartButton component", async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    });
  });
});
