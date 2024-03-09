import styled from "styled-components";
import { categoriesInfo } from "../assets/data";
import { useNavigate } from "react-router-dom";
// This is the top most level container

const Container = styled.div`
  height: 80%;
  width: 100%;

  @media only screen and (max-width: 480px) {
    height: 70%;
  }
`;

// This wraps around all the options
const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 10px 0px 10px 0px;

  @media only screen and (max-width: 480px) {
    justify-content: space-around;
    height: 80%;
  }
`;
//This wraps around each row
const EachRow = styled.div`
  flex: 1;
  padding: 5px;
  font-size: 20px;
  border-bottom: 1px solid white;
`;
// Styling for each link
const Links = styled.a`
  cursor: pointer;
  &:hover {
    background-color: #ffffffff;
  }
`;

const SideMenuOptions = () => {
  return (
    <Container>
      <OptionsWrapper>
        {categoriesInfo.map((category) => (
          <EachRowOptions
            categoryName={category.title}
            key={category.id}
          ></EachRowOptions>
        ))}
      </OptionsWrapper>
    </Container>
  );
};

// This component returns each row
interface EachRowOptionsProps {
  categoryName: string;
}
const EachRowOptions = ({ categoryName }: EachRowOptionsProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("cat:", categoryName);
    navigate(`/products/${categoryName}`);
    window.location.reload();
  };

  return (
    <Links onClick={handleClick}>
      <EachRow>{categoryName}</EachRow>
    </Links>
  );
};

export default SideMenuOptions;
