const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Drug = require('../models/Drug');
const Invoice = require('../models/Invoice');

// PLACE ORDER
exports.placeOrder = async (req, res) => {
    const paymentMode = req.body.paymentMode || 'Not Specified';
    const { items } = req.body; // items = [{ drugId, quantity }]
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item." });
    }

    try {
        // Calculate total and verify stock
        let totalAmount = 0;
        for (const item of items) {
            const drug = await Drug.findByPk(item.drugId);
            if (!drug) return res.status(404).json({ message: `Drug ID ${item.drugId} not found` });
            if (drug.quantity < item.quantity) return res.status(400).json({ message: `Insufficient stock for ${drug.name}` });
            totalAmount += drug.price * item.quantity;
        }

        // Create order
        const order = await Order.create({
            userId,
            status: 'Processing',
            totalAmount,
            paymentStatus: 'Paid',
            paymentMode
        });

        // Create order items & update stock
        for (const item of items) {
            const drug = await Drug.findByPk(item.drugId);
            await OrderItem.create({
                orderId: order.id,
                drugId: drug.id,
                quantity: item.quantity,
                price: drug.price
            });
            drug.quantity -= item.quantity;
            await drug.save();
        }

        // Create invoice
        await Invoice.create({
            orderId: order.id,
            invoiceDate: new Date(),
            totalAmount
        });

        res.status(201).json({ message: 'Order placed successfully', orderId: order.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

// GET ALL ORDERS (Detailed view for order page)
exports.getOrdersByUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await Order.findAll({
            where: { userId },
            include: [
                { model: OrderItem, include: [Drug] },
                Invoice
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

// ✅ NEW: GET ORDER HISTORY (Simplified view for dashboard)
exports.getOrderHistory = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await Order.findAll({
            where: { userId },
            include: [{
                model: Drug,
                attributes: ['name', 'manufacturer', 'price'],
                through: { attributes: ['quantity'] }
            }],
            order: [['createdAt', 'DESC']]
        });

        const formatted = orders.map(order => ({
            orderId: order.id,
            orderDate: order.createdAt,
            drugs: order.Drugs.map(drug => ({
                name: drug.name,
                manufacturer: drug.manufacturer,
                price: drug.price,
                quantity: drug.OrderItem.quantity
            }))
        }));

        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching orders." });
    }
};
