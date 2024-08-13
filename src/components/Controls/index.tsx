import react, { useCallback } from "react";
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { SET_MAP_MODE, SET_MODE, SET_START_RESETTING, SET_START_SAVING } from "../../state/actions";
import { IAppState } from "../../state/intial_state";

export default function Controls() {
  const {mode, points, trajectories} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();

  const exportData = useCallback(() => {
    const data = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify({ points, trajectories }))}`;
    const linkNode = document.createElement('a');
    linkNode.setAttribute("href", data);
    linkNode.setAttribute("download", `${(new Date().toISOString())}.json`);
    document.body.appendChild(linkNode);
    linkNode.click();
    linkNode.remove();
  }, []);

  return (
    <div>
      <div className="Controls">
        <h3 className="Controls__title">My map</h3>
        <div className="Controls__groups">
          <div className="">
            <h3>Map Mode</h3>
            <select onChange={(e) => dispatch({ type: SET_MAP_MODE, payload: e.target.value })}>
              {["online", "offline-png", "offline-mbtiles"].map(o => <option value={o}>{o}</option>)}
            </select>
          </div>
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
            <button onClick={exportData}>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}