const express = require('express')
const router = express.Router()
const playerController = require('../app/api/controllers/Players')

router.get('/', playerController.getAll)
router.post('/', playerController.create)
router.get('/:playerId', playerController.getById)
router.put('/:playerId', playerController.updateById)
router.delete('/:playerId', playerController.deleteById)

module.exports = router
