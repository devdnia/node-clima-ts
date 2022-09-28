import fs from 'fs';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { MapBoxPlace } from './mapBox';

const { parsed: {
    MAPBOX_KEY,
    OPENWEATHER_KEY,
} }: dotenv.DotenvConfigOutput | any = dotenv.config();


export class Busquedas {

    historial: string[] = [];
    dbPath: string = './db/database.json';

    constructor() {
        this.leerBD();
    }

    get historialCapitalizado(){

        return this.historial.map( lugar =>{

            let palabras: string [] = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            // Devuelvo las palabras unidas por el espacio
            return palabras.join(' ');
        });
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


    agregarHistorial( lugar : string ) {
        
        // Si está el lugar no graba
        if( this.historial.includes(lugar.toLowerCase() )) return;

        // Solo almaceno 5 en el historial
        this.historial = this.historial.splice( 0, 4 );

        // Guarda en el arreglo
        this.historial.unshift( lugar.toLowerCase() );
        
        // Grabar en DB
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial,

        }

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    leerBD(){
        // Comprobar que el archivo existe
        if( !fs.existsSync( this.dbPath ) ) return;

        // Si existe el archivo
        const info: string = fs.readFileSync( this.dbPath, { encoding: 'utf8' });
        const data = JSON.parse( info );

        this.historial = data.historial;
        
    }
}
