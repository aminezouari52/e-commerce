import Typewriter from "typewriter-effect";
import { Box } from "@chakra-ui/react";

const Jumbotron = ({ text }) => (
  <Box
    fontSize="4xl"
    backgroundColor="gray.200"
    color="deepRed.500"
    py={12}
    textAlign="center"
    fontWeight="bold"
  >
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  </Box>
);

export default Jumbotron;
