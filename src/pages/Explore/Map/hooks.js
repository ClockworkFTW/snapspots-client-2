import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MapboxglSpiderifier from "mapboxgl-spiderifier";

import { setPopup } from "../Map/popupSlice";

export const useUrlViewport = () => {
  const { search } = useLocation();
  if (!search) return null;
  const params = new URLSearchParams(search);
  const viewport = {
    latitude: Number(params.get("latitude")),
    longitude: Number(params.get("longitude")),
    zoom: Number(params.get("zoom")),
  };
  return JSON.stringify(viewport);
};

export const useFeatures = () =>
  useSelector((state) =>
    state.spots.entities.map((spot) => ({
      type: "Feature",
      properties: { ...spot },
      geometry: { type: "Point", coordinates: [spot.lng, spot.lat] },
    }))
  );

export const useSpiderifier = (mapRef) => {
  const dispatch = useDispatch();
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (!mapRef) return;
    const map = mapRef.getMap();

    const spiderifier = new MapboxglSpiderifier(map, {
      animate: true,
      animationSpeed: 200,
      customPin: true,
      initializeLeg: (spiderLeg) => {
        const pinElem = spiderLeg.elements.pin;
        const spot = {
          ...spiderLeg.feature,
          offset: MapboxglSpiderifier.popupOffsetForSpiderLeg(spiderLeg),
        };

        pinElem.className = `${pinElem.className}-${
          spiderLeg.feature.id ? "green" : "yellow"
        }`;

        pinElem.addEventListener("mouseenter", () => {
          dispatch(setPopup({ spot }));
        });
        pinElem.addEventListener("mouseleave", () => {
          dispatch(setPopup({ spot: null }));
        });
      },
    });

    setInstance(spiderifier);
  }, [mapRef, dispatch]);

  return instance;
};
