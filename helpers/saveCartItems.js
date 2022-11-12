const saveCartItems = async (item) => {
  const oldStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) : [];
  console.log(oldStorage);
  const newStorage = [
    ...oldStorage,
    item,
  ];
  console.log(newStorage);
  localStorage.setItem('cartItems', JSON.stringify(newStorage));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
