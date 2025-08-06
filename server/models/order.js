// const mongoose = require('mongoose');
// const orderSchema = new mongoose.Schema({
//     package: {
//         type: String,
//         required: true

//     },
//     cost: {
//         type: Number,
//         required: true
//     },
//     fullname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     phone: {
//         type: String,
//         required: true
//     },
//     linkedin: {
//         type: String,
//         required: true
//     },
//     additionalNotes: {
//         type: String,

//     },
//     paymentMethod:{
// type:String,
// required:true,

//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// })

// module.exports = mongoose.model("Order", orderSchema)




const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    package: { type: String, required: true },
    cost: { type: Number, required: true },
    customer: {
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String }
    },
    linkedin: { type: String, required: true },
    additionalNotes: { type: String },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'verified'], default: 'pending' },
    paymentScreenshot: { type: String },
    status: { type: String, enum: ['processing', 'completed', 'failed'], default: 'processing' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);