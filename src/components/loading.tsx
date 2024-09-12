import React from "react";

interface ILoadingProps {
  marginTop: number;
}

const Loading: React.FC<ILoadingProps> = ({ marginTop }) => {
  return (
    <div
      className={`flex justify-center gap-4 *:size-2.5 *:bg-black *:rounded-full *:animate-bounce-10 mt-${marginTop}`}
    >
      <div />
      <div className="animation-delay-100" />
      <div className="animation-delay-200" />
    </div>
  );
};

export default Loading;
