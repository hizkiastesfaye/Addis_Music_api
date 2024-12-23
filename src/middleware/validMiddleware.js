const {body,param} = require('express-validator')

const addMusicValidate=()=>{
    return[
        body('title').notEmpty().withMessage('title is required'),
        body('artist').notEmpty().withMessage('artist is required'),
        body('album').notEmpty().withMessage('album is required'),
        body('genre').notEmpty().withMessage('genre is required')
    ]
}
const updateMusicValidate=()=>{
    return[
        body('title').notEmpty().withMessage('title is required'),
        body('artist').notEmpty().withMessage('artist is required'),
        body('album').notEmpty().withMessage('album is required'),
        body('genre').notEmpty().withMessage('genre is required')
    ]
}

module.exports={
    addMusicValidate,
    updateMusicValidate
}