var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var userCtrl = require('./userCtrl.js')
var port = 3000

var app  = module.exports = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/api/users', function (req, res) {
    if (req.query.favorites) {
        const users = userCtrl.getUsersByFavorite(req.query.favorites)
        return res.status(200).json(users)
    }
    if (req.query.type) {
        const users = userCtrl.findUserByQuery('type', req.query.type)
        return res.status(200).json(users)
    }
    if (req.query.age) {
        const users = userCtrl.getUsersByAgeLimit(req.query.age)
        return res.status(200).json(users)
    }
    if (req.query.state) {
        const users = userCtrl.findUserByQuery('state', req.query.state)
        return res.status(200).json(users)
    }
    return res.status(200).send(userCtrl.readAll())
})

app.get('/api/users/:id', function (req, res) {
    const user = userCtrl.findUserById(req.params.id)
    if(!user) {
        return res.status(404).json('not found')
    }
    return res.status(200).json(user)
})

app.get('/api/admins', function (req, res) {
    const users = userCtrl.getAdmins()
    return res.status(200).json(users)
})

app.get('/api/nonadmins', function (req, res) {
    const users = userCtrl.getNonAdmins()
    return res.status(200).json(users)
})

app.put('/api/users/:id', function (req, res) {
    const user = userCtrl.updateUser(req.params.id, req.body)
    return res.status(200).json(user)
})

app.post('/api/users', function (req, res) {
    const user = userCtrl.createUser(req.body)
    return res.status(200).json(user)
})

app.delete('/api/users/:id', function (req, res) {
    const user = userCtrl.removeUser(req.params.id)
    return res.status(200).json(user)
})

app.listen(port, function () {
  console.log('listening on', port)
})
