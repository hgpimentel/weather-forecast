import React, { useContext } from "react";
import ColumnContainer from "./ColumnContainer";
import CenteredContainer from "./CenteredContainer";
import LocationContext from "../store/location-context";
import styled from "styled-components";

const CustomColumnContainer = styled(ColumnContainer)`
  padding: 2rem 3rem;

  & > div:last-child {
    margin-top: 1rem;
  }
`;

const Location: React.FC = () => {
  const { currentLocation } = useContext(LocationContext);

  if (!currentLocation) return null;

  return (
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
          <button>Change location</button>
        </div>
      </CustomColumnContainer>
    </CenteredContainer>
  );
};

export default Location;
