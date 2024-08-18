import react, { useCallback } from "react";
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { LOAD, SET_MAP_MODE, SET_MODE, SET_START_RESETTING, SET_START_SAVING } from "../../state/actions";
import { IAppState } from "../../state/intial_state";

export default function Controls() {
  const {mode, points, trajectories} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();

  /**
   * Exports single points and trajectories to json file
   */
  const handlExport = useCallback(() => {
    const data = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify({ points, trajectories }, null, 4))}`;
    const linkNode = document.createElement('a');
    linkNode.setAttribute("href", data);
    linkNode.setAttribute("download", `${(new Date().toISOString())}.json`);
    document.body.appendChild(linkNode);
    linkNode.click();
    linkNode.remove();
  }, [points, trajectories]);

  /**
   * Imports single points and trajectories from json file
   */
  const handleImport = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = (e.target.files as any)[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e:ProgressEvent<FileReader>) => {
          const importJson = JSON.parse(e.target?.result as string);
          dispatch({
            type: LOAD,
            payload: {
              trajectories: importJson.trajectories,
              points: importJson.points
            }
          });
        };
    
        reader.readAsText(file);
      }
    } catch(e) {
      console.error('Error importing file: ', e);
    }
  }, []);

  return (
    <div>
      <div className="Controls">
        <h3 className="Controls__title">My map</h3>
        <div className="Controls__groups">
          <div className="Controls__groups__map-mode">
            <select onChange={(e) => dispatch({ type: SET_MAP_MODE, payload: e.target.value })}>
              {["online", "offline-png", "offline-mbtiles"].map(o => <option value={o}>{o} map</option>)}
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
          <div className="Controls__groups__data">
            <button onClick={() => dispatch({ type: SET_START_SAVING })}>
              Save
            </button>
            <button onClick={() => dispatch({ type: SET_START_RESETTING })}>
              Reset
            </button>
            <button onClick={() => (document as any).getElementById('importFileInput').click()}>
              Import
            </button>
            <input
              type="file"
              id="importFileInput"
              style={{ display: 'none' }}
              onChange={handleImport}
              accept=".json"
            />
            <button onClick={handlExport}>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}