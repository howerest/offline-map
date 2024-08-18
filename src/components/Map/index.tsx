import React, { useCallback, useState } from "react";
import leaflet, {Map} from "leaflet";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, } from "react-leaflet";
import Point from "../Point";
import MapEditor from "../MapEditor";
import Trajectory from "../Trajectory";
import { useSelector, useDispatch } from 'react-redux';
import { IAppState, TPoint } from "../../state/intial_state";
import { ADD_POINT_TO_TRAJECTORY, ADD_SINGLE_POINT, SET_POINT_RADIUS } from "../../state/actions";
import "./index.css";

export type TMapMode = "online" | "offline-png" | "offline-mbtiles";

export default function() {
  const {
    mapMode,
    mode,
    points,
    trajectories
  } = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();

  const ModeTileLayer = useCallback(() => {
    switch(mapMode) {
      case "online":
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        );
      case "offline-mbtiles":
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="http://127.0.0.1:8080/styles/basic-preview/{z}/{x}/{y}.png"
          />
        );
      case "offline-png":
        return (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="/atlas/{z}/{x}/{y}.png"
          />
        );
    }
  }, [mapMode])

  return (
    <>
      <MapContainer
        className="MapContainer"
        center={[28.391081, -16.523540]}
        zoom={8}
        scrollWheelZoom={true}
        dragging={!leaflet.Browser.mobile}
      >
        <MapEditor
          onAdd={(map:Map, point:TPoint) => {
            if (mode === "ADDING_SINGLE_POINT") {
              dispatch({
                type: ADD_SINGLE_POINT,
                payload: {
                  name: "unamed",
                  point
                }
              });
            }
            if (mode === "ADDING_TRAJECTORY_POINT") {
              dispatch({
                type: ADD_POINT_TO_TRAJECTORY,
                payload: point
              });
            }
          }}
          onZoom={(zoomLevel:number) => {
            const newPointRadiusMeters = 150/(zoomLevel*0.85);
            // increase the radius of the point as we zoom
            dispatch({
              type: SET_POINT_RADIUS,
              payload: newPointRadiusMeters > 10 ? newPointRadiusMeters : 10
            });
          }}
        />

        <ModeTileLayer />

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

