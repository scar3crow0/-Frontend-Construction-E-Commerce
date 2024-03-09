import styled from "styled-components";
// Importing this as the code is thr same
import { BoldHeading } from "./shared_styled_elements";
//Importing facebook Icon
import FacebookIcon from "@mui/icons-material/Facebook";
//Importing Instgram icon
import InstagramIcon from "@mui/icons-material/Instagram";
//Importing Map Icon
import MapIcon from "@mui/icons-material/Map";
//Importing Phone Icon
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
//Importing mail Icon
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

// This is the top-most container
const Container = styled.div`
  display: flex;
  width: auto;
  height: auto;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
// This wraps around all the elements in the left
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;
const Description = styled.div`
  font-size: 23px;
  margin: 25px 0px;
`;
// This wraps around all the social media icone
const SocialContainer = styled.div`
  display: flex;
`;

interface SocialIconProps {
  color: string;
}
// This wraps around each Icon
const SocialIcon = styled.div<SocialIconProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
`;
// This wraps around all elements in the center
const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;
// Designing the heading for the sections in the center and on the right
const Title = styled.h3`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 25px;
`;
// Designing the list for all the quick links
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
// Designing each item within the list
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-size: 23px;
`;
// This wraps around all elements on the right
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const ContactItem = styled.div`
  display: flex;
  font-size: 23px;
  align-items: center;
  margin: 8px;
`;
const Footer = () => {
  const navigate = useNavigate();
  //const screenSize = window.screen.width <= 480 ? true : false;

  // Define the function to handle the login click
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
    navigate("/AIPortal");
  };

  return (
    <Container>
      {/* All the elements on the left */}
      <Left>
        <BoldHeading fontcolor="black">Abdullah and CO</BoldHeading>

        <Description>
          This venture was founded by a couple of college undergrads in their
          final year. We identified the gap within the market between suppliers
          and consumers and formulated a digital solution for the problem. While
          this is a beta verison of the project, it is only the start.
        </Description>
        {/* Both of the two icons are wrapped in this */}
        <SocialContainer>
          <SocialIcon color="#3b5998">
            {/* Importing the facebook Icon from mui */}
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="#E4405F">
            {/* Importing the Instgram Icon from mui */}
            <InstagramIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>
      {/* All the elements in the center */}
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <a onClick={handleHomePageClick}>Home</a>
          </ListItem>
          <ListItem>
            <a onClick={handleBecomeSellerClick}>Become a Seller</a>
          </ListItem>
          <ListItem>
            <a onClick={handleCartClick}>Cart</a>
          </ListItem>
          <ListItem>
            <a onClick={handleSignUpClick}>Sign Up</a>
          </ListItem>
        </List>
      </Center>

      {/* All the elements on the right */}
      <Right>
        <Title>Contact Us</Title>
        {/* Displaying the mapp */}
        <ContactItem>
          <MapIcon fontSize="large" sx={{ marginRight: "10px" }} /> Room# 215,
          Ghazali hostel, Nust
        </ContactItem>
        {/* Displaying the phone */}
        <ContactItem>
          <LocalPhoneIcon fontSize="large" sx={{ marginRight: "10px" }} />
          XXXXXXXXXX
        </ContactItem>
        {/* Displaying the email */}
        <ContactItem>
          <MailIcon fontSize="large" sx={{ marginRight: "10px" }} />
          company@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
