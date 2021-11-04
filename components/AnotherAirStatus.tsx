import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

interface IAnotherAirStatus {
  grade: string;
  title: string;
}

const Container = styled.View<{ width: number }>`
  width: ${(props) => `${props.width / 5}px`};
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const TitleText = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: 800;
  margin-bottom: 10px;
`;
const GradeText = styled.Text`
  font-size: 15px;
  color: white;
  font-weight: 700;
  margin-top: 5px;
`;

const AnotherAirStatus: React.FC<IAnotherAirStatus> = ({ grade, title }) => {
  const { width } = Dimensions.get("window");
  const Font = (gradeItem: string) => {
    if (gradeItem === "1") {
      return <FontAwesome5 name={"smile"} size={50} color="white" />;
    } else if (gradeItem === "2") {
      return <FontAwesome5 name={"meh"} size={50} color="white" />;
    } else if (gradeItem === "3") {
      return <FontAwesome5 name={"frown"} size={50} color="white" />;
    }
    return <FontAwesome5 name={"angry"} size={50} color="white" />;
  };
  const Grade = (gradeItem: string): string => {
    if (gradeItem === "1") {
      return "좋음";
    } else if (gradeItem === "2") {
      return "보통";
    } else if (gradeItem === "3") {
      return "나쁨";
    }
    return "아주 나쁨";
  };
  return (
    <Container width={width}>
      <TitleText>{title}</TitleText>
      {Font(grade)}
      <GradeText>{Grade(grade)}</GradeText>
    </Container>
  );
};

export default AnotherAirStatus;
