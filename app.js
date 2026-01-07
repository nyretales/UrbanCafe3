let currentTab = 'foods';
let cart = {}; 
let adminMode = false;

// === SETTING PENTING ===
const ADMIN_PASSWORD = "1234";    // Ganti Password Admin
const WA_NUMBER = "6282319527214"; // Nomor WA Tujuan (Format 62...)

// Format Rupiah
const formatRupiah = (num) => 'Rp ' + num.toLocaleString('id-ID');

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateTotal();
    
    // Scroll Effect Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
});

// === RENDER MENU ===
function renderMenu() {
    const container = document.getElementById('menu-container');
    const items = window.MENU_DATA[currentTab];
    container.innerHTML = '';

    // Layout Center kalau menu sedikit
    if (items.length <= 3) container.classList.add('center-layout');
    else container.classList.remove('center-layout');

    items.forEach((item, index) => {
        const qty = cart[item.id] || 0;
        
        // Cek Harga (Admin Edit vs Default)
        const storedPrice = localStorage.getItem(`price_${item.id}`);
        const finalPrice = storedPrice ? parseInt(storedPrice) : item.price;

        const card = document.createElement('div');
        card.className = 'menu-card';
        card.style.setProperty('--delay', index);

        // Input Admin vs Teks Biasa
        let priceHtml = `<span class="item-price">${formatRupiah(finalPrice)}</span>`;
        if (adminMode) {
            priceHtml = `<input type="number" class="admin-input" value="${finalPrice}" onchange="updatePrice('${item.id}', this.value)">`;
        }

        card.innerHTML = `
            <img src="${item.image}" class="menu-img" alt="${item.name}" loading="lazy">
            <div class="card-body">
                <h3 class="item-name">${item.name}</h3>
                ${priceHtml}
                <div class="qty-control">
                    <button class="btn-qty" onclick="updateQty('${item.id}', -1)">−</button>
                    <span class="qty-display">${qty}</span>
                    <button class="btn-qty" onclick="updateQty('${item.id}', 1)">+</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// === CART LOGIC ===
function updateQty(id, change) {
    if (!cart[id]) cart[id] = 0;
    cart[id] += change;
    if (cart[id] < 0) cart[id] = 0;
    renderMenu(); 
    updateTotal();
}

function updateTotal() {
    let total = 0;
    ['foods', 'drinks'].forEach(cat => {
        window.MENU_DATA[cat].forEach(item => {
            if (cart[item.id]) {
                const storedPrice = localStorage.getItem(`price_${item.id}`);
                const price = storedPrice ? parseInt(storedPrice) : item.price;
                total += price * cart[item.id];
            }
        });
    });
    document.getElementById('grand-total').innerText = formatRupiah(total);
}

// === CHECKOUT WHATSAPP ===
function checkoutViaWA() {
    const cartItems = [];
    let grandTotal = 0;

    ['foods', 'drinks'].forEach(category => {
        window.MENU_DATA[category].forEach(item => {
            if (cart[item.id] > 0) {
                const storedPrice = localStorage.getItem(`price_${item.id}`);
                const price = storedPrice ? parseInt(storedPrice) : item.price;
                const subtotal = price * cart[item.id];
                grandTotal += subtotal;
                
                cartItems.push({
                    name: item.name,
                    qty: cart[item.id],
                    subtotal: subtotal
                });
            }
        });
    });

    if (cartItems.length === 0) {
        alert("Pilih menu dulu sebelum pesan ya!");
        return;
    }

    let message = `Halo Urban Cafe, saya mau pesan:\n\n`;
    cartItems.forEach(item => {
        message += `- ${item.name} (${item.qty}x) : ${formatRupiah(item.subtotal)}\n`;
    });
    message += `\n*Total: ${formatRupiah(grandTotal)}*`;
    message += `\n\nMohon diproses, Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`, '_blank');
}

// === NAVIGASI TAB ===
function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.category-nav button').forEach(b => b.classList.remove('active'));
    event.target.closest('button').classList.add('active');
    renderMenu();
}

// === ADMIN MODE ===
function toggleAdminMode() {
    if (!adminMode) {
        const password = prompt("Masukkan Password Admin:");
        if (password === ADMIN_PASSWORD) { 
            adminMode = true;
            alert("✅ Admin Mode: ON");
        } else if (password !== null) {
            alert("❌ Password Salah!");
        }
    } else {
        adminMode = false;
        alert("🔒 Admin Mode: OFF");
    }
    renderMenu();
}

function updatePrice(id, newPrice) {
    localStorage.setItem(`price_${id}`, newPrice);
    updateTotal();
}

// === QRIS MODAL ===
function showQRIS() { document.getElementById('qris-modal').classList.remove('hidden'); }
function closeQRIS() { document.getElementById('qris-modal').classList.add('hidden'); }
