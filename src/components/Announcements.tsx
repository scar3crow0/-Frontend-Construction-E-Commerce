import styled from "styled-components";

// Defining properties of Div that will contain announcements
const Container = styled.div`
  height: 30px;
  background-color: #191970;
  color: #f8f8ff;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
`;

// This component is exported in the end
const Announcements = () => {
  return <Container>Free Shipping on orders above 10,000Rs!</Container>;
};

export default Announcements;
