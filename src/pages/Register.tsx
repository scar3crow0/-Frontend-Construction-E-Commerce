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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
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

    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:5001/users/register",
        formData
      );

      // Handle the response, e.g., show a success message or redirect the user
      console.log("Registration successful", response.data);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // It's an AxiosError
        console.error("Registration failed", error.response?.data);
      } else {
        // It's some other type of error
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Container>
      <FormWrapper margin="0px">
        <Title>Create An Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Input
            placeholder=" Confirm  Password"
            name="confirmPassword"
            type="password"
            // value={formData.confirmPassword}
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
              type="submit"
              width="100%"
              bgcolor="#191970"
              fontcolor="white"
              bordercolor="white"
            >
              CREATE ACCOUNT
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Register;
