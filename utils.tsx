export interface IArr {
  addr: string;
  dmX: string;
  dmY: string;
  item: string;
  mangName: string;
  stationName: string;
  year: string;
}

export const getNearbyStationName = (
  arr: IArr[],
  latitude: number,
  longitude: number
): string => {
  let result =
    (latitude - parseFloat(arr[0].dmX)) ** 2 +
    (longitude - parseFloat(arr[0].dmY) ** 2);
  let stackObj: IArr = arr[0];
  arr.forEach((a) => {
    const distance =
      (latitude - parseFloat(a.dmX)) ** 2 +
      (longitude - parseFloat(a.dmY) ** 2);
    if (distance < result) {
      result = distance;
      stackObj = a;
    }
  });
  return stackObj.stationName;
};

export const getWeek = (dt: number): string => {
  const date = new Date(dt * 1000).toString().substring(0, 10).split(" ");

  const weekObj = (week: string): string => {
    if (week === "Mon") {
      return "월";
    } else if (week === "Tue") {
      return "화";
    } else if (week === "Wed") {
      return "수";
    } else if (week === "Thu") {
      return "목";
    } else if (week === "Fri") {
      return "금";
    } else if (week === "Sat") {
      return "토";
    }
    return "일";
  };
  const week = weekObj(date[0]);

  return week;
};

export const getFullDays = (dt: number): string => {
  const date = new Date(dt * 1000).toString().substring(0, 10).split(" ");
  const year = new Date(dt * 1000).toString().split(" ")[3];
  const monthOBj = (month: string): string => {
    if (month === "Jan") {
      return "01";
    }
    if (month === "Feb") {
      return "02";
    }
    if (month === "Mar") {
      return "03";
    }
    if (month === "Apr") {
      return "04";
    }
    if (month === "May") {
      return "05";
    }
    if (month === "Jun") {
      return "06";
    }
    if (month === "Jul") {
      return "07";
    }
    if (month === "Aug") {
      return "08";
    }
    if (month === "Sep") {
      return "09";
    }
    if (month === "Oct") {
      return "10";
    }
    if (month === "Nov") {
      return "11";
    }
    return "12";
  };
  const month = monthOBj(date[1]);
  const days = date[2];
  return `${year}-${month}-${days.padStart(2, "0")}`;
};

export const getDays = (dt: number): string => {
  const date = new Date(dt * 1000).toString().substring(0, 10).split(" ");
  const monthOBj = (month: string): string => {
    if (month === "Jan") {
      return "01";
    }
    if (month === "Feb") {
      return "02";
    }
    if (month === "Mar") {
      return "03";
    }
    if (month === "Apr") {
      return "04";
    }
    if (month === "May") {
      return "05";
    }
    if (month === "Jun") {
      return "06";
    }
    if (month === "Jul") {
      return "07";
    }
    if (month === "Aug") {
      return "08";
    }
    if (month === "Sep") {
      return "09";
    }
    if (month === "Oct") {
      return "10";
    }
    if (month === "Nov") {
      return "11";
    }
    return "12";
  };
  const month = monthOBj(date[1]);
  const days = date[2];
  return `${month}·${days.padStart(2, "0")}`;
};
