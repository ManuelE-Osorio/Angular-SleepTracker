import { FormControl } from "@angular/forms";

export interface AccountDto{
    id: string;
    userName: string;
}

export interface Account{
    email: string;
    password: string;
}

export interface AccountForm{
    email: FormControl<string>,
    password: FormControl<string>
}