import { Review, Product } from "../models/index.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = await Review.findOne({
      where: {
        productId,
        userId: req.user.id,
      },
    });

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "Product already reviewed by this user" });
    }

    const review = await Review.create({
      rating,
      comment,
      productId,
      userId: req.user.id,
    });

    // Update product rating
    const reviews = await Review.findAll({
      where: { productId },
    });

    product.rating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    product.numReviews = reviews.length;
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.id },
      include: [{ model: User, attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};