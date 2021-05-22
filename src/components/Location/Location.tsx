import React, { useContext, useState } from "react";
import ColumnContainer from "../Container/ColumnContainer";
import CenteredContainer from "../Container/CenteredContainer";
import LocationContext from "../../store/location-context";
import styled from "styled-components";
import ChangeLocationModal from "./ChangeLocationModal";

const CustomColumnContainer = styled(ColumnContainer)`
  padding: 2rem 3rem;

  & > div:last-child {
    margin-top: 1rem;
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
      <CenteredContainer>
        <CustomColumnContainer>
          <div>
            <h3>Current location</h3>
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
        </CustomColumnContainer>
      </CenteredContainer>
    </>
  );
};

export default Location;
