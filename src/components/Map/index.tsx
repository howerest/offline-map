import React, { useState } from "react";
import leaflet, {Map} from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, } from "react-leaflet";
import Point, { TPoint } from "../Point";
import MapEditor from "../MapEditor";
import Trajectory from "../Trajectory";
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from "../../state/intial_state";
import { ADD_POINT_TO_TRAJECTORY, ADD_SINGLE_POINT } from "../../state/actions";

interface IProps {
  mapMode: "online" | "offline-png" | "offline-mbtiles";
}

export default function({ mapMode }: IProps) {
  const {mode, points, trajectories} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();
  const [map, setMap] = useState<boolean | undefined>();

  return (
    <>
      <MapContainer
        style={{ height: '100vh', border: '1px solid #555', margin: '15px 0', paddingTop: '30px', position: 'relative' }}
        center={[28.391081, -16.523540]}
        zoom={9}
        scrollWheelZoom={true}
        dragging={!leaflet.Browser.mobile}
        whenReady={() => {
          setMap(true);
        }}
      >
        <MapEditor
          onAdd={(map:Map, point:TPoint) => {
            if (mode === "ADDING_SINGLE_POINT") {
              dispatch({
                type: ADD_SINGLE_POINT,
                payload: point
              });
            }
            if (mode === "ADDING_TRAJECTORY_POINT") {
              dispatch({
                type: ADD_POINT_TO_TRAJECTORY,
                payload: point
              });
            }
          }
        }/>

        {mapMode === "online" &&
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        }

        {mapMode === "offline-png" &&
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="/atlas/{z}/{x}/{y}.png"
          />
        }

        {mapMode === "offline-mbtiles" &&
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://127.0.0.1:8080/styles/basic-preview/{z}/{x}/{y}.png"
          />
        }

        {points.map((point, i) => (
          <Point point={point} key={i} />
        ))}

        {trajectories.map((trajectory, i) => (
          <Trajectory trajectory={trajectory} key={i} />
        ))}
      </MapContainer>
    </>
  );
}

