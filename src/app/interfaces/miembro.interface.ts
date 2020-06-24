export interface Miembro { 
    apellido: string;
    nombre: string;
    especialidad:string;
    photoURL?: string;
    genero?: 'Masculino' | 'Femenino' | '' ;
    mutuales_adheridas?:string[];
    id?:string;
}