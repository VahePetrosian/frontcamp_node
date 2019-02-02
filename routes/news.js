const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news');
const auth = require('../middlewares/auth');

router.get('/:id?', newsController.get);
router.post('/', auth, newsController.add);
router.put('/:id?', auth, newsController.update);
router.delete('/:id?', auth, newsController.delete);
module.exports = router;