import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { Header } from "./shared_styled_elements";
// This is the top most level element
const Container = styled.div`
  height: 60vh;
  width: 100%;
  @media only screen and (max-width: 480px) {
    height: 40vh;
  }
`;
// This wraps around all the Information after the header
const InfoWrapper = styled.div`
  width: 100%;
  height: 80%;
  background-color: #e2eef3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
// Defining style for description
const Description = styled.div`
  font-size: 20px;
  @media only screen and (max-width: 480px) {
    margin-left: 17px;
  }
`;
// This wraps around the input and the send button
const InputContainer = styled.div`
  margin-top: 20px;
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: solid 1px black;
  @media only screen and (max-width: 480px) {
    width:60%;
  }
`;
// This defines the style for the input field
const Input = styled.input`
  flex: 9;
  height: 100%;
  width: 96%;
  padding-left: 20px;
`;
// This defines style for the send button
const Button = styled.button`
  flex: 1;
  background-color: #191970;
  color: white;
`;

// This is the main component which is imported
const Newsletter = () => {
  return (
    <Container>
      {/*Importing header from Categories and using it here  */}
      <Header>NewsLetter</Header>
      {/* This element has all the components of the letterhead besides the header */}
      <InfoWrapper>
        <Description>
          Enter your Email Adress to get notified about latest products and
          offers
        </Description>
        {/* This contains the input field  */}
        <InputContainer>
          <Input placeholder="Your Email Address" />
          <Button>
            <Send />
          </Button>
        </InputContainer>
      </InfoWrapper>
    </Container>
  );
};

export default Newsletter;
