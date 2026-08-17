/* =========================================================
   BODYMASK PATTY
   JAVASCRIPT
   ========================================================= */


/* =========================================================
   CATEGORY FILTER
   ========================================================= */

function selectCategory(category, button) {

    const buttons =
        document.querySelectorAll(
            ".category-option"
        );


    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(function(product) {

        const productCategory =
            product.getAttribute(
                "data-category"
            );


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

            product.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(20px)"
                    },

                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 400,
                    easing: "ease-out"
                }
            );

        } else {

            product.style.display = "none";

        }

    });

}



/* =========================================================
   SELECT PRODUCT
   ========================================================= */

function selectProduct(name, price) {

    localStorage.setItem(
        "selectedProduct",
        name
    );


    localStorage.setItem(
        "selectedPrice",
        price
    );


    /*
       ไปหน้าสินค้า
    */

    window.location.href =
        "product.html";

}



/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const navbar =
        document.querySelector(
            ".navbar"
        );


    navbar.classList.toggle(
        "show"
    );

}



/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        const menuButton =
            document.querySelector(
                ".menu-button"
            );


        if (
            navbar &&
            menuButton &&
            !navbar.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            navbar.classList.remove(
                "show"
            );

        }/* =====================================================
   BODYMASK PATTY
   SHOPPING CART SYSTEM
===================================================== */


/* =====================================================
   GET CART
===================================================== */

function getCart() {

    const cart =
        localStorage.getItem("bodymaskCart");

    if (!cart) {

        return [];

    }

    try {

        return JSON.parse(cart);

    } catch (error) {

        return [];

    }

}



/* =====================================================
   SAVE CART
===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        "bodymaskCart",
        JSON.stringify(cart)
    );

}



/* =====================================================
   ADD PRODUCT TO CART
===================================================== */

function addToCart(name, price) {

    let cart = getCart();


    const existingProduct =
        cart.find(
            item => item.name === name
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            quantity: 1

        });

    }


    saveCart(cart);


    updateCartCount();


    alert(
        "เพิ่ม " +
        name +
        " ลงในตะกร้าแล้ว 💗"
    );

}



/* =====================================================
   REMOVE PRODUCT
===================================================== */

function removeFromCart(index) {

    let cart = getCart();


    cart.splice(index, 1);


    saveCart(cart);


    renderCart();


    updateCartCount();

}



/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(index, amount) {

    let cart = getCart();


    if (!cart[index]) {

        return;

    }


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);


    renderCart();


    updateCartCount();

}



/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return Number(price).toLocaleString(
        "th-TH"
    );

}



/* =====================================================
   RENDER CART
===================================================== */

function renderCart() {

    const cart =
        getCart();


    const container =
        document.getElementById(
            "cart-items"
        );


    const emptyCart =
        document.getElementById(
            "empty-cart"
        );


    if (!container) {

        return;

    }


    if (cart.length === 0) {

        container.innerHTML = "";

        emptyCart.style.display =
            "block";


        updateCartSummary([]);

        return;

    }


    emptyCart.style.display =
        "none";


    let html = "";


    cart.forEach(
        function(item, index) {


            const itemTotal =
                item.price *
                item.quantity;


            html += `

                <div class="cart-item">


                    <div class="cart-product-image">

                        <span>
                            BODY
                        </span>

                        <strong>
                            MASK
                        </strong>

                    </div>



                    <div class="cart-product-info">

                        <h3>
                            ${item.name}
                        </h3>


                        <p>
                            BODYMASK PATTY
                            Body Care Collection
                        </p>


                        <div class="cart-product-price">

                            ฿${formatPrice(item.price)}

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

                    </div>



                    <div class="cart-item-right">

                        <div class="item-total">

                            ฿${formatPrice(itemTotal)}

                        </div>


                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${index})">

                            ลบสินค้า

                        </button>

                    </div>


                </div>

            `;

        }
    );


    container.innerHTML =
        html;


    updateCartSummary(cart);

}



/* =====================================================
   CART SUMMARY
===================================================== */

function updateCartSummary(cart) {

    let quantity = 0;

    let subtotal = 0;


    cart.forEach(
        function(item) {

            quantity +=
                item.quantity;


            subtotal +=
                item.price *
                item.quantity;

        }
    );


    /*
       จัดส่งฟรีเมื่อซื้อครบ 500
    */

    let shipping = 0;


    if (
        subtotal > 0 &&
        subtotal < 500
    ) {

        shipping = 40;

    }


    const total =
        subtotal +
        shipping;



    const countElement =
        document.getElementById(
            "cart-count"
        );


    const summaryCount =
        document.getElementById(
            "summary-count"
        );


    const summarySubtotal =
        document.getElementById(
            "summary-subtotal"
        );


    const summaryShipping =
        document.getElementById(
            "summary-shipping"
        );


    const summaryTotal =
        document.getElementById(
            "summary-total"
        );



    if (countElement) {

        countElement.innerText =
            quantity +
            " รายการ";

    }


    if (summaryCount) {

        summaryCount.innerText =
            quantity;

    }


    if (summarySubtotal) {

        summarySubtotal.innerText =
            "฿" +
            formatPrice(subtotal);

    }


    if (summaryShipping) {

        summaryShipping.innerText =
            shipping === 0
                ? "ฟรี"
                : "฿" +
                  formatPrice(shipping);

    }


    if (summaryTotal) {

        summaryTotal.innerText =
            "฿" +
            formatPrice(total);

    }

}



/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const cart =
        getCart();


    const count =
        cart.reduce(
            function(total, item) {

                return total +
                    item.quantity;

            },
            0
        );


    const cartBadges =
        document.querySelectorAll(
            ".cart-count"
        );


    cartBadges.forEach(
        function(badge) {

            badge.innerText =
                count;

        }
    );

}



/* =====================================================
   CHECKOUT
===================================================== */

function goCheckout() {

    const cart =
        getCart();


    if (cart.length === 0) {

        alert(
            "กรุณาเลือกสินค้าก่อนสั่งซื้อ 💗"
        );

        return;

    }


    window.location.href =
        "checkout.html";

}



/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

    }
);


    }
);
