import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly email: string;
    readonly password: string;
    readonly photo: string;
    readonly photoId: string;
    readonly firstName: string;
    readonly surName: string;
    readonly gender: string;
    readonly age: number;
    readonly description: string;
    readonly phone: string;
    readonly role: string;
}
