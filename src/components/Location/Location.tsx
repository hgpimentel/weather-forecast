import React, { useContext, useState } from "react";
import CenteredContainer from "../Container/CenteredContainer";
import LocationContext from "../../store/location-context";
import styled from "styled-components";
import ChangeLocationModal from "./ChangeLocationModal";

const CustomCenteredComponent = styled(CenteredContainer)`
  align-items: center;

  & > * {
    margin-right: 10px;
  }

  button {
    width: 150px;
    text-align: center;
    background-color: white;
    color: white;
    display: inline-block;
    border-radius: 5px;
    padding: 5px;
    border: none;
    cursor: pointer;
    color: teal;
    font-weight: bold;

    &:hover {
      background-color: ;
      color: rgba(0, 128, 128, 0.75);
    }
  }
`;

const Location: React.FC = () => {
  const { currentLocation } = useContext(LocationContext);

  const [isChangeLocation, setIsChangeLocation] = useState(false);

  const openModal = () => {
    setIsChangeLocation((prev) => !prev);
  };

  if (!currentLocation) return null;

  return (
    <>
      {isChangeLocation && (
        <ChangeLocationModal closeModal={() => setIsChangeLocation(false)} />
      )}
      <CustomCenteredComponent>
        <div>
          <h4>Current:</h4>
        </div>
        {currentLocation.city && currentLocation.country ? (
          <div>{`${currentLocation.city}, ${currentLocation.country}`}</div>
        ) : (
          <div>Browser based</div>
        )}
        <div>Lat: {currentLocation.lat} </div>
        <div>Long: {currentLocation.long} </div>
        <div>
          <button onClick={openModal}>Change location</button>
        </div>
      </CustomCenteredComponent>
    </>
  );
};

export default Location;
