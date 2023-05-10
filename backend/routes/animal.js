
const express = require('express');
const router = express.Router();

const { getAnimals,
    newAnimal,
    updateAnimal,
    deleteAnimal
 } = require('../controllers/animalController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/animals').get(getAnimals);
router.route('/animal/new').post(newAnimal);
router.route('/animal/:id').put(updateAnimal).delete(deleteAnimal);

module.exports = router;

