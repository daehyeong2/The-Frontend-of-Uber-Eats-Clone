import { gql, useSubscription } from "@apollo/client";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { ORDER_FRAGMENT } from "../../fragments";
import { cookedOrders } from "../../__generated__/cookedOrders";
import { Link } from "react-router-dom";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...OrderParts
    }
  }
  ${ORDER_FRAGMENT}
`;

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
  const makeRoute = () => {
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
  const { data: cookedOrdersData } = useSubscription<cookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);
  return (
    <div>
      <div
        style={{ width: window.innerWidth, height: "60vh" }}
        className="overflow-hidden flex flex-col items-center"
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 37, lng: 125 }}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY as string,
          }}
        >
          <Driver lat={37} lng={125} />
        </GoogleMapReact>
        <div className="bg-white relative max-w-screen-sm w-full -top-10 shadow-lg py-8 px-5">
          {cookedOrdersData?.cookedOrders ? (
            <>
              <h1 className="text-3xl font-medium font-freesentation text-center">
                New Cooked Order
              </h1>
              <h4 className="text-xl font-light font-freesentation text-center">
                Pick it up soon! @
                {cookedOrdersData?.cookedOrders.restaurant?.name}
              </h4>
              <Link
                to={`/orders/${cookedOrdersData?.cookedOrders.id}`}
                className="btn w-full mt-7 block text-center"
              >
                Accept Challenge &rarr;
              </Link>
            </>
          ) : (
            <h1 className="text-center text-3xl font-medium">
              No orders yet..
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
