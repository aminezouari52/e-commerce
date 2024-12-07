// FIREBASE
import { auth, googleAuthProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// HOOKS
import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// FUNCTIONS
import { createOrUpdateUser } from "../../functions/auth";
import { setLoggedInUser } from "../../reducers/userReducer";

// COMPONENTS
import { NavLink } from "react-router-dom";

// STYLE
import {
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";

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
      justifyContent="center"
      alignItems="center"
      h="calc(100vh - 40px)"
      mx={4}
    >
      <Flex direction="column" alignItems="center">
        <Card>
          <CardBody>
            <Flex direction="column" alignItems="center" px={8}>
              <Heading
                mb={6}
                color="primary.500"
                size={{ sm: "sm", md: "md", lg: "lg" }}
              >
                Login Account
              </Heading>
              <Flex as="form" direction="column" onSubmit={handleSubmit}>
                <Flex direction="column" alignItems="end" mb={2}>
                  <Input
                    focusBorderColor="primary.500"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                    size={{ sm: "sm", md: "md" }}
                    mt={2}
                  />

                  <Input
                    focusBorderColor="primary.500"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    my={2}
                    size={{ sm: "sm", md: "md" }}
                  />
                  <Link
                    as={NavLink}
                    to="/forgot-password" // Replace with your actual forgot password route
                    color="primary.500"
                    _hover={{ textDecoration: "underline" }}
                    fontSize="sm"
                    my={2}
                  >
                    Forgot password?
                  </Link>
                </Flex>
                <Button
                  type="submit"
                  leftIcon={<AiOutlineMail />}
                  isDisabled={!email || password.length < 6}
                  isLoading={loading}
                  colorScheme="primary"
                  my={2}
                  size={{ sm: "xs", md: "sm", lg: "md" }}
                >
                  Login with Email/Password
                </Button>
                <Button
                  onClick={googleLogin}
                  leftIcon={<FcGoogle />}
                  colorScheme="gray"
                  size={{ sm: "xs", md: "sm", lg: "md" }}
                  my={2}
                >
                  Login with Google
                </Button>

                <Flex my={2} fontSize={{ sm: "sm", md: "md", lg: "lg" }}>
                  <Text color="gray" mr={1}>
                    Dont have an account?
                  </Text>
                  <Link
                    as={NavLink}
                    to="/register"
                    color="primary.500"
                    fontWeight="semibold"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Register
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Login;
