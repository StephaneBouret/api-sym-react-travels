import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px"
};

const Maps = ({ travel }) => {
    const center = {
        lat: parseFloat(travel.lat),
        lng: parseFloat(travel.lng)
    };
    // const key = $process.env.API_MAP_GOOGLE_KEY; //test with your key please
    const key = "AIzaSyDswCYHHK2cFVxGaWxWDuY7JZkhEiNSjwM";
    
    if (!key) {
        throw new Error("Google token is not set");
    }

    const [mapInstance, setMapInstance] = useState(null);
    const[zoom, setZoom] = useState(6);

    const onMapLoad = useCallback(
      (map) => {
        setMapInstance(map);
      },
      [],
    );

    useEffect(() => {
      if (mapInstance) {
        setZoom(13);
      }
    }, [mapInstance]);   

    return ( 
        <section id="mapElement" className="mapElement pt-0">
            <div className="container">
                <div style={{ width: "100%", height: "100%" }}>
                    <LoadScript googleMapsApiKey={key}>
                        <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        onLoad={onMapLoad}
                        >
                        <Marker
                        position={center}
                        />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </section>
     );
}
 
export default Maps;
