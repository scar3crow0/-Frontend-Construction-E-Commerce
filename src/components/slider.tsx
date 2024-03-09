import { useState } from "react";
import styled from "styled-components";
// Importing left arrow Image fromn mui
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// Importing right arrow image from mui
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// Importing data in JSON format
import { sliderInfo } from "../assets/data";
//Importing button from shared styled styled elements
import { Button } from "./shared_styled_elements";
import { Link, useNavigate } from "react-router-dom";

// This container is the top most level element
const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;
// Defining props for the arrow element
interface ArrowProps {
  direction: "left" | "right";
}

// ***Present inside CONTAINER *** Defining properties for the arrow element
const Arrow = styled.div<ArrowProps>`
  width: 50px;
  height: 50px;
  background-color: #191970;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.7;
  z-index: 2;
  &:hover {
    transform: scale(1.1);
  }
`;

interface WrapperProps {
  slideindex: number;
}
// *** Presnt within the CONTAINER *** Wraps around all slides
const Wrapper = styled.div<WrapperProps>`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideindex * -100}vw);
  transition: all 1.5s ease;
`;

interface SlideProps {
  bgcolor: string;
}
// *** Present within WRAPPER *** Wraps around each slide
const Slide = styled.div<SlideProps>`
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgcolor};
`;
// *** Present within SLIDE *** Wraps around each Image
const ImageWrapper = styled.div`
  flex: 1;
  height: 100%;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;
// *** Present within IMAGEWRAPPER *** It controls the properties of the image
const Image = styled.img`
  height: 100%;
`;
// *** Present within SLIDE *** Wraps around details
const InfoWrapper = styled.div`
  flex: 1;
  padding: 50px;
`;
interface TitleProps {
  color: string;
}
// *** Present within INFOWRAPPER *** It controls the properties of the Title
const Title = styled.h1<TitleProps>`
  font-weight: bold;
  font-size: 70px;
  color: ${(props) => props.color};
  letter-spacing: 2px;
`;
// *** Present within INFOWRAPPER *** It controls the properties of the Desc
const Desc = styled.p`
  margin: 30px 0px;
  font-weight: 500;
  font-size: 30px;
`;

// This is the main component which is returned
const Slider = () => {
  // sliderIndex is the state value and handleClick is function
  const { sliderIndex, handleClick } = useSlideMovement();

  const navigate = useNavigate();

  const handleAIPortalclick = () => {
    navigate("/AIPortal");
  };

  const handleButton1click = () => {
    navigate("/");
  };

  const handleButton2click = () => {
    navigate("/");
  };
  return (
    <Container>
      {/* This component contains the left arrow and I need to remove hard coding here */}
      <Arrow direction="left" onClick={() => handleClick("left", 3)}>
        {/* This is being imported from mui */}
        <ArrowBackIosIcon sx={{ color: "#f8f8ff", fontSize: 30 }} />
      </Arrow>
      {/* This wrapper wraps around all of the slides */}
      <Wrapper slideindex={sliderIndex}>
        {sliderInfo.map((item) => (
          <Slide key={item.id} bgcolor={item.bg}>
            {/* This wraps around the image*/}
            <ImageWrapper>
              {/* Linking the image over here  */}
              <Image src={item.img} />
            </ImageWrapper>
            {/* This wraps around all of the info*/}
            <InfoWrapper>
              <Title color={item.h1Color}>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link to={item.button_link}>
                <Button
                  bgcolor="#191970"
                  fontcolor="white"
                  bordercolor="white"
                  width="auto"
                >
                  {item.button_name}
                </Button>
              </Link>
            </InfoWrapper>
          </Slide>
        ))}
      </Wrapper>
      {/* This wraps around the right arrow  */}
      <Arrow direction="right" onClick={() => handleClick("right", 3)}>
        <ArrowForwardIosIcon sx={{ color: "#f8f8ff", fontSize: 30 }} />
      </Arrow>
    </Container>
  );
};

// This function handles the state and the logic for the slide movement
function useSlideMovement() {
  const [sliderIndex, setSliderIndex] = useState(0);
  // This function takes the direction(left or right) as argument and sets the value of slider index accordingly
  const handleClick = (direction: string, maxSlides: number) => {
    // Starting the counter from zero
    maxSlides -= 1;
    // This runs when the user clicks the left arrow
    if (direction === "left") {
      // Checking if slider index is 0 then moving to last slide
      if (sliderIndex > 0) {
        setSliderIndex(sliderIndex - 1);
      }
      // Moving to the previous slide by changing sliderIndex value
      else {
        setSliderIndex(maxSlides);
      }
    }
    // This runs when the user clicks the right arrow
    else if (direction === "right") {
      // Checking if the user is on the last slide if so taking him back to the first slide
      if (sliderIndex === maxSlides) {
        setSliderIndex(0);
      }
      // Taking user to the next slide
      else {
        setSliderIndex(sliderIndex + 1);
      }
    }
  };
  return { sliderIndex, handleClick };
}

export default Slider;
