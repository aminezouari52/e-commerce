"use client";

// HOOKS
import { useState } from "react";
import { useToast } from "../../../utils/toast";
import { useRouter } from "next/navigation";

// REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../../reducers/userReducer";

// FIREBASE
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// FUNCTIONS
import { createOrUpdateUser } from "../../../functions/auth";

// COMPONENTS
import NextLink from "next/link";
import Logo from "../../../components/Logo";

// STYLE
import { Flex, Input, Button, Heading, Text, Link } from "@chakra-ui/react";

const Register = () => {
  let dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!email || !password) {
      toast("Email and password is required", "error");
      return;
    }
    if (password.length < 6) {
      toast("Password must be at least 6 characters long", "error");
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
        setUser({
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          _id: res.data._id,
        }),
      );

      // redirect
      router.push("/");
      toast("Account created successfully!", "success");
    } catch (err) {
      toast("Failed to create or update user", "error");
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
      <Flex as={NextLink} href="/" cursor="pointer">
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
          as={NextLink}
          href="/auth/login"
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
