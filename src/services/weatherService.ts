import axios from "axios";

interface paramsItf {
  location: string;
  days?: number;
  isCurrent: boolean;
  signal: AbortSignal;
}

export const fetchWeather = async (params: paramsItf) => {
  try {
    let url = `${process.env.REACT_APP_API_URL}/${
      params.isCurrent ? "current" : "forecast"
    }.json?key=${process.env.REACT_APP_API_KEY}&q=${params.location}`;

    if (params.days) {
      url += "&days=" + params.days;
    }

    const response = await axios.get(url, { signal: params.signal });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
