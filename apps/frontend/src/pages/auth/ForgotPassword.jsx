// REACT
import { useState } from "react";
import { useToast } from "@/utils/toast";

// FIREBASE
import { auth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// REDUX
import { useNavigate } from "react-router-dom";

// STYLE
import { Flex, Card, CardBody, Heading, Input, Button } from "@chakra-ui/react";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setEmail("");
      setLoading(false);
      toast("Check your email for password reset link", "success");
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast("Failed to send password reset email", "error");
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" w="100%" h="90vh">
      <Flex direction="column" alignItems="center" w="30%">
        <Card>
          <CardBody>
            <Flex direction="column" alignItems="center" px={8}>
              <Heading size="lg" mb={6} color="primary.500">
                Forgot Password
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email"
                  autoFocus
                  mb={2}
                />
                <Button
                  type="submit"
                  isDisabled={!email}
                  isLoading={loading}
                  colorScheme="primary"
                  mb={2}
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
