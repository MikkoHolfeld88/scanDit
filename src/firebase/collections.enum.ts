export enum Collections {
    USERS = 'users',
}

export interface User {
    uid: string;
    name: string;
    authProvider: string;
    email: string;
    password: string;
    created: Date;
}
