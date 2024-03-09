import styled from "styled-components";
import AddProductsection from "../components/Addproductsection"; // Import your profile component
import Navbar from "../components/navbar";
import Announcements from "../components/Announcements";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SellerProductList from "../components/SellerProductList";
import {
  Button,
  FormWrapper,
  Title,
  Input,
} from "../components/shared_styled_elements";
import { Announcement } from "@mui/icons-material";

// Render the profile component with mock data
const Profile = () => {
  return (
    <div>
      <Announcements />
      <Navbar />
      <AddProductsection />;
      <SellerProductList />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Profile;
