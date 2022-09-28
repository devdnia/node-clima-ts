"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Busquedas = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const { parsed: { MAPBOX_KEY, OPENWEATHER_KEY, } } = dotenv.config();
class Busquedas {
    constructor() {
        this.historial = [];
        this.dbPath = './db/database.json';
        this.leerBD();
    }
    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            // Devuelvo las palabras unidas por el espacio
            return palabras.join(' ');
        });
    }
    get paramsMapbox() {
        return {
            'access_token': MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }
    get paramsOpenWeatherMap() {
        return {
            appid: OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        };
    }
    ciudad(lugar) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Petición http
                const instance = axios_1.default.create({
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                    params: this.paramsMapbox
                });
                const resp = yield instance.get('');
                // console.log( resp.data.features );
                return resp.data.features.map((lugar) => ({
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1],
                }));
            }
            catch (error) {
                return [];
            }
        });
    }
    climarLugar(lat, lon) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Instancia de axios
                const instance = axios_1.default.create({
                    baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                    params: Object.assign(Object.assign({}, this.paramsOpenWeatherMap), { lat, lon }),
                });
                // resp.data
                const resp = yield instance.get('');
                const { weather, main } = resp.data;
                return {
                    desc: weather[0].description,
                    min: main.temp_min,
                    max: main.temp_max,
                    temp: main.temp,
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    agregarHistorial(lugar) {
        // Si está el lugar no graba
        if (this.historial.includes(lugar.toLowerCase()))
            return;
        // Solo almaceno 5 en el historial
        this.historial = this.historial.splice(0, 4);
        // Guarda en el arreglo
        this.historial.unshift(lugar.toLowerCase());
        // Grabar en DB
        this.guardarDB();
    }
    guardarDB() {
        const payload = {
            historial: this.historial,
        };
        fs_1.default.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
    leerBD() {
        // Comprobar que el archivo existe
        if (!fs_1.default.existsSync(this.dbPath))
            return;
        // Si existe el archivo
        const info = fs_1.default.readFileSync(this.dbPath, { encoding: 'utf8' });
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}
exports.Busquedas = Busquedas;
