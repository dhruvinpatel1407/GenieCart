import { cleanup, render, waitFor } from "@testing-library/react";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { afterEach, it, expect } from "vitest";
import reducer from "../setup/store/reducers/reducer";
import { Provider } from "react-redux";
import FurnitureItems from "../pages/dashboard/components/products/Decoration";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

const renderWithRedux = (
  component,
  {
    initState,
    store = createStore(reducer, initState, applyMiddleware(thunk)),
  } = {}
) => {
  return render(<Provider store={store}>{component}</Provider>);
};

it("Should have Greetings Data", async () => {
  const { getByTestId } = renderWithRedux(
    <BrowserRouter>
      <FurnitureItems />
    </BrowserRouter>
  );
  console.log(getByTestId);

  await waitFor(
    () => {
      expect(getByTestId("Greeting")).toHaveTextContent(
        "Welcome to the Decoration Items Section"
      );
    },
    { timeout: 5000 }
  );
});
