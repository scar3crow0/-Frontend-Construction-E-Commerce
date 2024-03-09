//This file defines the navbar component and elements within it. It provides the layout for them and styling
import { useNavigate } from "react-router-dom";

//Importing this to use styled components
import styled from "styled-components";
//Importing the menu Icon
import MenuIcon from "@mui/icons-material/Menu";
// Importing Searh Icon
import SearchIcon from "@mui/icons-material/Search";
// Importing badges
import Badge from "@mui/material/Badge";
//Importing shopping cart Icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// Getting the cancel Icon
import CancelIcon from "@mui/icons-material/Cancel";
//Importing the wrapper for icons
import { Icon, BoldHeading } from "./shared_styled_elements";
// importing the side menu
import SideMenuOptions from "./SideMenuOptions";
// Using useState
import { useState } from "react";
// This is the top most level container for the navbar

// const Navbar = () => {
//   // Initialize the navigate function using useNavigate()

//   };

const Container = styled.div`
  height: 60px;
  background-color: #f8f8ff;
  overflow: hidden;

  @media only screen and (max-width: 480px) {
    height: auto;
    overflow: hidden;
  }
`;
// ***Placed inside CONTAINER component *** The wrapper is inside <Component> and provides padding and sets display to flexbox for displaying children elements horizontally
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// *** Placed inside WRAPPER component *** Wrapping the elements on the left under this div element container and specifying its styling
const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`;

// ***Placed Inside LEFT component *** Specifying style properties for the search box
const SearchContainer = styled.div`
  border: 2px solid #191970;
  display: flex;
  flex: 0.8;
  border-radius: 8px;
  align-items: center;
  padding: 3px;
  margin-left: 20px;

  @media only screen and (max-width: 480px) {
    margin: 40px 0px 10px 0px;
  }
`;
// *** This is placed inside the SEARCH_CONTAINER component*** This specifies the properties of the input field
const InputField = styled.input`
  border: none;
  flex: 1;
`;
// This property will have a role in moving the menu in and out of view
interface SideMenuWrapperProps {
  xposition: number;
}
// This is the wrapper for the side menu
const SideMenuWrapper = styled.div<SideMenuWrapperProps>`
  top: 0;
  bottom: 0;
  left: ${(props) =>
    props.xposition *
    -100}px; // The sense for this is that at -300 it is outside view and  at 0 it is properly inside
  position: relative;
  border: 2px solid darkblue;
  width: 300px;
  position: fixed;
  background-color: whitesmoke;
  z-index: 4;
  transition: all 0.5s;
`;

// This is the wrapper for the cross icon
const CrossWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

// *** Placed inside WRAPPER component ***  Wrapping the elements in the center under this div element container and specifying its styling
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

// This is the wrapper for the Company Name at the end of the Side Menu
const SideMenuFooterWrapper = styled.div`
  background-color: white;
`;

// This has the styling for the title
const SideMenuHeadingWrapper = styled.div`
  font-size: 35px;
  color: darkblue;
  background-color: white;
`;

// *** Placed inside WRAPPER component ***  Wrapping the elements on the right under this div element container and specifying its styling
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    justify-content: flex-end;
  }
`;

const NavbarOptions = styled.div`
  cursor: pointer;
  font-size: 20px;
`;

// This is the main functional component which is returned in the end
const Navbar = () => {
  const navigate = useNavigate();
  //const screenSize = window.screen.width <= 480 ? true : false;

  // Define the function to handle the login click
  const handleLoginClick = () => {
    // Use the navigate function to navigate to the login page
    navigate("/login");
  };

  // Define similar functions for other options
  const handleBecomeSellerClick = () => {
    // Use the navigate function to navigate to the become seller page
    navigate("/becomeSeller");
  };

  const handleSignUpClick = () => {
    // Use the navigate function to navigate to the sign-up page
    navigate("/Register");
  };

  const handleCartClick = () => {
    // Use the navigate function to navigate to the sign-up page
    navigate("/Cart");
  };

  const handleHomePageClick = () => {
    // Use the navigate function to navigate to the sign-up page
    navigate("/HomePage");
  };

  const handleProfileClick = () => {
    // Use the navigate function to navigate to the sign-up page
    navigate("/Profile");
  };

  // This checks for the screen size
  const screenSize = window.screen.width <= 480 ? true : false;

  return (
    //The top most element
    <Container>
      <Wrapper>
        {/*The left component has the search field within it*/}
        <Left>
          {/*This function handles the sideMenu display */}
          {renderSideMenu(screenSize)}
          {renderSearch(screenSize)}
        </Left>
        {/*The center component has the Company Name within it*/}
        <Center onClick={handleHomePageClick}>
          <BoldHeading fontcolor="black">Abdullah and CO </BoldHeading>
        </Center>

        {/*The right component has different options within it*/}
        <Right>
          {!screenSize && (
            <NavbarOptions onClick={handleBecomeSellerClick}>
              <a>Become a Seller</a>
            </NavbarOptions>
          )}

          {!screenSize && (
            <NavbarOptions onClick={handleProfileClick}>
              <a>Profile</a>
            </NavbarOptions>
          )}
          {!screenSize && (
            <NavbarOptions onClick={handleSignUpClick}>
              <a>Sign Up</a>
            </NavbarOptions>
          )}

          {!screenSize && (
            <NavbarOptions onClick={handleLoginClick}>
              <a>Login</a>
            </NavbarOptions>
          )}
          <Icon onClick={handleCartClick}>
            <Badge
              badgeContent={3}
              sx={{ color: "#191970", cursor: "pointer" }}
            >
              <ShoppingCartIcon />
            </Badge>
          </Icon>
        </Right>
      </Wrapper>
    </Container>
  );
};

// This function handles the Menu movement. Its logic and state
function useMenuMovementLogic() {
  // This keeps track of  the number that is multiplied within the the left attribute of the SideMenuWrapper
  const [xAxisPosition, setXAxisPostion] = useState(3);
  // This function handles setting the appropriate value for the xAxisPosition as the user clicks the menu or cross icon
  const handleMenuMovement = (clicked: string) => {
    if (clicked == "menu") {
      setXAxisPostion(0);
      console.log(xAxisPosition);
    } else if (clicked == "cross") {
      setXAxisPostion(3);
    }
  };

  return { handleMenuMovement, xAxisPosition };
}
// This function renders the sidemenu
function renderSideMenu(screenSize: boolean) {
  // Getting the values from the function which has state and movement logic
  const { handleMenuMovement, xAxisPosition } = useMenuMovementLogic();
  console.log(xAxisPosition);
  return (
    <div>
      <Icon onClick={() => handleMenuMovement("menu")}>
        <MenuIcon sx={{ color: "#191970", cursor: "pointer" }} />
      </Icon>
      <SideMenuWrapper xposition={xAxisPosition}>
        {/* Calling the handleMenuMovement function with the parameter of cross */}
        <CrossWrapper onClick={() => handleMenuMovement("cross")}>
          {/* This is the cross icon imported from mui */}
          <CancelIcon sx={{ cursor: "pointer", color: "darkblue" }} />
        </CrossWrapper>
        {/* The search container has the input field and the search icon imported from mui.
        It is displayed within the side menu only in mobile mode */}
        {screenSize && (
          <SearchContainer>
            <InputField />
            <SearchIcon sx={{ color: "gray", cursor: "pointer" }} />
          </SearchContainer>
        )}
        {/*Displaying the header */}
        <SideMenuHeadingWrapper>Categories</SideMenuHeadingWrapper>
        {/* Displaying the side menu options imported */}
        <SideMenuOptions />
        {/* Dispalying the footer */}
        <SideMenuFooterWrapper>
          {/*Only displayed in mobile mode */}
          {screenSize && (
            <NavbarOptions>
              <a>Become a Seller</a>
            </NavbarOptions>
          )}
          {/*Only displayed in mobile mode */}
          {screenSize && (
            <NavbarOptions>
              <a>Sign Up</a>
            </NavbarOptions>
          )}
          {/*Only displayed in mobile mode */}
          {screenSize && (
            <NavbarOptions>
              <a>Login</a>
            </NavbarOptions>
          )}
          <BoldHeading fontcolor="black">Abdullah and CO</BoldHeading>
        </SideMenuFooterWrapper>
      </SideMenuWrapper>
    </div>
  );
}
// This function handles the search
function renderSearch(screenSize: boolean) {
  return (
    <Left>
      {!screenSize && (
        <SearchContainer>
          <InputField />
          <SearchIcon sx={{ color: "gray", cursor: "pointer" }} />
        </SearchContainer>
      )}
    </Left>
  );
}
export default Navbar;
