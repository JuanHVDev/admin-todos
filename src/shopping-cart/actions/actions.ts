// "use client";

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
    if (hasCookie("cart")) {
        const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
        return cookieCart;
    }
    return {};
};

export const addProductToCart = (id: string) => {
    let cookieCart = getCookieCart();
    if (cookieCart[id]) {
        cookieCart[id] += 1;
    } else {
        cookieCart[id] = 1;
    }
    setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
    let cookieCart = getCookieCart();
    delete cookieCart[id];
    setCookie("cart", JSON.stringify(cookieCart));
};

export const removeOneProductFromCart = (id: string) => {
    let cookieCart = getCookieCart();
    if (cookieCart[id]) {
        cookieCart[id] -= 1;

        if (cookieCart[id] === 0) {
            delete cookieCart[id];
        }
    }
    setCookie("cart", JSON.stringify(cookieCart));
};
