import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Loader = ({ className = "w-7" }: { className?: string }) => {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className={`aspect-square ${className} animate-spin`}
    />
  );
};

export default Loader;
