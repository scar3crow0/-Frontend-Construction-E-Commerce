import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Icon } from "./shared_styled_elements";
import { useNavigate } from "react-router-dom";

// This is the top most container
const Container = styled.div`
  height: 285px;
  width: 20%;
  margin: 20px;
  position: relative;
  border-radius: 20px;
  background-color: #e2eef3;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
  @media only screen and (max-width: 480px) {
    height: 50%;
    width: 100%;
  }
`;
//This is the circle behind the image, purely for design purposes
const Circle = styled.div`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;

// This is the styling for the image
const Image = styled.img`
  height: 96%;
  width: auto;
  z-index: 2;
`;
// This wraps around all the information
const InfoWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 3;
  display: flex;
  align-items: bottom;
  justify-content: space-between;
  background-color: white;
`;
// Defining the title
const Info = styled.h1`
  font-weight: bold;
`;

// This wraps around the icon
const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 3;
  margin: 10px;
`;

// These are the arguments this component accepts in order to dynamically render the data given to it
interface ProductProps {
  product: {
    _id: string;
    image: string;
    name: string;
    price: number;
  };
}

const baseurl = "../../public/images/uploads"; // Use forward slashes instead of backslashes

// This is the main component which is returned
const Product = ({ product }: ProductProps) => {
  const imageurl = `${baseurl}/${product.image}`;

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the product description page
    navigate(`/products/singleproduct/${product._id}`); // Use backticks for template literals
  };
  return (
    <Container onClick={handleClick}>
      {/*Displaying the Circle over here  */}
      <Circle />
      {/*Linking the image */}
      <Image src={imageurl} alt={product.name} />
      <InfoWrapper>
        {/* Adding the title */}
        <Info>{product.name}</Info>
        {/* Adding the price */}
        <Info>{product.price}RS</Info>
      </InfoWrapper>
      <IconWrapper>
        {/* Adding icon */}
        <Icon>
          <ShoppingCartIcon></ShoppingCartIcon>
        </Icon>
      </IconWrapper>
    </Container>
  );
};

export default Product;
