"use client";

// HOOKS
import { useEffect } from "react";
import { motion } from "framer-motion";

// STYLE
import {
  Heading,
  Box,
  Text,
  Flex,
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

// ASSETS
import Link from "next/link";

const STEPS = [
  {
    img: "/shop.svg",
    url: "/shop",
    text: "Select your products",
  },
  {
    img: "/verify.svg",
    url: "/cart",
    text: "Review your cart",
  },
  {
    img: "/pay.svg",
    url: "/checkout",
    text: "Proceed to checkout",
  },
];

const CheckoutGuide = () => {
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
      inds.forEach((ind) => {
        (ind as HTMLElement).style.transition = "background 1s ease";
      });
      sprs.forEach((spr) => {
        (spr as HTMLElement).style.transition = "background 1.5s ease";
      });
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
        {STEPS.map((step, index) => (
          <Flex
            as={Link}
            href={step.url}
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

const CustomStepper = ({ activeStep }: { activeStep: number }) => {
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

export default CheckoutGuide;
