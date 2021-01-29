import { Document } from 'mongoose';

export interface IUserForChat extends Document {
    readonly login: string;
    status: string;
    readonly photo: string;
    readonly photoId: string;
    readonly name: string;
    readonly surname: string;
    readonly gender: string;
    isOnline: boolean;
    lastTimeOnline: Date;
}
