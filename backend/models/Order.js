const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // allow anonymous or guest orders if needed
        references: {
            model: 'users', // Sequelize assumes this is the table name
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Processing'
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'Pending'
    },
    paymentMode: {
        type: DataTypes.STRING,
        allowNull: true ,// you requested to make this optional
        defaultValue: 'Not Specified'
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'orders'
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = Order;
