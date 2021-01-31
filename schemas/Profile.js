const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  positive: {
    type: Boolean,
    required: true
  },
  listedStates: [
    {
      specificState: {
        type: String
      },
      deaths: {
        type: Number
      },
      positives: {
        type: Number
      },
      specificDate: {
        type: Date
      }
    }
  ]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)