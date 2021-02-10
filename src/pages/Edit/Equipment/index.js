import React from "react";
import styled from "styled-components";

import aperture from "assets/002-aperture.svg";
import optical from "assets/026-optical.svg";
import timer from "assets/033-timer.svg";
import brushes from "assets/013-brushes.svg";
import tripod from "assets/034-tripod.svg";
import flash from "assets/016-flash.svg";
import lens from "assets/019-lens.svg";
import telephoto from "assets/032-len.svg";

const equipmentList = [
  { name: "Tripod", icon: tripod },
  { name: "Remote Shutter Release", icon: timer },
  { name: "Filters", icon: optical },
  { name: "Cleaning Equipment", icon: brushes },
  { name: "Flash / Speedlight", icon: flash },
  { name: "Wide Angle Lens", icon: lens },
  { name: "Telephoto Lens", icon: telephoto },
  { name: "Prime Lens", icon: lens },
  { name: "Macro Lens", icon: aperture },
];

export const Equipment = ({ equipment, setEquipment }) => {
  const isEditing = setEquipment;

  const onClick = (selection) => {
    if (!isEditing) return;
    const match = equipment.find((e) => e === selection);
    if (match) {
      setEquipment(
        equipment.filter((e) => e !== selection),
        "equipment"
      );
    } else {
      console.log(selection);
      setEquipment([...equipment, selection], "equipment");
    }
  };
  return (
    <Container>
      {equipmentList.map((e, i) => {
        const match = equipment.find((selected) => selected === e.name);
        return (
          <Item
            key={i}
            onClick={() => onClick(e.name)}
            background={match ? "#F7F7F7" : "#FFFFFF"}
            color={match ? "#60A5FA" : "#222222"}
            hoverCursor={isEditing && "pointer"}
            hoverBackground={isEditing && "#F7F7F7"}
          >
            <Icon alt={e.name} src={e.icon} match={match} />
            {e.name}
          </Item>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  &:hover {
    cursor: ${({ hoverCursor }) => hoverCursor};
    background: ${({ hoverBackground }) => hoverBackground};
  }
`;

const Icon = styled.img`
  margin-right: 16px;
  width: 40px;
  height: 40px;
  filter: ${({ match }) =>
    match
      ? "invert(64%) sepia(27%) saturate(5457%) hue-rotate(191deg) brightness(104%) contrast(96%)"
      : "filter: invert(7%) sepia(0%) saturate(354%) hue-rotate(142deg) brightness(99%) contrast(85%)"};
`;
