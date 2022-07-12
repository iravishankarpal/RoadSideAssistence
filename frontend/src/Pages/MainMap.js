import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { BiCurrentLocation, BiSubdirectoryLeft } from "react-icons/bi";
import "./App.css";
// import { Link, Outlet } from "react-router-dom";

import styled from "styled-components";
import Loding from "../component/Loding";
// import { Button } from "react-bootstrap";
import Help from "../component/Help";
// import Options from "../component/Options";
// import { Outlet } from "react-router-dom";
const InCenterOfPage = styled.div`
  height: 100vh;
  font-size: 10rem;
`;

const InputsAreas = styled.div`
  z-index: 300;
  position: absolute;
  margin: 3px;
  display: flex;
  flex-direction: row;
  min-width: 100vw;
  & > Autocomplete > input,
  & > div {
    margin-inline: auto;
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem;
    background-color: white;
    /* background-color: red; */
  }
  & > div {
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    & > input,
    & > div {
      width: 99%;
      padding: 0.1rem;
      margin: 0.1rem;
    }
  }
`;

function MainMap() {
  const [map, setmap] = useState(/** @type Google.maps.Map */ null);
  const [Distance, setDistance] = useState(null);
  const [Duration, setDuration] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const originRef = useRef();
  const destiantionRef = useRef();
  const [Latitute, setLatitute] = useState(19.076);
  const [Longitute, setLongitute] = useState(72.8777);

  useEffect(() => {
    const currentPostion = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitute(position.coords.latitude);
        setLongitute(position.coords.longitude);
        console.log("in main map current location")
        // console.log(Latitute, Longitute);
      });
    };
    currentPostion();
  }, []);
  const center = useMemo(
    () => ({ lat: Latitute, lng: Longitute }),
    [Latitute, Longitute]
  );
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  // for calculating route
  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  if (!isLoaded)
    return (
      <InCenterOfPage>
        <Loding></Loding>
      </InCenterOfPage>
    );
  else
    return (
      <div>
        <InputsAreas className="container ">
          <Autocomplete>
            <input type="text" ref={originRef} placeholder="source" />
          </Autocomplete>
          <Autocomplete>
            <input type="text" ref={destiantionRef} placeholder="destination" />
          </Autocomplete>
          <div>
            {" "}
            <span>
              <BiSubdirectoryLeft
                onClick={() => {
                  calculateRoute();
                }}
              ></BiSubdirectoryLeft>
            </span>
            <span> Distance : {Distance} </span> <span>time : {Duration} </span>{" "}
            <span>
              <BiCurrentLocation
                onClick={() => map.panTo(center)}
              ></BiCurrentLocation>
            </span>
          </div>
        </InputsAreas>

        <GoogleMap
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
          onLoad={(map) => setmap(map)}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
        <Help></Help>
      </div>
    );
}

export default MainMap;
