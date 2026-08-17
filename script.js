/* =========================================
   BODYMASK PATTY
   CATEGORY SYSTEM
========================================= */

function selectCategory(category, button) {

    // ดึงปุ่มหมวดหมู่ทั้งหมด
    const buttons =
        document.querySelectorAll(
            ".category-option"
        );


    // เอา active ออกจากทุกปุ่ม
    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    // เพิ่ม active ให้ปุ่มที่เลือก
    button.classList.add("active");


    // ดึงสินค้าทั้งหมด
    const products =
        document.querySelectorAll(
            ".product-card"
        );


    // ตรวจสอบสินค้า
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

            // Animation
            product.style.animation =
                "productShow 0.5s ease";

        } else {

            product.style.display = "none";

        }

    });

}


/* =========================================
   PRODUCT ANIMATION
========================================= */

const style =
document.createElement("style");

style.innerHTML = `

@keyframes productShow {

    from {

        opacity: 0;

        transform:
            translateY(15px)
            scale(0.97);

    }

    to {

        opacity: 1;

        transform:
            translateY(0)
            scale(1);

    }

}

`;

document.head.appendChild(style);
