import styled from "styled-components";
import { Desc } from "./shared_styled_elements";
import { Add, Remove } from "@mui/icons-material";
import axios from "axios";
import CartBody from "./CartBody";
import React from "react";

// This wraps around each product
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom-width: 1px;
  padding: 5px;
  @media only screen and (max-width: 480px) {
    width: 100vw;
  }
`;

// This has the Product Image and the Product Details
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

// These are within the Product Details element
const Image = styled.img`
  width: 200px;
`;

// These are the details of the product besides the image
const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// This is a separate element for price besides the product detail element
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// This wraps around the Quantity of items section
const QuantityWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: 500;
`;

// Special styling for the price text
const Pricetext = styled.h1`
  color: red;
  font-style: italic;
  font-weight: 700;
  margin-top: 7px;
`;

// This are the props for each product within the cart
interface CartProductProps {
  item: {
    productId: string;
    image: string;
    name: string;
    price: number;
    description: string;
    totalprice: number;
    quantity: number;
  };
  updateCartItem: (productId: string, quantity: number) => void;
}

const baseurl = "../../public/images/uploads";

const CartProduct = ({ item, updateCartItem }: CartProductProps) => {
  const handleAddItem = async () => {
    try {
      await axios.put(
        `http://localhost:5001/cart/updateCartItemQuantity/${item.productId}`,
        {
          productId: item.productId,
          quantity: item.quantity + 1,
        }
      );
      updateCartItem(item.productId, item.quantity + 1); // Update locally
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      await axios.put(
        `http://localhost:5001/cart/updateCartItemQuantity/${item.productId}`,
        {
          productId: item.productId,
          quantity: item.quantity - 1,
        }
      );
      updateCartItem(item.productId, item.quantity - 1); // Update locally
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const imageurl = `${baseurl}/${item.image}`;

  const totalprice = item.price * item.quantity;

  console.log("Item:", item);
  return (
    <Product>
      {/* This is the wrapper for the image and the details */}
      <ProductDetail>
        {/* Displaying the image entered by the user */}
        <Image src={imageurl} alt={item.name} />
        <Details>
          <Desc>
            {/* Displaying the product name entered by the user */}
            <u>Product Name:</u> {item.name}
          </Desc>
          <Desc>
            {/* Displaying the product Id entered by the user */}
            <u>Product Id:</u> {item.productId}
          </Desc>
        </Details>
      </ProductDetail>
      {/* This section includes the price and quantity details */}
      <PriceDetails>
        <QuantityWrapper>
          <Remove onClick={() => handleRemoveItem()} />
          {/* Here, you should use the quantity provided in the item */}
          {item.quantity}
          <Add onClick={() => handleAddItem()} />
        </QuantityWrapper>
        <Pricetext>Total Price: {totalprice}RS</Pricetext>
      </PriceDetails>
    </Product>
  );
};

export default CartProduct;
