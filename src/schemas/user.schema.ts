import * as mongoose from 'mongoose';
import { genderEnum } from 'src/enums/gender.enum';
import { roleEnum } from 'src/enums/role.enum';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: null },
    photoId: { type: String, default: null },
    firstName: { type: String, required: true },
    surName: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(genderEnum) },
    age: { type: Number, default: null },
    description: { type: String, default: null, maxlength: 300 },
    phone: { type: String, default: null },
    role: { type: String, required: true, enum: Object.values(roleEnum) },
});
