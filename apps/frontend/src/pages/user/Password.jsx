// HOOKS
import { useState } from "react";
import useToast from "@/utils/toast";

// FUNCTIONS
import { auth } from "@/firebase";
import { updatePassword } from "firebase/auth";

// STYLE
import {
  Flex,
  Box,
  Heading,
  Input,
  Button,
  Card,
  CardBody,
} from "@chakra-ui/react";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FIREBASE
    try {
      await updatePassword(auth.currentUser, password);
      setLoading(false);
      setPassword("");
      toast("Password updated!", "success");
    } catch (err) {
      setLoading(false);
      toast("Failed to update password", "error");
    }
  };

  return (
    <Box overflowY="hidden">
      <Flex flexDirection="column" alignItems="center" mt={8}>
        <Card>
          <CardBody>
            <Heading size="lg" color="primary.500" my={5}>
              Update Password
            </Heading>
            <Flex
              as="form"
              direction="column"
              w="100%"
              maxW="350px"
              minWidth="250px"
              onSubmit={handleSubmit}
            >
              <Input
                focusBorderColor="primary.500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your new password"
                mb={2}
              />

              <Button
                type="submit"
                isDisabled={!password || password.length < 6 || loading}
                isLoading={loading}
                colorScheme="primary"
                mb={2}
              >
                Submit
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

export default Password;
