import {
    ADD_ORDER,
    REMOVE_ORDER,
    SUBTOTAL,
    DELETE_ORDER,
    CLEAR_ORDERS,
} from "../reducers/types";

export const addOrder = (payload, size) => {
    if (size === 1) {
        size = "Small";
    } else if (size === "0.2") {
        size = "Medium";
        payload.price = payload.price +(payload.price * 0.2)
    } else {
        size = "Big";
        payload.price = payload.price +(payload.price * 0.4)
    }
    payload.product_name = payload.product_name + ` /${size}`;

    return {
        type: ADD_ORDER,
        payload,
    };
};

export const removeOrder = (payload) => {
    return {
        type: REMOVE_ORDER,
        payload,
    };
};

export const subTotal = (index, quantity) => {
    return {
        type: SUBTOTAL,
        index,
        quantity,
    };
};

export const deleteOrder = (index) => {
    return {
        type: DELETE_ORDER,
        index,
    };
};

export const clearOrders = () => {
    return {
        type: CLEAR_ORDERS,
    };
};
