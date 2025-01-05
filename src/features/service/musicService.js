const mongoose = require('mongoose')
const { query } = require('express')
const {validationResult} = require('express-validator')
const SongModel = require('../model/musicModel')
const {v4:uuidv4} = require('uuid')


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
        console.log('************: ',queryKey,queryValue)
        const oneSong = await SongModel.find({[queryKey]: { $regex: `^${queryValue}$`, $options: 'i' }})
        if(oneSong.length===0){
            throw new Error('The song not found')
        }
        let sss = []
        for (let i=0; i< oneSong.length; i++){
            sss.push({
                id:oneSong[i]._id.toString(),
                title:oneSong[i].title,
                artist:oneSong[i].artist,
                album:oneSong[i].album,
                genre:oneSong[i].genre
            })
        }
        let unique = new Set();
        if(queryKey === 'artist'){
            sss.forEach((song)=>unique.add((song.album)))
        }
        console.log('$$$$$$$$$$$: ',unique)
        return(sss)
    }
 
    const allSongs = await SongModel.find()
    if(allSongs.length === 0){
        throw new Error('Song not found')
    }
    let ss = []
    for (let i=0; i< allSongs.length; i++){
        ss.push({
            id:allSongs[i]._id.toString(),
            title:allSongs[i].title,
            artist:allSongs[i].artist,
            album:allSongs[i].album,
            genre:allSongs[i].genre
        })
    }

    return ss
}

exports.getMusicStatistic = async (req,res)=>{
    console.log('This is getMusicStatisct')
    const allSongs = await SongModel.find()
    if(allSongs.length === 0){
        throw new Error('Song not found')
    }
    let ss = []
    for (let i=0; i< allSongs.length; i++){
        ss.push({
            id:allSongs[i]._id.toString(),
            title:allSongs[i].title.toLowerCase(),
            artist:allSongs[i].artist.toLowerCase(),
            album:allSongs[i].album.toLowerCase(),
            genre:allSongs[i].genre.toLowerCase()
        })
    }
    const totalSongs = allSongs.length;
    const uniqueArtist = new Set(allSongs.map((song)=>song.artist)).size;
    const uniqueAlbums = new Set(allSongs.map((song)=>song.album)).size;
    const uniqueGenres = new Set(allSongs.map((song)=>song.genre)).size;

    const songsPerGenre= ss.reduce((acc,song)=>{
        acc[song.genre] = (acc[song.genre] || 0) + 1;
        return acc;
    },{});

    const result = ss.reduce((acc,song)=>{
        let artistEntry = acc.find((entry)=> entry.artist === song.artist);
        const artistNewUuid = uuidv4()
        if(!artistEntry){
            artistEntry = {
                artistId:artistNewUuid.toString(),
                artist:song.artist,
                number:0,
                songNumber:0,
                albums:[]
            };
            acc.push(artistEntry)
        }
        artistEntry.number += 1;

        let albumEntry = artistEntry.albums.find((album)=>album.albumName === song.album)
        const newuuid = uuidv4()
        if(!albumEntry){
            albumEntry={
                albumId:newuuid.toString(),
                albumName:song.album,
                number:0,
                songs:[]
            }
            artistEntry.albums.push(albumEntry);
        }
        albumEntry.number += 1;

        let songEntry = albumEntry.songs.find((song)=>song.songTitle === song.title)

        if(!songEntry){
            songEntry={
                songTitle:song.title,
                songId:song.id

            }
            albumEntry.songs.push(songEntry);
        }
        artistEntry.songNumber += 1
        return acc;
    },[]);
    console.log('^^^^^^^^^: ',result,ss)
    const final = {
        totalSongs:totalSongs,
        uniqueArtist:uniqueArtist,
        uniqueAlbums:uniqueAlbums,
        uniqueGenres:uniqueGenres,
        songsPerGenre:songsPerGenre,
        songs_Albums_PerArtist:result
    } 
    console.log(final)
    return final
}

exports.updateMusic = async (req,res)=>{
    const err = validationResult(req)

    if(!err.isEmpty()){
        const errorMessages = err.array().map(error=>error.msg).join(', ')
        throw new Error(errorMessages)
    }
    const param = req.params.id
    console.log('************: id',param)

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

        const newUpdatMusic = {
            id:updatMusic._id.toString(),
            title:updatMusic.title,
            album:updatMusic.album,
            genre:updatMusic.genre
        }
        
        return newUpdatMusic
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

