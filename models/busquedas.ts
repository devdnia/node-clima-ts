import * as dotenv from 'dotenv';
import axios from 'axios';
import { MapBoxPlace } from './mapBox';

const { parsed: {
    MAPBOX_KEY,
    OPENWEATHER_KEY,
} }: dotenv.DotenvConfigOutput | any = dotenv.config();


export class Busquedas {

    historal: string[] = ['Alicante', 'Madrid', 'Barcelona'];

    constructor() {
        // TODO: leer DB si existe
    }


    get paramsMapbox() {

        return {
            'access_token': MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeatherMap() {

        return {
            appid: OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad( lugar: string ) {


        try {
            // Petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });


            const resp = await instance.get('');
            // console.log( resp.data.features );

            // Video 76 - 3:17
            return resp.data.features.map( ( lugar : MapBoxPlace )  => ({
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1],
            }));
            



        } catch (error) {
            return [];
        }


    }

    async climarLugar( lat: number, lon: number){


        try {
            
            // Instancia de axios
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.paramsOpenWeatherMap, lat, lon },
            });

            // resp.data
            const resp = await instance.get('');
            const { weather, main  } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (error) {
            console.log(error);
        }
    }
}
