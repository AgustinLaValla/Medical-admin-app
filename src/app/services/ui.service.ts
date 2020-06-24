import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class UiService {
    constructor(private snack: MatSnackBar) { } 

    showSnackBar(message: string, action, duration:number) { 
        this.snack.open(message, action, {
            duration: duration
        })
    }
}