import * as dotenv from 'dotenv';
import axios from 'axios';

const {  parsed: {
    MAPBOX_KEY
}} :  dotenv.DotenvConfigOutput | any = dotenv.config();

export class Busquedas {

    historal: string[] = [ 'Alicante', 'Madrid', 'Barcelona' ];

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

    async ciudad( lugar: string ) {

        try {
            // Petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get('');
            console.log( resp.data );

            return []
            
        } catch (error) {
            return [];
        }


    }


}
