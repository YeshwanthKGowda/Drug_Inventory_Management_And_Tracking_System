const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const Invoice = sequelize.define('Invoice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    invoiceDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
}, {
    timestamps: false,
    tableName: 'invoices',
});

Invoice.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(Invoice, { foreignKey: 'orderId' });

module.exports = Invoice;
