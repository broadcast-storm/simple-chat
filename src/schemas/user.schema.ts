import * as mongoose from 'mongoose';
import { genderEnum } from 'src/enums/gender.enum';
import { roleEnum } from 'src/enums/role.enum';
import { statusEnum } from 'src/enums/status.enum';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    login: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: null },
    photoId: { type: String, default: null },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(genderEnum) },
    birthday: { type: Date, required: true },
    description: { type: String, default: null, maxlength: 300 },
    phone: { type: String, default: null },
    role: { type: String, required: true, enum: Object.values(roleEnum) },
    isOnline: { type: Boolean, default: false },
    lastTimeOnline: { type: Date, default: new Date(Date.now()) },
    status: {
        type: String,
        enum: Object.values(statusEnum),
        default: statusEnum.pending,
    },
});
