import React from "react";
import Point, { TPoint } from "../Point";
import { Polyline } from "react-leaflet";

export type TTrajectory = {
  name: string;
  color: string;
  points: TPoint[];
} 

interface IProps {
  trajectory: TTrajectory;
}

export default function Trajectory({trajectory}: IProps) {
  return (
    <>
      {trajectory.points.map((point, i) => (
        <React.Fragment key={i}>
          <Point point={point} />
          {i !== 0 && (
            <Polyline
              positions={[
                [trajectory.points[i][0], trajectory.points[i][1]],
                [trajectory.points[i-1][0], trajectory.points[i-1][1]]
              ]}
              color={trajectory.color}
              smoothFactor={3}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}