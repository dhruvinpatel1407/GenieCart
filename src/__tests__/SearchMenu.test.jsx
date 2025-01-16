import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "../setup/store/reducers/reducer";
import SearchButton from "../components/header/component/SearchMenu";
import { vi, describe, it, expect, afterEach } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { thunk } from "redux-thunk";

afterEach(cleanup);

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

const initialState = {
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

describe("SearchButton Component", () => {
  it("should render the search button", async () => {
    renderWithRedux(
      <SearchButton onSearch={() => {}} dataTestId="search-button" />,
      { initialState }
    );

    await waitFor(() => {
      expect(screen.getByTestId("search-button")).toBeInTheDocument();
    });
  });

  it("should show the search input when clicking the search button", async () => {
    renderWithRedux(
      <SearchButton onSearch={() => {}} dataTestId="search-button" />,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("search-button"));

    expect(screen.getByTestId("search-menu")).toBeInTheDocument();
  });

  it("should filter products based on search term", async () => {
    renderWithRedux(
      <MemoryRouter>
        <SearchButton onSearch={() => {}} dataTestId="search-button" />
      </MemoryRouter>,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("search-button"));

    fireEvent.change(screen.getByTestId("search-menu"), {
      target: { value: "Product 1" },
    });

    await waitFor(
      () => {
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.queryByText("Product 2")).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  it("should hide the search input when clicking the close button", async () => {
    renderWithRedux(
      <SearchButton onSearch={() => {}} dataTestId="search-button" />,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("search-button"));

    expect(screen.getByTestId("search-menu")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close search input"));

    expect(screen.queryByTestId("search-menu")).toBeNull();
  });

  it("should display filtered products when typing in the search box", async () => {
    const mockOnSearch = vi.fn();
    renderWithRedux(
      <BrowserRouter>
        <SearchButton onSearch={mockOnSearch} dataTestId="search-button" />
      </BrowserRouter>,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("search-button"));

    fireEvent.change(screen.getByTestId("search-menu"), {
      target: { value: "Product 2" },
    });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith([
        {
          id: 2,
          title: "Product 2",
          price: 100,
          rating: 5,
          category: "mobiles",
        },
      ]);
    });
  });

  it("should close the search menu if clicked outside", async () => {
    renderWithRedux(
      <SearchButton onSearch={() => {}} dataTestId="search-button" />,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("search-button"));

    expect(screen.getByTestId("search-menu")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByTestId("search-menu")).toBeNull();
    });
  });

  it("should show no results message when no products match the search term", async () => {
    renderWithRedux(
      <SearchButton onSearch={() => {}} dataTestId="search-button" />,
      { initialState }
    );

    fireEvent.click(screen.getByTestId("search-button"));

    fireEvent.change(screen.getByTestId("search-menu"), {
      target: { value: "Nonexistent Product" },
    });

    await waitFor(() => {
      expect(screen.getByText("No products found")).toBeInTheDocument();
    });
  });
});
