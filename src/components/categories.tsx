import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categoriesInfo } from "../assets/data";
import { Header } from "./shared_styled_elements";
// The top most level wrapper
const Container = styled.div`
  height: 100vh;
  width: 100%;
  @media only screen and (max-width: 480px) {
    height: auto;
  }
`;

// This will contain all the categories
const AllCategoriesWrapper = styled.div`
  background-color: #e2eef3;
  height: 90%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

// The main component which is returned
const Categories = () => {
  return (
    <Container>
      {/* Wrapping the Header */}
      <Header>Categories</Header>
      {/* This component wraps around all the categories  */}
      <AllCategoriesWrapper>
        {/* Getting Data from categoriesInfo and mapping it to individual items */}
        {categoriesInfo.map((item) => (
          // Calling the Categoryitem component to get the individual styled category items
          <CategoryItem item={item} key={item.id} />
        ))}
      </AllCategoriesWrapper>
    </Container>
  );
};

export default Categories;
