import { TTrajectory } from "../components/Trajectory";
import { TPoint } from "../components/Point";
import { TMapMode } from "../components/Map";

export type TMode = "ADDING_SINGLE_POINT" | "ADDING_TRAJECTORY_POINT";

export interface IAppState {
  mapMode: TMapMode;
  mode: TMode;
  points: TPoint[];
  selectedPoint: number | null;
  trajectories: TTrajectory[];
  selectedTrajectory: number | null;
  selectedTrajectoryPoint: number | null;
  loading: boolean;
  saving: boolean;
  exporting: boolean;
  resetting: boolean;
}

const initialState:IAppState = {
  mapMode: "online",
  mode: "ADDING_SINGLE_POINT",
  points: JSON.parse(localStorage.getItem('points') || "\[\]"),
  selectedPoint: null,
  trajectories: JSON.parse(localStorage.getItem('trajectories') || "\[\]"),
  selectedTrajectory: null,
  selectedTrajectoryPoint: null,
  loading: true,
  saving: false,
  exporting: false,
  resetting: false
};

export default initialState;