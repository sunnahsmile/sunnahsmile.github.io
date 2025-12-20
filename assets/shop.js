
const products=[
{id:'m1',name:'Miswaak',price:2.50,img:'assets/images/miswaak.jpg',desc:'Natural Sunnah toothbrush.'},
{id:'m2',name:'Holder',price:4.00,img:'assets/images/holder.jpg',desc:'Clean miswaak holder.'},
{id:'m3',name:'Travel Pack',price:6.50,img:'assets/images/pack.jpg',desc:'3-pack travel set.'}
];
const KEY='cart';
function cart(){return JSON.parse(localStorage.getItem(KEY)||'{}')}
function save(c){localStorage.setItem(KEY,JSON.stringify(c));renderCart()}
function add(id){const c=cart();c[id]=(c[id]||0)+1;save(c)}
function toggleCart(){document.getElementById('cart').classList.toggle('open');renderCart()}
function renderProducts(){const g=document.getElementById('grid');if(!g)return;g.innerHTML='';products.forEach(p=>{g.innerHTML+=`<div class="card"><img src="${p.img}"><h3>${p.name}</h3><p>${p.desc}</p><strong>£${p.price.toFixed(2)}</strong><br><button onclick="add('${p.id}')">Add to Cart</button></div>`})}
function renderCart(){const box=document.getElementById('cartItems');if(!box)return;const c=cart();box.innerHTML='';let total=0;Object.keys(c).forEach(id=>{const p=products.find(x=>x.id===id);total+=p.price*c[id];box.innerHTML+=`<div>${p.name} × ${c[id]}</div>`});box.innerHTML+=`<hr><strong>Total £${total.toFixed(2)}</strong><br><button onclick="location.href='checkout.html'">Checkout</button>`}
document.addEventListener('DOMContentLoaded',()=>{renderProducts();renderCart()});
