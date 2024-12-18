// REACT
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// REDUX
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "@/reducers/userReducer";

// FIREBASE
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// FUNCTIONS
import { createOrUpdateUser } from "@/functions/auth";

// COMPONENTS
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";

// STYLE
import { Flex, Input, Button, Heading, Text, Link } from "@chakra-ui/react";

const Register = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast({
        title: "Email and password is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters long",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // create user
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // get user id token
      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();

      // redux store
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

      // redirect
      navigate("/");
      toast({
        title: "Account created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
      gap={8}
      onSubmit={handleSubmit}
    >
      <Flex cursor="pointer" onClick={() => navigate("/")}>
        <Logo w="280px" />
      </Flex>
      <Flex
        gap="6px"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="lg">Join Us Now!</Heading>
        <Text color="darkgray">Welcome! Please create your account</Text>
      </Flex>

      <Flex w="100%" direction="column" gap={2}>
        <Input
          focusBorderColor="primary.500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          autoFocus
          size="md"
          mt={2}
        />

        <Input
          focusBorderColor="primary.500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="your password"
          size="md"
        />

        <Button
          type="submit"
          w="100%"
          isDisabled={!email || password.length < 6}
          // isLoading={loading}
          colorScheme="primary"
          size="sm"
          _hover={{
            opacity: email && password.length >= 6 && "0.8",
          }}
        >
          Register
        </Button>
      </Flex>

      <Flex fontSize="sm">
        <Text color="gray" mr={1}>
          Already have an account?
        </Text>
        <Link
          as={NavLink}
          to="/auth/login"
          color="primary.500"
          fontWeight="semibold"
          _hover={{ textDecoration: "underline" }}
        >
          Login
        </Link>
      </Flex>
    </Flex>
  );
};

export default Register;
