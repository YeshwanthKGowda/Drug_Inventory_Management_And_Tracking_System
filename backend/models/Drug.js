const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Drug = sequelize.define('Drug', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: true,
    tableName: 'drugs',
});

module.exports = Drug;
