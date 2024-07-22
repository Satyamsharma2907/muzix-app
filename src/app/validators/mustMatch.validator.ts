import { AbstractControl } from "@angular/forms";

export function mustMatchValidator(control: AbstractControl):{[key:string]:any}|null {
    const passwordValue = control.get("password")?.value;
    const confirmPasswordValue = control.get("confirmPassword")?.value;
    if (!passwordValue || !confirmPasswordValue) {
        return null;
    }
    if (passwordValue != confirmPasswordValue) {
        return { mustMatch: true }
    }
    return null;
}