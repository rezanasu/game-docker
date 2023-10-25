const {Game} = require("../models")

class GameController {

    static findAll = async (req, res, next) => {
        try {
            const games = await Game.findAll();

            res.status(200).json({data: games})
        } catch(err) {
            next(err)
        }
    }

    static findOne = async (req, res, next) => {
        try {
            const {id} = req.params;
            
            const game = await Game.findOne({
                where: {
                    id
                }
            })

            if(!game) {
                throw {name: "ErrorNotFound"}
            }

            res.status(200).json({data: game})
        } catch(err) {
            next(err)
        }
    }

    static create = async (req, res, next) => {
        try {
            const {title, platform, developer, year} = req.body;

            const createdGame = await Game.create({
                title,
                platform,
                developer,
                year
            }, {returning: true})

            res.status(201).json({
                message: "New Game created successfully",
                data: createdGame
            })
        } catch(err) {
            next(err)
        }
    }

    static update = async (req, res, next) => {
        try {
            const {title, platform, developer, year} = req.body;
            const {id} = req.params;

            const foundGame = await Game.findOne({
                where: {
                    id
                }
            })

            if(!foundGame) {
                throw {name: "ErrorNotFound"}
            } 

            await foundGame.update({
                title: title || foundGame.title,
                platform: platform || foundGame.platform,
                developer: developer || foundGame.developer,
                year: year || foundGame.year
            })

            res.status(200).json({
                message: "Game updated successfully",
                data: foundGame
            })
        } catch(err) {
            next(err)
        }
    }

    static destroy = async (req, res, next) => {
        try {
            const {id} = req.params;

            const foundGame = await Game.findOne({
                where: {
                    id
                }
            })

            if(!foundGame) {
                throw {name: "ErrorNotFound"}
            }

            await foundGame.destroy();

            res.status(200).json({
                message: "Game deleted successfully"
            })
        } catch(err) {
            next(err)
        }
    }

}

module.exports = GameController;