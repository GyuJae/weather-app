import React, { useState } from "react";
import { Dimensions, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ICurrentAir, IDaily } from "../type";
import { FontAwesome5 } from "@expo/vector-icons";
import TodayAirCurrentAir from "./TodayAirCurrentAir";
import AnotherAirStatus from "./AnotherAirStatus";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DetailTodayAirCompoent from "./DetailTodayAirCompoent";
import { airBackgroundColor, airMainBackgroundColor } from "../colors/colors";

interface ICurrentAirComponent {
  data: ICurrentAir[];
  locationName: string;
  setWeathering: React.Dispatch<React.SetStateAction<boolean>>;
  daily: IDaily;
}

const Container = styled.View<{ width: number; backgroundColor: string }>`
  flex: 1;
  width: ${(props) => `${props.width}px`};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  padding-top: 20px;
`;

const MainView = styled.View`
  align-items: center;
  justify-content: center;
  flex: 3.3;
`;

const GradeText = styled.Text`
  font-size: 50px;
  color: white;
  font-weight: 700;
  margin-top: 20px;
`;

const KhaiValue = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 500;
  margin-top: 10px;
`;

const CurrentAirScrollView = styled.ScrollView<{ backgroundColor: string }>`
  flex: 1.1;
  background-color: ${(props) => props.backgroundColor};
`;

const LocationName = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: 800;
  margin-bottom: 40px;
`;

const WeatherBtnView = styled.View`
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

const BtnText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: white;
`;

const weathersMain: any = {
  Clouds: "흐림",
  Clear: "맑음",
  Atmosphere: "바람",
  Snow: "눈",
  Rain: "비",
  Drizzle: "이슬비",
  Thunderstorm: "뇌우",
};
const weatherBackgroundColors: any = {
  Clouds: "#7F919B",
  Clear: "tomato",
  Atmosphere: "#111521",
  Snow: "#304D86",
  Rain: "#1A82FF",
  Drizzle: "#D1D3D4",
  Thunderstorm: "#FFEE75",
};

const WeatherFont = (weatherIcon: string) => {
  if (weatherIcon === "Clouds") {
    return (
      <Ionicons
        name="cloudy"
        size={38}
        color={weatherBackgroundColors[weatherIcon]}
      />
    );
  } else if (weatherIcon === "Clear") {
    return (
      <Ionicons
        name="sunny"
        size={38}
        color={weatherBackgroundColors[weatherIcon]}
      />
    );
  } else if (weatherIcon === "Atmosphere") {
    <Fontisto
      name={"cloudy-gusts"}
      size={38}
      color={weatherBackgroundColors[weatherIcon]}
    />;
  } else if (weatherIcon === "Snow") {
    return (
      <Fontisto
        name={"snowflake"}
        size={38}
        color={weatherBackgroundColors[weatherIcon]}
      />
    );
  } else if (weatherIcon === "Rain") {
    return (
      <Ionicons
        name="rainy"
        size={38}
        color={weatherBackgroundColors[weatherIcon]}
      />
    );
  } else if (weatherIcon === "Drizzle") {
    return (
      <FontAwesome5
        name={"cloud-rain"}
        size={38}
        color={weatherBackgroundColors[weatherIcon]}
      />
    );
  } else if (weatherIcon === "Thunderstorm") {
    return (
      <Ionicons
        name="thunderstorm"
        size={38}
        color={weatherBackgroundColors[weatherIcon]}
      />
    );
  }
};

const CurrentAirComponent: React.FC<ICurrentAirComponent> = ({
  data,
  locationName,
  setWeathering,
  daily,
}) => {
  const { width } = Dimensions.get("window");
  const [detail, setDetail] = useState<boolean>(false);
  const [detailIdx, setDetailIdx] = useState<number>(0);
  const Font = () => {
    if (data[0].khaiGrade === "1") {
      return <FontAwesome5 name={"smile"} size={180} color="white" />;
    } else if (data[0].khaiGrade === "2") {
      return <FontAwesome5 name={"meh"} size={180} color="white" />;
    } else if (data[0].khaiGrade === "3") {
      return <FontAwesome5 name={"frown"} size={180} color="white" />;
    }
    return <FontAwesome5 name={"angry"} size={180} color="white" />;
  };
  const Grade = (): string => {
    if (data[0].khaiGrade === "1") {
      return "좋음";
    } else if (data[0].khaiGrade === "2") {
      return "보통";
    } else if (data[0].khaiGrade === "3") {
      return "나쁨";
    }
    return "아주 나쁨";
  };

  return (
    <Container
      width={width}
      backgroundColor={airMainBackgroundColor(data[0].khaiGrade)}
    >
      <StatusBar barStyle="light-content" />

      {detail ? (
        <DetailTodayAirCompoent
          data={data[detailIdx]}
          locationName={locationName}
          setDetail={setDetail}
        />
      ) : (
        <>
          <MainView>
            <LocationName>{locationName}</LocationName>
            {Font()}
            <GradeText>{Grade()}</GradeText>
            <KhaiValue>통합지수 : {data[0].khaiValue}</KhaiValue>
          </MainView>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
            onPress={() => setWeathering((prev) => !prev)}
          >
            <WeatherBtnView>
              {WeatherFont(daily.weather[0].main)}
              <BtnText>{weathersMain[daily.weather[0].main]}</BtnText>
            </WeatherBtnView>
          </TouchableOpacity>
          <CurrentAirScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            backgroundColor={airBackgroundColor(data[0].khaiGrade)}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              {data[0].pm10Grade && (
                <AnotherAirStatus title="미세먼지" grade={data[0].pm10Grade} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              {data[0].pm25Grade && (
                <AnotherAirStatus
                  title="초미세먼지"
                  grade={data[0].pm25Grade}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              {data[0].no2Grade && (
                <AnotherAirStatus title="이산화질소" grade={data[0].no2Grade} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              {data[0].o3Grade && (
                <AnotherAirStatus title="오존" grade={data[0].o3Grade} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              {data[0].coGrade && (
                <AnotherAirStatus title="일산화탄소" grade={data[0].coGrade} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setDetailIdx(0);
                setDetail(true);
              }}
            >
              {data[0].so2Grade && (
                <AnotherAirStatus title="아황산가스" grade={data[0].so2Grade} />
              )}
            </TouchableOpacity>
          </CurrentAirScrollView>
          <CurrentAirScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            backgroundColor={airBackgroundColor(data[0].khaiGrade)}
          >
            {data.map((item, idx) => (
              <TouchableOpacity
                onPress={() => {
                  setDetailIdx(idx);
                  setDetail(true);
                }}
              >
                <TodayAirCurrentAir key={idx} {...item} />
              </TouchableOpacity>
            ))}
          </CurrentAirScrollView>
        </>
      )}
    </Container>
  );
};

export default CurrentAirComponent;
