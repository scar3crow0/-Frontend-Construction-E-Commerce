import styled, { css } from "styled-components";
import React from "react";
import { useState } from "react";
import { FormEvent } from "react";
import { ChangeEvent } from "react";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { BoldHeading, Desc } from "./shared_styled_elements";
import { Button, Title, Input } from "../components/shared_styled_elements";

// This wraps around all the product details
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  @media only screen and (max-width: 480px) {
    height: 250vh;
  }
`;

const ProductListWrapper = styled.div`
 
  width: 80%;
  height: 80%;
  padding: 50px;
  margin: 40px;
  background-color: whitesmoke;
  border-width: 1px;
  border-color: #191970;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  `;

const Customstyles1 = styled.div`
  width: 100%;
  position: relative;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  text-align: center;
  overflow-x: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
  font-size: 0.875rem;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
`;

const StyledThead = styled.thead`
  font-size: 0.75rem;
  text-transform: uppercase;
  background-color: #f9fafb;
  color: #374151;
`;

const StyledTh = styled.th`
  padding: 0.75rem 1.5rem;
`;

const StyledTd = styled.td`
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-weight: 500;
`;

const StyledTr = styled.tr`
  &:nth-child(odd) {
    background-color: #fff;
  }
  &:nth-child(even) {
    background-color: #f9fafb;
  }
  &:hover {
    background-color: #edf2f7;
  }
`;

const StyledLink = styled.a`
  color: #3b82f6;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledAction = styled.td`
  padding: 0.75rem 1.5rem;
`;

// const CustomDiv = styled.div`
//   ${Customstyles1}
// `;

const SellerProductList = () => {
  return (
    <Container>
      <ProductListWrapper>
        <Customstyles1>
          {" "}
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh scope="col">Product name</StyledTh>
                <StyledTh scope="col">Color</StyledTh>
                <StyledTh scope="col">Category</StyledTh>
                <StyledTh scope="col">Price</StyledTh>
                <StyledTh scope="col">Action</StyledTh>
              </tr>
            </StyledThead>
            <tbody>
              <StyledTr>
                <StyledTd>Apple MacBook Pro 17"</StyledTd>
                <StyledTd>Silver</StyledTd>
                <StyledTd>Laptop</StyledTd>
                <StyledTd>$2999</StyledTd>
                <StyledAction>
                  <StyledLink href="#">Edit</StyledLink>
                </StyledAction>
              </StyledTr>
              {/* Add more product rows as needed */}
            </tbody>
          </StyledTable>
        </Customstyles1>
      </ProductListWrapper>
    </Container>
  );
};

export default SellerProductList;
