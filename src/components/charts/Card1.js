import React, { useState } from "react";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Box,
  Center,
  Spinner,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryHistogram,
  VictoryScatter,
  VictoryStack,
} from "victory";

import CountUp from "react-countup";

const Card1 = ({ drawData }) => {
  return (
    <Box bg="#F05454" p="6" w="100vw" h="100vh">
      <Text fontSize="5xl">Infact Y'all sent a total of </Text>
      <Text fontSize="6xl" color="#F5F5F5">
        <CountUp
          end={
            drawData.word_count_per_member[0].count +
            drawData.word_count_per_member[1].count
          }
          onEnd={({ countUpRef }) => {
            countUpRef = "a";
          }}
          duration={2}
        />
      </Text>
      <Text fontSize="5xl"> messages to each other this year!🤯</Text>
      <br />
      <Text fontSize="5xl">
        That puts you into top 1% of texters in the world
      </Text>
    </Box>
  );
};

export default Card1;
