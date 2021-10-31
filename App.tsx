import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";
import { IDaily } from "./type";
import { StatusBar } from "expo-status-bar";

const Container = styled.View`
  flex: 1;
  background-color: #333333;
`;

const City = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: white;
`;

const CityName = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 800;
`;

const Weather = styled.ScrollView`
  flex: 9;
  height: 100%;
`;

const Day = styled.View<{ width: number; background: string }>`
  width: ${(props) => props.width};
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  background-color: ${(props) => props.background};
  padding-top: 200px;
`;

const DayLeft = styled.View`
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const DayRight = styled.View`
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin-top: 100px;
`;

const Temp = styled.Text`
  font-weight: 600;
  font-size: 100px;
  color: white;
`;

const WeatherMain = styled.Text`
  color: white;
  font-size: 60px;
`;
const Description = styled.Text`
  color: white;
  font-size: 30px;
`;

const DateText = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 30px;
`;
const Loading = styled.View<{ height: number; width: number }>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const Permission = styled.View``;

const PermissionText = styled.Text``;

const API_KEY = "dd0ae37726d29559984de96940e25e55";

const icons: any = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};
const backgroundColors: any = {
  Clouds: "#7F919B",
  Clear: "tomato",
  Atmosphere: "#111521",
  Snow: "#304D86",
  Rain: "blue",
  Drizzle: "#170E0B",
  Thunderstorm: "yellow",
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState<string | null>(null);
  const [days, setDaily] = useState<IDaily[]>([]);
  const [permission, setPermisson] = useState(true);
  const { width, height } = Dimensions.get("window");
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setPermisson(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const { daily } = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
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
    setDaily(daily);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getWeather();
  }, []);
  return (
    <Container>
      <StatusBar style="light" />
      {loading ? (
        <Loading width={width} height={height}>
          <ActivityIndicator color="white" style={{ flex: 1 }} size="large" />
        </Loading>
      ) : permission ? (
        <>
          <Weather
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {days.map((day) => (
              <>
                <Day
                  width={width}
                  background={backgroundColors[day.weather[0].main]}
                >
                  <DayLeft>
                    <Temp>{day.temp.day.toFixed(1)}</Temp>
                    <WeatherMain>{day.weather[0].main}</WeatherMain>
                    <Description>{day.weather[0].description}</Description>
                  </DayLeft>
                  <DayRight>
                    <Fontisto
                      name={icons[day.weather[0].main]}
                      size={68}
                      color="white"
                    />
                  </DayRight>
                  <DateText>
                    {new Date(day.dt * 1000).toString().substring(0, 10)}
                  </DateText>
                  <City>
                    <CityName>{city}</CityName>
                  </City>
                </Day>
              </>
            ))}
          </Weather>
        </>
      ) : (
        <Permission>
          <PermissionText>no access </PermissionText>
        </Permission>
      )}
    </Container>
  );
}
