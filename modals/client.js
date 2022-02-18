import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique : true},
    address : {type: String},
    phoneNumber : {type: String},
    userId : [String],
    
},{timestamps: true});

const Client = mongoose.model('Client', clientSchema);
export default Client;