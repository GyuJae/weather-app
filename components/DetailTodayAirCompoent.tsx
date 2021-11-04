import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { airBackgroundColor } from "../colors/colors";
import { ICurrentAir } from "../type";
import DetailTodayAirCompoentItem from "./DetailTodayAirCompoentItem";

interface IDetailTodayAirCompoent {
  data: ICurrentAir;
  locationName: string;
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.View<{ height: number }>`
  height: ${(props) => `${props.height}px`};
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LocationText = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: 800;
`;

const DataTimeText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: 800;
  opacity: 0.8;
`;
const DetailTodayAirCompoentContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const Content = styled.View<{ backgroudColor: string; width: number }>`
  flex: 4;
  background-color: ${(props) => props.backgroudColor};
  width: ${(props) => `${props.width}px`};
`;

const DetailTodayAirCompoent: React.FC<IDetailTodayAirCompoent> = ({
  data,
  locationName,
  setDetail,
}) => {
  const { width, height } = Dimensions.get("window");
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => setDetail(false)}>
      <Container height={height}>
        <Header>
          <LocationText>{locationName}</LocationText>
          <DataTimeText>{data.dataTime}</DataTimeText>
        </Header>
        <Content
          backgroudColor={airBackgroundColor(data.khaiGrade)}
          width={width}
        >
          <DetailTodayAirCompoentContainer>
            {data.khaiGrade && (
              <DetailTodayAirCompoentItem
                dust={"통합지수"}
                grade={data.khaiGrade}
                value={data.khaiValue}
              />
            )}
          </DetailTodayAirCompoentContainer>
          <DetailTodayAirCompoentContainer>
            {data.pm10Grade && (
              <DetailTodayAirCompoentItem
                dust={"미세먼지"}
                grade={data.pm10Grade}
                value={data.pm10Value + " ㎍/㎥"}
              />
            )}
            {data.pm25Grade && (
              <DetailTodayAirCompoentItem
                dust={"초미세먼지"}
                grade={data.pm25Grade}
                value={data.pm25Value + " ㎍/㎥"}
              />
            )}
          </DetailTodayAirCompoentContainer>
          <DetailTodayAirCompoentContainer>
            {data.o3Grade && (
              <DetailTodayAirCompoentItem
                dust={"오존"}
                grade={data.o3Grade}
                value={data.o3Value + " ppm"}
              />
            )}
            {data.no2Grade && (
              <DetailTodayAirCompoentItem
                dust={"이산화질소"}
                grade={data.no2Grade}
                value={data.no2Value + " ppm"}
              />
            )}
          </DetailTodayAirCompoentContainer>
          <DetailTodayAirCompoentContainer>
            {data.coGrade && (
              <DetailTodayAirCompoentItem
                dust={"일산화탄소"}
                grade={data.coGrade}
                value={data.coValue + " ppm"}
              />
            )}
            {data.so2Grade && (
              <DetailTodayAirCompoentItem
                dust={"아황산가스"}
                grade={data.so2Grade}
                value={data.so2Value + " ppm"}
              />
            )}
          </DetailTodayAirCompoentContainer>
        </Content>
      </Container>
    </TouchableOpacity>
  );
};

export default DetailTodayAirCompoent;
