import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMe from "../hooks/useMe";
import Logo from "./Logo";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-amber-100 py-2 border-2 border-amber-300 border-opacity-45">
          <span className="font-freesentation tracking-wide font-medium flex items-center justify-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2.5 text-lg" />
            Please verify your email.{" "}
            <p className="ml-2 font-light cursor-pointer">[Click to Close]</p>
          </span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-8 sm:px-10 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <Logo className="w-38" alt="logo" />
          </Link>
          <span>
            <Link to="/my-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
