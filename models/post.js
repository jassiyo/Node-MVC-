const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    content:{       
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // time
},
    {
        timestamps: true
    }
);

const post = mongoose.model('Post', postSchema);
module.exports = post; 
