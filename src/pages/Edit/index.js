import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { faArrowAltLeft } from "@fortawesome/pro-light-svg-icons";

import {
  getSpot,
  createSpot,
  updateSpot,
  deleteSpot,
} from "pages/View/spotSlice";

import { Categories } from "pages/Edit/Categories";
import { Equipment } from "pages/Edit/Equipment";
import { Photos } from "pages/Edit/Photos";
import { Map } from "pages/Edit/Map";
import { Row, Group, Label, Input, Textarea } from "components/Layout";
import { ButtonClear } from "components/Button";

const NEW_SPOT = {
  name: "",
  description: "",
  city: "",
  state: "",
  country: "",
  categories: [],
  equipment: [],
  photos: [],
  lat: 39.8283,
  lng: -98.5795,
};

const View = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const spot = useSelector((state) => state.spot.data);
  const [data, setData] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id === "new") {
      setData(NEW_SPOT);
    } else {
      if (!spot) return dispatch(getSpot({ id }));
      setData(spot);
    }
  }, [dispatch, spot, id]);

  const onChange = (val, prop) => setData({ ...data, [prop]: val });

  const onDiscard = () => {
    setData(null);
    history.goBack();
  };

  const onDelete = () => {
    dispatch(deleteSpot({ id: spot.id, history }));
  };

  const onSubmit = () => {
    if (id === "new") {
      dispatch(createSpot({ spot: { ...data, userId: user.id }, history }));
    } else {
      dispatch(updateSpot({ spot: data, history }));
    }
  };

  return (
    data && (
      <Container>
        <Banner>
          <h1>Edit Spot</h1>
          <div>
            <ButtonClear
              onClick={onDiscard}
              icon={faArrowAltLeft}
              color="#222222"
              margin="0 0 0 16px"
            >
              Discard
            </ButtonClear>
            {data.id && (
              <ButtonClear
                onClick={onDelete}
                icon={faArrowAltLeft}
                color="#222222"
                margin="0 0 0 16px"
              >
                Delete
              </ButtonClear>
            )}
            <ButtonClear
              onClick={onSubmit}
              icon={faArrowAltLeft}
              color="#222222"
              margin="0 0 0 16px"
            >
              {data.id ? "Update" : "Create"}
            </ButtonClear>
          </div>
        </Banner>
        <Content>
          <Sidebar>
            <Map
              isEditing={true}
              data={data}
              setData={setData}
              width="100%"
              height="400px"
            />
            <Categories categories={data.categories} setCategories={onChange} />
          </Sidebar>
          <Main>
            <div style={{ margin: "0 10px" }}>
              <Group>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Awesome spot"
                  value={data.name}
                  onChange={(e) => onChange(e.target.value, "name")}
                />
              </Group>
              <Row>
                <Group width="calc(33% - 10px)">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={data.city}
                    onChange={(e) => onChange(e.target.value, "city")}
                  />
                </Group>
                <Group width="calc(33% - 10px)">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="state"
                    value={data.state}
                    onChange={(e) => onChange(e.target.value, "state")}
                  />
                </Group>
                <Group width="calc(33% - 10px)">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="country"
                    value={data.country}
                    onChange={(e) => onChange(e.target.value, "country")}
                  />
                </Group>
              </Row>
              <Group>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  type="text"
                  placeholder="description"
                  value={data.description}
                  onChange={(e) => onChange(e.target.value, "description")}
                />
              </Group>
            </div>
            <Equipment
              equipment={data.equipment || []}
              setEquipment={onChange}
            />
            <Photos photos={data.photos} setPhotos={onChange} />
          </Main>
        </Content>
      </Container>
    )
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 34px;
`;

const Banner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: bottom;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
`;

const Sidebar = styled.div`
  margin-right: 20px;
`;

const Main = styled.div``;

export default View;
