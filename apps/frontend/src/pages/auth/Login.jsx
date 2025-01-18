// HOOKS
import { useState, useEffect } from "react";
import { useToast } from "@/utils/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// FUNCTIONS
import { syncUserCart } from "@/functions/cart";
import { createOrUpdateUser } from "@/functions/auth";
import { getUserCart } from "@/functions/cart";
import { setUser } from "@/reducers/userReducer";
import { auth, googleAuthProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// COMPONENTS
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";

// STYLE
import { Flex, Heading, Input, Button, Link, Text } from "@chakra-ui/react";

// ASSETS
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const user = useSelector((state) => state.userReducer.user);
  const guestCart = useSelector((state) => state.cartReducer.guestCart);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const intended = location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user");
        }
      }
    }
  }, [user, navigate, location]);

  const roleBasedRedirect = (res) => {
    const intended = location.state;
    if (intended) {
      navigate(intended.from);
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const response = await createOrUpdateUser(idTokenResult.token);
      dispatch(
        setUser({
          ...response.data,
          token: idTokenResult.token,
        }),
      );

      const cartResponse = await getUserCart(idTokenResult.token);
      if (!cartResponse?.data?.products?.length && !!guestCart?.length > 0) {
        await syncUserCart(guestCart, idTokenResult.token);
      }

      roleBasedRedirect(response);
    } catch (err) {
      toast("Failed to login user", "error");
      setLoading(false);
    }
  };

  const googleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      const response = await createOrUpdateUser(idTokenResult.token);

      dispatch(
        setUser({
          ...response.data,
          token: idTokenResult.token,
        }),
      );

      const cartResponse = await getUserCart(idTokenResult.token);
      if (!cartResponse?.data?.products?.length && !!guestCart?.length > 0) {
        await syncUserCart(guestCart, idTokenResult.token);
      }

      roleBasedRedirect(response);
    } catch (err) {
      toast("Failed to create or update user", "error");
      setLoading(false);
    }
  };

  return (
    <Flex
      as="form"
      w="325px"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={12}
      onSubmit={handleSubmit}
    >
      <Flex cursor="pointer" onClick={() => navigate("/")}>
        <Logo w="280px" />
      </Flex>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <Heading size="lg" textAlign="center">
          Welcome Back!
        </Heading>
        <Text color="darkgray" textAlign="center">
          Login to access the platform
        </Text>
      </Flex>

      <Flex w="100%" direction="column" alignItems="end" gap={2}>
        <Input
          focusBorderColor="primary.500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
          size="md"
          mt={2}
        />

        <Input
          focusBorderColor="primary.500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          size="md"
        />
        <Link
          as={NavLink}
          to="/auth/forgot-password" // Replace with your actual forgot password route
          color="primary.500"
          _hover={{ textDecoration: "underline" }}
          fontSize="sm"
        >
          Forgot password?
        </Link>
        <Button
          type="submit"
          leftIcon={<AiOutlineMail />}
          isDisabled={!email || password.length < 6}
          isLoading={loading}
          colorScheme="primary"
          my={2}
          w="100%"
          size="sm"
          _hover={{
            opacity: email && password.length >= 6 && 0.8,
          }}
        >
          Login with Email/Password
        </Button>
        <Button
          colorScheme="gray"
          size="sm"
          w="100%"
          leftIcon={<FcGoogle />}
          onClick={googleLogin}
        >
          Login with Google
        </Button>
      </Flex>

      <Flex fontSize="sm" w="100%" justifyContent="center">
        <Text color="gray" mr={1}>
          Don't have an account?
        </Text>
        <Link
          as={NavLink}
          to="/auth/register"
          color="primary.500"
          fontWeight="semibold"
          _hover={{ textDecoration: "underline" }}
        >
          Register
        </Link>
      </Flex>
    </Flex>
  );
};

export default Login;
