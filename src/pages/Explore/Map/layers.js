export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "spots",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#3B82F6",
    "circle-radius": 12,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "spots",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 14,
  },
  paint: {
    "text-color": "#fff",
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "spots",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#F59E0B",
    "circle-radius": 12,
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
};
