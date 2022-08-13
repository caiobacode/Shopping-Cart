const itens = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
let total = 0;

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

const price = () => {
  const red = total;
  const nume = Math.trunc(red);
  let n = red.toFixed(2);
  const n2 = red.toFixed(1);
  if (red - nume === 0) {
    n = nume;
  }
  if (n - n2 === 0) {
    n = n2;
  }
  let text = `${n}`;
  if (red === 0 || red < 0) {
    text = '0,00';
  }
  const element = document.querySelector('.total-price');
  element.innerText = (text);
};

const addToCart = async (id) => {
  const item = await fetchItem(id);
  const finalProduct = { sku: item.id, name: item.title, salePrice: item.price };
  const append = createCartItemElement(finalProduct);
  cart.appendChild(append);
  total += item.price;
  price();
  append.addEventListener('click', async () => {
    cart.removeChild(append);
    total -= item.price;
    price();
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

const getSkuFromProductItem = (it) => it.querySelector('span.item__sku').innerText;

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

function clean() {
  total = 0;
  const alvo = cart;
  alvo.innerText = '';
  price();
}

window.onload = () => {
  addToList('computador');
};