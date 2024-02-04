import { Schema, model } from 'mongoose';
import { USER_DOCUMENT_NAME } from './user';

export const TOKEN_DOCUMENT_NAME = 'Token';
const COLLECTION_NAME = 'Tokens';

// Declare the Schema of the Mongo model
const tokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: USER_DOCUMENT_NAME,
            required: true,
        },
        publicKey: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

//Export the model
export default model(TOKEN_DOCUMENT_NAME, tokenSchema);
