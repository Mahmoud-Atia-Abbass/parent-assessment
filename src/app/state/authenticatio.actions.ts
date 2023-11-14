import { LoginCredentials } from './../models/login.model';

export class LoginAction {
    static readonly type = '[LoginState] LoginAction';
    constructor(public credentials: LoginCredentials) { }
}