import { ToastModel } from '../models/toast.model';
import { LoginCredentials } from './../models/login.model';

export class LoginAction {
    static readonly type = '[LoginState] LoginAction';
    constructor(public credentials: LoginCredentials) { }
}

export class SaveCredentialsAction {
    static readonly type = '[LoginState] SaveCredentialsAction';
    constructor(public token: string) { }
}

export class RetrieveCredentials {
    static readonly type = '[LoginState] RetrieveCredentials';
    constructor() { }
}

export class PerfromToastAction {
    static readonly type = '[usersState] GetUsers';
    constructor(public toast: ToastModel) { }
}