// FIREBASE
import { auth, googleAuthProvider } from "@/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// HOOKS
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// FUNCTIONS
import { createOrUpdateUser } from "@/functions/auth";
import { setLoggedInUser } from "@/reducers/userReducer";

// COMPONENTS
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";

// STYLE
import { Flex, Heading, Input, Button, Link, Text } from "@chakra-ui/react";

// ICONS
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  // HOOKS
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // REDIRECT USER
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

  useEffect(() => {
    const intended = location.state;
    if (intended) {
      return;
    } else {
      if (loggedInUser && loggedInUser.token) {
        if (loggedInUser.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/history");
        }
      }
    }
  }, [loggedInUser, navigate, location]);

  // REDIRECT FUNCTION
  const roleBasedRedirect = (res) => {
    const intended = location.state;
    if (intended) {
      navigate(intended.from);
    } else {
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/history");
      }
    }
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      // create user in database
      try {
        const res = await createOrUpdateUser(idTokenResult.token);
        dispatch(
          setLoggedInUser({
            name: res.data.name,
            email: res.data.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          }),
        );
        roleBasedRedirect(res);
      } catch (err) {
        toast({
          title: "Failed to create or update user",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Failed to login user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // LOGIN WITH GOOGLE
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      // create user in database
      const res = await createOrUpdateUser(idTokenResult.token);
      dispatch(
        setLoggedInUser({
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          _id: res.data._id,
        }),
      );
      roleBasedRedirect(res);
    } catch (err) {
      toast({
        title: "Failed to create or update user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
