import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        type: {type: String, required: true},
        name: { type: String, required: true },
        description: {type: String, required: true},
        languages: {type: Array, require: true},
        likes: {type: Array, default:[]},
        dislikes: {type: Array, default: []},
        matches: {type: Array, default: []},
        email: { type: String, required: true },
        password: { type: String, required: true },
    }
);

export default mongoose.model('User', UserSchema);
