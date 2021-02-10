import React, { useState } from "react";

import * as google from "services/google";
import { Group, Label, Input } from "components/Layout";

export const MapSearch = ({ viewport, setViewport }) => {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState([]);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
    google.autocomplete(value, setPredictions);
  };

  const onClick = async (p) => {
    setInput(p.description);
    setPredictions([]);
    const place = await google.geocode(p.place_id);
    const { lat, lng } = place;
    setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 15 });
  };

  return (
    <Group>
      <Label htmlFor="location">Location</Label>
      <Input
        id="location"
        type="text"
        placeholder="Search..."
        value={input}
        onChange={onChange}
      />
      <ul>
        {predictions.map((p) => (
          <li onClick={() => onClick(p)}>{p.description}</li>
        ))}
      </ul>
    </Group>
  );
};
