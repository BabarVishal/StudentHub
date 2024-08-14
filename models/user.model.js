const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const {createTokenForUser} = require("../services/authentication")

const userSchema = new Schema({
    fullName:{
        type:String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    University:{
        type:String,
        require:true
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        require: true
    },
    profileImgURL:{
        type: String,
        default: "./imgs/default.png",
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},{
    timestamps: true,
})

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashpassword = createHmac('sha256', salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashpassword;

    next();

})

userSchema.static("matchpasswordAndGenretToken",async function (email, password){
    const user = await this.findOne({email});
    if(!user) return false;

    const salt = user.salt;
    const hashpassword = user.hashpassword;

    const userProvidedhash = createHmac('sha256', salt)
    .update(user.password)
    .digest("hex");

    const token = createTokenForUser(user);
    return token;

})


const User = model("User", userSchema);
module.exports = User;