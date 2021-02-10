import React, { useState } from "react";

import { PhotoSlider } from "./PhotoSlider";
import { PhotoGallery } from "./PhotoGallery";

export const Photos = ({ name, photos }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  return isSliderOpen ? (
    <PhotoSlider
      name={name}
      photos={photos}
      toggle={() => setIsSliderOpen(false)}
    />
  ) : (
    <PhotoGallery
      name={name}
      photos={photos}
      toggle={() => setIsSliderOpen(true)}
    />
  );
};
