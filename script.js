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

        }

    }
);
