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

export async function productRelated (product_id) {
    const res = await fetch(api_address + `product_related/${product_id}`);
    if (!res.ok) throw new Error("Failed to fetch product related.");
    return res.json();
}

export async function productReviews (product_id) {
    const res = await fetch(api_address + `product_reviews/${product_id}`);
    if (!res.ok) throw new Error("Failed to fetch product reviews.");
    return res.json();
}

export async function becomeMerchant (formData) {
    const res = await fetch(api_address + `become_merchant`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    if (!res.ok) {
        const errorData = await res.json()
        throw errorData;
    };
    return res.json();
}

export async function vendorEmailVerification(code) {
    const res = await fetch(api_address + `vendor/confirm/${code}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
    }
    return res.json();
}