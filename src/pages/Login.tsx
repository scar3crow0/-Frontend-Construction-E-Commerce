import styled from "styled-components";
import { useState } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from 'react-router-dom';
import axios from "axios";
import {
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
    url("src/assets/images/bgpic_login.jpg") center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styling for the form
export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 20px 0px 20px 0px;
  overflow: hidden;
`;

// Wraps around all the links
const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;

// Styling for each link
const Link = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
        "http://localhost:5001/users/login",
        formData
      );

      const { token } = response.data;

      // Store the token securely (e.g., in localStorage)
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `${token}`;

      // Handle the response, e.g., show a success message or redirect the user
      console.log("login successful", response.data);
      navigate("/homepage");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // It's an AxiosError
        console.error("Login failed", error.response?.data);
      } else {
        // It's some other type of error
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Container>
      <FormWrapper margin="0px">
        <Title>Sign In</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <LinkWrapper>
            <Link>Forgot Password?</Link>
            <Link>Create an Account </Link>
          </LinkWrapper>

          <Button
            type="submit"
            width="auto"
            bgcolor="#191970"
            fontcolor="white"
            bordercolor="white"
          >
            LOG IN
          </Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
