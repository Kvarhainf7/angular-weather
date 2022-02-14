export interface Weather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: current;
  daily: object;
}

interface current {
  dt: number;
  temp: number;
  weather: weather;
}

interface weather {
  "0": o;
}
interface o {
  description:string;
  icon: string;
  id: number;
  main: string;
}
