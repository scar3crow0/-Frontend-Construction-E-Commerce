import styled from "styled-components";
import { useState } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Desc,
  Button,
  FormWrapper,
  Title,
  Input,
} from "../components/shared_styled_elements";

// This is the top most level container
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  // Using this to create a thin white layer on top of the image
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("src/assets/images/bgpic_resgister.jpg") center;
  background-size: cover;
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

const BecomeSeller = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyname: "",
    address: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      // Handle the case where token is not available
      console.error("No token found. User is not authenticated.");
      // Redirect the user to the login page or display an error message
      return;
    }

    // Set the Authorization header with the token
    const headers = {
      Authorization: token,
    };

    try {
      // Make a POST request to your backend endpoint
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5001/users/registercompany",
        formData,
        { headers }
      );

      // Handle the response, e.g., show a success message or redirect the user
      console.log("Registration successful", response.data);
      navigate("/Profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // It's an AxiosError
        console.error("registration failed", error.response?.data);
      } else {
        // It's some other type of error
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Container>
      <FormWrapper margin="0px">
        <Title>Register Your Company</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Company name"
            name="companyname"
            value={formData.companyname}
            onChange={handleInputChange}
          />
          <Input
            placeholder="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <TermsWrapper>
            <Desc>
              By creating an account. I consent to all the terms and condtions
              of the organization
            </Desc>
          </TermsWrapper>
          <ButtonWrapper>
            <Button
              width="100%"
              bgcolor="#191970"
              fontcolor="white"
              bordercolor="white"
            >
              REGISTER COMPANY
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default BecomeSeller;
