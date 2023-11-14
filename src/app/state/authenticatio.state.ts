import { LoginAction } from './authenticatio.actions';
import { Injectable } from "@angular/core";
import { Action, Select, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs';

export interface LoginStateModel {
    userName: string | number;
    password: string | number;
}


@State<string[]>({
    name: 'animals',
    defaults: []
})
@Injectable()
export class LoginState {


    constructor(private authService: AuthService) { };


    @Selector()
    static loginState(state: LoginStateModel) {
        return state;
    }


    @Action(LoginAction)
    loginAction({ setState }: StateContext<LoginStateModel>, { credentials }: LoginAction) {
        console.log('credentials', credentials);
        return this.authService.login(credentials).pipe(
            tap((response) => {
                setState(response);
                console.log('Login successful', response);
            }),
            catchError((error) => {
                console.log('error is here', error);
                return error;
            })
        );
    }
}