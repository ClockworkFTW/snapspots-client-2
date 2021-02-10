import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import StarRatings from "react-star-ratings";
import styled from "styled-components";

export const ReviewCard = ({ review }) => (
  <Container>
    <User to={`/profile/${review.user.id}`}>
      <UserAvatar
        alt={`${review.user.username} avatar`}
        src="https://i.pravatar.cc/300"
      />
      <UserName>{review.user.username}</UserName>
      <UserLocation>San Francisco, California</UserLocation>
    </User>
    <Content>
      <ReviewTitle>{review.title}</ReviewTitle>
      <Metadata>
        <StarRatings
          rating={review.rating}
          starRatedColor="#f5d24b"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="3px"
          name="rating"
        />
        <ReviewDate>
          Reviewed {moment(review.createdAt).format("MMMM D, YYYY")}
        </ReviewDate>
      </Metadata>
      <ReviewMessage>{review.message}</ReviewMessage>
      <ReviewVisit>
        <strong>Date of experience: </strong>
        {moment(review.visitedOn).format("MMMM D, YYYY")}
      </ReviewVisit>
    </Content>
  </Container>
);

const Container = styled.div`
  display: flex;
  padding: 30px 0;
  border-bottom: 1px solid #e6e6e6;
  &:nth-last-child(1) {
    border-bottom: none;
  }
`;

const User = styled(Link)`
  flex: 0 0 120px;
  margin-right: 20px;
  text-align: center;
  text-decoration: none;
  color: #000000;
`;

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 6px;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
`;

const UserLocation = styled.div`
  font-size: 12px;
`;

const Content = styled.div``;

const ReviewTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
`;

const Metadata = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0 10px 0;
`;

const ReviewDate = styled.h3`
  margin-left: 10px;
  font-size: 14px;
`;

const ReviewMessage = styled.p`
  line-height: 1.5;
`;

const ReviewVisit = styled.h3`
  margin-top: 10px;
  font-size: 14px;
`;
