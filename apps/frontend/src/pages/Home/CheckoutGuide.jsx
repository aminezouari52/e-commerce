import { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepSeparator,
  useSteps,
} from "@chakra-ui/react";
import ShopImg from "@/assets/shop.svg";
import VerifyImg from "@/assets/verify.svg";
import PayImg from "@/assets/pay.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    img: ShopImg,
    url: "/shop",
    text: "Select your products",
  },
  {
    img: VerifyImg,
    url: "/cart",
    text: "Review your cart",
  },
  {
    img: PayImg,
    url: "/checkout",
    text: "Proceed to checkout",
  },
];

const CustomStepper = ({ activeStep }) => {
  return (
    <Stepper
      p={{ sm: 10, md: 12, lg: 20 }}
      size="lg"
      colorScheme="deepRed"
      index={activeStep}
    >
      <Step>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>
        <StepSeparator />
      </Step>
      <Step>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        <StepSeparator />
      </Step>
      <Step>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        <StepSeparator />
      </Step>
    </Stepper>
  );
};

const CheckoutGuide = () => {
  const navigate = useNavigate();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 2,
  });

  // Add transition to stepper indicators and separators
  useEffect(() => {
    const stepper = document.querySelector(".chakra-stepper");
    if (stepper) {
      const inds = stepper.querySelectorAll(".chakra-step__indicator");
      const sprs = stepper.querySelectorAll(".chakra-step__separator ");
      inds.forEach((ind) => (ind.style.transition = "background 1s ease"));
      sprs.forEach((spr) => (spr.style.transition = "background 1.5s ease"));
    }
  }, []);

  return (
    <Box backgroundColor="white" p={10}>
      <Heading
        display="flex"
        fontSize={{
          sm: "3xl",
          md: "5xl",
        }}
        as="h1"
        p={{ sm: 8, md: 10, lg: 12 }}
        justifyContent="center"
      >
        It takes 3 &nbsp;
        <Text color="deepRed.500"> simple </Text>
        &nbsp; steps
      </Heading>

      <CustomStepper activeStep={activeStep} />

      <SimpleGrid columns={3}>
        {steps.map((step, index) => (
          <Flex
            key={index}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            onMouseEnter={() => {
              if (activeStep !== 3) {
                setActiveStep(index + 1);
              }
            }}
            onClick={() => navigate(step.url)}
          >
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: (index % 2 === 0 ? -1 : 1) * 10,
              }}
            >
              <Flex justifyContent="center" alignItems="center">
                <Image
                  boxSize={{
                    sm: "150px",
                    md: "200px",
                    lg: "250px",
                  }}
                  src={step.img}
                  alt="Dan Abramov"
                />
              </Flex>
            </motion.div>

            <Heading
              gap="10px"
              display="flex"
              fontWeight="extrabold"
              fontSize={{ sm: "xl", md: "2xl", lg: "3xl" }}
              alignItems="center"
              p={{ sm: 8, md: 10, lg: 12 }}
            >
              {step.text}
            </Heading>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CheckoutGuide;
