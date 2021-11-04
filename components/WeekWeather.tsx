import React from "react";
import styled from "styled-components/native";
import { IDaily } from "../type";
import { getDays, getWeek } from "../utils";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
`;

const WeekView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Week = styled.Text`
  font-size: 26px;
  color: white;
  font-weight: 900;
  margin-right: 10px;
`;
const Days = styled.Text`
  font-size: 23px;
  color: white;
  opacity: 0.7;
  font-weight: 600;
`;

const TempView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const TempAndHumidityView = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  width: 52px;
`;

const Temp = styled.Text`
  font-size: 28px;
  color: white;
  font-weight: 900;
`;

const HumidityView = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Humidity = styled.Text`
  font-size: 10px;
  color: white;
  font-weight: 900;
`;

const IconView = styled.View`
  justify-content: center;
  align-items: center;
`;

const icons: any = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

interface IWeekWeather {
  daily: IDaily;
}

const WeekWeather: React.FC<IWeekWeather> = ({
  daily: { dt, weather, humidity, temp },
}) => {
  return (
    <Container>
      <WeekView>
        <Week>{getWeek(dt)}</Week>
        <Days>{getDays(dt)}</Days>
      </WeekView>
      <TempView>
        <IconView>
          <Fontisto name={icons[weather[0].main]} size={50} color="white" />
        </IconView>
        <TempAndHumidityView>
          <Temp>{temp.day.toFixed(0)}º</Temp>
        </TempAndHumidityView>
      </TempView>
    </Container>
  );
};

export default WeekWeather;
