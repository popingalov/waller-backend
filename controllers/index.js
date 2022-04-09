const { authHandler, login } = require('./auth');
const transactions = require("./transactions");
const users = require('./users');
const { addCategory, getCategory, removeCategory } = require('./categories');

module.exports = { 
    transactions,
    login,
    authHandler,
    users,
    addCategory,
    getCategory,
    removeCategory
};
