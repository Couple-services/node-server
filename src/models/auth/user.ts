import { Schema, model } from 'mongoose';

export const USER_DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
            maxLength: 150,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'inactive',
        },
        refreshToken: [String],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

//Export the model
export default model(USER_DOCUMENT_NAME, userSchema);
