const getSavedCartItems = () => {
  const storage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) : [];
  return storage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
