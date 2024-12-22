const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  createAt:{
    type:Date,
    deault:Date.now()
  },
  updatedAt:{
    type:Date
  }
});
SongSchema.pre('save',function(next){
    this.updatedAt = Date.now()
    next()
})
const SongModel = mongoose.model('Song', SongSchema)

module.exports = SongModel
