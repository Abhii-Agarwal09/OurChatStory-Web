import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  Text,
  HStack,
  Image,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { HiShare } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Stories from "react-insta-stories";

import MonthlyGraph from "./charts/monthly";
import Card0 from "./charts/Welcome2";
import GCard0 from "./charts/g-Welcome2";
import Card1 from "./charts/TotalChat";
import WordCloud from "./charts/wordcloud";
import CountPie from "./charts/CountPie";
import Card5 from "./charts/emoji";
import HourlyGraph from "./charts/time";
import NoTalk from "./charts/cold";
import Card9 from "./charts/MostActive";

import ThankYou from "./charts/ThankCard";
import Welcome from "./charts/Welcome";

import logo from "../static/logo2.png";

import * as htmlToImage from "html-to-image";

const Dashboard = ({ drawData, isDemo }) => {
  const [isShared, setIsShared] = useState(false);
  const ref = useRef();
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    setIsShared(true);
    htmlToImage
      .toBlob(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const file = new File([dataUrl], "share.png", { type: dataUrl.type });
        // const link = document.createElement("a");
        // link.download = "my-image-name.png";
        // link.href = dataUrl;
        // link.click();
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator
            .share({
              title: "OurChatStory",
              text: "Look at our #WhatsAppWrapped. I made it using OurChatStory.co!",
              files: [file],
            })
            .then(() => console.log("Share was successful."))
            .catch((error) => console.log(error));
          setIsShared(false);
        } else console.log("no share support");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const pStories = [
    {
      content: (props) => <Welcome drawData={drawData} />,
    },
    {
      content: (props) => <Card0 drawData={drawData} />,
    },
    {
      content: (props) => <Card1 drawData={drawData} />,
    },
    {
      content: (props) => <Card9 drawData={drawData} />,
    },
    {
      content: (props) => (
        <MonthlyGraph drawData={drawData} isShared={isShared} />
      ),
    },
    {
      content: (props) => (
        <HourlyGraph drawData={drawData} isShared={isShared} />
      ),
    },
    {
      content: (props) => <NoTalk drawData={drawData} />,
    },
    {
      content: (props) => <WordCloud drawData={drawData} />,
    },
    {
      content: (props) => <CountPie drawData={drawData} />,
    },
    {
      content: (props) => <Card5 drawData={drawData} />,
    },
    {
      content: (props) => <ThankYou drawData={drawData} />,
    },
  ];
  const gStories = [
    {
      content: (props) => <Welcome drawData={drawData} />,
    },
    {
      content: (props) => <GCard0 drawData={drawData} />,
    },
    {
      content: (props) => <Card1 drawData={drawData} />,
    },
    {
      content: (props) => <Card9 drawData={drawData} />,
    },
    {
      content: (props) => <MonthlyGraph drawData={drawData} />,
    },

    {
      content: (props) => <HourlyGraph drawData={drawData} />,
    },
    {
      content: (props) => <NoTalk drawData={drawData} />,
    },
    {
      content: (props) => <WordCloud drawData={drawData} />,
    },
    {
      content: (props) => <CountPie drawData={drawData} />,
    },
    {
      content: (props) => <Card5 drawData={drawData} />,
    },
    {
      content: (props) => <ThankYou drawData={drawData} />,
    },
  ];

  const stories = drawData.group ? gStories : pStories;
  return (
    <Box>
      <Box ref={ref}>
        <Stories
          stories={stories}
          defaultInterval={20000}
          width="100vw"
          height="95vh"
          preventDefault={false}
        />
        <IconButton
          aria-label="Close"
          icon={<IoClose size="1.5em" opacity={0.8} color="#555555" />}
          variant="none"
          colorScheme="transparent"
          onClick={() => {
            window.location.reload(false);
          }}
          position="absolute"
          top="2vh"
          right="1vw"
          zIndex={10000}
        />
        <HStack
          w="100%"
          h="5vh"
          position="absolute"
          spacing="0.5rem"
          p="1rem"
          align="center"
          bottom="5vh"
        >
          <Image
            boxSize="3vh"
            src={logo}
            alt="OurChatStory"
            style={{ imageRendering: "crisp-edges" }}
          />
          <Text
            align="center"
            color="white"
            fontSize="xs"
            style={{
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            Made using OurChatStory.co
          </Text>
        </HStack>
      </Box>
      {isDemo ? (
        <Button
          w="100%"
          h="5vh"
          onClick={() => {
            window.location.reload(false);
          }}
          position="sticky"
          bottom="0vh"
          zIndex={10000}
          colorScheme="whatsapp"
          borderRadius={0}
        >
          Click here to make your own wrap
        </Button>
      ) : navigator.canShare ? (
        <Button
          rightIcon={isShared ? <Spinner color="black" /> : <HiShare />}
          w="100%"
          h="5vh"
          onClick={onButtonClick}
          position="sticky"
          bottom="0vh"
          zIndex={10000}
        >
          Share
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Dashboard;
