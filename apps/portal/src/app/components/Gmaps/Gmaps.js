import React, { useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';
import { drag } from 'd3';
import { useSelector } from 'react-redux';
import { Data } from '@react-google-maps/api';

const GMAPS_APIKEY = process.env.NX_PUBLIC_GMAPS_API_KEY;
const GMAPS_ID = process.env.NX_PUBLIC_GMAPS_ID;

const Gmaps = (setting) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [dragAble, setDragAble] = useState(false);
  const DataGeolocation = useSelector(
    (state) => state.ReduxState.DataGeolocation
  );
  const [mainPin, setMainPin] = useState(0);

  useEffect(() => {
    if (DataGeolocation) {
      setCenter(DataGeolocation);
      if (dragAble) {
        setMainPin(0);
      } else {
        setMainPin(1);
      }
    }
  }, [DataGeolocation]);

  useEffect(() => {
    if (setting.drag !== undefined) {
      setDragAble(setting.draggable);
    }
  }, []);

  return (
    <APIProvider apiKey={GMAPS_APIKEY} libraries={['marker']}>
      <div className="flex w-full h-[300px]">
        <Map
          mapId={GMAPS_ID}
          defaultZoom={18}
          defaultCenter={DataGeolocation}
          gestureHandling={'greedy'}
        >
          {/* advanced marker with html-content */}
          <AdvancedMarker
            position={DataGeolocation}
            // onDrag={(e) => console.log(e)}
            onDrag={(e) => {
              console.log(e);
            }}
            draggable={dragAble}
          >
            <Pin scale={mainPin}></Pin>
          </AdvancedMarker>
          {/* <AdvancedMarker
            position={DataGeolocation}
            // onDrag={(e) => console.log(e)}
            onDrag={(e) => {
              console.log(e);
            }}
            draggable={dragAble}
          ></AdvancedMarker> */}
        </Map>
      </div>
    </APIProvider>
  );
};

export default Gmaps;
