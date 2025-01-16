import React, { Suspense, useEffect  } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../components/header";
import Footer from "../../components/footer";
import { Circles } from "react-loader-spinner";
import PropTypes from 'prop-types';

// Lazy Loaded Components
const Dashboard = React.lazy(() => import("../../pages/dashboard"));
const Wishlist = React.lazy(() => import("../../pages/wishlist"));
const Cart = React.lazy(() => import("../../pages/cart-page"));
const SignupForm = React.lazy(() => import("../../pages/sign-up"));
const Formlogin = React.lazy(() => import("../../pages/sign-in"));
const ProductPage = React.lazy(() => import("../../pages/product-detail-page"));
const NotFoundPage = React.lazy(() => import("../Not Found"));

// Lazy Loaded Subcategories
const MenSection = React.lazy(() =>
  import("../../pages/dashboard/components/products/MenSection")
);
const WomenSection = React.lazy(() =>
  import("../../pages/dashboard/components/products/WomenSection")
);
const SportAccessories = React.lazy(() =>
  import("../../pages/dashboard/components/products/Sport")
);
const Electronics = React.lazy(() =>
  import("../../pages/dashboard/components/products/Electronics")
);
const Groceries = React.lazy(() =>
  import("../../pages/dashboard/components/products/Groceries")
);
const FurnitureItems = React.lazy(() =>
  import("../../pages/dashboard/components/products/Decoration")
);

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [location]); 

  return null; 
};

const Layout = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  const hideHeaderFooter = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node, 
};

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="text-center">
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="product/men-section" element={<MenSection />} />
            <Route path="product/women-section" element={<WomenSection />} />
            <Route
              path="product/sport-section"
              element={<SportAccessories />}
            />
            <Route path="product/electronics" element={<Electronics />} />
            <Route path="product/groceries" element={<Groceries />} />
            <Route path="product/decoration" element={<FurnitureItems />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Formlogin />} />
            <Route path="/product/:category/:id" element={<ProductPage />} />

            {/* Handle unavailable routes */}
            <Route path="*" element={<Navigate to="/not-found" replace />} />

            {/* Fallback Not Found Page */}
            <Route path="/not-found" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
