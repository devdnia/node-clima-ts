


import colors from 'colors';
import { inquirerMenu, pausa, leerInput, listarLugares } from "./helpers/inquirer";
import { Busquedas } from "./models/busquedas";
import { MapBoxPlace } from './models/mapBox';






const main = async () : Promise<void> => {

    const busquedas: Busquedas = new Busquedas();
    let opt: number; 


    do {
        opt = await inquirerMenu();
        
        switch ( opt) {

            case 1:
                // Mostrar mensaje
                const termino: string = await leerInput( 'Ciudad:')

                // Buscar los lugares
                const lugares : MapBoxPlace [] = await busquedas.ciudad( termino );
                const id = await listarLugares( lugares);

                // console.log( { id } );
                

                // Seleccionar el lugar
                const lugarSel  = lugares.find( lugar => lugar.id === id );
                // console.log( lugarSel );

                // Clima
                const clima = await busquedas.climarLugar( lugarSel!.lat, lugarSel!.lng );
                

                // Mostrar resultados
                console.clear();
                console.log( colors.green('\nInformación de la ciduad\n') );
                console.log( 'Ciudad:', colors.green( lugarSel!.nombre ) );
                console.log( 'Lat:', lugarSel!.lat );
                console.log( 'Lng:', lugarSel!.lng );
                console.log( 'Temperatura:', clima!.temp);
                console.log( 'Mínima:', clima!.min);
                console.log( 'Máxima:', clima!.max);
                console.log( 'Como está el clima:', colors.green( clima!.desc) );

                break;
        
     
        }


        if ( opt !== 0) await pausa();

    } while ( opt !== 0 ); 
}


main();