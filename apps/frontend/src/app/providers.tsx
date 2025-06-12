"use client";

import { Provider } from "react-redux";
import { store } from "../../store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ChakraProvider as ChakraProv } from "@chakra-ui/react";

// FUNCTIONS
import { setUser } from "../reducers/userReducer";
import { setGuestCart, setUserCart } from "../reducers/cartReducer";
import { getCurrentUser } from "../functions/auth";
import { getUserCart, syncUserCart } from "../functions/cart";
import { getLocalStorage, normalizeCart } from "../utils";
import theme from "../theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.userReducer.user);
  const userCart = useSelector((state: any) => state.cartReducer.userCart);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        await authUser.reload();
        const idTokenResult = await authUser.getIdTokenResult();
        try {
          const response = await getCurrentUser(idTokenResult.token);
          if (!response.data)
            throw new Error("User not found or token expired");

          const storedUser = getLocalStorage("user") || response.data;
          dispatch(setUser({ ...storedUser, token: idTokenResult.token }));
        } catch (error) {
          console.log(error);
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const loadUserCart = async () => {
      try {
        const response = await getUserCart(user.token);
        const cart = normalizeCart(response.data);
        dispatch(setUserCart(cart));
      } catch (e) {
        console.log(e);
      }
    };

    if (user?.token) loadUserCart();
    else dispatch(setGuestCart(getLocalStorage("guestCart") || []));
  }, [user]);

  useEffect(() => {
    const syncCart = async () => {
      if (user && userCart) await syncUserCart(userCart, user?.token);
    };

    const timeoutId = setTimeout(() => syncCart(), 500);
    return () => clearTimeout(timeoutId);
  }, [userCart]);

  return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProv theme={theme}>{children}</ChakraProv>;
}
