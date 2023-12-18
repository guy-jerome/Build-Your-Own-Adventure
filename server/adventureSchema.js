import mongoose from 'mongoose';

// Define Path schema
const pathSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

// Define Location schema
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paths: [pathSchema],
});

// Define User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Define Adventure schema
const adventureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    locations: [locationSchema],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Create User and Adventure models
const User = mongoose.model('User', userSchema);
const Adventure = mongoose.model('Adventure', adventureSchema);

export { User, Adventure };
