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
exports.leerInput = exports.pausa = exports.inquirerMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const colors_1 = __importDefault(require("colors"));
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿ Que desea hacer?',
        choices: [
            {
                value: 1,
                name: colors_1.default.green('1.') + ' Buscar ciudad',
            },
            {
                value: 2,
                name: colors_1.default.green('2.') + ' Historial',
            },
            {
                value: 0,
                name: colors_1.default.green('0.') + ' Salir',
            },
        ]
    }
];
const inquirerMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log(colors_1.default.green('=============================='));
    console.log(colors_1.default.gray('    Seleccione una opción'));
    console.log(colors_1.default.green('==============================\n'));
    const { opcion } = yield inquirer_1.default.prompt(preguntas);
    return opcion;
});
exports.inquirerMenu = inquirerMenu;
const pausa = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'} para continuar`
        }
    ];
    console.log('\n');
    yield inquirer_1.default.prompt(question);
});
exports.pausa = pausa;
const leerInput = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = yield inquirer_1.default.prompt(question);
    return desc;
});
exports.leerInput = leerInput;
// export const listadoTareasBorrar = async ( tareas = [] ) => {
//     const choices = tareas.map( (tarea, index ) => {
//         const idx = `${index + 1}`.green;
//         return {
//             value: tarea.id,
//             name: `${ idx}. ${ tarea.desc }`,
//         }
//     });
//     choices.unshift({
//         value: '0',
//         name: '0.'.green + ' Cancelar'
//     });
//     const preguntas = [
//         {
//             type: 'list',
//             name: 'id',
//             message: 'Borrar',
//             choices
//         }
//     ];
//     const { id } = await inquirer.prompt( preguntas );
//     return id;
// }
// export const confirmar = async ( message ) => {
//     const question = [
//         {
//             type: 'confirm',
//             name: 'ok',
//             message
//         }
//     ]
//     const { ok } = await inquirer.prompt( question );
//     return ok;
// }
// export const mostrarListadoChecklist = async ( tareas = [] ) => {
//     const choices = tareas.map( (tarea, index ) => {
//         const idx = `${index + 1}`.green;
//         return {
//             value: tarea.id,
//             name: `${ idx}. ${ tarea.desc }`,
//             checked: ( tarea.completadoEn ) ? true : false,
//         }
//     });
//     const pregunta = [
//         {
//             type: 'checkbox',
//             name: 'ids',
//             message: 'Selecciones',
//             choices
//         }
//     ];
//     const { ids } = await inquirer.prompt( pregunta );
//     return ids;
// }
