import React from "react";
import { useMapEvents } from "react-leaflet";
import { TPoint } from "../Point";
import { Map } from "leaflet";

type TOnAddCallback = (map:Map, point:TPoint) => void;
interface IProps {
  onAdd: TOnAddCallback
}

export default function MapEditor(props: IProps) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      props.onAdd(map, [lat, lng])
    }
  });

  return <></>
}