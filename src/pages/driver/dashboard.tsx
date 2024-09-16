import GoogleMapReact from "google-map-react";

const Dashboard = () => {
  return (
    <div>
      <div
        style={{ width: window.innerWidth, height: "80vh" }}
        className="overflow-hidden py-40"
      >
        <GoogleMapReact
          defaultZoom={20}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          bootstrapURLKeys={{ key: "my-key" }}
        >
          <h1>hello</h1>
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Dashboard;
