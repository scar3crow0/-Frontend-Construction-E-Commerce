import styled from "styled-components";
import { useState } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Input } from "../components/shared_styled_elements";

const categories = [
  "Hardware Tools",
  "Larger Machines",
  "Materials",
  "Plumbing and Electrical",
  "Saftey and Personal Protective Equipement",
  "Heating and Ventilation",
  "Building plans and Blueprints",
  "Concrete and Masonary",
];

// This wraps around all the product details
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 480px) {
    height: 250vh;
  }
`;

// This wrapper wraps around the Image and all the descriptions for the product
const ImageAndInfoWrapper = styled.div`
 
  width: 100%;
  height: 80%;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  `;

const FormWrapper = styled.form`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  margin: 0px 20px 50px 0px;
  margin-bottom: 10px; /* Increase margin between input fields */
  margin-left: 20px;
  height: 100%;
  width: 60%;
  overflow: hidden;
  background-color: whitesmoke;
  border-width: 1px;
  border-color: #191970;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  background-color: whitesmoke;
  border-width: 1px;
  border-color: #191970;
`;
const Image = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  @media only screen and (max-width: 480px) {
    width: 95%;
    background: #000;
  }
`;

const AddProductSection = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    brand: "",
    category: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file || null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) {
      console.log("No image selected.");
      return;
    }

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
      "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
    };

    try {
      // Create a FormData object to append the form data and image
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("image", selectedImage); // Append the selected image

      // Make a POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:5001/products/",
        formDataToSend, // Use formDataToSend instead of formData
        { headers }
      );

      // Handle the response, e.g., show a success message or redirect the user
      console.log("Product Added.", response.data);

      // Reset form fields after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
        brand: "",
        category: "",
      });
      setSelectedImage(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // It's an AxiosError
        console.error("process failed", error.response?.data);
      } else {
        // It's some other type of error
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Container>
      <ImageAndInfoWrapper>
        <ImageWrapper>
          {selectedImage && (
            <Image src={URL.createObjectURL(selectedImage)} alt="Selected" />
          )}
        </ImageWrapper>

        <FormWrapper onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <Input
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
          <Button
            type="submit"
            width="auto"
            bgcolor="#191970"
            fontcolor="white"
            bordercolor="white"
          >
            Add Product
          </Button>
        </FormWrapper>
      </ImageAndInfoWrapper>
    </Container>
  );
};

export default AddProductSection;
