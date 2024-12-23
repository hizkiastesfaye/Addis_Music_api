const addMusicService = require('../service/musicService')
exports.addMusic = async(req,res)=>{
    
    try{
        const musicc = await addMusicService.addMusic(req)
        res.json({message:musicc})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.getMusic = async(req,res)=>{
    
    try{
        const musicc = await addMusicService.getMusic(req)
        res.json({message:musicc})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.updateMusic = async(req,res)=>{
    
    try{
        const musicc = await addMusicService.updateMusic(req)
        res.json({message:musicc})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}

exports.deleteMusic = async(req,res)=>{
    
    try{
        const musicc = await addMusicService.deleteMusic(req)
        res.status(200).json(musicc)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}