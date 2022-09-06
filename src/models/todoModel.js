import mongoose from "mongoose"

const {Schema, model, Types} = mongoose
const ObjectId = Types.ObjectId;

/*
* @author Prafful Bansal
* @description TODO schema and model
*/
export const todoSchema = new Schema({
    title: {type: String},
    discription: {type: String},
    category: {type: String},
    priority: {type: String},
    status: {type: String},
    dueDate: {type: Date},
    createdBy: {type: ObjectId, ref: "User"},
    isDeleted: {type: Boolean}
}, {timestamps : true})

// Creating Model.
const TODO = model('TODO', todoSchema);

export default TODO;
