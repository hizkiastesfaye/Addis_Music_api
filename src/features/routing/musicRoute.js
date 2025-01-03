const express = require('express')
const router = express.Router()
const musicController = require('../controller/musicController')
const validMiddleware = require('../../middleware/validMiddleware')
router.get('/',(req,res)=>{
    res.send('This music Router.')
})
router.post('/add',validMiddleware.addMusicValidate(),musicController.addMusic)
router.get('/get',musicController.getMusic)
router.get('/statistic',musicController.getMusicStatistic)
router.put('/update/:id',validMiddleware.updateMusicValidate(),musicController.updateMusic)
router.delete('/delete/:id',musicController.deleteMusic)

module.exports = router;