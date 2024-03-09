import styled from "styled-components";
import { Title, Button } from "./shared_styled_elements";
import axios from "axios";
import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//This contains the central body for the cart
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 30vh;
  height: auto;
  margin-bottom: 50px;
`;
// This contains the buttons
const TopOptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  padding: 5px;
  max-height: 55px;
  overflow: hidden;
  position: relative;
  background-color: #e2eef3;
`;

// This wraps around the title
const TitleWrapper = styled.div`
  position: absolute;
  left: 50%; /* Move to the horizontal center */
  transform: translateX(-50%); /* Adjust to center */
  top: 0;
  bottom: 0;
`;

// This is the lower part which contains the main body for the cart
const LowerBody = styled.div`
  margin-top: 7px;
  flex: 3;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;
// This is the part which has all the relevant information for all products of the cart
const Info = styled.div`
  flex: 3;
`;
// This is the part which has the Summary for the price
const Summary = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-width: 2px;
  min-height: 430px;
  max-height: 450px;
  padding: 20px;
  border-color: black;
  @media only screen and (max-width: 480px) {
    justify-content: space-between;
  }
`;

const SummaryPerLine = styled.div`
  margin-top: 5px;
  flex: 1;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

// This is the styling for the normal text
const SummaryInfoText = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-right: 5px;
`;
interface PriceValueProps {
  fontSize: string;
  color: string;
}
const PriceValue = styled.h1<PriceValueProps>`
  font-size: ${(props) => props.fontSize};
  font-weight: 600;
  color: ${(props) => props.color};
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
}
// This is the main component being returned
const CartBody = () => {
  const [cartItems, setCartItems] = useState<CartProductProps["item"][]>([]);

  // Setting the value for delivery charges
  const deliveryCharges = 500;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<{
          cartItems: CartProductProps["item"][];
        }>("http://localhost:5001/cart/cartitems");
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotalPrice = (cartItems: CartProductProps["item"][]) => {
    // Use reduce to iterate over each item in the cart and calculate the total price
    const totalPrice = cartItems.reduce((total, item) => {
      // Multiply the price of the item by its quantity and add to the total
      return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
  };

  // Function to calculate the tax value (13% of the total price)
  const calculateTaxValue = (totalPrice: number) => {
    // Calculate the tax value (13% of the total price)
    const taxValue = 0.15 * totalPrice;
    return taxValue;
  };

  // Function to calculate the net price, including tax and delivery fee if applicable
  const calculateNetPrice = (
    totalPrice: number,
    taxValue: number,
    deliveryFee: number
  ) => {
    // Calculate the total price including tax
    const totalPriceWithTax = totalPrice + taxValue;

    // Check if the total price with tax exceeds the delivery fee threshold
    if (totalPriceWithTax >= 10000) {
      // If so, return the total price with tax only

      return totalPriceWithTax;
    } else {
      // Otherwise, add the delivery fee and return the total price with tax and delivery fee
      return totalPriceWithTax + deliveryFee;
    }
  };

  const calculateDeliveryFee = (netPrice: number): string => {
    if (netPrice > 10000) {
      return "Free Delivery";
    } else {
      return "500";
    }
  };

  const totalPrice = calculateTotalPrice(cartItems);

  // Calculate the tax value (13% of the total price)
  const taxValue = calculateTaxValue(totalPrice);

  // Calculate the net price, including tax and delivery fee if applicable
  const netPrice = calculateNetPrice(totalPrice, taxValue, deliveryCharges);

  const deliverycheck = calculateDeliveryFee(netPrice);

  const Navigate = useNavigate();

  const handleCheckoutClick = () => {
    Navigate("/checkout");
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      await axios.put(
        `http://localhost:5001/cart/updateCartItemQuantity/${productId}`,
        {
          productId,
          quantity,
        }
      );
      // After updating the cart item on the server, update the local state
      const updatedCartItems = cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <Container>
      {/*Top options contain the two buttons  */}
      <TopOptions>
        <Button
          width="auto"
          bgcolor="#e2eef3"
          fontcolor="#191970"
          bordercolor="#191970"
        >
          Back
        </Button>
        <TitleWrapper>
          <Title> Cart</Title>
        </TitleWrapper>
      </TopOptions>

      {/*If the cart is non-empty then this is displayed */}
      {cartItems.length > 0 && (
        <LowerBody>
          <Info>
            {cartItems.map((item) => (
              <CartProduct
                key={item.productId}
                item={item}
                updateCartItem={updateCartItem}
              />
            ))}
          </Info>
          <Summary>
            {/* This is the title  */}
            <Title>Order Summary</Title>

            {/*Total Price before any addition */}
            <SummaryPerLine>
              {/* Displaying the type of price  */}
              <SummaryInfoText>Total Price before tax :</SummaryInfoText>
              {/* Calling the function to display the price before any additions */}
              <PriceValue fontSize="20px" color="black">
                {totalPrice}RS
              </PriceValue>
            </SummaryPerLine>

            {/* Calculating the tax value */}
            <SummaryPerLine>
              <SummaryInfoText>Tax Value(15%) :</SummaryInfoText>
              <PriceValue fontSize="20px" color="black">
                {taxValue}RS
              </PriceValue>
            </SummaryPerLine>

            {/* Calculating the delivery fee */}
            <SummaryPerLine>
              <SummaryInfoText>Delivery Fee :</SummaryInfoText>
              <PriceValue fontSize="20px" color="black">
                {deliverycheck}
              </PriceValue>
            </SummaryPerLine>

            {/* Displaying the total checkout price */}
            <SummaryPerLine>
              <SummaryInfoText>Net Price :</SummaryInfoText>
            </SummaryPerLine>

            {/* Displaying the calculated checkout price */}
            <SummaryPerLine>
              <PriceValue color="red" fontSize="30px">
                {netPrice}RS
              </PriceValue>
            </SummaryPerLine>

            {/* Displaying the Checkout Button */}
            <SummaryPerLine>
              <Button
                width="100%"
                bgcolor="#191970"
                fontcolor="white"
                bordercolor="white"
                onClick={handleCheckoutClick}
              >
                Proceed To Checkout
              </Button>
            </SummaryPerLine>
          </Summary>
        </LowerBody>
      )}
      {/*If the cart is empty then this is displayed */}
      {cartItems.length === 0 && (
        <LowerBody>
          <Title>Your Cart Is Empty</Title>
        </LowerBody>
      )}
    </Container>
  );
};

export default CartBody;
