import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from 'react';
import { BsEnvelope, BsGeoAlt, BsPhone } from "react-icons/bs";
import "./InfosPageContact.css";

const InfosPageContact = () => {
    const center = {
        lat: 47.46991935457644,
        lng: -0.5492139424791649
    };

    const containerStyle = {
        width: "100%",
        height: "290px"
    };

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
          setZoom(16);
        }
    }, [mapInstance]);

    return ( 
        <>              
        <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
                <div className="adress">
                    <div className="outerCircle">
                        <BsGeoAlt size={24}/> 
                    </div>
                    <h4>Adresse :</h4>  
                    <p>25 rue d'Alsace, 49000 ANGERS</p>
                </div>
                <div className="email">
                    <div className="outerCircle">
                        <BsEnvelope size={24}/> 
                    </div>
                    <h4>Email :</h4>  
                    <p>contact@luxury-travel.com</p>
                </div>
                <div className="phone">
                    <div className="outerCircle">
                        <BsPhone size={24}/> 
                    </div>
                    <h4>Téléphone :</h4>  
                    <p>02 41 01 02 03</p>
                </div>
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
        </div>
        </>
     );
}
 
export default InfosPageContact;