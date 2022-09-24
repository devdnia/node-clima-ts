"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapBoxPlace = void 0;
class MapBoxPlace {
    constructor(id, nombre, center) {
        this.id = id;
        this.nombre = nombre;
        this.lng = center[0];
        this.lat = center[1];
    }
    ;
}
exports.MapBoxPlace = MapBoxPlace;
