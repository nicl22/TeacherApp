import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    questionID:{
        type:String,
        required:true
    },
    feedbackID:{
        type:String,
        required:true
    },

    userid:{
        type: String,
      required: true, 
    },

    answer:{
        type:String,
        required:true
    },

});
export default mongoose.model("Answer", AnswerSchema)