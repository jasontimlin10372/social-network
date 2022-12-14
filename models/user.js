const {Schema, model} = require('mongoose');

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        // validate: [validateEmail, "Please fill a valid email address"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"
]
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref:'Thoughts'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref:'User'
        }
      ]

      //Vitual for friendscount

});
userSchema.virtual('friendsCount').get(function() {
     return this.friends.length; 
    // this.friends.reduce((total, friend)=> total + friend.length +1, 0); 
     
        
}),
{
    toJSON: {
      virtuals: true,
      getters: true
  
    },
    id: false
  };
// create the user model defined by userschema

  const User = model('User', userSchema);

// export the user model

module.exports = User;
