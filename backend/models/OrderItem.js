const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Drug = require('./Drug');

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }, // unit price at time of purchase
}, {
    timestamps: false,
    tableName: 'order_items',
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

OrderItem.belongsTo(Drug, { foreignKey: 'drugId' });
Drug.hasMany(OrderItem, { foreignKey: 'drugId' });

module.exports = OrderItem;
