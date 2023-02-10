import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desciption:{
        type:String,
        required:true
    },

    userid:{
        type: String,
      required: true, 
    },

    scheduleID:{
        type:String,
        required:true
    },

});
export default mongoose.model("Topic", TopicSchema)