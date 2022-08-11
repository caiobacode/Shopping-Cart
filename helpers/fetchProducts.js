const fetchProducts = async (product) => {
  if (typeof product !== 'undefined') {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
    const res = await fetch(url);
    const obj = await res.json();
    return obj;
  }
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
