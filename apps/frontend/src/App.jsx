// HOOKS
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// FIREBASE
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// FUNCTIONS
import { setLoggedInUser } from "./reducers/userReducer";
import { setCart } from "./reducers/cartReducer";
import { currentUser } from "./functions/auth";
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        try {
          const res = await currentUser(idTokenResult.token);
          dispatch(
            setLoggedInUser({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            }),
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  // // TODO: make sure this works
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (!user) {
  //       toast({
  //         title: "Session expired.",
  //         status: "warning",
  //         colorScheme: "red",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       navigate("/auth/login");
  //     }
  //   });
  // }, []);

  // update cart store
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
