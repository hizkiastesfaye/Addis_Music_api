const express = require('express')
const router = express.Router()
const musicController = require('../controller/musicController')

router.get('/',(req,res)=>{
    res.send('This music Router.')
})
router.get('/add',musicController.addMusic)

module.exports = router;