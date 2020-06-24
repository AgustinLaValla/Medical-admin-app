import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromEspecialidades from './reducers/especialidades.reducer';
import * as fromUI from './reducers/ui.reducer';
import * as fromESPECIALIDAD from './reducers/especialidad.reducer';
import * as fromSTUFF from './reducers/stuff.reducer';
import * as fromMIEMBRO from './reducers/miembro.reducer';
import * as fromTURNOS_DATA from './reducers/turnos-data.reducer';
import * as fromTURNOS from './reducers/turnos.reducer';
import * as fromTURNO from './reducers/turno.reducer';
import * as fromTURNOS_COUNTER from './reducers/turnosCounter.reducer';
import * as fromTABLE from './reducers/table.reducer';
import * as fromPACIENTES from './reducers/pacientes.reducer';
import * as fromPACIENTE_TURNOS from './reducers/pacient-turnos.reducer';
import * as fromPACIENT_TABLE from './reducers/pacient-table.reducer';
import * as fromPACIENT_DATA from './reducers/pacient-data.reducer';
import * as fromPACIENT from './reducers/paciente.reducer';
import * as fromAUTH from './reducers/auth.reducer';
import * as fromDIALOG from './reducers/dialog.reducer';
import * as fromCALENDAR from './reducers/calendar.reducer';
import * as fromSTATISTICS from './reducers/statistics.reducer';
import * as fromMUTUALES from './reducers/mutuales.reducer';
import * as fromPROGRES_BAR from './reducers/progress-bar.reducer';

export interface AppState { 
    ui: fromUI.UI_State,
    especialidades: fromEspecialidades.EspecialidadesState,
    especialidad: fromESPECIALIDAD.EspecialidadState,
    stuff: fromSTUFF.StuffState,
    miembro: fromMIEMBRO.MiembroState,
    turnos: fromTURNOS.TurnosState,
    turnos_data: fromTURNOS_DATA.TurnosDataState,
    table: fromTABLE.TableState,
    turno: fromTURNO.TurnoState,
    total_turnos: fromTURNOS_COUNTER.TurnosCounterState,
    pacientes: fromPACIENTES.PacientesState,
    paciente_turnos: fromPACIENTE_TURNOS.Pacient_Turnos,
    pacient_table: fromPACIENT_TABLE.PacientTable,
    pacient_data: fromPACIENT_DATA.PacientDataState,
    pacient: fromPACIENT.PacientState,
    auth: fromAUTH.AuthState,
    dialog:fromDIALOG.DialogState,
    calendar:fromCALENDAR.CalendarState,
    statistics: fromSTATISTICS.StatisticsState,
    mutuales:fromMUTUALES.MutualesState,
    progress_bar:fromPROGRES_BAR.ProgressBarState
};

export const appReducer: ActionReducerMap<AppState> = {
    especialidades: fromEspecialidades.especialidadesReducer,
    ui: fromUI.uiReducer,
    especialidad: fromESPECIALIDAD.especialidadReducer,
    stuff: fromSTUFF.stuffReducer,
    miembro: fromMIEMBRO.miembroReducer,
    turnos: fromTURNOS.turnosReducer,
    table: fromTABLE.tableReducer,
    turno: fromTURNO.turnoReducer,
    turnos_data:fromTURNOS_DATA.turnosDataReducer,
    total_turnos: fromTURNOS_COUNTER.turnosCounterReducer,
    pacientes: fromPACIENTES.pacientesReducer,
    paciente_turnos: fromPACIENTE_TURNOS.pacientTurnosReducer,
    pacient_table: fromPACIENT_TABLE.pacientTableReducer,
    pacient_data: fromPACIENT_DATA.pacientDataReducer,
    pacient: fromPACIENT.pacientReducer,
    auth: fromAUTH.authReducer,
    dialog: fromDIALOG.dialogReducer,
    calendar:fromCALENDAR.calendarReducer,
    statistics:fromSTATISTICS.statisticsReducer,
    mutuales:fromMUTUALES.mutualReducer,
    progress_bar: fromPROGRES_BAR.progressBarReducer
};

//SELECTORS
//ui selectors
export  const loadingFeature = (state:AppState) => state.ui;
export const getIsLoading = createSelector(loadingFeature, (state:fromUI.UI_State) => state.loading);
export const getUnsubsLoading = createSelector(loadingFeature,(state:fromUI.UI_State) => state.unsubscribeLoding);
//Especialidades selectors
export const getEspecialidadesState = createFeatureSelector<fromEspecialidades.EspecialidadesState>('especialidades')
export const getEspecialidades = createSelector(getEspecialidadesState, fromEspecialidades.getEspecialidadesSelector);
export const getEspecialidadesError = createSelector(getEspecialidadesState, fromEspecialidades.getEspecialidadesErrorSelector);
//Especialidad selectors
export const getEspecialidadState = createFeatureSelector<fromESPECIALIDAD.EspecialidadState>('especialidad');
export const getEspecialidad = createSelector(getEspecialidadState, fromESPECIALIDAD.getEspecialidadSelector);
//Stuff selectors
export  const getStuffState = createFeatureSelector<fromSTUFF.StuffState>('stuff');
export const getStuff = createSelector(getStuffState, fromSTUFF.getStuffSelector);
export const getStuffError = createSelector(getStuffState, fromSTUFF.getStuffErrorSelector);
//Miembro Selectors
export const getMiembroState = createFeatureSelector<fromMIEMBRO.MiembroState>('miembro');
export const getMiembro = createSelector(getMiembroState, fromMIEMBRO.getMiembroSelector);
export const getMiembroError = createSelector(getMiembroState, fromMIEMBRO.getMiembroErrorSelector)
//Turnos Selectors
// export const getTurnosState = createFeatureSelector<fromTURNOS.TurnosState>('turnos');
// export const getTurnos = createSelector(getTurnosState, fromTURNOS.getTurnosSelector);
// export const getTurnosError = createSelector(getTurnosState, fromTURNOS.getTurnosErrorSelector);
export const turnosFeature = (state:AppState) => state.turnos;
export const getTurnos = createSelector(turnosFeature, (state:fromTURNOS.TurnosState) => state.turnos);
export  const getIsFiltering = createSelector(turnosFeature, (state:fromTURNOS.TurnosState) => state.isFiltering);
export const getTurnosError = createSelector(turnosFeature, (state:fromTURNOS.TurnosState) => state.error);
//Turnos Data Selector
export const turnosDataFeature = (state:AppState) => state.turnos_data;
export const getShowTurnosData = createSelector(turnosDataFeature, (state:fromTURNOS_DATA.TurnosDataState) => state.show);
export const getEspecialistId = createSelector(turnosDataFeature, (state:fromTURNOS_DATA.TurnosDataState) => state.especialistaId );  
//Table selectors
export const getTableState = createFeatureSelector<fromTABLE.TableState>('table');
export const openTable = createSelector(getTableState, fromTABLE.openTableSelector);
export const getId = createSelector(getTableState, fromTABLE.idSelector);
export const getCounter = createSelector(getTableState, fromTABLE.counterSelector);
export const getBackgroundLayer = createSelector(getTableState, fromTABLE.backgroundLayerSelector);
export const getTableType = createSelector(getTableState, fromTABLE.tableTyoeSelector);
//Single Turno Selectors
export const getTurnoState = createFeatureSelector<fromTURNO.TurnoState>('turno');
export const getSingleTurno = createSelector(getTurnoState, fromTURNO.getSingleTurnoSelector);
export const getSingleTurnoError = createSelector(getTurnoState, fromTURNO.getSingleTurnoErrorSelector);
//Turnos Counter Selector
export  const getTurnosCounterState = createFeatureSelector<fromTURNOS_COUNTER.TurnosCounterState>('total_turnos');
export const getTurnosCounter = createSelector(getTurnosCounterState, fromTURNOS_COUNTER.turnosCounterSelector);
export const getTurnosConcretadosLength = createSelector(getTurnosCounterState, fromTURNOS_COUNTER.turnosConcretadosSelector);
//Pacientes Selector
export const getPacientesState = createFeatureSelector<fromPACIENTES.PacientesState>('pacientes');
export const getPacientes = createSelector(getPacientesState, fromPACIENTES.pacientesSelector);
export  const getPacientesError = createSelector(getPacientesState, fromPACIENTES.pacientesErrorSelector);
export const getPacientsCounter = createSelector(getPacientesState, fromPACIENTES.pacientesCounterSelector);
//Paciente Turnos Selector
export const getPacienteTurnosState = createFeatureSelector<fromPACIENTE_TURNOS.Pacient_Turnos>('paciente_turnos');
export const getPacienteTurnos = createSelector(getPacienteTurnosState, fromPACIENTE_TURNOS.pacientSelector);
export const getPacienteTurnosError = createSelector(getPacienteTurnosState, fromPACIENTE_TURNOS.pacientErrorSelector);
//Pacient Table Selector
export const getPacientTableState = createFeatureSelector<fromPACIENT_TABLE.PacientTable>('pacient_table');
export const open_pacient_table = createSelector(getPacientTableState, fromPACIENT_TABLE.openPacientTableSelector);
//Pacient Data Selector
export const getPacientDataState = createFeatureSelector<fromPACIENT_DATA.PacientDataState>('pacient_data');
export const getPacientData = createSelector(getPacientDataState,  fromPACIENT_DATA.pacientDataSelector);
export const getPacientDataId = createSelector(getPacientDataState,  fromPACIENT_DATA.pacientDataIdSelector);
//Pacinet Selector
export const pacientFeature = (state:AppState) => state.pacient;
export const getPacient = createSelector(pacientFeature, (state:fromPACIENT.PacientState) => state.pacient);
//Auth Selector
export const authFeature = (state:AppState) => state.auth;
export  const getIsAuth = createSelector(authFeature, (state:fromAUTH.AuthState) => state.isAuthenticated);
//Dialog Selector
export const dialogFeature = (state:AppState) => state.dialog;
export const getCloseDialog = createSelector(dialogFeature, (state:fromDIALOG.DialogState) => state.close);
//Calendar Selector
export const calendarFeature = (state:AppState) => state.calendar;
export const getShowCalendar = createSelector(calendarFeature, (state:fromCALENDAR.CalendarState) => state.show);
//Statistics Selectors
export const statisticsFeature = (state:AppState) => state.statistics;
export const showStatistics = createSelector(statisticsFeature, (state:fromSTATISTICS.StatisticsState) => state.show);
export const getSpecialistId = createSelector(statisticsFeature, (state:fromSTATISTICS.StatisticsState) => state.especialistaId);
//Mutuales Selectors
export const mutualesFeature = (state:AppState) => state.mutuales;
export const getMutuales = createSelector(mutualesFeature, (state:fromMUTUALES.MutualesState) => state.mutuales);
//Progress Bar Selector
export const progressBarFeature = (state:AppState) => state.progress_bar;
export const getShowProgressBar = createSelector(progressBarFeature, (state:fromPROGRES_BAR.ProgressBarState) => state.show);