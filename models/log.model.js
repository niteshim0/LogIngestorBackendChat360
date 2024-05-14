import mongoose, { Schema } from "mongoose";

const logSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
        index: true
    },
    message: {
        type: String,
        required: true,
        index: true
    },
    resourceId: {
        type: String,
        required: true,
        index: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
    },
    traceId: {
        type: String,
        required: true,
    },
    spanId: {
        type: String,
        required: true,
    },
    commit: {
        type: String,
        required: true,
    },
    metadata: {
        parentResourceId: {
        type: String,
        },
    },
});

export const Log = mongoose.model('Log', logSchema);
