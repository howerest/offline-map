import React from "react";
import Point from "../Point";
import { Polyline } from "react-leaflet";
import { TTrajectory } from "../../state/intial_state";

interface IProps {
  trajectory: TTrajectory;
  selected?: boolean;
}

export default function Trajectory({trajectory, selected}: IProps) {
  const color = selected ? 'darkred' : 'darkblue';
  return (
    <>
      {trajectory.points.map((point, i) => (
        <React.Fragment key={i}>
          <Point point={{ name: '', point }} selected={selected} />
          {i !== 0 && (
            <Polyline
              positions={[
                [trajectory.points[i][0], trajectory.points[i][1]],
                [trajectory.points[i-1][0], trajectory.points[i-1][1]]
              ]}
              pathOptions={{ color }}
              smoothFactor={3}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}