import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMe from "../hooks/useMe";
import Logo from "./Logo";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useMe();
  return (
    <header className="py-4">
      <div className="w-full px-8 sm:px-10 max-w-screen-2xl mx-auto flex justify-between items-center">
        <Logo className="w-38" alt="logo" />
        <span>
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
