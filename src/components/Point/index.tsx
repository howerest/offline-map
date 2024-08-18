import react from "react";
import { Circle, Popup } from "react-leaflet";
import { IAppState, INamedPoint } from "../../state/intial_state";
import { useSelector } from "react-redux";

interface IProps {
  point: INamedPoint;
}

export default function Point({ point }: IProps) {
  const { pointRadiusMeters } = useSelector((state:IAppState) => state);
  return (
    <Circle
      center={point.point}
      pathOptions={{ fillColor: 'red' }}
      radius={pointRadiusMeters}
    >
      <Popup>
        Lat: <b>{point.point[0]}</b> <br />Lon <b>{point.point[1]}</b> <br /> Notes: -
      </Popup>
    </Circle>
  );
}