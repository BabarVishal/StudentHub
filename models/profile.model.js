const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    Bio:{
        type: String,
        require: true
    },
    College:{
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    SocilAcounts:{
        type: String,
        require: true
    },
    dailyContrubution:{
            type: String,
            require: true
    },
    profilePhoto:{
        type: String,
    }
},{
    timestamps: true,
});

const Profile = model("Profile", profileSchema);
module.exports = Profile;