import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface IDetailTodayAirCompoentItem {
  dust: string;
  grade: string;
  value: string;
}

const Container = styled.View<{ width: number; height: number }>`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 10px;
  width: ${(props) => `${props.width / 2.1}px`};
  height: ${(props) => `${props.height / 7}px`};
  background-color: rgba(250, 250, 250, 0.4);
  margin-bottom: 10px;
  border-radius: 6px;
`;

const Text = styled.Text`
  color: white;
  font-size: 18px;
`;

const DustView = styled.View<{ width: number }>`
  width: ${(props) => `${props.width / 4}px`};
  align-items: flex-start;
  justify-content: center;
`;

const DetailTodayAirCompoentItem: React.FC<IDetailTodayAirCompoentItem> = ({
  dust,
  grade,
  value,
}) => {
  const { width, height } = Dimensions.get("window");
  const Font = (grade: string) => {
    if (grade === "1") {
      return <AntDesign name="smile-circle" size={40} color="#0277BD" />;
    } else if (grade === "2") {
      return <AntDesign name={"meho"} size={40} color="#0098A6" />;
    } else if (grade === "3") {
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
  return (
    <Container width={width} height={height}>
      {Font(grade)}
      <DustView width={width}>
        <Text>{dust}</Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {value}
        </Text>
      </DustView>
    </Container>
  );
};

export default DetailTodayAirCompoentItem;
