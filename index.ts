


import colors from 'colors';
import { inquirerMenu, pausa, leerInput } from "./helpers/inquirer";
import { Busquedas } from "./models/busquedas";






const main = async () : Promise<void> => {

    const busquedas: Busquedas = new Busquedas();
    let opt: number; 


    do {
        opt = await inquirerMenu();
        
        switch ( opt) {

            case 1:
                // Mostrar mensaje
                const lugar: string = await leerInput( 'Ciudad:')
                await busquedas.ciudad( lugar );

                // Buscar los lugares
                

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log( colors.green('\nInformación de la ciduad\n') );
                console.log( 'Ciudad:', );
                console.log( 'Lat:', );
                console.log( 'Lng:', );
                console.log( 'Temperatura:', );
                console.log( 'Mínima:', );
                console.log( 'Máxima:', );

                break;
        
     
        }


        if ( opt !== 0) await pausa();

    } while ( opt !== 0 ); 
}


main();