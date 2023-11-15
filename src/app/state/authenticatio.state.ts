import { LoginAction, PerfromToastAction, RetrieveCredentials, SaveCredentialsAction } from './authenticatio.actions';
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs';
import { ToastModel } from '../models/toast.model';

export interface LoginStateModel {
    token?: string;
    toast?: ToastModel;
}


@State<string[]>({
    name: 'LoginState',
    defaults: []
})
@Injectable()
export class LoginState {


    constructor(private authService: AuthService) { };


    @Selector()
    static loginToken(state: LoginStateModel) {
        return state.token;
    }

    @Selector()
    static toast(state: LoginStateModel) {
        return state.toast;
    }

    @Action(LoginAction)
    loginAction({ setState, dispatch }: StateContext<LoginStateModel>, { credentials }: LoginAction) {
        return this.authService.login(credentials).pipe(
            tap((response) => {
                setState(response);
                dispatch(new SaveCredentialsAction(response?.token));
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Success', message: `Welcome ${credentials.userName}` }
                ));
            }),
            catchError((error) => {
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Error', message: error.error.error }
                ));
                return error;
            })
        );
    }


    @Action(SaveCredentialsAction)
    saveCredentialsAction({ }: StateContext<LoginStateModel>, { token }: SaveCredentialsAction) {
        this.authService.saveCredentials(token);
    }

    @Action(RetrieveCredentials)
    retrieveCredentials({ setState }: StateContext<LoginStateModel>) {
        return this.authService.retrieveCredentials().pipe(
            tap((token) => {
                setState({ token: token ?? undefined })
            })
        );
    }


    @Action(PerfromToastAction)
    perfromToastAction({ setState }: StateContext<LoginStateModel>, { toast }: PerfromToastAction) {
        setState({ toast: toast });
        setTimeout(() => setState({ toast: { raise: false, message: '', type: '' } }), 2000);
    };
}