import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },

    feedbackId:{
        type: String,
        required: true, 
    },

    scheduleID:{
        type:String,
        required:true
    },

});
export default mongoose.model("Question", QuestionSchema)