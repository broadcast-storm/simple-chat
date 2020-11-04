import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly email: string;
    readonly login: string;
    status: string;
    readonly password: string;
    readonly photo: string;
    readonly photoId: string;
    readonly name: string;
    readonly surname: string;
    readonly gender: string;
    readonly birthday: Date;
    readonly description: string;
    readonly phone: string;
    readonly role: string;
    isOnline: boolean;
    lastTimeOnline: Date;
}
