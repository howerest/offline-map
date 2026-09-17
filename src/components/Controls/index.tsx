import react, { useCallback } from "react";
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { LOAD, SET_START_RESETTING, SET_START_SAVING } from "../../state/actions";
import { IAppState } from "../../state/intial_state";

export default function Controls() {
  const {points, trajectories} = useSelector((state:IAppState) => state);
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
        <div className="Controls__title">
          <h3 className="Controls__title__text">My map</h3>
          <div className="Controls__title__actions">
            <button
              className="Controls__tiny-button"
              onClick={() => dispatch({ type: SET_START_SAVING })}
            >
              Save
            </button>
            <button
              className="Controls__tiny-button"
              onClick={() => dispatch({ type: SET_START_RESETTING })}
            >
              Reset
            </button>
            <button
              className="Controls__tiny-button"
              onClick={() => (document as any).getElementById('importFileInput').click()}
            >
              Import
            </button>
            <input
              type="file"
              id="importFileInput"
              style={{ display: 'none' }}
              onChange={handleImport}
              accept=".json"
            />
            <button
              className="Controls__tiny-button"
              onClick={handlExport}
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}