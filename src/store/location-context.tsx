import React, { useEffect, useState } from "react";

interface Location {
  city: string | null;
  country: string | null;
  lat: number;
  long: number;
}

type LocationType = Location | null;

const DefaultLocation: LocationType = {
  country: "Portugal",
  city: "Lisbon",
  lat: 38.7259284,
  long: -9.137382,
};

const LocationContext = React.createContext<{
  currentLocation: LocationType;
  onLocationChange: (location: LocationType) => void;
}>({
  currentLocation: null,
  onLocationChange: () => {},
});

export const LocationContextProvider: React.FC = ({ children }) => {
  const [location, setLocation] = useState<LocationType>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            country: null,
            city: null,
            long: position.coords.longitude,
            lat: position.coords.latitude,
          });
        },
        () => setLocation(DefaultLocation)
      );
      return;
    }
    setLocation(DefaultLocation);
  }, []);

  return (
    <LocationContext.Provider
      value={{ currentLocation: location, onLocationChange: setLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
