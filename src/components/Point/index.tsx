import react from "react";
import { Circle, Popup } from "react-leaflet";

export type TPoint = [number, number];

interface IProps {
  point: TPoint;
}

export default function Point({ point }: IProps) {
  return (
    <Circle
      center={point}
      pathOptions={{ fillColor: 'red' }}
      radius={150}
    >
      <Popup>
        Lat: <b>{point[0]}</b> <br />Lon <b>{point[1]}</b> <br /> Notes: -
      </Popup>
    </Circle>
  );
}