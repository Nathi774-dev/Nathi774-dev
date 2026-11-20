
import {
    useContext,
    createContext,
    useState
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(item) {
        if (!item._id || Number(item.stock) <= 0) {
            return false;
        }

        const existingItem = cartItems.find(
            cartItem => cartItem._id === item._id
        );

        if (
            existingItem &&
            existingItem.cartQuantity >= Number(item.stock)
        ) {
            return false;
        }

        setCartItems(currentItems => {
            const existing = currentItems.find(
                cartItem => cartItem._id === item._id
            );

            if (existing) {
                return currentItems.map(cartItem =>
                    cartItem._id === item._id
                        ? {
                            ...cartItem,
                            cartQuantity: cartItem.cartQuantity + 1
                        }
                        : cartItem
                );
            }

            return [
                ...currentItems,
                {
                    ...item,
                    cartQuantity: 1
                }
            ];
        });

        return true;
    }

    function removeItemFromCart(id) {
        setCartItems(currentItems =>
            currentItems.filter(item => item._id !== id)
        );
    }

    function increaseQuantity(id) {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item._id !== id) return item;

                if (item.cartQuantity >= Number(item.stock)) {
                    return item;
                }

                return {
                    ...item,
                    cartQuantity: item.cartQuantity + 1
                };
            })
        );
    }

    function decreaseQuantity(id) {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item._id !== id) return item;
                if (item.cartQuantity <= 1) return item;

                return {
                    ...item,
                    cartQuantity: item.cartQuantity - 1
                };
            })
        );
    }

    function clearItems() {
        setCartItems([]);
    }

    const totalItems = cartItems.reduce(
        (total, item) => total + item.cartQuantity,
        0
    );

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * item.cartQuantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeItemFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearItems,
                totalItems,
                subtotal
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider."
        );
    }

    return context;
}
