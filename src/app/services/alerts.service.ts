import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertsService {
    constructor() { }

    showSuccessAlert(title: string, text: string) {
        Swal.fire({
            title,
            text,
            showConfirmButton: true,
            confirmButtonColor: '#6a0080',
            confirmButtonText: 'OK!',
            icon: 'success'
        });
    };

    showWarningService(title:string, text:string) { 
        Swal.fire({
            title,
            text,
            showConfirmButton: true,
            confirmButtonColor: '#6a0080',
            confirmButtonText: 'OK!',
            icon: 'warning'
        });
    };

    showErrorAlert(title:string, text:string) {
        Swal.fire({
            title,
            text,
            showConfirmButton: true,
            confirmButtonColor: '#6a0080',
            confirmButtonText: 'OK!',
            icon: 'error'
        });
    };

    showHttpErrorAlert(error: any) {
        Swal.fire({
            title: 'Error',
            text: error.message,
            showConfirmButton: true,
            confirmButtonColor: '#6a0080',
            confirmButtonText: 'OK!',
            icon: 'error'
        });
    };
}