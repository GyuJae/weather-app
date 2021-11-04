import axios from "axios";

export const getMeasuringStation = async (city: string) => {
  try {
    const { data } = await axios.get(
      "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList",
      {
        params: {
          serviceKey:
            "X7VhRALdifkkGij+LfmVbmnXX5dXWIUTQR7Ud4kOJ2qb5J3X5ZeQny+wahpR3ok1loY6K+2FMIHpRvJP2LPlZQ==",
          returnType: "json",
          addr: city,
        },
      }
    );
    return data;
  } catch (error) {
    alert(error);
  }
};

const leapYear = (year: string): number => {
  const num_year = parseInt(year);
  if (num_year % 400 === 0) {
    return 29;
  } else if (num_year % 4 === 0 && num_year % 100 === 0) {
    return 28;
  } else if (num_year % 4 === 0) {
    return 29;
  }
  return 28;
};

export const getAirStatus = async (
  year: string,
  month: string,
  stationName: string
) => {
  try {
    const thirty_one = [1, 3, 5, 7, 8, 10, 12];
    const thirty = [4, 6, 9, 11];
    let days = 31;
    if (thirty.includes(parseInt(month))) {
      days = 30;
    } else if (thirty_one.includes(parseInt(month))) {
      days = 31;
    } else {
      days = leapYear(year);
    }

    const { data } = await axios.get(
      "http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg",
      {
        params: {
          serviceKey:
            "X7VhRALdifkkGij+LfmVbmnXX5dXWIUTQR7Ud4kOJ2qb5J3X5ZeQny+wahpR3ok1loY6K+2FMIHpRvJP2LPlZQ==",
          returnType: "json",
          inqBginDt: year + month.padStart(2, "0") + "01",
          inqEndDt: year + month.padStart(2, "0") + days,
          msrstnName: stationName,
        },
      }
    );
    return data;
  } catch (error) {
    alert(error);
  }
};

export const getAirCurrent = async (stationName: string) => {
  try {
    const {
      data: {
        response: {
          body: { items },
        },
      },
    } = await axios.get(
      "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty",
      {
        params: {
          serviceKey:
            "X7VhRALdifkkGij+LfmVbmnXX5dXWIUTQR7Ud4kOJ2qb5J3X5ZeQny+wahpR3ok1loY6K+2FMIHpRvJP2LPlZQ==",
          returnType: "json",
          stationName,
          dataTerm: "DAILY",
        },
      }
    );
    return items;
  } catch (error) {
    alert(error);
  }
};
