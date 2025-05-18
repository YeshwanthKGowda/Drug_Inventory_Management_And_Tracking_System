const express = require('express');
const router = express.Router();
const drugController = require('../controllers/drugController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, drugController.getAllDrugs);
router.post('/', authMiddleware, drugController.addDrug);
router.put('/:id', authMiddleware, drugController.updateDrug);
router.delete('/:id', authMiddleware, drugController.deleteDrug);

module.exports = router;
