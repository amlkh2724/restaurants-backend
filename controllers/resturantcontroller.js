import asyncHandler from '../middleware/errorHandler.js';
import resturant from '../models/resturant.js';

// @desc    Get all Shops
// @route   GET /api/v1/shops
// @access  Public
export const getResturans = asyncHandler(async (req, res, next) => {
    const restaurants = await resturant.find();
    res.status(200).json({
        success: true,
        data: restaurants,
    });
});

// @desc    Create a Shop
// @route   POST /api/v1/shops
// @access  Private
export const createResturants = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const shop = await resturant.create(req.body);

    res.status(200).json({
        success: true,
        data: shop,
    });
});

// @desc    Get a single Shop
// @route   GET /api/v1/shops/:id
// @access  Public
export const getResturansspecficid = asyncHandler(async (req, res, next) => {
    const shop = await resturant.findById(req.params.id);

    if (!shop) {
        return next(new Error(`Shop that end with '${req.params.id.slice(-6)}' not found`));
    }

    res.status(200).json({
        success: true,
        data: shop,
    });
});

// @desc    Update a Shop
// @route   PUT /api/v1/shops/:id
// @access  Private
export const updateresturant = asyncHandler(async (req, res, next) => {
    const shop = await resturant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!shop) {
        return next(new Error(`Shop that end with '${req.params.id.slice(-6)}' not found`));
    }

    res.status(200).json({
        success: true,
        data: shop,
    });
});


// @desc    Delete a shop
// @route   DELETE /api/v1/shops/:id
// @access  Private
export const deleteResturant = asyncHandler(async (req, res, next) => {
    const shop = await resturant.findById(req.params.id);

    if (!shop) {
        return next(new ErrorResponse(`Shop that ends with '${req.params.id.slice(-6)}' was not found`, 404));
    }

    shop.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });
});
