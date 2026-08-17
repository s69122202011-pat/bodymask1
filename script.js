/* =================================================
   BODYMASK PATTY
   SHOPPING CART + DISCOUNT SYSTEM
================================================= */


/* =================================================
   SET OF PRODUCTS
   แนวคิดคณิตศาสตร์ดิสครีต:
   
   P = {สินค้า 1, สินค้า 2, สินค้า 3, Set A, Set B}
================================================= */

const products = {

    "Pink Glow Body Mask": {
        price: 299,
        icon: "🌸"
    },

    "Soft Skin Body Scrub": {
        price: 259,
        icon: "✨"
    },

    "Moisture Body Lotion": {
        price: 289,
        icon: "🌷"
    },

    "SET A — Glow Set": {
        price: 699,
        icon: "💗"
    },

    "SET B — Premium Set": {
        price: 899,
        icon: "👑"
    }

};


/* =================================================
   GET CART
================================================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("bodymask_cart")
    ) || [];

}


/* =================================================
   SAVE CART
================================================= */

function saveCart(cart) {

    localStorage.setItem(
        "bodymask_cart",
        JSON.stringify(cart)
    );

}


/* =================================================
   ADD PRODUCT TO CART
================================================= */

function addToCart(name, price, icon) {

    let cart = getCart();

    const existingProduct =
        cart.find(item => item.name === name);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            icon: icon,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    showAddedMessage(name);

}


/* =================================================
   CART COUNT
================================================= */

function updateCartCount() {

    const cart = getCart();

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const element =
        document.getElementById("cart-count");


    if (element) {

        element.textContent = count;

    }

}


/* =================================================
   DISCRETE MATHEMATICS
   DISCOUNT FUNCTION
   
   D(x)
================================================= */

function calculateDiscount(total) {

    let rate = 0;


    /*
        Set of promotion rates

        R = {0, 0.05, 0.10, 0.15, 0.20}
    */


    if (total >= 1500) {

        rate = 0.20;

    }

    else if (total >= 1200) {

        rate = 0.15;

    }

    else if (total >= 800) {

        rate = 0.10;

    }

    else if (total >= 500) {

        rate = 0.05;

    }

    else {

        rate = 0;

    }


    const discount =
        total * rate;


    return {

        rate: rate,

        discount: discount,

        finalPrice:
            total - discount

    };

}


/* =================================================
   PROMOTION MESSAGE
================================================= */

function getPromotionMessage(total) {

    if (total >= 1500) {

        return "🎉 คุณได้รับส่วนลดสูงสุด 20%!";

    }

    if (total >= 1200) {

        return "💗 คุณได้รับส่วนลด 15%";

    }

    if (total >= 800) {

        return "✨ คุณได้รับส่วนลด 10%";

    }

    if (total >= 500) {

        return "🌸 คุณได้รับส่วนลด 5%";

    }

    const remaining =
        500 - total;


    return `
        💕 ซื้อเพิ่มอีก ฿${remaining.toFixed(0)}
        รับส่วนลด 5%
    `;

}


/* =================================================
   SHOW ADD MESSAGE
================================================= */

function showAddedMessage(name) {

    const message =
        document.createElement("div");


    message.className =
        "cart-message";


    message.innerHTML = `
        💗 เพิ่ม <b>${name}</b>
        ลงในตะกร้าแล้ว
    `;


    document.body.appendChild(message);


    setTimeout(() => {

        message.classList.add("show");

    }, 10);


    setTimeout(() => {

        message.classList.remove("show");

        setTimeout(() => {

            message.remove();

        }, 300);

    }, 2000);

}


/* =================================================
   CART PAGE
================================================= */

function displayCart() {

    const cart =
        getCart();


    const container =
        document.getElementById("cart-items");


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div>
                    🛍️
                </div>

                <h2>
                    ตะกร้าของคุณยังว่าง
                </h2>

                <p>
                    เลือกสินค้าที่คุณชื่นชอบ
                    แล้วกลับมาอีกครั้ง
                </p>

                <a href="product.html">
                    เลือกสินค้า
                </a>

            </div>

        `;

        updateCartSummary();

        return;

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <div class="cart-product-icon">
                ${item.icon}
            </div>

            <div class="cart-product-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ฿${item.price.toLocaleString()}
                    / ชิ้น
                </p>

            </div>


            <div class="quantity-control">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <div class="cart-item-price">

                ฿${itemTotal.toLocaleString()}

            </div>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">

                ×

            </button>

        `;


        container.appendChild(div);

    });


    updateCartSummary();

}


/* =================================================
   CHANGE QUANTITY
================================================= */

function changeQuantity(index, amount) {

    let cart =
        getCart();


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

    updateCartCount();

}


/* =================================================
   REMOVE PRODUCT
================================================= */

function removeFromCart(index) {

    let cart =
        getCart();


    cart.splice(index, 1);


    saveCart(cart);

    displayCart();

    updateCartCount();

}


/* =================================================
   CART SUMMARY
================================================= */

function updateCartSummary() {

    const cart =
        getCart();


    const subtotal =
        cart.reduce(

            (total, item) =>

                total +
                item.price *
                item.quantity,

            0

        );


    const result =
        calculateDiscount(subtotal);


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const discountElement =
        document.getElementById(
            "discount"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    const promotionElement =
        document.getElementById(
            "promotion-message"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            "฿" +
            subtotal.toLocaleString();

    }


    if (discountElement) {

        discountElement.textContent =
            "- ฿" +
            result.discount.toLocaleString(
                undefined,
                {
                    minimumFractionDigits: 2
                }
            );

    }


    if (totalElement) {

        totalElement.textContent =
            "฿" +
            result.finalPrice.toLocaleString(
                undefined,
                {
                    minimumFractionDigits: 2
                }
            );

    }


    if (promotionElement) {

        promotionElement.innerHTML =
            getPromotionMessage(subtotal);

    }

}


/* =================================================
   CLEAR CART
================================================= */

function clearCart() {

    localStorage.removeItem(
        "bodymask_cart"
    );


    displayCart();

    updateCartCount();

}


/* =================================================
   RUN WHEN PAGE LOADS
================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

    }
);
