import mongoose from 'mongoose';
const ClassSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },

    teacherId:{
        type: String,
      required: true, 
    },
 
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },

});
export default mongoose.model("Class", ClassSchema)