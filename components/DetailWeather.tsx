import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  weatherBackgroundColors,
  weatherMainBackgroundColors,
} from "../colors/colors";
import { IDaily } from "../type";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { getFullDays } from "../utils";

interface IDetailWeather {
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
  daily: IDaily;
  locationName: string;
  setDetailIdx: React.Dispatch<React.SetStateAction<number>>;
}

const Container = styled.View<{ height: number; backgroundColor: string }>`
  height: ${(props) => `${props.height}px`};
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
`;

const LocationNameView = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 20px;
`;

const LocationNameText = styled.Text`
  font-size: 28px;
  color: white;
  font-weight: 800;
`;

const DateText = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 800;
  opacity: 0.7;
`;

const ContentConatiner = styled.View<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  padding-bottom: 20px;
`;

const ItemContainer = styled.View<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0px 5px;
`;

const Item = styled.View<{ height: number; width: number }>`
  height: ${(props) => `${props.height / 7}px`};
  width: ${(props) => `${props.width / 2.1}px`};
  background-color: rgba(250, 250, 250, 0.4);
  border-radius: 6px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const ItemContent = styled.View`
  justify-content: center;
  align-items: flex-start;
`;

const ItemContentText = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 800;
`;

const ItemContentValueText = styled.Text`
  font-size: 19px;
  color: white;
  font-weight: 800;
  opacity: 0.9;
`;

const DetailWeather: React.FC<IDetailWeather> = ({
  daily,
  setDetail,
  locationName,
  setDetailIdx,
}) => {
  const { height, width } = Dimensions.get("window");
  return (
    <Container
      height={height}
      backgroundColor={weatherMainBackgroundColors[daily.weather[0].main]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setDetailIdx(0);
          setDetail(false);
        }}
      >
        <LocationNameView>
          <LocationNameText>{locationName}</LocationNameText>
          <DateText>{getFullDays(daily.dt)}</DateText>
        </LocationNameView>
        <ContentConatiner
          backgroundColor={weatherBackgroundColors[daily.weather[0].main]}
        >
          <ItemContainer width={width}>
            <Item width={width} height={height}>
              <Ionicons name="water" size={40} color="#0073ff" />
              <ItemContent>
                <ItemContentText>습도</ItemContentText>
                <ItemContentValueText>{daily.humidity}%</ItemContentValueText>
              </ItemContent>
            </Item>
            <Item width={width} height={height}>
              <Ionicons name="cloud" size={40} color="#a7a6a6" />
              <ItemContent>
                <ItemContentText>흐림</ItemContentText>
                <ItemContentValueText>{daily.clouds}%</ItemContentValueText>
              </ItemContent>
            </Item>
          </ItemContainer>
          <ItemContainer width={width}>
            <Item width={width} height={height}>
              <Fontisto name="wind" size={35} color="#f0efef" />
              <ItemContent>
                <ItemContentText>바람</ItemContentText>
                <ItemContentValueText
                  style={{
                    fontSize: 12,
                  }}
                >
                  {daily.wind_speed} km/h
                </ItemContentValueText>
              </ItemContent>
            </Item>
            <Item width={width} height={height}>
              <Ionicons name="speedometer" size={40} color="#777777" />
              <ItemContent>
                <ItemContentText>대기압</ItemContentText>
                <ItemContentValueText
                  style={{
                    fontSize: 12,
                  }}
                >
                  {daily.pressure} hPa
                </ItemContentValueText>
              </ItemContent>
            </Item>
          </ItemContainer>
          <ItemContainer width={width}>
            <Item width={width} height={height}>
              <Feather name="sunrise" size={37} color="#EDCD00" />
              <ItemContent>
                <ItemContentText>일출</ItemContentText>
                <ItemContentValueText>
                  {new Date(daily.sunrise * 1000)
                    .toString()
                    .split(" ")[4]
                    .slice(0, 5)}
                </ItemContentValueText>
              </ItemContent>
            </Item>
            <Item width={width} height={height}>
              <Feather name="sunset" size={37} color="#EDCD00" />
              <ItemContent>
                <ItemContentText>일몰</ItemContentText>
                <ItemContentValueText>
                  {new Date(daily.sunset * 1000)
                    .toString()
                    .split(" ")[4]
                    .slice(0, 5)}
                </ItemContentValueText>
              </ItemContent>
            </Item>
          </ItemContainer>
          <ItemContainer width={width}>
            <Item width={width} height={height}>
              <Feather name="moon" size={37} color="#7ea8c7" />
              <ItemContent>
                <ItemContentText>월출</ItemContentText>
                <ItemContentValueText>
                  {new Date(daily.moonrise * 1000)
                    .toString()
                    .split(" ")[4]
                    .slice(0, 5)}
                </ItemContentValueText>
              </ItemContent>
            </Item>
            <Item width={width} height={height}>
              <Feather name="moon" size={37} color="#658ba7" />
              <ItemContent>
                <ItemContentText>월몰</ItemContentText>
                <ItemContentValueText>
                  {new Date(daily.moonset * 1000)
                    .toString()
                    .split(" ")[4]
                    .slice(0, 5)}
                </ItemContentValueText>
              </ItemContent>
            </Item>
          </ItemContainer>
          <ItemContainer width={width}>
            <Item width={width} height={height}>
              <FontAwesome5 name="sun" size={36} color="#DD1016" />
              <ItemContent>
                <ItemContentText>자외선</ItemContentText>
                <ItemContentValueText>{daily.uvi}</ItemContentValueText>
              </ItemContent>
            </Item>
            <Item width={width} height={height}>
              <Ionicons name="rainy" size={40} color="#4E6881" />
              <ItemContent>
                <ItemContentText>강우확률</ItemContentText>
                <ItemContentValueText>{daily.pop * 100}%</ItemContentValueText>
              </ItemContent>
            </Item>
          </ItemContainer>
        </ContentConatiner>
      </TouchableOpacity>
    </Container>
  );
};

export default DetailWeather;
