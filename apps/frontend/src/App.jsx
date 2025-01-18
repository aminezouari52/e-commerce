// HOOKS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// FIREBASE
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// FUNCTIONS
import { setUser } from "./reducers/userReducer";
import { setGuestCart, setUserCart } from "./reducers/cartReducer";
import { getCurrentUser } from "./functions/auth";
import { getUserCart, syncUserCart } from "./functions/cart";
import { getLocalStorage, normalizeCart } from "./utils";

// COMPONENTS
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, UserLayout, AdminLayout } from "@/components/layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import CategoryHome from "./pages/CategoryHome";
import SubHome from "./pages/SubHome";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Account from "./pages/user/Account";
import Wishlist from "./pages/user/Wishlist";
import Orders from "./pages/user/Orders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import CreateCategory from "./pages/admin/category/CreateCategory";
import NotFound from "./components/NotFound";

// const demoAccounts = ["", ""];

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userCart = useSelector((state) => state.cartReducer.userCart);

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

          dispatch(setUser({ ...storedUser, token: idTokenResult.token }));
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const loadUserCart = async () => {
    try {
      const response = await getUserCart(user.token);
      const userCart = normalizeCart(response.data);
      dispatch(setUserCart(userCart));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.token) loadUserCart();
    else dispatch(setGuestCart(getLocalStorage("guestCart") || []));
  }, [user]);

  // sync userCart with backend cart
  const loadSyncUserCart = async () => {
    await syncUserCart(userCart, user?.token);
  };

  useEffect(() => {
    if (user && userCart) {
      const timeoutId = setTimeout(() => loadSyncUserCart(), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [userCart]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/category/:slug" element={<CategoryHome />} />
        <Route exact path="/sub/:slug" element={<SubHome />} />

        <Route path="/auth/*" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="/user/*" element={<UserLayout />}>
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="/user/account" />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
