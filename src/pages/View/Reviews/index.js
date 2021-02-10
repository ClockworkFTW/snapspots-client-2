import React, { useState } from "react";
import { useSelector } from "react-redux";
import { faPen, faTrash } from "@fortawesome/pro-light-svg-icons";
import styled from "styled-components";

import { SIGN_IN } from "navigation/CONSTANTS";
import { ButtonAction } from "components/Button";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";

export const Reviews = ({ spotId, reviews }) => {
  const user = useSelector((state) => state.user.data);
  const [isEditing, setIsEditing] = useState(false);

  const to = user ? null : SIGN_IN;
  const onClick = () => {
    if (user) setIsEditing(!isEditing);
  };
  const icon = isEditing ? faTrash : faPen;

  return (
    <>
      <Header>
        Reviews
        <ButtonAction
          to={to}
          onClick={onClick}
          icon={icon}
          color="#60A5FA"
          size="14px"
          margin="0 0 0 12px"
        >
          {isEditing ? "discard" : "create"}
        </ButtonAction>
      </Header>
      {isEditing ? (
        <ReviewForm
          spotId={spotId}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ReviewList reviews={reviews} />
      )}
    </>
  );
};

const Header = styled.h1`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
`;
