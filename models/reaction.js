const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId() // Default value as a new ObjectId
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
            get: createdAtVal => dateFormat(createdAtVal) // Getter method to format the timestamp
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;
