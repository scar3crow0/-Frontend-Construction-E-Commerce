import Navbar from "../components/navbar";
import Announcements from "../components/Announcements";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SingleProductDetails from "../components/SingleProductDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Route } from "react-router-dom"; // Import Route

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState(null);
  const { _id } = useParams(); // Use lowercase "_id" to match the parameter in the path

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const ProductId = _id;
        const response = await axios.get(
          `http://localhost:5001/products/${ProductId}`
        );
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [_id]); // Add _id to dependency array

  return (
    <div>
      <Announcements />
      <Navbar />
      {productData && <SingleProductDetails product={productData} />}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;

// Wrap ProductDetailsPage with Route and pass productId as a parameter
<Route
  path="/products/singleproduct/:_id" // Update the path to include productId
  element={<ProductDetailsPage />}
/>;
