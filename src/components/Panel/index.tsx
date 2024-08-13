import react, { useCallback } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../state/intial_state";
import { SET_TRAJECTORY_NAME } from "../../state/actions";

export default function Panel() {
  const {mode, points, trajectories} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();

  return (
    <div className="Panel">
      <h3>Trajectories</h3>
      {trajectories.map((trajectory, i) => (
        <div className="Panel__Trajectories__trajectory">
          <input type="text" value={trajectory.name} onChange={(e) => dispatch({
            type: SET_TRAJECTORY_NAME,
            payload: {
              index: i,
              name: e.target.value
            }
          })}/>
          <ul>
            {trajectory.points.map(point => (
              <li>[{point[0]}, {point[1]}]</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}