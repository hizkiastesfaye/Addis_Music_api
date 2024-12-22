const addMusicService = require('../service/musicService')
exports.addMusic = async(req,res)=>{
    
    try{
        const musicc = await addMusicService.addMusic(req)
        res.send(musicc)
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}