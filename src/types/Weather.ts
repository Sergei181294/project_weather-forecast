export interface Weather {
  main: { 
    temp: string; 
    feels_like: string;
    humidity:string;
    sea_level:string;
  };
  wind: { speed: "" };
  name: string;
  id?: number;
}
