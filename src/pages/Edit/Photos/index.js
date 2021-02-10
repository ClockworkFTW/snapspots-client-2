import React, { useState } from "react";
import Masonry from "react-masonry-component";
import styled from "styled-components";

import { Group, Label, Input } from "components/Layout";
import { ButtonAction } from "components/Button";

export const Photos = ({ photos, setPhotos }) => {
  const [input, setInput] = useState("");

  const addPhoto = () => {
    const updatedPhotos = [...photos, input];
    setPhotos(updatedPhotos, "photos");
    setInput("");
  };

  const removePhoto = (photo) => {
    const updatedPhotos = photos.filter((p) => p !== photo);
    setPhotos(updatedPhotos, "photos");
  };

  return (
    <div>
      <Group>
        <Label htmlFor="photo">Photo</Label>
        <Input
          id="photo"
          type="text"
          placeholder="https://www.my-photo.jpg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <ButtonAction onClick={addPhoto} color="#60a5fa">
          Add
        </ButtonAction>
      </Group>
      <Masonry>
        {photos.map((photo, i) => (
          <Photo
            key={i}
            alt={`photo-${i}`}
            src={photo}
            onClick={() => removePhoto(photo)}
          />
        ))}
      </Masonry>
    </div>
  );
};

const Photo = styled.img`
  margin: 10px;
  width: calc(25% - 20px);
  height: auto;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
