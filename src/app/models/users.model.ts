export interface CreateUserProfileResponseModel {
    name: string;
    job: string;
    id: string;
    createdAt: string;
}

export interface CreateUserProfileRequestModel {
    id?: number;
    name: string;
    job: string;
}

export interface UsersResponseModel {
    data: UserModel[]
}

export interface UserModel {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    active?: boolean;
}