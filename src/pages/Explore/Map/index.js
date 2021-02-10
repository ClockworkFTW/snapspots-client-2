import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMapGL, { Source, Layer, Popup } from "react-map-gl";

// Redux Actions
import { updateViewport } from "./viewportSlice";
import { setPopup } from "./popupSlice";
import { getSpots } from "../Spots/spotsSlice";

// Components
import { MapNavigation } from "./MapNavigation";
import { MapLoader } from "./MapLoader";
import { MapPopup } from "./MapPopup";

// Hooks
import { useUrlViewport, useFeatures, useSpiderifier } from "./hooks";

// Config
import * as layer from "./layers";
import { MAPBOX_TOKEN, MAPBOX_EXPLORE_VIEWPORT } from "config";

// Override map styles
import "./index.css";

export const Map = () => {
  const dispatch = useDispatch();
  const [mapRef, setMapRef] = useState(null);

  const { viewport, popup } = useSelector((state) => state);
  const features = useFeatures();
  const spiderifier = useSpiderifier(mapRef);

  // Update redux state on viewport change
  const onViewportChange = ({ latitude, longitude, zoom }) => {
    dispatch(updateViewport({ latitude, longitude, zoom }));
  };

  // Initialize map on page refresh
  const urlViewport = useUrlViewport();
  useEffect(() => {
    // If redux viewport params exists, do nothing
    if (viewport) return;
    // If url viewport params exist, use them
    if (urlViewport) {
      dispatch(updateViewport(JSON.parse(urlViewport)));
    }
    // Otherwise, use default viewport params
    else {
      dispatch(updateViewport(MAPBOX_EXPLORE_VIEWPORT));
    }
  }, [dispatch, viewport, urlViewport]);

  // Fetch spots on initial render or url params update
  useEffect(() => {
    if (!mapRef) return;
    const { _sw, _ne } = mapRef.getMap().getBounds();
    const query = `swLat=${_sw.lat}&swLng=${_sw.lng}&neLat=${_ne.lat}&neLng=${_ne.lng}`;
    dispatch(getSpots({ query }));
  }, [dispatch, mapRef, urlViewport]);

  // Execute once map interaction finishes
  const onInteractionStateChange = (s) => {
    // Close any existing spider webs or popups
    if (spiderifier) spiderifier.unspiderfy();
    dispatch(setPopup({ spot: null }));

    const isMoving =
      s.isDragging ||
      s.inTransition ||
      s.isRotating ||
      s.isZooming ||
      s.isHovering ||
      s.isPanning;

    // If mapRef doesnt exist or map is being moved, exit function
    if (!mapRef || isMoving) return;

    // Set url query parameters based on viewport position
    const vp = new URLSearchParams(viewport).toString();
    window.history.replaceState(null, null, `/explore?${vp}`);

    // Fetch spots within bounding box
    const { _sw, _ne } = mapRef.getMap().getBounds();
    const query = `swLat=${_sw.lat}&swLng=${_sw.lng}&neLat=${_ne.lat}&neLng=${_ne.lng}`;
    dispatch(getSpots({ query }));
  };

  // Handle spiderification
  const onClick = (e) => {
    // Remove any existing spider webs
    if (spiderifier) spiderifier.unspiderfy();

    if (!mapRef) return;
    const map = mapRef.getMap();

    const features = map.queryRenderedFeatures(e.point, {
      layers: [layer.clusterLayer.id],
    });

    if (!features.length) return;

    const { cluster_id } = features[0].properties;
    const { coordinates } = features[0].geometry;

    const addWeb = (error, leafFeatures) => {
      if (error) return console.log("cluster leaves error:", error);
      const markers = leafFeatures.map((leafFeature) => ({
        ...leafFeature.properties,
        clusterCenter: coordinates,
      }));
      spiderifier.spiderfy(coordinates, markers);
    };

    map.getSource("spots").getClusterLeaves(cluster_id, 100, 0, addWeb);
  };

  // Handle popups
  const onHover = (e) => {
    if (!mapRef) return;

    const features = mapRef.getMap().queryRenderedFeatures(e.point, {
      layers: [layer.unclusteredPointLayer.id],
    });

    if (features.length) {
      const spot = {};
      for (const [key, value] of Object.entries(features[0].properties)) {
        const isArray = value[0] === "[" && value[value.length - 1] === "]";
        if (isArray) {
          spot[key] = JSON.parse(value);
        } else {
          spot[key] = value;
        }
      }
      dispatch(setPopup({ spot }));
    } else {
      // dispatch(setPopup({ spot: null }));
    }
  };

  return (
    viewport && (
      <ReactMapGL
        ref={(el) => setMapRef(el)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={onViewportChange}
        onInteractionStateChange={onInteractionStateChange}
        onClick={onClick}
        onHover={onHover}
      >
        <MapNavigation />
        <Source
          id="spots"
          type="geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          data={{
            type: "FeatureCollection",
            features,
          }}
        >
          <Layer {...layer.clusterLayer} />
          <Layer {...layer.clusterCountLayer} />
          <Layer {...layer.unclusteredPointLayer} />
        </Source>
        {popup && (
          <Popup
            latitude={popup.clusterCenter ? popup.clusterCenter[1] : popup.lat}
            longitude={popup.clusterCenter ? popup.clusterCenter[0] : popup.lng}
            offsetTop={popup.offset ? popup.offset.top[1] : 0}
            offsetLeft={popup.offset ? popup.offset.left[0] : 0}
            closeButton={false}
            closeOnClick={false}
          >
            <MapPopup spot={popup} />
          </Popup>
        )}
        <MapLoader />
      </ReactMapGL>
    )
  );
};
