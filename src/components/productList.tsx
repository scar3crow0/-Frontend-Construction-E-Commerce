import styled from "styled-components";
import { Header, Title } from "./shared_styled_elements";
import Product from "./product";
import Pagination from "@mui/material/Pagination";
import FilterContainer from "./FilterContainer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from React Router

const Container = styled.div`
  height: auto;
  min-height: 50vh;
  width: 100%;
`;

const AllProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  height: auto;
  min-height: 20vh;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ProductListProps {
  heading_name?: string;
}

interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC<ProductListProps> = ({
  heading_name = "Popular Products",
}) => {
  const [productsInfo, setProductsInfo] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(16); // Change pageSize to 16

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/products/popular?page=${currentPage}&limit=${pageSize}` // Update the query parameters
        );
        setProductsInfo(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = async (priceRange: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/products/popular?maxPrice=${priceRange}&page=1&limit=${pageSize}` // Always start from page 1 when filtering
      );
      setProductsInfo(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(1); // Reset current page to 1
    } catch (error) {
      setError("Error filtering products. Please try again later.");
    }
  };

  const handleSortChange = async (option: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/products/popular?sortDirection=${option}&page=1&limit=${pageSize}` // Always start from page 1 when sorting
      );
      setProductsInfo(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(1); // Reset current page to 1
    } catch (error) {
      setError("Error sorting products. Please try again later.");
    }
  };

  return (
    <Container>
      <Header>{heading_name}</Header>
      <FilterContainer
        onFilterChange={(priceRange) => handleFilterChange(priceRange)}
        onSortChange={(option) => handleSortChange(option)}
      />
      {productsInfo.length > 0 ? (
        <div>
          <AllProductsContainer>
            {productsInfo.map((product) => (
              <Product product={product} key={product._id} />
            ))}
          </AllProductsContainer>
          {totalPages > 1 && (
            <PaginationWrapper>
              <Pagination
                count={totalPages}
                variant="outlined"
                color="primary"
                size="large"
                onChange={(event, page) => handlePageChange(page)}
              />
            </PaginationWrapper>
          )}
        </div>
      ) : (
        <Title>There are no products of this category to show</Title>
      )}
    </Container>
  );
};

export default ProductList;
