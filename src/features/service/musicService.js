const { query } = require('express')
const SongModel = require('../model/musicModel')

exports.addMusic = async (req,res)=>{
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
    return ('successfully added.')
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
 
    const mus = 'This is music get service'
    const allSongs = await SongModel.find()
    if(allSongs.length === 0){
        throw new Error('Song not found')
    }
    let ss = []
    for (let i=0; i< allSongs.length; i++){
        ss.push({
            title:allSongs[i].title,
            artist:allSongs[i].artist,
            album:allSongs[i].album,
            genre:allSongs[i].genre
        })
    }
    return ss
}



exports.updateMusic = async (req,res)=>{
    const mus = 'This is music update service'
    return mus
}



exports.deleteMusic = async (req,res)=>{
    const mus = 'This is music delete service'
    return mus
}

