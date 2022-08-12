const itens = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
};

const addToCart = async (id) => {
  const item = await fetchItem(id);
  const finalProduct = { sku: item.id, name: item.title, salePrice: item.price };
  const append = createCartItemElement(finalProduct);
  cart.appendChild(append);
  append.addEventListener('click', () => {
    cart.removeChild(append);
  });
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = (createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  button.addEventListener('click', () => {
    addToCart(sku);
  });
  section.appendChild(button);

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const addToList = async (search) => {
  const obj = await fetchProducts(search);
  const res = obj.results;
  Object.keys(res).forEach((i) => {
    const product = { sku: res[i].id, name: res[i].title, image: res[i].thumbnail };
    const newItem = createProductItemElement(product);
    itens.appendChild(newItem);
  });
};

window.onload = () => {
  addToList('computador');
};