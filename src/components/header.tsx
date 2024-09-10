import Logo from "./Logo";

const Header = () => {
  return (
    <header className="py-4">
      <div className="w-full max-w-screen-xl mx-auto">
        <Logo className="w-40 mb-10" alt="logo" />
      </div>
    </header>
  );
};

export default Header;
