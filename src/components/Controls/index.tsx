import react from "react";
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { SET_MODE, SET_START_RESETTING, SET_START_SAVING } from "../../state/actions";
import { IAppState } from "../../state/intial_state";

export default function Controls() {
  const {mode, points, trajectories} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="Controls">
        <h3 className="Controls__title">My map</h3>
        <div className="Controls__groups">
          <div className={
            `Controls__groups__Point ${mode === "ADDING_SINGLE_POINT" ? `Controls__groups__Point--current` : ''}`
          }>
            <h3>Single Points ({points.length})</h3>
            <button
              onClick={() => dispatch({ type: SET_MODE, payload: "ADDING_SINGLE_POINT"})}
              disabled={mode === "ADDING_SINGLE_POINT"}
            >
              {mode === "ADDING_SINGLE_POINT" ? 'Click on Map' : 'Start Adding'}
            </button>
          </div>
          <div className={
            `Controls__groups__Trajectory ${mode === "ADDING_TRAJECTORY_POINT" ? `Controls__groups__Trajectory--current` : ''}`
          }>
            <h3>Trajectories ({trajectories.length})</h3>
            <button
              onClick={() => dispatch({ type: SET_MODE, payload: "ADDING_TRAJECTORY_POINT"})}
              disabled={mode === "ADDING_TRAJECTORY_POINT"}
            >
              {mode === "ADDING_TRAJECTORY_POINT" ? 'Click on Map' : 'New Trajectory'}
            </button>
            {mode === "ADDING_TRAJECTORY_POINT" && (
              <button
                onClick={() => dispatch({ type: SET_MODE, payload: "ADDING_SINGLE_POINT"})}
                disabled={mode !== "ADDING_TRAJECTORY_POINT"}
              >
                End Trajectory
              </button>
            )}
          </div>
          <div className="Controls__groups__Trajectory">
            <h3>Data</h3>
            <button onClick={() => dispatch({ type: SET_START_SAVING })}>
              Save
            </button>
            <button onClick={() => dispatch({ type: SET_START_RESETTING })}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}