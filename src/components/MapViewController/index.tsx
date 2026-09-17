import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import leaflet from "leaflet";
import { IAppState } from "../../state/intial_state";

const SELECTED_POINT_ZOOM = 18;

export default function MapViewController() {
  const map = useMap();
  const { points, trajectories, selectedPoint, viewedTrajectory, selectionSeq } = useSelector((state:IAppState) => state);

  useEffect(() => {
    if (selectedPoint === null) return;
    const point = points[selectedPoint];
    if (!point) return;
    map.setView(point.point, SELECTED_POINT_ZOOM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionSeq]);

  useEffect(() => {
    if (viewedTrajectory === null) return;
    const trajectory = trajectories[viewedTrajectory];
    if (!trajectory || trajectory.points.length === 0) return;
    map.fitBounds(leaflet.latLngBounds(trajectory.points), { padding: [30, 30] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionSeq]);

  return null;
}
