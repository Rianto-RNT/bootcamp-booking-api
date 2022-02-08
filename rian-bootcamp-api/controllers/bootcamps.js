const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc    Show all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find(req.params);

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Show single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getSingleBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with _id of ${req.params.id}. Please add correct _id`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    next(err);
  }
};

// @desc    Create bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with _id of ${req.params.id}. Please add correct _id`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove bootcamp
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with _id of ${req.params.id}. Please add correct _id`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
