import { Weather } from "../types/Weather"
import { Info } from "./Info"
import { Component } from "react"
// import css from "./styles.module.css"

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
            main: { temp: "", feels_like: "", humidity: "", sea_level: "" },
            wind: { speed: "" },
            name: "",

        }

    }



    componentDidMount() {
        myFetch("https://api.openweathermap.org/data/2.5/weather?q=london&appid=80705822dbebd2920f115f199483856f")
            .then((data) => this.setState({ weather: data }));
        // .finally(() => {
        //     this.setState({ isLoading: false });
        // });
        console.log(this.state.weather.name)

    }

    infoItems: { icon?: any; label: string; value: string }[] = [
        {
            // icon: humIcon,
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
            <div>
                <ul>
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
