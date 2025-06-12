"use client";

import {
  Box,
  Flex,
  Text,
  useRadio,
  Icon,
  useRadioGroup,
  Stack,
  chakra,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const Card = (props) => {
  const { icon, children, fieldMethods, ...radioProps } = props;

  const { state, getInputProps, getRadioProps, htmlProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden {...fieldMethods} />
      <Box
        {...getRadioProps()}
        borderWidth="3px"
        borderRadius="md"
        borderColor="gray.100"
        _checked={{
          borderColor: "primary.500",
        }}
        _hover={{
          transition: "all 0.2s ease-in-out",
          borderColor: !state.isChecked && "gray.200",
        }}
        px={6}
        py={4}
      >
        <Flex gap={4} alignItems="center">
          <Box
            h="20px"
            w="20px"
            borderColor={state.isChecked ? "#000" : "#3423"}
            borderWidth={state.isChecked ? "6px" : "2px"}
            borderRadius="50%"
          ></Box>
          <Flex
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            fontSize="xl"
          >
            <Text
              fontWeight="semibold"
              color={state.isChecked ? "#000" : "gray.500"}
            >
              {children}
            </Text>
            <Icon
              color={state.isChecked ? "deepRed.500" : "gray.300"}
              as={icon}
            />
          </Flex>
        </Flex>
      </Box>
    </chakra.label>
  );
};

const RadioCard = ({ defaultValue, options, fieldMethods }) => {
  const methods = useFormContext();
  const { name } = fieldMethods;

  // eslint-disable-next-line no-unused-vars
  const { onChange, ...restMethods } = fieldMethods;

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue,
    onChange: (val) => {
      methods.setValue(name, val);
    },
  });

  return (
    <Stack {...getRootProps}>
      {options.map((option) => {
        return (
          <Card
            key={option.value}
            icon={option.icon}
            fieldMethods={restMethods}
            {...getRadioProps({
              value: option.value,
            })}
          >
            {option.title}
          </Card>
        );
      })}
    </Stack>
  );
};

export default RadioCard;
