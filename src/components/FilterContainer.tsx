import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 10vh;
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: right;
  justify-content: space-between;
`;

const Filter1 = styled.div`
  margin: 20px;
  @media only screen and (max-width: 480px) {
    margin: 0px;
  }
`;

const Filter2 = styled.div`
  margin: 20px;
  @media only screen and (max-width: 480px) {
    margin: 0px;
  }
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 10px;
  background-color: #e2eef3;
  margin: 10px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  @media only screen and (max-width: 480px) {
    margin: 0px;
    margin-top: 10px;
  }
`;

const Option = styled.option``;

interface FilterContainerProps {
  onFilterChange: (priceRange: string) => void;
  onSortChange: (option: string) => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const priceRange = event.target.value;
    onFilterChange(priceRange);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    onSortChange(option);
  };

  return (
    <Container>
      <Filter1>
        <FilterText>Filter Products</FilterText>
        <Select onChange={handleFilterChange}>
          <Option value="500">Products under 500</Option>
          <Option value="1200">Products under 1200</Option>
          <Option value="10000">Products under 10000</Option>
          <Option value="100000">Products over 10k </Option>
        </Select>
      </Filter1>
      <Filter2>
        <FilterText>Sort Products</FilterText>
        <Select onChange={handleSortChange}>
          <Option value="1">Price High to Low</Option>
          <Option value="asc">Price Low to High</Option>
        </Select>
      </Filter2>
    </Container>
  );
};

export default FilterContainer;
