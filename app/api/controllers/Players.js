const playerModel = require('../models/Players')

module.exports = {
  getById: (req, res, next) => {
    console.log(req.body)
    playerModel.findById(req.params.playerId, (err, playerInfo) => {
      if (err) {
        next(err)
      } else {
        res.json({ status: 'success', message: 'Player found', data: { players: playerInfo } })
      }
    })
  },
  // Get all Players
  getAll: (req, res, next) => {
    let playersList = []

    playerModel.find({}, (err, players) => {
      if (err) {
        next(err)
      } else {
        for (let player of players) {
          // Add Player player data to fetch here!
          playersList.push({ id: player._id, name: player.name, userId: player.userId })
        }
        res.json({ status: 'success', message: 'Players found', data: { players: playersList } })
      }
    })
  },
  // Update Player by ID
  updateById: (req, res, next) => {
    playerModel.findByIdAndUpdate(req.params.playerId, { name: req.body.name }, (err, playerInfo) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json({ status: 'success', message: 'Player updated', data: null })
      }
    })
  },
  deleteById: (req, res, next) => {
    playerModel.findByIdAndRemove(req.params.playerId, (err, playerInfo) => {
      if (err) {
        next(err)
      } else {
        res.json({ status: 'success', message: 'Player deleted', data: playerInfo })
      }
    })
  },
  create: (req, res, next) => {
    // Add Fields to be created here
    playerModel.create({
      name: req.body.name,
      userId: req.body.userId
    }, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.json({ status: 'success', message: 'Player added', data: result })
      }
    })
  }
}
