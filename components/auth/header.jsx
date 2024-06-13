import React from "react";

const Header = ({ label }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-4">
      <h1
        className={
          "text-3xl font-semibold px-2 py-1 rounded-md mt-4 drop-shadow-md"
        }
      >
        <span className="text-red-500">SMRT</span>
        <span className="text-white">e</span>
        <span className="text-sky-500">Vote</span>
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Header;
