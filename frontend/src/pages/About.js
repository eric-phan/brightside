import React from "react";
import { Card, Text } from "@mantine/core";

const About = () => {
  return (
    <Card size="xl" className="aboutContainer">
      <div className="aboutContent">
        <div className="row justify-content-center mt-5">
          <h1>About Brightside</h1>
          <Text className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
            laudantium est laborum, beatae voluptatum doloribus eligendi rem
            architecto fugiat voluptates alias dignissimos iusto tempore id
            mollitia. Aperiam alias suscipit repudiandae?
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
            laudantium est laborum, beatae voluptatum doloribus eligendi rem
            architecto fugiat voluptates alias dignissimos iusto tempore id
            mollitia. Aperiam alias suscipit repudiandae?
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default About;

// two dots means to go up two directoies,
