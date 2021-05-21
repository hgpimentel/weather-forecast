import React, { useContext } from "react";
import ColumnContainer from "./ColumnContainer";
import CenteredContainer from "./CenteredContainer";
import LocationContext from "../store/location-context";
import styled from "styled-components";

const CustomColumnContainer = styled(ColumnContainer)`
  padding: 2rem 3rem;

  & > div:nth-child(4) {
    margin-bottom: 1rem;
  }
`;

const Location: React.FC = () => {
  const { currentLocation } = useContext(LocationContext);

  if (!currentLocation) return null;

  return (
    <CenteredContainer>
      <CustomColumnContainer>
        <div>
          <h3>Current Location</h3>
        </div>
        <div>{`${currentLocation.city}, ${currentLocation.country}`}</div>
        <div>Lat: {currentLocation.lat} </div>
        <div>Long: {currentLocation.long} </div>
        <div>
          <button>Change location</button>
        </div>
      </CustomColumnContainer>
    </CenteredContainer>
  );
};

export default Location;
