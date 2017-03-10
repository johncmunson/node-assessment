const users = require('./users.js')
const allUsers = users.find()

module.exports = {
    readAll: function (req, res) {
      var everyUser = users.find()
      return everyUser
    },
    findUserById: function(id) {
        return users.findOne('id', id)
    },
    getAdmins: function() {
        return allUsers.filter(function(user) {
          return user.type === 'admin'
        })
    },
    getNonAdmins: function() {
        return allUsers.filter(function(user) {
            return user.type !== 'admin'
        })
    },
    getUsersByFavorite: function(favorite) {
        const usersWithFavorite = allUsers.filter(function(user) {
            return user.favorites.indexOf(favorite) > -1
        })
        if (usersWithFavorite[0]) {
            return usersWithFavorite
        } else {
            return null
        }
    },
    getUsersByAgeLimit: function(age) {
        const usersUnderAge = allUsers.filter(function(user) {
            return user.age < age
        })
        if (usersUnderAge[0]) {
            return usersUnderAge
        } else {
            return null
        }
    },
    findUserByQuery: function (query, value) {
        var usersByQuery = users.find(query, value)
        return usersByQuery
    },
    createUser: function(user) {
        var user = users.add(user)
        return user
    },
    updateUser: function (id, obj) {
        users.update('id', id, obj)
        const updatedUser = users.findOne('id', id)
        return updatedUser
    },
    removeUser: function (id) {
        var user = users.remove('id', id)
        return user
    }
}
