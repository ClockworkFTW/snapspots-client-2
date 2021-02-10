import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

import { createReview } from "pages/View/spotSlice";

export const ReviewForm = ({ spotId, setIsEditing }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  const INITIAL_STATE = {
    title: "",
    rating: 0,
    message: "",
    visitedOn: "",
  };

  const [review, setReview] = useState(INITIAL_STATE);

  const onChange = (val, prop) => setReview({ ...review, [prop]: val });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createReview({ ...review, spotId, userId: user.id }));
    setIsEditing(false);
    setReview(INITIAL_STATE);
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <StarRatings
          rating={review.rating}
          starRatedColor="#fbbf25"
          starHoverColor="#fbbf25"
          changeRating={onChange}
          numberOfStars={5}
          name="rating"
        />
        <Group>
          <Label htmlFor="title">Give your review a title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Summarize your experience"
            value={review.title}
            onChange={(e) => onChange(e.target.value, "title")}
          />
        </Group>
        <Group>
          <Label htmlFor="visitedOn">When did you go?</Label>
          <Input
            id="visitedOn"
            type="date"
            value={review.visitedOn}
            onChange={(e) => onChange(e.target.value, "visitedOn")}
          />
        </Group>
        <Group>
          <Label htmlFor="message">Leave a review</Label>
          <Textarea
            id="message"
            placeholder="Give back to the community. Share your thoughts about the spot so others know what to expect."
            value={review.message}
            onChange={(e) => onChange(e.target.value, "message")}
          />
        </Group>
        <button type="submit">create review</button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  margin: 30px 0;
`;

const Group = styled.div`
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
`;

const Input = styled.input`
  display: block;
  width: 100%;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  font-family: inherit;
`;
