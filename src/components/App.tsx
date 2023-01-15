import { Weather } from "../types/Weather"
import { Info } from "./Info"
import { Component } from "react"
import css from "./app.module.css"
import humIcon from "../img/humidity-icon.svg"
import rainIcon from "../img/rain-icon.svg"
import windIcon from "../img/wind-icon.svg"
import { getDay } from "./utils/getDay"
import { getDate } from "./utils/getDate"
import { getTime } from "./utils/getTime"

interface AppState {
    weather: Weather;
}

const myFetch = (url: string) => {
    return fetch(url).then((data) => {
        if (data.ok) {
            return data.json();

        }
        throw Error("oops");
    });
};





export class App extends Component<{}, AppState> {
    state: AppState = {
        weather: {
            main: { temp: 0, feels_like: 0, humidity: 0, sea_level: 0 },
            wind: { speed: 0 },
            name: "",
            dt: 0,

        }

    }



    componentDidMount() {
        myFetch("https://api.openweathermap.org/data/2.5/weather?q=minsk&appid=80705822dbebd2920f115f199483856f")
            .then((data) => this.setState(prev => ({ ...prev, weather: { name: data.name, dt: data.dt, main: { ...data.main }, wind: { ...data.wind } } })));
        // .finally(() => {
        //     this.setState({ isLoading: false });
        // });
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {
        if (prevState.weather !== this.state.weather) {
            this.infoItems = [
                {
                    icon: humIcon,
                    label: "Humidity",
                    value: String(this.state.weather.main.humidity + "%"),
                },
                {
                    icon: rainIcon,
                    label: "Rain",
                    value: String(this.state.weather.main.sea_level + " m.o.m."),
                },
                {
                    icon: windIcon,
                    label: "Wind",
                    value: String(this.state.weather.wind.speed + " km/h"),
                },
            ];
        }
    }

    infoItems: { icon?: any; label: string; value: string }[] = [
        {
            icon: humIcon,
            label: "Humidity",
            value: String(this.state.weather.main.humidity + "%"),
        },
        {
            // icon: rainIcon,
            label: "Rain",
            value: String(this.state.weather.main.sea_level + " m.o.m."),
        },
        {
            // icon: windIcon,
            label: "Wind",
            value: String(this.state.weather.wind.speed + " km/h"),
        },
    ];

    render() {
        return (
            <div className={css.container}>
                <p className={css.temperature}>
                    {Math.round(this.state.weather?.main.temp! - 273.15)} &#176;C
                </p>
                <p className={css.date}>{getDate(this.state.weather?.dt)}</p>
                <p className={css.day}>
                    {getDay(this.state.weather?.dt)} {getTime(this.state.weather?.dt)}
                </p>
                <ul className={css.list}>
                    {this.infoItems.map((item, index) => (
                        <Info
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}
