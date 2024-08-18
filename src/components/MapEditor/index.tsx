import React from "react";
import { useMapEvents } from "react-leaflet";
import { Map } from "leaflet";
import { TPoint } from "../../state/intial_state";

interface IProps {
  onAdd: (map:Map, point:TPoint) => void;
  onZoom: (zoomValue:number) => void
}

export default function MapEditor(props: IProps) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      props.onAdd(map, [lat, lng]);
    },
    zoomend: () => {
      props.onZoom(map.getZoom());
    },
  });

  return <></>
}