/* ==========================================================
   MotoTrek Shop
========================================================== */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const chips = document.querySelectorAll(".chip");
const countEl = document.getElementById("productCount");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";
let currentPage = 1;
const productsPerPage = 12;

let filteredProducts = [...window.products];


/* ==========================================================
   Product Card
========================================================== */

function createCard(product) {

    const badges = "";

    return `

<div class="product-card h-full flex flex-col rounded-3xl overflow-hidden bg-white shadow-lg border border-gray-200">

<div class="relative">

<img
src="${product.image}"
alt="${product.name}"
class="w-full aspect-square object-cover">

</div>

<div class="p-5 flex flex-col flex-1">

<p class="text-xs uppercase tracking-wide text-gray-500">

${product.brand || "MotoTrek"}

</p>

<h3 class="font-bold text-lg mt-1">

${product.name}

</h3>

<p class="text-[#c45d2a] text-xl font-bold mt-2">

${product.price}

</p>

<div class="grid grid-cols-2 gap-3 mt-auto pt-6">

<button
class="quick-view rounded-xl border py-3 font-semibold"
data-id="${product.id}">

View Details

</button>

<a
href="https://wa.me/919511901753?text=${encodeURIComponent(
`Hi MotoTrek, I'm interested in ${product.name}`
)}"
target="_blank"
class="rounded-xl bg-[#c45d2a] text-white py-3 text-center font-semibold">

Enquire

</a>

</div>

</div>

</div>

`;

}


/* ==========================================================
   Render Products
========================================================== */

function renderProducts(reset = true) {

    if (reset) {

        productGrid.innerHTML = "";

        currentPage = 1;

    }

    const limit = currentPage * productsPerPage;

    const items = filteredProducts.slice(0, limit);

    productGrid.innerHTML = items.map(createCard).join("");

    lucide.createIcons();

    attachQuickView();

    if (countEl) {

        countEl.textContent = `${filteredProducts.length} Products`;

    }

    if (emptyState) {

        emptyState.style.display =
            filteredProducts.length ? "none" : "block";

    }

}

/* ==========================================================
   Search
========================================================== */

function applySearch() {

    const query = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    filteredProducts = window.products.filter(product => {

        const matchCategory =
            activeFilter === "all" ||
            product.category.toLowerCase() === activeFilter;

        const searchText = `
            ${product.name}
            ${product.brand}
            ${product.category}
            ${product.description}
            ${product.search}
        `.toLowerCase();

        const matchSearch =
            query === "" ||
            searchText.includes(query);

        return matchCategory && matchSearch;

    });

    applySorting(false);

}


/* ==========================================================
   Category Filter
========================================================== */

document.querySelectorAll(".filter-chip").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".filter-chip")
            .forEach(chip => chip.classList.remove("active"));

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        applySearch();

    });

});


/* ==========================================================
   Search Box
========================================================== */

if (searchInput) {

    searchInput.addEventListener("input", () => {

        applySearch();

    });

}


/* ==========================================================
   Sorting
========================================================== */

function applySorting(render = true) {

    if (!sortSelect) {

        renderProducts();

        return;

    }

    switch (sortSelect.value) {

        case "price-low":

            filteredProducts.sort((a, b) =>
                Number(a.price.replace(/[₹,]/g, "")) -
                Number(b.price.replace(/[₹,]/g, ""))
            );

            break;

        case "price-high":

            filteredProducts.sort((a, b) =>
                Number(b.price.replace(/[₹,]/g, "")) -
                Number(a.price.replace(/[₹,]/g, ""))
            );

            break;

        case "a-z":

            filteredProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            break;

        default:

    const helmets = [];
    const jackets = [];
    const gloves = [];
    const luggage = [];
    const others = [];

    filteredProducts.forEach(product => {

        switch (product.category) {

            case "helmet":
                helmets.push(product);
                break;

            case "jacket":
                jackets.push(product);
                break;

            case "gloves":
                gloves.push(product);
                break;

            case "luggage":
                luggage.push(product);
                break;

            default:
                others.push(product);

        }

    });

    const arranged = [];

    while (
        helmets.length ||
        jackets.length ||
        gloves.length ||
        luggage.length ||
        others.length
    ) {

        // ROW 1
        if (helmets.length) arranged.push(helmets.shift());
        if (jackets.length) arranged.push(jackets.shift());
        if (luggage.length) arranged.push(luggage.shift());
        if (gloves.length) arranged.push(gloves.shift());

        // ROW 2
        if (others.length) arranged.push(others.shift());
        if (others.length) arranged.push(others.shift());
        if (helmets.length) arranged.push(helmets.shift());
        if (others.length) arranged.push(others.shift());

        // ROW 3
        if (jackets.length) arranged.push(jackets.shift());
        if (helmets.length) arranged.push(helmets.shift());
        if (luggage.length) arranged.push(luggage.shift());
        if (gloves.length) arranged.push(gloves.shift());

        // ROW 4
        if (others.length) arranged.push(others.shift());
        if (others.length) arranged.push(others.shift());
        if (helmets.length) arranged.push(helmets.shift());
        if (others.length) arranged.push(others.shift());

    }

    filteredProducts = arranged;

    break;

    }

    if (render) {

        renderProducts();

    }

}


if (sortSelect) {

    sortSelect.addEventListener("change", () => {

        applySorting();

    });

}

/* ==========================================================
   Load More
========================================================== */

const loadMoreBtn = document.getElementById("loadMoreBtn");

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", () => {

        currentPage++;

        renderProducts(false);

        if (currentPage * productsPerPage >= filteredProducts.length) {

            loadMoreBtn.style.display = "none";

        }

    });

}

/* ==========================================================
   Product Modal
========================================================== */

function attachQuickView() {

    document.querySelectorAll(".quick-view").forEach(button => {

        button.onclick = function () {

            const id = Number(this.dataset.id);

            const product = window.products.find(p => p.id === id);

            if (!product) return;

            document.getElementById("productTitle").innerText = product.name;

document.getElementById("productPrice").innerText =
    product.price || "-";

document.getElementById("productBrand").innerText =
    product.brand || "MotoTrek";

document.getElementById("productDescription").innerText =
    product.description || "";

const badges = document.getElementById("productBadges");

badges.innerHTML = "";

if (product.badges && product.badges.length) {

    badges.innerHTML = product.badges
        .map(badge =>
            `<span class="bg-[#edf7ef] text-[#18382a] px-3 py-1 rounded-full text-sm font-medium">${badge}</span>`
        )
        .join("");

}

document.getElementById("productWhatsapp").href =
    "https://wa.me/919511901753?text=" +
    encodeURIComponent(
        "Hi MotoTrek, I'm interested in " + product.name
    );

document.getElementById("productModal").style.display = "flex";

        };

    });

}


/* ==========================================================
   Close Modal
========================================================== */

const productModal = document.getElementById("productModal");

const closeProductModal =
    document.getElementById("closeProductModal");

if (closeProductModal) {

    closeProductModal.onclick = () => {

        productModal.style.display = "none";

    };

}

window.onclick = function (e) {

    if (e.target === productModal) {

        productModal.style.display = "none";

    }

};

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        productModal.style.display = "none";

    }

});

/* ==========================================================
   Product Counter
========================================================== */

function updateCounter() {

    if (countEl) {

        countEl.textContent =
            `${filteredProducts.length} Product${filteredProducts.length !== 1 ? "s" : ""}`;

    }

}


/* ==========================================================
   Load More Visibility
========================================================== */

function updateLoadMore() {

    if (!loadMoreBtn) return;

    if (filteredProducts.length <= productsPerPage) {

        loadMoreBtn.style.display = "none";

        return;

    }

    if (currentPage * productsPerPage >= filteredProducts.length) {

        loadMoreBtn.style.display = "none";

    } else {

        loadMoreBtn.style.display = "inline-flex";

    }

}


/* ==========================================================
   Main Render
========================================================== */

function refreshProducts() {

    renderProducts(true);

    updateCounter();

    updateLoadMore();

}


/* ==========================================================
   Initial Page Load
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    filteredProducts = [...window.products];

    applySorting();

    refreshProducts();

});


/* ==========================================================
   Refresh After Search
========================================================== */

function applySearch() {

    const query = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    filteredProducts = window.products.filter(product => {

        const categoryMatch =
            activeFilter === "all" ||
            product.category.toLowerCase() === activeFilter;

        const searchText = `
            ${product.name}
            ${product.brand}
            ${product.category}
            ${product.description}
            ${product.search}
        `.toLowerCase();

        const searchMatch =
            query === "" ||
            searchText.includes(query);

        return categoryMatch && searchMatch;

    });

    currentPage = 1;

    applySorting();

    updateCounter();

    updateLoadMore();

}

