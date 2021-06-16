import mongoose from 'mongoose';

const shoopingSchema = mongoose.Schema({
    name: {type: String, required: true},
    createdDate: {type: Date, default: new Date()},
});

export default mongoose.model('shopping', shoopingSchema);