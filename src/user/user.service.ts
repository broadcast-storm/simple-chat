import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

// DATA TRANSFER OBJECTS
import { CreateUserDto } from './dto/create-user.dto';
import { CheckLoginDto } from 'src/auth/dto/check-login.dto';
import { CheckEmailDto } from 'src/auth/dto/check-email.dto';

// INTERFACES
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
    private readonly saltRounds = 10;

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
    ) {}

    // MAKE HASH FROM PASSWORD
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    // CREATE NEW USER IN DB
    async createNewUser(
        createUserDto: CreateUserDto,
        role: string,
    ): Promise<IUser> {
        const hash = await this.hashPassword(createUserDto.password);

        const createUser = new this.userModel(
            _.assignIn(createUserDto, { password: hash, role }),
        );
        return await createUser.save();
    }

    // UPDATE USER'S DATA IN DB
    async updateUserData(id: string, payload: Partial<IUser>) {
        return await this.userModel.updateOne({ _id: id }, payload);
    }

    // CHECK IS USER WITH THIS LOGIN ALREADY EXISTING
    async isLoginAlreadyExisting(login: CheckLoginDto): Promise<IUser> {
        return await this.userModel.findOne(login).exec();
    }

    // CHECK IS USER WITH THIS EMAIL ALREADY EXISTING
    async isEmailAlreadyExisting(email: CheckEmailDto): Promise<IUser> {
        return await this.userModel.findOne(email).exec();
    }

    // FIND USER BY ID
    async findUserById(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }

    // FIND USER BY EMAIL
    async findUserByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email }).exec();
    }
}
