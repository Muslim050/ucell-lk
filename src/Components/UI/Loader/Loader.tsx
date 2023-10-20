import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import LoaderUcell from "../../../utils/Loader.json";
import LoaderDopL from "../../../utils/LoaderDop.json";

interface LoaderProps {
  height?: string;
  width?: string;
  wrapperHeight?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  height = "150px",
  width = "150px",
  wrapperHeight = "100vh",
}) => {
  return (
    <>
      <div
        style={{
          height: wrapperHeight,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Player
          autoplay
          loop
          src={LoaderUcell}
          style={{ height, width }}
        ></Player>
      </div>
    </>
  );
};

export const LoaderDop: React.FC<LoaderProps> = ({
  height = "150px",
  width = "150px",
  wrapperHeight = "100vh",
}) => {
  return (
    <>
      <div
        style={{
          height: wrapperHeight,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Player
          autoplay
          loop
          src={LoaderDopL}
          style={{ height, width }}
        ></Player>
      </div>
    </>
  );
};
