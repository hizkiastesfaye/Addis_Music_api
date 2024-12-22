const express = require('express')
const router = express.Router()
const musicController = require('../controller/musicController')

router.get('/',(req,res)=>{
    res.send('This music Router.')
})
router.post('/add',musicController.addMusic)
router.get('/get/',musicController.getMusic)
router.get('/update',musicController.updateMusic)
router.get('/delete',musicController.deleteMusic)

module.exports = router;