const itens = document.querySelector('.items');
const cart = document.querySelector('.cart__items');


const searchBtn = document.querySelector('.input-btn')
searchBtn.addEventListener('click', () => {
  const inputValue = document.querySelector('.product-input')
  itens.innerHTML = ''
  addToList(inputValue.value)
})
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

const createCartItemElement = ({ sku, name, salePrice, img }) => {
  const li = document.createElement('div');
  li.innerHTML = `
  <div class='cart__item'>
    <div class='only-text'> 
    <p class='cartitem-name'>${name}</p> 
    <p class='price'>R$: ${salePrice}</p> 
    <span class='id-item'>ID: ${sku}</span> 
    </div>
    <img class='item-cart-img alt='cart-item-img' src=${img} />
  </div>
  `
  return li;
};

const price = () => {
  const red = total;
  const nume = Math.trunc(red);
  let n = red.toFixed(2);
  const n2 = red.toFixed(1);
  if (n - n2 === 0) {
    n = n2;
  }
  if (red - nume === 0) {
    n = nume;
  }
  let text = `R$: ${n}`;
  if (red === 0 || red < 0) {
    text = 'R$: 0,00';
  }
  const element = document.querySelector('.total-price');
  element.innerText = (text);
};

const addToCart = async (id, hasSaved) => {
  const oldStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) : [];
  const loadingText = createCustomElement('span', 'loading', 'carregando...');
  if (hasSaved) cart.appendChild(loadingText);
  const item = await fetchItem(id);
  if (hasSaved) cart.removeChild(loadingText);
  const finalProduct = { sku: item.id, name: item.title, salePrice: item.price, img: item.thumbnail };
  if (hasSaved) saveCartItems(finalProduct, oldStorage);
  const append = createCartItemElement(finalProduct);
  console.log(append);
  cart.appendChild(append);
  total += item.price;
  price();
  append.addEventListener('click', async () => {
    const atualStorage = localStorage.getItem('cartItems')
    const newStorage = JSON.parse(atualStorage).filter((i) => i.sku !== finalProduct.sku)
    localStorage.setItem('cartItems', JSON.stringify(newStorage));
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
    addToCart(sku, true);
  });
  section.appendChild(button);

  return section;
};

const getSkuFromProductItem = (it) => it.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const addToList = async (search) => {
  const loadingText = createCustomElement('span', 'loading', 'carregando...');
  itens.appendChild(loadingText);
  const obj = await fetchProducts(search);
  itens.removeChild(loadingText);
  const res = obj.results;
  console.log('commit teste');
  Object.keys(res).forEach((i) => {
    const product = { sku: res[i].id, name: res[i].title, image: res[i].thumbnail };
    const newItem = createProductItemElement(product);
    itens.appendChild(newItem);
  });
};

const getOldCart = () => {
  const storage = getSavedCartItems();
  storage.map((i) => addToCart(i.sku, false));
};

function clean() {
  total = 0;
  const alvo = cart;
  alvo.innerText = '';
  localStorage.setItem('cartItems', [])
  price();
}

window.onload = () => {
  addToList('Celulares');
  getOldCart();
};