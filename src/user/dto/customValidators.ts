import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsLoginAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

    async validate(login: any) {
        console.log(this.userModel);
        const user = await this.userModel.findOne(login).exec();
        if (user) return false;
        return true;
    }
}

export function IsLoginAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsLoginAlreadyExistConstraint,
        });
    };
}

@Injectable()
export class IsEmailAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}
    validate(email: any) {
        return this.userModel
            .findOne(email)
            .exec()
            .then((user) => {
                if (user) return false;
                return true;
            });
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}
