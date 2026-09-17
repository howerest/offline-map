import react, { useCallback, useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../state/intial_state";
import { SET_MAP_MODE, SET_MODE, SET_SINGLE_POINT_NAME, SET_SINGLE_POINT_NOTE, SELECT_SINGLE_POINT, DELETE_SINGLE_POINT, CLEAR_SELECTION, SET_TRAJECTORY_NAME, SET_TRAJECTORY_NOTES, VIEW_TRAJECTORY, DELETE_TRAJECTORY } from "../../state/actions";

interface IDraft {
  index: number;
  name: string;
  note: string;
}

type TTab = "points" | "trajectories";

export default function Panel() {
  const {mode, points, trajectories, selectedPoint, viewedTrajectory} = useSelector((state:IAppState) => state);
  const dispatch = useDispatch();
  const [editingPoint, setEditingPoint] = useState<IDraft | null>(null);
  const [editingTrajectory, setEditingTrajectory] = useState<IDraft | null>(null);
  const [activeTab, setActiveTab] = useState<TTab>("points");

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest('.leaflet-container')) return;
      if (target.closest('.Panel__points__point') || target.closest('.Panel__trajectories__trajectory')) return;
      dispatch({ type: CLEAR_SELECTION });
    }
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [dispatch]);

  return (
    <div className="Panel">
      <div className="Panel__map-mode">
        <select onChange={(e) => dispatch({ type: SET_MAP_MODE, payload: e.target.value })}>
          {["online", "offline-png", "offline-mbtiles"].map(o => <option value={o}>{o} map</option>)}
        </select>
      </div>
      <div className="Panel__tabs">
        <button
          className={`Panel__tab ${activeTab === "points" ? 'Panel__tab--active' : ''}`}
          onClick={() => {
            if (mode === "ADDING_TRAJECTORY_POINT") {
              dispatch({ type: SET_MODE, payload: "ADDING_SINGLE_POINT" });
            }
            setActiveTab("points");
          }}
        >
          Points ({points.length})
        </button>
        <button
          className={`Panel__tab ${activeTab === "trajectories" ? 'Panel__tab--active' : ''}`}
          onClick={() => setActiveTab("trajectories")}
        >
          Trajectories ({trajectories.length})
        </button>
      </div>
      <div className="Panel__trajectories" style={{ display: activeTab === "trajectories" ? undefined : 'none' }}>
        <button
          className="Panel__new-button"
          onClick={() => dispatch({ type: SET_MODE, payload: "ADDING_TRAJECTORY_POINT"})}
          disabled={mode === "ADDING_TRAJECTORY_POINT"}
        >
          {mode === "ADDING_TRAJECTORY_POINT" ? 'Click on Map' : 'New trajectory'}
        </button>
        {mode === "ADDING_TRAJECTORY_POINT" && (
          <button
            className="Panel__new-button"
            onClick={() => dispatch({ type: SET_MODE, payload: "ADDING_SINGLE_POINT"})}
          >
            End Trajectory
          </button>
        )}
        {trajectories.length === 0 &&
          <span className="Panel__points__empty">No trajectories yet</span>
        }
        {trajectories.map((trajectory, i) => {
          const isSelected = viewedTrajectory === i;
          const isEditing = editingTrajectory?.index === i;
          return (
          <div
            className={`Panel__trajectories__trajectory ${isSelected ? 'Panel__trajectories__trajectory--selected' : ''}`}
            key={i}
          >
            {isEditing ? (
              <input type="text" value={editingTrajectory.name}
                onChange={(e) => setEditingTrajectory({ ...editingTrajectory, name: e.target.value })}
              />
            ) : (
              <div className="Panel__trajectories__trajectory__name">{trajectory.name}</div>
            )}
            {isEditing ? (
              <textarea
                className="Panel__trajectories__trajectory__note"
                placeholder="Add a note..."
                value={editingTrajectory.note}
                onChange={(e) => setEditingTrajectory({ ...editingTrajectory, note: e.target.value })}
              />
            ) : (
              <div className="Panel__trajectories__trajectory__note-display">{trajectory.note || ''}</div>
            )}
            <div className="Panel__card-actions">
              {isEditing ? (
                <>
                  <button
                    className="Panel__save-button"
                    onClick={() => {
                      dispatch({ type: SET_TRAJECTORY_NAME, payload: { index: i, name: editingTrajectory.name } });
                      dispatch({ type: SET_TRAJECTORY_NOTES, payload: { index: i, note: editingTrajectory.note } });
                      setEditingTrajectory(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="Panel__cancel-button"
                    onClick={() => setEditingTrajectory(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="Panel__select-button"
                    onClick={() => dispatch({ type: VIEW_TRAJECTORY, payload: i })}
                  >
                    Select
                  </button>
                  <button
                    className="Panel__edit-button"
                    onClick={() => setEditingTrajectory({ index: i, name: trajectory.name, note: trajectory.note || '' })}
                  >
                    Edit
                  </button>
                  <button
                    className="Panel__delete-button"
                    onClick={() => {
                      if (window.confirm(`Delete trajectory "${trajectory.name}"?`)) {
                        dispatch({ type: DELETE_TRAJECTORY, payload: i });
                      }
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
            <ul>
              {trajectory.points.map((point, i2) => (
                <li key={`${i2}-${point[1]}-${point[1]}`}>
                  [{point[0]}, {point[1]}]
                </li>
              ))}
            </ul>
          </div>
          );
        })}
      </div>
      <div className="Panel__points" style={{ display: activeTab === "points" ? undefined : 'none' }}>
        <button
          className="Panel__new-button"
          onClick={() => dispatch({ type: SET_MODE, payload: "ADDING_SINGLE_POINT"})}
          disabled={mode === "ADDING_SINGLE_POINT"}
        >
          {mode === "ADDING_SINGLE_POINT" ? 'Click on Map' : 'New point'}
        </button>
        {points.length === 0 &&
          <span className="Panel__points__empty">No points yet</span>
        }
        <ul>
          {points.map((point, i) => {
            const isSelected = selectedPoint === i;
            const isEditing = editingPoint?.index === i;
            return (
            <li
              className={`Panel__points__point ${isSelected ? 'Panel__points__point--selected' : ''}`}
              key={`${i}-${point.point[0]}-${point.point[1]}`}
            >
              {isEditing ? (
                <input type="text" value={editingPoint.name}
                  onChange={(e) => setEditingPoint({ ...editingPoint, name: e.target.value })}
                />
              ) : (
                <div className="Panel__points__point__name">{point.name}</div>
              )}
              <span>[{point.point[0]}, {point.point[1]}]</span>
              {isEditing ? (
                <textarea
                  className="Panel__points__point__note"
                  placeholder="Add a note..."
                  value={editingPoint.note}
                  onChange={(e) => setEditingPoint({ ...editingPoint, note: e.target.value })}
                />
              ) : (
                <div className="Panel__points__point__note-display">{point.note || ''}</div>
              )}
              <div className="Panel__card-actions">
                {isEditing ? (
                  <>
                    <button
                      className="Panel__save-button"
                      onClick={() => {
                        dispatch({ type: SET_SINGLE_POINT_NAME, payload: { index: i, name: editingPoint.name } });
                        dispatch({ type: SET_SINGLE_POINT_NOTE, payload: { index: i, note: editingPoint.note } });
                        setEditingPoint(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="Panel__cancel-button"
                      onClick={() => setEditingPoint(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="Panel__select-button"
                      onClick={() => dispatch({ type: SELECT_SINGLE_POINT, payload: i })}
                    >
                      Select
                    </button>
                    <button
                      className="Panel__edit-button"
                      onClick={() => setEditingPoint({ index: i, name: point.name, note: point.note || '' })}
                    >
                      Edit
                    </button>
                    <button
                      className="Panel__delete-button"
                      onClick={() => {
                        if (window.confirm(`Delete "${point.name}"?`)) {
                          dispatch({ type: DELETE_SINGLE_POINT, payload: i });
                        }
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}