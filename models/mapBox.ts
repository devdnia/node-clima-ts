

export class MapBoxPlace {
    public id: number;
    public nombre: string;
    public lng: number;
    public lat: number;
    place_name: any;
    center: any;

    constructor( id: number, nombre: string, center: number[] ) {
            this.id     = id;
            this.nombre = nombre;
            this.lng    = center[0];
            this.lat    = center[1];

    };

}