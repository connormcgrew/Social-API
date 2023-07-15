const { Schema, model, Types, version } = require('mongoose');
const reactionSchema = require('./reaction');
const timeFormat = require('../util/date');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought is Required',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
            get: createdAtVal => timeFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is Required'
        },
        reactions: [reactionSchema]
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

// get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;
