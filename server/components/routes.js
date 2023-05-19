const Router = require('express').Router
const controller = require('./Controller')
const router = new Router()

router.get('/get-notes', controller.getNotes)
router.post('/get-note-id', controller.getNoteOfID)
router.post('/create-note', controller.createNote)
router.post('/update-note', controller.updateNote)
router.post('/remove', controller.remove)

module.exports = router