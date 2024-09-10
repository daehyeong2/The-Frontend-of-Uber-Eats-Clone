import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen absolute w-screen top-0 flex flex-col items-center justify-center -z-10">
      <h2 className="font-semibold text-2xl mb-3">Page Not Found</h2>
      <h4 className="font-medium mb-5">
        The page you're looking for does not exist or has moved.
      </h4>
      <Link className="hover:underline text-lime-600" to="/">
        Go back home &rarr;
      </Link>
    </div>
  );
};

export default NotFound;
