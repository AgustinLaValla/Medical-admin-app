import * as moment from 'moment'

export interface Turno {
    nombre:string;
    apellido:string;
    obra_social: string;
    numero_de_afiliado?:string;
    telefono?:string;
    desde: moment.Moment | string;
    hasta: moment.Moment | string;
    consulta?:string;
    especialista?:string;
    diagnostico?:string;
    id?: string;
    dni:string;
    dateInSeconds: number;
    especialistaId?:string;
    nacimiento?: string;
    nacimiento_seconds?: number;
}