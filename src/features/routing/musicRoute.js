const express = require('express')
const router = express.Router()
const musicController = require('../controller/musicController')

router.get('/',(req,res)=>{
    res.send('This music Router.')
})
router.post('/add',musicController.addMusic)
router.get('/get/',musicController.getMusic)
router.put('/update/:id',musicController.updateMusic)
router.delete('/delete/:id',musicController.deleteMusic)

module.exports = router;