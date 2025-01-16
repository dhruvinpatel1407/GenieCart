
import Router from "./setup/routes-manager";
import ErrorBoundary from "./setup/Error Boundary";
function App() {
  return (
    <>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  );
}

export default App;
