import Wishlist from '../model/wishlist.model.js';
import Product from '../model/product.model.js';

export const addProductToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    const savedWishlist = await wishlist.save();
    res.status(200).json(savedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsInWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId }).populate('products');
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    res.status(200).json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeProductFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter(id => id.toString() !== productId);
    const updatedWishlist = await wishlist.save();

    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
