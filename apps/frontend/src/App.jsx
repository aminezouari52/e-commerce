// HOOKS
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// FIREBASE
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// FUNCTIONS
import { setLoggedInUser } from "./reducers/userReducer";
import { setCart } from "./reducers/cartReducer";
import { getCurrentUser } from "./functions/auth";
import { getLocalStorage } from "./utils";

// COMPONENTS
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, UserLayout, AdminLayout } from "@/components/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/checkout";
import Product from "./pages/Product";
import SubHome from "./pages/sub/SubHome";
import CategoryHome from "./pages/category/CategoryHome";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Wishlist from "./pages/user/Wishlist";
import NotFound from "./components/NotFound";
import UserAccount from "./pages/user/userAccount";
import Orders from "./pages/user/Orders";
import CreateCategory from "./pages/admin/category/CreateCategory";

// const demoAccounts = ["", ""];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        await authUser.reload();

        const idTokenResult = await authUser.getIdTokenResult();
        try {
          const response = await getCurrentUser(idTokenResult.token);
          if (!response.data) {
            throw new Error("User not found or token expired");
          }

          const storedUser = getLocalStorage("user") || response.data;

          // if (
          //   !demoAccounts.includes(storedUser.email) &&
          //   !authUser.emailVerified
          // ) {
          //   throw new Error("Email not verified. Please verify your email.");
          // }

          dispatch(
            setLoggedInUser({ ...storedUser, token: idTokenResult.token }),
          );
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCart(getLocalStorage("cart") || []));
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/checkout" element={<Checkout />} />

        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/user/*" element={<UserLayout />}>
          <Route path="account" element={<UserAccount />} />
          <Route path="orders" element={<Orders />} />
          <Route path="history" element={<History />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="password" element={<Password />} />
          <Route path="*" element={<Navigate to="/user/history" />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="category" element={<CategoryCreate />} />
          <Route path="category/create" element={<CreateCategory />} />
          <Route path="category/:slug" element={<CategoryUpdate />} />
          <Route path="sub" element={<SubCreate />} />
          <Route path="sub/:slug" element={<SubUpdate />} />
          <Route path="products/create" element={<ProductCreate />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:slug" element={<ProductUpdate />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/category/:slug" element={<CategoryHome />} />
        <Route exact path="/sub/:slug" element={<SubHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
