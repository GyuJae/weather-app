export const airBackgroundColor = (khaiGrade: string): string => {
  if (khaiGrade === "1") {
    return "#0277BD";
  } else if (khaiGrade === "2") {
    return "#0098A6";
  } else if (khaiGrade === "3") {
    return "#EF6C00";
  }
  return "#C62827";
};
export const airMainBackgroundColor = (khaiGrade: string): string => {
  if (khaiGrade === "1") {
    return "#006ead";
  } else if (khaiGrade === "2") {
    return "#00838f";
  } else if (khaiGrade === "3") {
    return "#da6505";
  }
  return "#b11212";
};

export const weatherMainBackgroundColors: any = {
  Clouds: "#608192",
  Clear: "#f53a3a",
  Atmosphere: "#060b1b",
  Snow: "#10398b",
  Rain: "#0073ff",
  Drizzle: "#aeb0b1",
  Thunderstorm: "#ffe732",
};

export const weatherBackgroundColors: any = {
  Clouds: "#7F919B",
  Clear: "#f05050",
  Atmosphere: "#111521",
  Snow: "#304D86",
  Rain: "#1A82FF",
  Drizzle: "#D1D3D4",
  Thunderstorm: "#FFEE75",
};
