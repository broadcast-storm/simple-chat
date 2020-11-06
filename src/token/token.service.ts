import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DATA TRANSFER OBJECTS
import { CreateTokenDto } from './dto/create-token.dto';

// INTERFACES
import { IToken } from 'src/interfaces/token.interface';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('Token') private readonly tokenModel: Model<IToken>,
    ) {}

    // CREATE NEW TOKEN
    async create(createTokenDto: CreateTokenDto): Promise<IToken> {
        const userToken = new this.tokenModel(createTokenDto);
        return await userToken.save();
    }

    // DELETE ONE USER'S TOKEN
    async delete(
        userId: string,
        token: string,
    ): Promise<{ ok?: number; n?: number }> {
        return await this.tokenModel.deleteOne({ userId, token });
    }

    // DELETE ALL ONE USER'S TOKENS
    async deleteAll(userId: string): Promise<{ ok?: number; n?: number }> {
        return await this.tokenModel.deleteMany({ userId });
    }

    // CHECK TOKEN EXISTING
    async isExisting(userId: string, token: string): Promise<boolean> {
        return await this.tokenModel.exists({ userId, token });
    }
}
