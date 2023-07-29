import { useEffect, useState } from "react";
import { Text, Select, Button, Card } from "@mantine/core";

const ViewTool = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [defaultImageUrl, setDefaultImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // get options from the API backend
  useEffect(() => {
    // hook is responsible for fetching the options from the API based on the current page. It triggers whenever the currentPage changes.
    const fetchOptions = async () => {
      try {
        const response = await fetch(
          `https://perenual.com/api/species-list?page=${currentPage}&key=sk-8V9Q648f8bb0584a71325`
        );
        const jsonData = await response.json();
        setOptions(jsonData.data.map((item) => item.common_name));
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [currentPage]);
  // fetches the default image URL for the selected option and the current page. It triggers whenever the selectedOption or currentPage changes.
  // It fetches the data from the API endpoint, finds the selected species based on the common name, and updates the defaultImageUrl state with
  // the URL of the default image if a match is found.
  useEffect(() => {
    const fetchDefaultImageUrl = async () => {
      try {
        const response = await fetch(
          `https://perenual.com/api/species-list?page=${currentPage}&key=sk-8V9Q648f8bb0584a71325`
        );
        const jsonData = await response.json();
        const selectedSpecies = jsonData.data.find(
          (item) => item.common_name === selectedOption
        );
        if (selectedSpecies) {
          setDefaultImageUrl(selectedSpecies.default_image.regular_url);
        }
      } catch (error) {
        console.error("Error fetching default image:", error);
      }
    };
    //  It triggers whenever the selectedOption or currentPage changes.
    fetchDefaultImageUrl();
  }, [selectedOption, currentPage]);

  // When the user selects an option from the dropdown, the handleOptionChange
  // function is called, which updates the selectedOption state with the value of the selected option.
  //   const handleOptionChange = (event) => {
  //     setSelectedOption(event.target.value);
  //   };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Card
      size="xl"
      shadow="xs"
      className="viewContainer"
      style={{ textAlign: "center", paddingTop: "2rem" }}
    >
      <Text fontSize="30px" className="viewHeading">
        Species Viewer
      </Text>
      <Select
        value={selectedOption}
        className="viewInput"
        onChange={(value) => setSelectedOption(value)}
        placeholder="Select an option"
        data={options.map((option) => ({
          value: option,
          label: option,
        }))}
      />
      <div
        style={{ display: "flex", justifyContent: "center", margin: ".5rem 0" }}
      >
        <Button onClick={handlePreviousPage} style={{ marginRight: "0.5rem" }}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} style={{ marginLeft: "0.5rem" }}>
          Next Page
        </Button>
      </div>
      <Text style={{ margin: "1rem 0" }}>
        Selected option: {selectedOption}
      </Text>
      {defaultImageUrl && (
        <img
          src={defaultImageUrl}
          alt="Default"
          style={{ borderRadius: "50%", maxWidth: "65vw", margin: "0 auto" }}
        />
      )}
    </Card>
  );
};
export default ViewTool;
