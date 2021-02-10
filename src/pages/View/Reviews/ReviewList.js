import React from "react";

import { ReviewCard } from "./ReviewCard";

export const ReviewList = ({ reviews }) =>
  reviews.length ? (
    <ul>
      {reviews.map((review, i) => (
        <ReviewCard key={i} review={review} />
      ))}
    </ul>
  ) : (
    <p>
      Looks like this spot doesn't have any reviews yet... Give back to the
      community. Share your thoughts about the spot so others know what to
      expect!
    </p>
  );
