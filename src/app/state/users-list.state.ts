import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserModel } from '../models/users.model';
import { AddUserAction, DeleteUserAction, EditUserAction, GetUsersAction } from "./users-list.actions";
import { UsersService } from "../services/users.service";
import { catchError, tap } from "rxjs";
import { PerfromToastAction } from "./authenticatio.actions";

export interface UserStateModel {
    data: UserModel[];
}

@State<string[]>({
    name: 'userState',
    defaults: []
})
@Injectable()
export class UsersState {


    constructor(private usersService: UsersService) { };


    @Selector()
    static userState(state: UserStateModel) {
        return state.data;
    }

    @Action(GetUsersAction)
    getUsersAction({ setState, dispatch }: StateContext<UserStateModel>) {
        return this.usersService.getUsers().pipe(
            tap((response) => {
                setState({ data: response.data });
            }),
            catchError((error) => {
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Error', message: error.error.error }
                ));
                return error;
            })
        );
    }

    @Action(AddUserAction)
    addUserAction({ dispatch }: StateContext<UserStateModel>, { userProfile }: AddUserAction) {
        return this.usersService.createUser(userProfile).pipe(
            tap(() => {
                dispatch(new GetUsersAction());
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Success', message: 'Created Successfully' }
                ));
            }),
            catchError((error) => {
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Error', message: error.error.error }
                ));
                return error;
            })
        )
    }

    @Action(DeleteUserAction)
    deleteUserAction({ setState, getState, dispatch }: StateContext<UserStateModel>, { id }: DeleteUserAction) {
        return this.usersService.deleteUser(id).pipe(
            tap(() => {
                const state = getState().data;
                const filteredUsers = state.filter(user => user.id !== id);
                setState({ data: filteredUsers });
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Success', message: 'Deleted Successfully' }
                ));
            }),
            catchError((error) => {
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Error', message: error.error }
                ));
                return error;
            })
        );
    }

    @Action(EditUserAction)
    editUserAction({ setState, getState, dispatch }: StateContext<UserStateModel>, { userProfile }: EditUserAction) {
        return this.usersService.editUser(userProfile).pipe(
            tap((response) => {
                dispatch(new GetUsersAction());
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Success', message: 'Updated Successfully' }
                ));
            }),
            catchError((error) => {
                dispatch(new PerfromToastAction(
                    { raise: true, type: 'Error', message: error.error.error }
                ));
                return error;
            })
        )
    }
}