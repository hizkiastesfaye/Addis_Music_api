const mongoose = require('mongoose')
const { query } = require('express')
const {validationResult} = require('express-validator')
const SongModel = require('../model/musicModel')

exports.addMusic = async (req,res)=>{
    const err = validationResult(req)
    if(!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(', ')
        throw new Error(errorMessages)
    }
    console.log(req.body)
    const {title, artist,album,genre} = req.body
    const songCheck = await SongModel.find({title:title,artist:artist,album:album})
    if(songCheck.length !== 0){
        return('The song is already added.')
    }
    const newSong = new SongModel({
        title: title,
        artist: artist,
        album: album,
        genre: genre
    })
    console.log('-----------', newSong)
    await newSong.save()
    return ({message:'successfully added.'})
}


exports.getMusic = async (req,res)=>{
    const queryy = Object.entries(req.query)[0]
    // console.log(Object.keys(req.query).length,Object.entries(req.query)[0])
    if(Object.keys(req.query).length !== 0){
        const queryKey = queryy[0]
        const queryValue = queryy[1]
        const oneSong = await SongModel.findOne({[queryKey]:queryValue})
        if(!oneSong){
            throw new Error('The song not found')
        }
        return(oneSong)
    }
 
    const allSongs = await SongModel.find()
    if(allSongs.length === 0){
        throw new Error('Song not found')
    }
    let ss = []
    for (let i=0; i< allSongs.length; i++){
        ss.push({
            id:allSongs[i]._id,
            title:allSongs[i].title,
            artist:allSongs[i].artist,
            album:allSongs[i].album,
            genre:allSongs[i].genre
        })
    }
    return ss
}

exports.updateMusic = async (req,res)=>{
    const err = validationResult(req)
    if(!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(', ')
        throw new Error(errorMessages)
    }
    const param = req.params.id
    if(!param){
        throw new Error('use Id as parameter')
    }
    console.log(req.params,req.body)
    try{
        const id = new mongoose.Types.ObjectId(param)

        const updatMusic = await SongModel.findOneAndUpdate(
            {_id:id},
            {
                title:req.body.title,
                artist: req.body.artist,
                album: req.body.album,
                genre: req.body.genre
            },
            {new:true}
        )
        if(Object.keys(updatMusic).length === 0){
            throw new Error('the song not found')
        }
        console.log(updatMusic)
        
        return updatMusic
    }
    catch(error){
        throw new Error('Incorrect Id')
    }
}



exports.deleteMusic = async (req,res)=>{

    const param = req.params.id
    if(!param){
        throw new Error('use Id as parameter')
    }
    console.log(req.params,req.body)
    try{
        const id = new mongoose.Types.ObjectId(param)

        const deletMusic = await SongModel.findOneAndDelete({_id:id})
        if(Object.keys(deletMusic).length === 0){
            throw new Error('the song not found')
        }
        console.log(deletMusic)
        
        return deletMusic
    }
    catch(error){
        throw new Error('Incorrect Id')
    }
}

