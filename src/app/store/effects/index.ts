import { EspecialidadesEffects } from './especialidades.effects';
import { EspecialidadEffects } from './especialidad.effects';
import { StuffEffect } from './stuff.effects';
import { MiembroEffects } from './miembro.effects';
import { TurnosEffect } from './turnos.effect';
import { TurnoEffects } from './turno.effects';
import { TurnosCounterEffect } from './turnosCounter.effects';
import { PacientesEffect } from './pacientes.effects';
import { PacientTurnosEffect } from './pacient-turnos.effects';
import { PacientEffects } from './pacient.effects';
import { MutualesEffects } from './mutuales.effects';

export const effectsArray: any[] = [
    EspecialidadesEffects, 
    EspecialidadEffects, 
    StuffEffect, 
    MiembroEffects, 
    TurnosEffect,
    TurnoEffects,
    TurnosCounterEffect,
    PacientesEffect,
    PacientTurnosEffect,
    PacientEffects,
    MutualesEffects
];

export * from './especialidades.effects';
export * from './especialidad.effects';
export * from './stuff.effects';
export * from './miembro.effects';
export * from './turnos.effect';
export * from './turno.effects';
export * from './turnosCounter.effects';
export * from './pacientes.effects';
export * from './pacient-turnos.effects';
export * from './pacient-turnos.effects';
export * from './mutuales.effects';