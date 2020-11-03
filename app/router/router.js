/* CONTROLLER FOLDER ========================================
The controller is the logical related to interaction and
'controlling' behaviour. In our serer-side code, the only
real controller elements are the 'router', so we create a
router folder
====================================================== */

const db = require('../models');
const path = require('path')
const { Op } = require('sequelize')
const express = require('express')
const app = express()
const uploadResizer = require( '../config/uploadResizer' )
const upload = require('multer')({ dest: 'public/uploads' })
const publicPath = '../../'

const passport = require('../config/passport')

function router( app ){
    app.use(passport.initialize());
    app.use(passport.session());

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
        passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']})
    )

    // google authenticator callback
    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/login'}),
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

    // for posts by user
    app.get('/api/posts/:user', async function(req, res){
        console.log(req.params, req.body)
        let result = await db.Post.findAll({
            where: {
                user: req.params.user
            }
        })
        res.json(result)
    })

    // to get bids with title containing search query
    app.get('/api/search/:title', async function(req, res){
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
            console.log("SEARCH ERROR", error)
            res.send(error)
        }
    })

    app.post('/api/login', passport.authenticate('local'), function(req, res){
        res.json(req.user)
    })

    // to submit a post
    app.post('/api/posts', async function(req, res) {
        console.log('Routing post...', req.body)
        let result = await db.Post.create({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            image: req.body.image
        })
        res.json(result)
    });

    app.post('/api/signup', async function(req, res){
        console.log('Signing in ... ')
        console.log(req.body, req.params)
        let result = await db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
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

    app.post('/api/upload', upload.single('imageFile'), async function (req,res, next){
        console.log('file upload', req.file)
        let mediaData = req.body
        // if they uploaded a file, let's add it to the thumbData
        if( req.file ){
            console.log('path is: ', __dirname)
            const imageUrl = await uploadResizer(publicPath+req.file.path, req.file.originalname, 512, 512);
            console.log('IMAGE URL',imageUrl)
            // assign in the thumbData so can use as normal
            mediaData.imageUrl = imageUrl
            console.log('mediaData', mediaData.imageUrl)

            mediaData.name = req.file.originalname
        }
        res.send({imageUrl: mediaData.imageUrl, status: true})
    })


}

module.exports = router
