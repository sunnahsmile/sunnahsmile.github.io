
/* Shared shop script for SunnahSmile */
const products = [
  { id: 'p1', title: 'Miswaak', price: 2.50, img: 'assets/images/miswaak.jpg', desc: 'A natural toothbrush made from the Salvadora persica tree — used for centuries for oral hygiene in accordance with the Sunnah.' },
  { id: 'p2', title: 'Natural Miswak Holder', price: 4.00, img: 'assets/images/holder.jpg', desc: 'Elegant holder to keep your miswaak clean and safe while traveling.' },
  { id: 'p3', title: 'Miswak Travel Pack', price: 6.50, img: 'assets/images/pack.jpg', desc: 'Three miswaaks in a compact, hygienic travel pouch.' }
];

const CART_KEY = 'sunnahsmile-cart-v1';

function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch(e){ return {}; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCart(); updateCartCount(); }
function addToCart(id){ const cart = loadCart(); cart[id] = (cart[id]||0)+1; saveCart(cart); alert('Added to cart'); }
function removeFromCart(id){ const cart = loadCart(); delete cart[id]; saveCart(cart); }
function updateQty(id, qty){ const cart = loadCart(); if(qty<=0) delete cart[id]; else cart[id]=qty; saveCart(cart); }

function renderProductsGrid(){ const grid = document.getElementById('productsGrid'); if(!grid) return; grid.innerHTML=''; products.forEach(p=>{ const el = document.createElement('article'); el.className='card'; el.innerHTML = `<img src="${p.img}" alt="${p.title}"><h3>${p.title}</h3><div class="desc">${p.desc}</div><div class="price">£${p.price.toFixed(2)}</div><div style="margin-top:.5rem"><button onclick="addToCart('${p.id}')">Add to Cart</button></div>`; grid.appendChild(el); }); }

function renderCart(){ const cartItemsEl = document.getElementById('cartItems'); if(!cartItemsEl) return; cartItemsEl.innerHTML=''; const cart = loadCart(); const ids = Object.keys(cart); if(ids.length===0){ cartItemsEl.innerHTML='<div class="muted">Cart is empty.</div>'; document.getElementById('paypal-button-container').style.display='none'; document.getElementById('cartTotal').textContent='£0.00'; return; } document.getElementById('paypal-button-container').style.display='block'; let total=0; ids.forEach(id=>{ const qty=cart[id]; const p = products.find(x=>x.id===id); if(!p) return; const row = document.createElement('div'); row.className='cart-item'; row.innerHTML=`<div style="flex:1"><div style="font-weight:600">${p.title}</div><div class="muted">£${p.price.toFixed(2)} × <span class="qty">${qty}</span></div></div><div style="text-align:right"><div style="font-weight:700">£${(p.price*qty).toFixed(2)}</div><div style="margin-top:.4rem"><button onclick="updateQty('${id}', ${Math.max(0, qty-1)})">−</button><button onclick="updateQty('${id}', ${qty+1})">+</button><button onclick="removeFromCart('${id}')" style="margin-left:.4rem;background:none;border:none;color:#c33;">Remove</button></div></div>`; cartItemsEl.appendChild(row); total += p.price * qty; }); document.getElementById('cartTotal').textContent = `£${total.toFixed(2)}`; renderPayPalButtons(total); }

function updateCartCount(){ const cart = loadCart(); const count = Object.values(cart).reduce((s,n)=>s+n,0); const el = document.getElementById('cart-count'); if(el) el.textContent = count; }

function openCart(){ document.getElementById('cartPanel').classList.add('open'); renderCart(); }
function closeCart(){ document.getElementById('cartPanel').classList.remove('open'); }

function scrollToCart(){ openCart(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }

// PayPal Buttons (sandbox client-id=sb)
let currentRenderedTotal = null;
function renderPayPalButtons(totalAmount){
  const container = document.getElementById('paypal-button-container');
  if(!container) return;
  if(!totalAmount || totalAmount<=0){ container.innerHTML=''; currentRenderedTotal=null; return; }
  if(currentRenderedTotal === totalAmount) return;
  currentRenderedTotal = totalAmount;
  container.innerHTML='';
  paypal.Buttons({
    createOrder: function(data, actions){
      return actions.order.create({
        purchase_units: [{ amount: { value: totalAmount.toFixed(2), currency_code: 'GBP' } }]
      });
    },
    onApprove: function(data, actions){
      return actions.order.capture().then(function(details){
        alert('Thank you, ' + (details.payer.name?.given_name || 'customer') + '! Payment captured (sandbox).');
        // Clear cart
        localStorage.removeItem(CART_KEY);
        renderCart();
        updateCartCount();
      });
    },
    onError: function(err){ console.error('PayPal error', err); alert('PayPal error, check console.'); }
  }).render('#paypal-button-container');
}

// Initialize on pages
document.addEventListener('DOMContentLoaded', function(){
  renderProductsGrid();
  updateCartCount();
  renderCart();
});
