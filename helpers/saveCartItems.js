const saveCartItems = async (item, oldStorage) => {
  const newStorage = oldStorage ? [
    ...oldStorage,
    item,
  ] : [item];
  localStorage.setItem('cartItems', JSON.stringify(newStorage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
