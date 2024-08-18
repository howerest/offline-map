import react, { useCallback } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../state/intial_state";
import { SET_SINGLE_POINT_NAME, SET_TRAJECTORY_NAME } from "../../state/actions";

export default function Panel() {
  const {points, trajectories} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();

  return (
    <div className="Panel">
      <h3>Trajectories</h3>
      <div className="Panel__trajectories">
        {trajectories.length === 0 &&
          <span className="Panel__points__empty">No trajectories yet</span>
        }
        {trajectories.map((trajectory, i) => (
          <div className="Panel__trajectories__trajectory" key={i}>
            <input type="text" value={trajectory.name}
              onChange={(e) => dispatch({
                type: SET_TRAJECTORY_NAME,
                payload: {
                  index: i,
                  name: e.target.value
                }
              })}
            />
            <ul>
              {trajectory.points.map((point, i2) => (
                <li key={`${i2}-${point[1]}-${point[1]}`}>
                  [{point[0]}, {point[1]}]
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3>Single points</h3>
      <div className="Panel__points">
        {points.length === 0 &&
          <span className="Panel__points__empty">No points yet</span>
        }
        <ul>
          {points.map((point, i) => (
            <li
              className="Panel__points__point"
              key={`${i}-${point.point[0]}-${point.point[1]}`}
            >
              <input type="text" value={point.name}
                onChange={(e) => dispatch({
                  type: SET_SINGLE_POINT_NAME,
                  payload: {
                    index: i,
                    name: e.target.value
                  }
                })}
              />
              <span>[{point.point[0]}, {point.point[1]}]</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}