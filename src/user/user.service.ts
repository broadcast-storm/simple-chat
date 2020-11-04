import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from 'src/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckLoginDto } from 'src/auth/dto/check-login.dto';
import { CheckEmailDto } from 'src/auth/dto/check-email.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

    async create(createUserDto: CreateUserDto, role: string): Promise<IUser> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(createUserDto.password, salt);

        const createUser = new this.userModel(
            _.assignIn(createUserDto, { password: hash, role }),
        );
        return await createUser.save();
    }

    async isLoginAlreadyExisting(login: CheckLoginDto): Promise<IUser> {
        return await this.userModel.findOne(login).exec();
    }

    async isEmailAlreadyExisting(email: CheckEmailDto): Promise<IUser> {
        return await this.userModel.findOne(email).exec();
    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }
}
