const Drug = require('../models/Drug');

exports.getAllDrugs = async (req, res) => {
    try {
        const drugs = await Drug.findAll();
        res.json(drugs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addDrug = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
        const drug = await Drug.create({ name, description, price, quantity });
        res.status(201).json(drug);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDrug = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    try {
        const drug = await Drug.findByPk(id);
        if (!drug) return res.status(404).json({ message: 'Drug not found' });

        drug.name = name;
        drug.description = description;
        drug.price = price;
        drug.quantity = quantity;
        await drug.save();

        res.json(drug);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDrug = async (req, res) => {
    const { id } = req.params;
    try {
        const drug = await Drug.findByPk(id);
        if (!drug) return res.status(404).json({ message: 'Drug not found' });

        await drug.destroy();
        res.json({ message: 'Drug deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
