"use strict";
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
const colors_1 = __importDefault(require("colors"));
const inquirer_1 = require("./helpers/inquirer");
const busquedas_1 = require("./models/busquedas");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const busquedas = new busquedas_1.Busquedas();
    let opt;
    do {
        opt = yield (0, inquirer_1.inquirerMenu)();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = yield (0, inquirer_1.leerInput)('Ciudad:');
                // Buscar los lugares
                const lugares = yield busquedas.ciudad(termino);
                const id = yield (0, inquirer_1.listarLugares)(lugares);
                // console.log( { id } );
                // Seleccionar el lugar
                const lugarSel = lugares.find(lugar => lugar.id === id);
                // console.log( lugarSel );
                // Clima
                const clima = yield busquedas.climarLugar(lugarSel.lat, lugarSel.lng);
                // Mostrar resultados
                console.clear();
                console.log(colors_1.default.green('\nInformación de la ciduad\n'));
                console.log('Ciudad:', colors_1.default.green(lugarSel.nombre));
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como está el clima:', colors_1.default.green(clima.desc));
                break;
        }
        if (opt !== 0)
            yield (0, inquirer_1.pausa)();
    } while (opt !== 0);
});
main();
