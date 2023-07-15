const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is Required',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Email is Required',
            // Use a regex to validate the email format
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    // Set this to use virtual below
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
        id: false
    }
);


UserSchema.virtual('friendCount').get(function () {
    return this.friends ? this.friends.length : 0;
});

const User = model('User', UserSchema);

module.exports = User;