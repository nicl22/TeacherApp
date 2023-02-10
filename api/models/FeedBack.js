import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },

    topicID:{
        type:String,
        required:true
    },

});
export default mongoose.model("Feedback", FeedbackSchema)