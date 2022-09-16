import inquirer from 'inquirer';
import colors from 'colors';



const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿ Que desea hacer?',
        choices: [
            {
                value: 1,
                name: colors.green('1.') + ' Buscar ciudad',
            },
            {
                value: 2,
                name: colors.green('2.') + ' Historial',
            },
            {
                value: 0,
                name:  colors.green('0.') + ' Salir',
            },

        ]
    }
];




export const inquirerMenu = async () => {

    console.clear();
    console.log(colors.green('==============================') );
    console.log(colors.gray('    Seleccione una opción' ) );
    console.log(colors.green('==============================\n') );

    const { opcion } = await inquirer.prompt( preguntas );


    return opcion;

}

export const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt( question );
    
}


export const leerInput = async ( message : string) : Promise<string> => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value: string  ) {
                if ( value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );

    return desc;

}


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

