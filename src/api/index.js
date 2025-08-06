const api_address = "http://localhost:9000/api/";

export async function availableFilters (section) {
    var searchParams = new URLSearchParams({
        section: section
    })
    const res = await fetch(api_address + `filters?${searchParams}`);
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json();
}

export async function discounts () {
    const res = await fetch(api_address + `product_discounts`);
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json();
}

export async function productsQuery (type = "collection", page_title = "all") {
    const res = await fetch(api_address + `products/${type}/${page_title}`)
    if (!res.ok) throw new Error("Failed to fetch.");
    return res.json();
}

export async function productDetails (product_id) {
    const res = await fetch(api_address + `product/${product_id}`);
    if (!res.ok) throw new Error("Failed to fetch product details.");
    return res.json();
}