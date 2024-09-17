import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🏍️</div>;

const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMap(map);
  };
  useEffect(() => {
    if (map && google.maps) {
      console.log(driverCoords);
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      // const geocoder = new google.maps.Geocoder();
      // geocoder.geocode(
      //   {
      //     location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
      //   },
      //   (results, status) => {
      //     console.log(status, results);
      //   }
      // );
    }
  }, [driverCoords, map]);
  const onGetRouteClick = () => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    if (map) {
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          travelMode: google.maps.TravelMode.TRANSIT,
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.05,
              driverCoords.lng - 0.03
            ),
          },
        },
        (result, status) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };
  return (
    <div>
      <div
        style={{ width: window.innerWidth, height: "50vh" }}
        className="overflow-hidden flex justify-center"
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 37, lng: 125 }}
          bootstrapURLKeys={{ key: "AIzaSyAqcdPHwESOVVduQcPe1I3-CbCZZ7MjfxU" }}
        >
          <Driver lat={37} lng={125} />
        </GoogleMapReact>
      </div>
      <button onClick={onGetRouteClick}>Get route</button>
    </div>
  );
};

export default Dashboard;
