const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false,
        validate: { isEmail: true }
    },
    password_hash: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
}, {
    timestamps: true,
    tableName: 'users',
});

module.exports = User;
