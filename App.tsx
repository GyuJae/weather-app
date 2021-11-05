import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";

import { ICurrentAir, IDaily } from "./type";
import { getAirCurrent, getMeasuringStation } from "./api";
import { getNearbyStationName, IArr } from "./utils";
import { REACT_APP_API_GOOGLE_KEY, REACT_APP_API_WEATHER_KEY } from "./env";
import CurrentAirComponent from "./components/CurrentAirComponent";
import Weather from "./components/Weather";

const Container = styled.View<{ height: number }>`
  height: ${(props) => `${props.height}px`};
`;

const Loading = styled.View<{ height: number; width: number }>`
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  background-color: #f05050;
`;

const Permission = styled.View<{ width: number; height: number }>`
  background-color: #f05050;
  justify-content: center;
  align-items: center;
`;

const PermissionText = styled.Text`
  color: white;
  font-size: 30px;
`;

const DustContainer = styled.View<{ height: number }>`
  flex: 1;
  height: ${(props) => `${props.height}px`};
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState<string>("");
  const [days, setDaily] = useState<IDaily[]>([]);
  const [permission, setPermisson] = useState(true);
  const [currentAir, setCurrentAir] = useState<ICurrentAir[]>([]);
  const [street, setStreet] = useState<string>("");
  const [weathering, setWeathering] = useState<boolean>(true);
  const { width, height } = Dimensions.get("window");

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setPermisson(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    Location.setGoogleApiKey(REACT_APP_API_GOOGLE_KEY);
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setStreet(location[0].street ? location[0].street : "");
    setCity(location[0].city ? location[0].city : "");
    const { daily } = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${REACT_APP_API_WEATHER_KEY}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("api error");
        }
        return res.json();
      })
      .catch((e) => {
        alert(e);
      });
    const result: IArr[] = await getDust(
      location[0].city ? location[0].city : city
    );
    const nearStationName = getNearbyStationName(result, latitude, longitude);
    const currentData: ICurrentAir[] = await getAirCurrent(nearStationName);
    setCurrentAir(currentData);
    setDaily(daily);
    setLoading(false);
  };

  const getDust = async (city: string) => {
    const {
      response: {
        body: { items },
      },
    } = await getMeasuringStation(city);

    return items;
  };
  useEffect(() => {
    setLoading(true);
    getWeather();
  }, []);
  return (
    <Container height={height}>
      <StatusBar />
      {loading ? (
        <Loading width={width} height={height}>
          <ActivityIndicator color="white" style={{ flex: 1 }} size="large" />
        </Loading>
      ) : permission ? (
        weathering ? (
          <Weather
            data={days}
            locationName={`${city} ${street}`}
            setWeathering={setWeathering}
            currentAir={currentAir[0]}
          />
        ) : (
          <DustContainer height={height}>
            <CurrentAirComponent
              data={currentAir}
              locationName={`${city} ${street}`}
              setWeathering={setWeathering}
              daily={days[0]}
            />
          </DustContainer>
        )
      ) : (
        <Permission width={width} height={height}>
          <PermissionText>No Permisson</PermissionText>
        </Permission>
      )}
    </Container>
  );
}
