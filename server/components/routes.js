const Router = require('express').Router
const controller = require('./Controller')
const router = new Router()

router.get('/get-notes', controller.getNotes)
router.post('/create-note', controller.createNote)
router.patch('/update-note', controller.updateNote)
router.post('/remove-note', controller.removeNote)

module.exports = router