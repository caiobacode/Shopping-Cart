const fetchItem = async (prod) => {
  if (typeof prod !== 'undefined') {
    const url = `https://api.mercadolibre.com/items/${prod}`;
    const data = await fetch(url);
    const response = await data.json();
    return response;
  }
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
