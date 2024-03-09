import styled from "styled-components";
import {
  Desc,
  Button,
  FormWrapper,
  Title,
  Input,
} from "../components/shared_styled_elements";

// This is the top most level container
const Container = styled.div`
  height: 120vh;
  width: 100%;
  padding: 20px;
  // Using this to create a thin white layer on top of the image
  background: linear-gradient(0deg, #003ab6c5, #cedff1);

  display: flex;
  justify-content: center;
  align-items: center;
`;
// Styling for the form
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0px 20px 0px;
  width: 100%;
  overflow: hidden;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// Styling for the wrapper around the Desc
export const TermsWrapper = styled.div`
  margin: 20px;
`;

const CheckoutForm = () => {
  return (
    <Container>
      <FormWrapper margin="15px 0px 15px 0px">
        <Title>Checkout Form</Title>
        <Form>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Phone Number" />
          <Input placeholder="Email Address" />
          <Input placeholder="City" />
          <Input placeholder="Neighbourhood" />
          <Input placeholder="Street" />
          <Input placeholder="House Address" />
          <TermsWrapper>
            <Desc>
              We are currently only offering cash on delivery. Product to be
              delivered in 4-5 working days
            </Desc>
          </TermsWrapper>
          <ButtonWrapper>
            <Button
              width="100%"
              bgcolor="#191970"
              fontcolor="white"
              bordercolor="white"
            >
              PLACE ORDER
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default CheckoutForm;
