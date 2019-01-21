const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news');
router.get('/:id?', newsController.get);
router.post('/', newsController.add);
router.put('/:id?', newsController.update);
router.delete('/:id?', newsController.delete);
module.exports = router;