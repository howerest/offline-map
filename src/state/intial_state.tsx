import { TMapMode } from "../components/Map";

export type TMode = "ADDING_SINGLE_POINT" | "ADDING_TRAJECTORY_POINT";

export type TPoint = [number, number];

export interface INamedPoint {
  name: string;
  point: TPoint;
}

export type TTrajectory = {
  name: string;
  color: string;
  points: TPoint[];
} 

export interface IAppState {
  mapMode: TMapMode;
  pointRadiusMeters: number;
  mode: TMode;
  points: INamedPoint[];
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
  pointRadiusMeters: 22,
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