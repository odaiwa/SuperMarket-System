import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    private notification = new Notyf({ duration: 5000, position: { x: "center", y: "top" } });

    public success(message: string): void { //success notify
        this.notification.success(message);
    }

    public error(err: any): void { //error notify
        const message = this.getErrorMessage(err);
        this.notification.error(message);
    }

    private getErrorMessage(err: any): string {
        if (typeof err === "string") {
            return err;
        }

        if (typeof err.error === "string") {
            return err.error;
        }

        if (Array.isArray(err.error)) {
            return err.error[0];
        }

        if (typeof err.message === "string") {
            return err.message;
        }

        return "Some error occurred, please try again.";
    }

}
