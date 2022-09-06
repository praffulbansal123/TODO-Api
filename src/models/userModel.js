import mongoose from "mongoose"
import bcrypt from "bcrypt";

const {Schema, model} = mongoose

/*
* @author Prafful Bansal
* @description User schema and model objects
*/
export const userSchema = new Schema({
    title: {type: String},
    fname: {type: String},
    lname: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    phone: {type: String, unique: true},
})

// Password hashing function
userSchema.pre('save', async function (next) {
    try {     
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

// Creating Model
const User = model('User', userSchema);

export default User;