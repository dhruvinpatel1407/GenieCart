# GenieCart - E-Commerce Frontend Capstone Project

**GenieCart** is a fully responsive, modern e-commerce platform built using **React** and powered by **Vite**. It includes key e-commerce features such as a shopping cart, wishlist, product display, product details page, login/signup, and error boundary handling. The project is designed to provide a seamless user experience and is optimized for performance.

---

## 🚀 Features

- **Product Display**: View a list of products with images, prices, and descriptions.
- **Product Detail Page**: A detailed page for each product showing additional information and options.
- **Shopping Cart**: Add products to the cart, view, update quantities, and proceed to checkout.
- **Wishlist**: Save products to a wishlist for future purchase.
- **Login/Signup**: User authentication system for signing up and logging in.
- **Error Boundary**: Catch and handle errors gracefully, providing a fallback UI.
- **Responsive Design**: The application is fully responsive and works across mobile, tablet, and desktop devices.

---

## 🛠 Tech Stack

- **Frontend**: React, Vite
- **State Management**: Redux, Redux-Thunk, Redux-Persist
- **Styling**: TailwindCSS for utility-first CSS styling
- **Icons**: React Icons for various UI icons
- **Routing**: React Router for seamless navigation
- **Loader**: React Loader Spinner for loading states
- **Testing**: Vitest and React Testing Library
- **Error Boundary**: Custom error boundary component for catching errors

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v18.x or higher)
- **npm** or **yarn** (npm is recommended)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/geniecart.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd geniecart
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

    This will start the development server at `http://localhost:3000`.

---

## ⚡️ Available Scripts

In the project directory, you can run the following commands:

- **Development Mode**: 
    ```bash
    npm run dev
    ```

    Starts the development server and opens the app in your default browser.

- **Build for Production**: 
    ```bash
    npm run build
    ```

    Builds the app for production to the `dist/` folder.

- **Preview Production Build**: 
    ```bash
    npm run preview
    ```

    Preview the production build locally after building.

- **Run Linter**: 
    ```bash
    npm run lint
    ```

    Runs ESLint to check for linting errors across your codebase.

- **Run Tests**: 
    ```bash
    npm run test
    ```

    Runs the test suite using Vitest.

---

## 🛒 Usage

### Cart Functionality

- Users can **add items** to the cart, **update quantities**, and **remove products**.
- The **cart data persists** even after a page reload, thanks to **Redux-Persist**.

### Wishlist

- Users can **save products** in their wishlist to revisit later.

### Product Display

- The homepage displays products with images, titles, and prices. Clicking on a product redirects to its detailed page.

### Product Detail Page

- The **product detail page** provides more information, including descriptions, reviews, and related products.

### Login and Signup

- Users can **register** and **log in** using the provided forms. Authentication is managed through **React state**.

### Error Boundary

- The **ErrorBoundary** component catches any errors within the app and displays a fallback UI to prevent crashes.

---

## 🧪 Testing

The project includes unit tests for major components and functionality using **Vitest** and **React Testing Library**.

### Running Tests

To run the tests, use:

```bash
npm run test
