const express = require('express');
const {
  getBootcamps,
  getSingleBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require('../controllers/bootcamps');

const router = express.Router();

router.route('/radius/:zipode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getSingleBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
