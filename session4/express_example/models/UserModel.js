var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var UserSchema = new Schema({
    username: {
        type: String,
        required: [true, '아이디는 필수입니다.']
    },

    displayname: String,
    phone: String,

    password: {
        type: String,
        required: [true, '패스워드는 필수입니다.']
    },
    
    create_at: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.virtual('getDate').get( function() {
    var date = new Date(this.create_at);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
});

UserSchema.plugin(autoIncrement.plugin,
    { model: "user", field: "id", startAt: 1 }
);

module.exports = mongoose.model('user', UserSchema);
