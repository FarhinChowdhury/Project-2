/* CONTROLLER FOLDER ========================================
The controller is the logical related to interaction and
'controlling' behaviour. In our serer-side code, the only
real controller elements are the 'router', so we create a
router folder
====================================================== */

const db = require('../models');
const path = require('path')
const { Op } = require('sequelize')
const passport = require('../config/passport')

function router( app ){

    //HTML routes
    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname, '../../public/index.html'))
    })

    app.get('/login', function(req, res){
        res.sendFile(path.join(__dirname, '../../public/login.html'))
    })

    app.get('/signup', function(req, res){
        res.sendFile(path.join(__dirname, '../../public/signup.html'))
    })

    app.get('/bids', async function(req, res){
        res.sendFile(path.join(__dirname, '../../public/products.html'))
    })

    app.get('/posts', async function(req, res){
        res.sendFile(path.join(__dirname, '../../public/forms.html'))
    })

    // google authenticator
    app.get('/auth/google',
        passport.autheticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']})
    )

    // google authenticator callback
    app.get('/auth/google/callback',
        passport.autheticate('google', {failureRedirect: '/login'}),
        function(req, res){
            res.redirect('/')
        })

    // to get all the bids
    app.get('/api/bids', async function(req, res) {
        let result = await db.Post.findAll()
        res.json(result)
    })

    // to get bids for a specific category
    app.get('/api/posts/category/:category', async function(req, res){
        let result = await db.Post.findAll({
            where: {
                category: req.params.category
            }
        })
        res.json(result)
    })

    // to get bids with title containing search query
    app.get('/api/posts/:title', async function(req, res){
        try {
            console.log('PARAMS: ',req.params)
            let result = await db.Post.findAll({
                where:{
                    name:{[Op.like]: `%${req.params.title}`}
                }
            })
            console.log('Search Result: ',result)
            res.json(result);
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    })

    // to submit a post
    app.post('/api/posts', async function(req, res) {
        console.log('Routing post...')
        let result = await db.Post.create({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category
        })
        res.json(result)
    });

    app.post('/api/signup', async function(req, res){
        let result = await db.User.create({
            first_name: req.body.first_name,
            last_name: req.bosy.last_name,
            email: req.body.email,
            password: req.body.password
        }).catch(function (err){
            res.status(401).json(err)
        })
        res.json(result)
    })

    // to update the current bidder
    app.put('/api/posts/id', async function(req, res) {
        let result = await db.Post.update(req.body.price,
            {
                where: {
                    id: req.body.id
                }
            })
        res.json(result)
    });

    //to delete bid
    app.delete('/api/posts/id', async function(req, res) {
        let result = await db.product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(result)
    });
}

module.exports = router
