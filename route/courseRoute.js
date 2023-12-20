const express = require('express');

const userController = require('../controller/userController');
const courseController = require('../controller/courseController');

const router = express.Router();

router.get('/', courseController.getAllCourse);
router.post('/',userController.protect,userController.restrictTo('admin'), courseController.CreateCourse);

router.get('/:id', courseController.getCourse);
router.patch('/:id',userController.protect,userController.restrictTo('admin'), courseController.updateCourse);
router.delete('/:id',userController.protect,userController.restrictTo('admin'), courseController.deleteCourse);

module.exports = router;