const { Schema, version } = require('mongoose');
const timeFormat = require('../util/date');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280 // Maximum character length
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => timeFormat(createdAtVal) // Getter method to format the timestamp
        }
    },
    {
        toJSON: {
            getters: true,
            versionKey: false,
            virtuals: true,
            transform: (doc, ret) => {
                delete ret._id;
            }
        }
    }
);

module.exports = reactionSchema;
