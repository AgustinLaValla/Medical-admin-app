import * as moment from 'moment';

export interface Pacient {
    nombre?:string;
    apellido?:string;
    obra_social?: string;
    numero_de_afiliado?:string;
    telefono?:string;
    id?: string;
    nacimiento?:moment.Moment | string;
    nacimiento_seconds?: number; 
}