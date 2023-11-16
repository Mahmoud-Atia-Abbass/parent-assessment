import { ToastModel } from "../models/toast.model";
import { CreateUserProfileRequestModel } from "../models/users.model";

export class GetUsersAction {
    static readonly type = '[usersState] GetUsersAction';
    constructor() { }
}

export class AddUserAction {
    static readonly type = '[usersState] AddUserAction';
    constructor(public userProfile: CreateUserProfileRequestModel) { }
}

export class DeleteUserAction {
    static readonly type = '[usersState] DeleteUserAction';
    constructor(public id: number) { }
}

export class EditUserAction {
    static readonly type = '[usersState] EditUserAction';
    constructor(public userProfile: CreateUserProfileRequestModel) { }
}