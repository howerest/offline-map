import react from "react";
import { Circle, Popup } from "react-leaflet";
import { IAppState, INamedPoint } from "../../state/intial_state";
import { useSelector } from "react-redux";

interface IProps {
  point: INamedPoint;
  selected?: boolean;
}

export default function Point({ point, selected }: IProps) {
  const { pointRadiusMeters } = useSelector((state:IAppState) => state);
  return (
    <Circle
      center={point.point}
      pathOptions={{
        color: selected ? 'darkred' : 'darkblue',
        fillColor: selected ? 'red' : 'lightblue'
      }}
      radius={pointRadiusMeters}
    >
      <Popup>
        Lat: <b>{point.point[0]}</b> <br />Lon <b>{point.point[1]}</b> <br /> Notes: {point.note || '-'}
      </Popup>
    </Circle>
  );
}