const api_address = "http://localhost:9000/api/";
const api_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDQ1NTMwMDU2NWNkOTBjOTkxOWNiZDJlOWRiNzZjZThiNWUwNGQxZDRjNmJlY2Q1MjcyYTNmNDdlODk4YjMwMGQyMDRjYzViNTEwNDAzNGIiLCJpYXQiOjE3NTU0MjQyNTMuNTc3MjEsIm5iZiI6MTc1NTQyNDI1My41NzcyMTMsImV4cCI6MTc4Njk2MDI1My40ODYzODEsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.rfMgsUQe11uO4XJJjlgbITZaGsW50gTxa33g_AXR7PUcmm5xOu8OY6M8CQSC6R0LUKJ2ILYubuYjonGBv9KHenBUki4NhE6iFAvhCezvwv2X9xKK9DbkJC0lcAOP9Yl48B9YGsLOfEsrZw2oO-QhdxaI6ynHMNQFr5ANYC21wsB23lj1e-9uozkdDve-2lYREysmAjgI9Cl5ig67mbEUHyBqGmgKci1FZ5hIL9H8ObdFutDkt4SpokYBmEPZjG8Sl70h78d9a37W3Sg0g4FMtLxw7AbcFcbxQcsWCcKqphzbOebwQRPL6Vuuggq7yffTan0iSWBq8TCtjVC0DvPiR81j2igVEeCh8XVVdaUSqKr5l5Ga5lPyYVgiBaJt9KhrTk8IQaBI42UxvvhRVih-YUjc1XpL9Iuep4d8SvGtObqoSHt0LYJ4ooNODtXKz0RPWwvA3BSFXh30-h7-RqfOfmuGXYBBuyryONEvPZWA36VO5hQgOM3n3krvmZkiDGh-SohRo5z64kR9nn615ejb0Ph1JgZVb-4tQysm_hsJgamgXO3pGZ6UEP2YY78M3fZs0gErowJSHB-mZbrNbkInimkG0IN2hs2SA_xZXj6w--86oLJdA2HL4sKmPCd1m8GkFD36HrlzrxJLyxXhGCVUIMNa16FQJEIkoOmLfzEP2as";

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
    const res = await fetch(api_address + `products/related/${product_id}`);
    if (!res.ok) throw new Error("Failed to fetch product related.");
    return res.json();
}

export async function productReviews (product_id) {
    const res = await fetch(api_address + `products/reviews/${product_id}`);
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
    const res = await fetch(api_address + `vendor/confirm/${code}`);
    if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
    }
    return res.json();
}

export async function sendForgotPassEmail(formData) {
    const res = await fetch(api_address + `forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
    }
    return res.json();
}

export async function customerLogin(formData) {
    const res = await fetch(api_address + `user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
    }
    return res.json();
}