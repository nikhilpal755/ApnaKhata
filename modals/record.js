import mongoose from 'mongoose';

const recordSchema = mongoose.Schema({
    recordNumber : String,
    dueDate : String,
    currency : String,
    status : String,// paid, unpaid, partial
    items : [{itemName : String, unitPrice : String, quantity : String, discount : String}],
    rates : String,
    vat : Number,
    total : Number,
    subTotal : Number,// amount remaining after payment
    notes : String,// description
    type : String,
    creator : String,// who created the record
    totalAmountReceived : Number,
    client : {name : String, email : String, address : String, phoneNumber : String},
    paymentRecords: [{amountPaid : Number, datePaid : Date, paymentMode : String, note : String, paidBy : String}],
}, {timestamps: true});

const Record = mongoose.model('Record', recordSchema);
export default Record;