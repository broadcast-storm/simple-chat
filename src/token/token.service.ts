import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IToken } from 'src/interfaces/token.interface';
import { CreateTokenDto } from './dto/create-token';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('Token') private readonly tokenModel: Model<IToken>,
    ) {}

    async create(createTokenDto: CreateTokenDto): Promise<IToken> {
        const userToken = new this.tokenModel(createTokenDto);
        return await userToken.save();
    }

    async delete(
        userId: string,
        token: string,
    ): Promise<{ ok?: number; n?: number }> {
        return await this.tokenModel.deleteOne({ userId, token });
    }

    async deleteAll(userId: string): Promise<{ ok?: number; n?: number }> {
        return await this.tokenModel.deleteMany({ userId });
    }

    async isExisting(userId: string, token: string): Promise<boolean> {
        return await this.tokenModel.exists({ userId, token });
    }
}
