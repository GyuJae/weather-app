import React, { useState } from "react";
import { Dimensions, StatusBar, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Fontisto } from "@expo/vector-icons";
import { ICurrentAir, IDaily } from "../type";
import WeekWeather from "./WeekWeather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  weatherBackgroundColors,
  weatherMainBackgroundColors,
} from "../colors/colors";
import DetailWeather from "./DetailWeather";

const Day = styled.View<{ width: number; background: string }>`
  width: ${(props) => `${props.width}px`};
  background-color: ${(props) => props.background};
  justify-content: center;
  padding-top: 25px;
`;
const DayWeatherContainer = styled.View`
  justify-content: space-around;
  align-items: center;
`;

const Temp = styled.Text`
  font-weight: 500;
  font-size: 90px;
  color: white;
`;

const WeatherMain = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 28px;
  margin-bottom: 20px;
`;

const MinMaxTemp = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 15px;
  opacity: 0.6;
`;
const Description = styled.Text`
  color: white;
  font-weight: 800;
  font-size: 30px;
`;
const LocationView = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0px;
`;

const LocationName = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: 800;
`;

const WeekWeatherScroll = styled.ScrollView<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  height: 100%;
`;

const DustBtnView = styled.View`
  background-color: rgba(255, 255, 255, 0.3);
  width: 110px;
  height: 60px;
  margin: 10px 0px;
  margin-right: 10px;
  border-radius: 3px;
  flex-direction: row;
  justify-content: space-around;
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

const weathersMain: any = {
  Clouds: "흐림",
  Clear: "맑음",
  Atmosphere: "바람",
  Snow: "눈",
  Rain: "비",
  Drizzle: "이슬비",
  Thunderstorm: "뇌우",
};

const BtnText = styled.Text`
  font-size: 18px;
  font-weight: 900;
  color: white;
`;

interface IWeather {
  locationName: string;
  data: IDaily[];
  setWeathering: React.Dispatch<React.SetStateAction<boolean>>;
  currentAir: ICurrentAir;
}

const Weather: React.FC<IWeather> = ({
  locationName,
  data,
  setWeathering,
  currentAir,
}) => {
  const { width } = Dimensions.get("window");
  const [detail, setDetail] = useState<boolean>(false);
  const [detailIdx, setDetailIdx] = useState<number>(0);
  const Font = () => {
    if (currentAir.khaiGrade === "1") {
      return <AntDesign name="smile-circle" size={40} color="#0277BD" />;
    } else if (currentAir.khaiGrade === "2") {
      return <AntDesign name={"meho"} size={40} color="#0098A6" />;
    } else if (currentAir.khaiGrade === "3") {
      return <AntDesign name={"frown"} size={40} color="#EF6C00" />;
    }
    return (
      <MaterialCommunityIcons
        name={"emoticon-angry"}
        size={46}
        color="#C62827"
      />
    );
  };
  const Grade = (): string => {
    if (currentAir.khaiGrade === "1") {
      return "좋음";
    } else if (currentAir.khaiGrade === "2") {
      return "보통";
    } else if (currentAir.khaiGrade === "3") {
      return "나쁨";
    }
    return "아주 나쁨";
  };
  return (
    <Day
      width={width}
      background={weatherMainBackgroundColors[data[detailIdx].weather[0].main]}
    >
      <StatusBar barStyle={"light-content"} />

      {detail ? (
        <DetailWeather
          daily={data[detailIdx]}
          setDetail={setDetail}
          locationName={locationName}
          setDetailIdx={setDetailIdx}
        />
      ) : (
        <>
          <LocationView>
            <LocationName>{locationName}</LocationName>
          </LocationView>
          <DayWeatherContainer>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              <WeatherMain>{weathersMain[data[0].weather[0].main]}</WeatherMain>
              <Fontisto
                name={icons[data[0].weather[0].main]}
                size={120}
                color="white"
              />
              <Temp>{data[0].temp.day.toFixed(1)}º</Temp>
              <Description>{data[0].weather[0].description}</Description>
              <MinMaxTemp>
                최고 {data[0].temp.max.toFixed(0)}º / 최저{" "}
                {data[0].temp.min.toFixed(0)}º
              </MinMaxTemp>
            </TouchableOpacity>
          </DayWeatherContainer>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
            onPress={() => setWeathering((prev) => !prev)}
          >
            <DustBtnView>
              {Font()}
              <BtnText>{Grade()} </BtnText>
            </DustBtnView>
          </TouchableOpacity>
          <WeekWeatherScroll
            backgroundColor={weatherBackgroundColors[data[0].weather[0].main]}
            showsHorizontalScrollIndicator={false}
          >
            {data.map((day, key) => (
              <TouchableOpacity
                onPress={() => {
                  setDetail(true);
                  setDetailIdx(key);
                }}
                key={key}
              >
                <WeekWeather key={key} daily={day} />
              </TouchableOpacity>
            ))}
          </WeekWeatherScroll>
        </>
      )}
    </Day>
  );
};

export default Weather;
