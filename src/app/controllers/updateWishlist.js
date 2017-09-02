import { Wishlist } from "app/models";

const _updateWishlist = platform => async (identifier, wishlistContent) => {
  try {
    const wishlist = Wishlist.findOne({ platform, identifier });
    if (!wishlist) {
      const wishlist = new Wishlist({
        platform,
        identifier,
        wishlist: wishlistContent,
      });
      await wishlist.save();
      return;
    }
    wishlist.wishlist = wishlistContent;
    await wishlist.save();
  } catch (error) {
    throw error;
  }
};

export default _updateWishlist;
