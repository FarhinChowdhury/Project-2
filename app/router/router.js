/* CONTROLLER FOLDER ========================================
The controller is the logical related to interaction and
'controlling' behaviour. In our serer-side code, the only
real controller elements are the 'router', so we create a
router folder
====================================================== */

const orm = require('../models/orm');
const {Op} = require('sequelize')

function router( app ){
    // to get all the bids
    app.get('/api/bids', async function(req, res) {
        let result = await orm.findAll()
        res.json(result)
    })

    // to get bids for a specific category
    app.get('/api/posts/category/:category', async function(req, res){
        let result = await orm.findAll({
            where: {
                category: req.params.category
            }
        })
        res.json(result)
    })

    // to get bids with title containing search query
    app.get('/api/posts/:title', async function(req, res){
        let result = await orm.findAll({
            where:{
                [Op.like]: `%${req.params.name}%`
            }
        })
        res.json(result)
    })

    // to submit a post
    app.post('/api/posts', async function(req, res) {
        let result = await orm.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
        res.json(result)
    });

    // to update the current bidder
    app.put('/api/posts/id', async function(req, res) {
        let result = await orm.update(req.body.price,
            {
                where: {
                    id: req.body.id
                }
            })
        res.json(result)
    });

    //to delete bid
    app.delete('/api/posts/id', async function(req, res) {
        let result = await orm.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(result)
    });
}

module.exports = router
