import { menuItems } from "../components/menu/data/menuData";
import { useContext, createContext, useState } from "react";

const cartContext = createContext(null);

export function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);
    const [inventory, setInventory] = useState(menuItems);

    console.log("Cart items: ", cartItems);
    console.log("Menu items: ", menuItems);
    function addToCart(item) {
        console.log("Stock: ", item.quantity);
        if (item.quantity <= 0) {
            return;
        }
        setInventory((currentInventory) => {
            // decrease inventory
            console.log("Current inventory: ", currentInventory);
            const inventoryItem = currentInventory.find((stock) => {
                stock.id === item.id
            })

            if (!inventoryItem) {
                console.error("Item is out of stock: ", item);
                return currentInventory
            }
            currentInventory.map((stock) => {
                stock.id === item.id ? {
                    ...stock,
                    quantity: stock.quantity - 1
                } : stock
            })
        })

        console.log("item: ", item);
        setCartItems(currentItems => {
            console.log("Current items: ", currentItems);
            const existingItem = currentItems.find(cartItem => {
                cartItem.id === item.id
            })

            console.log("Existing item: ", existingItem);

            if (existingItem) {
                return currentItems.map((currentItem) => {
                    currentItem.id === item.id ? (
                        {
                            ...currentItem,
                            cartQuantity: currentItem.cartQuantity + 1
                        }
                    ) : currentItem
                })
            }

            return [
                ...currentItems,
                {
                    ...item,
                    price: item.price,
                    cartQuantity: 1
                }
            ]
        })
    }

    function removeItemFromCart(id) {
        setCartItems(currentItems => {
            currentItems.filter(item => {
                item.id !== id
            })
        })
    }

    function increaseQuantity(id) {
        setCartItems(currentItems => {
            currentItems.map((item) => {
                item.id === id ? (
                    {
                        ...item,
                        quantity: item.quantity + 1
                    }
                ) : item
            })
        })
    }
    
    function decreaseQuantity(id) {
        setCartItems(currentItems => {
            currentItems.map((item) => {
                item.id === id && item.quantity > 0 ? (
                    {
                        ...item,
                        quantity: item.quantity - 1
                    }
                ) : item
            })
        })
    }

    function clearItems() {
        setCartItems([]);
    }

    // total of each individual item
    const totalItems = cartItems.reduce((total, item) => {
        return total + Number(item.cartQuantity)
    }, 0);

    // total price of all items in the cart
    const subtotal = cartItems.reduce((total, item) => {
        total + Number(item.price) * Number(item.cartQuantity)
    }, 0)

    console.log("Total: ", totalItems);
    console.log("Subtotal: ", subtotal);

    return (
        <cartContext.Provider
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
        </cartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(cartContext);
    if (!context) {
        throw new Error("useCart can only be used in the cart context provider");
    }

    return context
}