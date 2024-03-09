import styled from "styled-components";
import { Button } from "./shared_styled_elements";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// This is the top most level element
const Container = styled.div`
  padding: 10px;
  background-color: #e2eef3;
  height: 100%;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: space-between;
`;

// This wraps around the Name Section
const NameWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
`;

// This is the input box for the review that the user writes
const ReviewBox = styled.textarea`
  resize: none;
  background-color: white;
  border-color: #cfcfcf;
  padding: 5px;
  border-width: 1px;
  border-radius: 2%;
  height: 100%;
  width: 100%;
  font-weight: 700;
  vertical-align: top;
`;
// This is the input box for the name the user enters
const NameBox = styled.input`
  background-color: white;
  border-color: #cfcfcf;
  padding: 5px;
  border-width: 1px;
  border-radius: 2%;
  height: 25px;
  width: 150px;
  font-weight: 700;
`;
const StarsWrapper = styled.span`
  flex: 0.5;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  width: 50%;
  margin-top: 60px;
  justify-content: space-between;

  @media only screen and (max-width: 480px) {
    width: 100%;
    margin-top: 20px;
  }
`;

// This wraps around the Reviews Section
const ReviewWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const AddReview = () => {
  const { _id } = useParams(); // Extract ID from URL

  console.log("add rev", _id);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Specify type of 'e'
    console.log("da review", review);
    console.log("daname", name);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5001/products/createReview`,
        {
          productId: _id,
          name,
          rating,
          comment: review,
        }
      );
      console.log("Review submitted successfully:", response.data);
      // Reset form fields after successful submission
      setName("");
      setReview("");
      setRating(0);
      setHoverValue(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // Function to display stars
  function handleDisplayStars() {
    const [currentFilledStars, setCurrentFilledStars] = useState(0);
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

    // This function is displaying the unfilled stars at the beginning
    const displayStars = () => {
      const starsArray = Array.from({ length: 5 });
      return starsArray.map((_, index) => (
        <StarIcon
          key={index}
          sx={{
            color:
              (hoverValue || currentFilledStars) > index ? "#e0c00b" : "grey",
            cursor: "pointer",
          }}
          onClick={() => handleClick(index + 1)}
          onMouseOver={() => handleHover(index + 1)}
          onMouseLeave={handleMouseLeave}
        />
      ));
    };
    // This function is handling the event when the user clicks the stars
    const handleClick = (value: number) => {
      setCurrentFilledStars(value);
      setRating(value);
      console.log(value);
    };

    // This function handles when the cursor hovers over the stars
    const handleHover = (value: number) => {
      setHoverValue(value);
    };
    // This function handles what happens when we hover away
    const handleMouseLeave = () => {
      setHoverValue(undefined);
    };

    return displayStars();
  }

  return (
    <Container>
      <ReviewWrapper>
        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <NameWrapper>
              <label>Your Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </NameWrapper>
          </div>
          {/* Review Input */}
          <div>
            <NameWrapper>
              <label>Your Review:</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </NameWrapper>
          </div>
          {/* Stars Section */}
          <div>
            <StarsWrapper>{handleDisplayStars()}</StarsWrapper>
          </div>
          {/* Submit Button */}
          <ButtonWrapper>
            <button type="submit">Post Review</button>
          </ButtonWrapper>
        </form>
      </ReviewWrapper>
    </Container>
  );
};

export default AddReview;
