import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { ICurrentAir } from "../type";
import { FontAwesome5 } from "@expo/vector-icons";

const Container = styled.View<{ width: number }>`
  width: ${(props) => `${props.width / 5}px`};
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const GradeText = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: 700;
  margin-top: 10px;
`;

const DataTime = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: 800;
  margin-bottom: 15px;
`;

const TodayAirCurrentAir: React.FC<ICurrentAir> = ({ khaiGrade, dataTime }) => {
  const { width } = Dimensions.get("window");
  const Font = () => {
    if (khaiGrade === "1") {
      return <FontAwesome5 name={"smile"} size={50} color="white" />;
    } else if (khaiGrade === "2") {
      return <FontAwesome5 name={"meh"} size={50} color="white" />;
    } else if (khaiGrade === "3") {
      return <FontAwesome5 name={"frown"} size={50} color="white" />;
    }
    return <FontAwesome5 name={"angry"} size={50} color="white" />;
  };
  const Grade = (): string => {
    if (khaiGrade === "1") {
      return "좋음";
    } else if (khaiGrade === "2") {
      return "보통";
    } else if (khaiGrade === "3") {
      return "나쁨";
    }
    return "아주 나쁨";
  };
  return (
    <Container width={width}>
      <DataTime>{dataTime.split(" ")[1]}</DataTime>
      {Font()}
      <GradeText>{Grade()}</GradeText>
    </Container>
  );
};

export default TodayAirCurrentAir;
