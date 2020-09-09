const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema
mongoose.connect( 'mongodb://localhost:27017/expensesDB', { useNewUrlParser: true } )

const expenseSchema = new Schema({
    name:String,
    amount:Number,
    date:Date,
    group:String
})

const Expense = mongoose.model('Expencse',expenseSchema)

module.exports = Expense

