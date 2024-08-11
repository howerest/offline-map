import initialState, { IAppState } from "./intial_state";
import {
  SET_MAP_MODE,
  SET_MODE,
  ADD_SINGLE_POINT,
  SET_SINGLE_POINT_NOTE,
  SELECT_TRAJECTORY,
  SELECT_TRAJECTORY_POINT,
  ADD_POINT_TO_TRAJECTORY,
  SET_START_RESETTING,
  SET_RESETED,
  SET_START_SAVING,
  SET_SAVED,
  SET_START_EXPORTING,
  SET_EXPORTED,
  LOAD
} from './actions';
import { TMode } from './intial_state';
import { TPoint } from '../components/Point';
import { TTrajectory } from "../components/Trajectory";
import { TMapMode } from "../components/Map";

interface IAction<T> {
  payload: T
}

/**
 * Reduces the state
 * @param state The original state
 * @param action The action to perform in the state
 */
export function appReducer(state:IAppState = initialState, action:any) {
  switch(action.type) {
    case LOAD:
      return loadReducer(state, action);
    case SET_MAP_MODE:
      return setMapMode(state, action);
    case SET_MODE:
      return setModeReducer(state, action);
    case ADD_SINGLE_POINT:
      return setAddSinglePointReducer(state, action);
    case SET_SINGLE_POINT_NOTE:
      return setSinglePointNoteReducer(state, action);
    case SELECT_TRAJECTORY:
      return selectTrajectoryReducer(state, action);
    case SELECT_TRAJECTORY_POINT:
      return selectTrajectoryPointReducer(state, action);
    case ADD_POINT_TO_TRAJECTORY:
      return addPointToTrajectoryReducer(state, action);
    case SET_START_RESETTING:
      return setStartResettingReducer(state);
    case SET_RESETED:
      return setResetedReducer(state);
    case SET_START_SAVING:
      return setStartSavingReducer(state);
    case SET_SAVED:
      return setSavedReducer(state);
    case SET_START_EXPORTING:
      return setStartExportingReducer(state);
    case SET_EXPORTED:
      return setExportedReducer(state);              
  }
  return state;
};

// LOAD
function loadReducer(state:IAppState, { payload: { points, trajectories }}: IAction<{
  points: TPoint[];
  trajectories: TTrajectory[];
}>) {
  return {
    ...state,
    points,
    trajectories
  };
}

// SET_MAP_MODE
function setMapMode(state:IAppState, { payload: mapMode }:IAction<TMapMode>) {
  return {
    ...state,
    mapMode
  };
}

// SET_MODE
function setModeReducer(state:IAppState, { payload: mode }:IAction<TMode>): IAppState {
  const newState = {...state};
  if (mode === "ADDING_TRAJECTORY_POINT") {
    newState.trajectories.push({
      name: 'trajectory',
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
      points: [],
    });
    newState.selectedTrajectory = newState.trajectories.length-1;
  }
  newState.mode = mode;
  return newState;
};

// ADD_SINGLE_POINT
function setAddSinglePointReducer(state:IAppState, { payload: point }:IAction<TPoint>): IAppState {
  const newPoints = [...state.points, point];
  return {
    ...state,
    points: newPoints
  };
}

// SET_SINGLE_POINT_NOTE
function setSinglePointNoteReducer(state:IAppState, { payload: note }:IAction<string>): IAppState {
  return state;
  // const newPoints = [...state.points];
  // newPoints[state.selectedPoint as number]['notes'] = note;
  // return {
  //   ...state,
  //   points: newPoints
  // };
};

// SELECT_TRAJECTORY
function selectTrajectoryReducer(state:IAppState, { payload: trajectoryIndex }:IAction<number>): IAppState {
  return {
    ...state,
    selectedTrajectory: trajectoryIndex
  };
}

// SELECT_TRAJECTORY_POINT
function selectTrajectoryPointReducer(state:IAppState, { payload: trajectoryPointIndex }:IAction<number>): IAppState {
  return {
    ...state,
    selectedTrajectoryPoint: trajectoryPointIndex
  };
}

// ADD_POINT_TO_TRAJECTORY
function addPointToTrajectoryReducer(state:IAppState, { payload: point }:IAction<TPoint>): IAppState {
  const newTrajectories = [...state.trajectories];
  newTrajectories[state.selectedTrajectory as number].points.push(point);
  return {
    ...state,
    trajectories: newTrajectories
  };
}

// SET_START_RESETTING
function setStartResettingReducer(state:IAppState): IAppState {
  return {
    ...initialState,
    points: [],
    trajectories: []
  };
}

// SET_RESETED
function setResetedReducer(state:IAppState): IAppState {
  return {
    ...state,
    resetting: true
  };
}

// SET_START_SAVING
function setStartSavingReducer(state:IAppState): IAppState {
  localStorage.setItem('trajectories', JSON.stringify(state.trajectories));
  localStorage.setItem('points', JSON.stringify(state.points));

  return {
    ...state,
    saving: true
  };
}

// SET_SAVED
function setSavedReducer(state:IAppState): IAppState {
  return {
    ...state,
    saving: false
  };
}

// SET_START_EXPORTING
function setStartExportingReducer(state:IAppState): IAppState {
  return {
    ...state,
    exporting: true
  };
}

// SET_EXPORTED
function setExportedReducer(state:IAppState): IAppState {
  return {
    ...state,
    exporting: false
  };
}

