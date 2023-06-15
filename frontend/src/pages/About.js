import React from "react";
import {
  Card,
  Text,
  BackgroundImage,
  Overlay,
  ColorSchemeProvider,
} from "@mantine/core";
import logo from "../assets/aboutBrightside.jpg";

const About = () => {
  return (
    <Card size="xl" className="aboutContainer">
      <BackgroundImage
        src={logo}
        radius="sm"
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <Overlay
          opacity={0.5} // Adjust the opacity as needed
          color="dark" // Adjust the color if desired
          zIndex={0}
        />
        <ColorSchemeProvider colorScheme="dark">
          <div className="aboutContent">
            <Text fontSize="30px" className="aboutHeading" color="white">
              About Brightside
            </Text>
            
            <Text className="mt-3" color="white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
              laudantium est laborum, beatae voluptatum doloribus eligendi rem
              architecto fugiat voluptates alias dignissimos iusto tempore id
              mollitia. Aperiam alias suscipit repudiandae?
            </Text>
            <Text className="mt-3" color="white">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
              laudantium est laborum, beatae voluptatum doloribus eligendi rem
              architecto fugiat voluptates alias dignissimos iusto tempore id
              mollitia. Aperiam alias suscipit repudiandae?
            </Text>
          </div>
        </ColorSchemeProvider>
      </BackgroundImage>
    </Card>
  );
};

export default About;
