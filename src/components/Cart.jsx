import { useCartContext } from "@/context/cartContext";
import { useThemeContext } from "@/context/themeContext";
import { useEffect, useMemo, useState } from "react";

export default function Cart({ type, size, itemid, price, name }) {
    const { cartItems, setCartItems } = useCartContext();
    const { themeLayout } = useThemeContext();
    const [quantity, setQuantity] = useState(1);

    // Memoize safeCartItems to avoid unnecessary recalculations
    const safeCartItems = useMemo(() => Array.isArray(cartItems) ? cartItems : [], [cartItems]);

    // Effect hook to sync quantity with cartItems
    useEffect(() => {
        const currentItem = safeCartItems.find(item => item.id === itemid);
        if (currentItem) {
            setQuantity(currentItem.quantity);
        } else {
            setQuantity(0);
        }
    }, [safeCartItems, itemid]);

    // Function to update cart in localStorage
    const updateCartInLocalStorage = (updatedCartItems) => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    // Check if item is in the cart
    const isInCart = safeCartItems.some(cartItem => cartItem.id === itemid);

    // Function to handle cart action (Add/Remove)
    const handleCartAction = () => {
        if (isInCart) {
            // Remove item from cart
            const updatedCartItems = safeCartItems.filter(cartItem => cartItem.id !== itemid);
            setCartItems(updatedCartItems);
            updateCartInLocalStorage(updatedCartItems);
        } else {
            // Add item to cart
            const newObject = { id: itemid, quantity: 1, price: price, name: name };
            const updatedCartItems = [...safeCartItems, newObject];
            setCartItems(updatedCartItems);
            updateCartInLocalStorage(updatedCartItems);
        }
    };

    // Function to increase item quantity
    const CartPlus = () => {
        const updatedCartItems = safeCartItems.map(item =>
            item.id === itemid
                ? { ...item, quantity: item.quantity + 1 }  // Increase quantity
                : item
        );

        // If item does not exist, add it with quantity 1
        if (!updatedCartItems.some(item => item.id === itemid)) {
            updatedCartItems.push({ id: itemid, quantity: 1, price: price, name: name });
        }

        setCartItems(updatedCartItems);
        updateCartInLocalStorage(updatedCartItems);

        // Update local quantity state
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Function to decrease item quantity
    const CartMinus = () => {
        const itemInCart = safeCartItems.find(item => item.id === itemid);

        if (itemInCart) {
            if (itemInCart.quantity > 1) {
                // Update quantity if greater than 1
                const updatedCartItems = safeCartItems.map(item =>
                    item.id === itemid
                        ? { ...item, quantity: item.quantity - 1 }  // Decrease quantity
                        : item
                );
                setCartItems(updatedCartItems);
                updateCartInLocalStorage(updatedCartItems);
                setQuantity(prevQuantity => prevQuantity - 1);
            } else {
                // Remove item if quantity is 1
                const updatedCartItems = safeCartItems.filter(item => item.id !== itemid);
                setCartItems(updatedCartItems);
                updateCartInLocalStorage(updatedCartItems);
                setQuantity(0);
            }
        }
    };

    // Determine button color based on theme
    let color;
    switch (themeLayout.toLowerCase()) {
        case "white":
            color = "white";
            break;
        case 'chocolates':
            color = "#c89a3f";
            break;
        case 'flowers':
            color = "#E62263";
            break;
        case 'cakes':
            color = "#E79F02";
            break;
        case 'events':
            color = "#258F89";
            break;
        default:
            color = "#000";
            break;
    }

    // Render cart button based on type
    let cartType;
    switch (type) {
        case "button":
            cartType = (
                <button
                    onClick={handleCartAction}
                    className={`btn-cart opacity-0 btn w-full absolute bottom-0 rounded-t-none border-none text-white hidden xl:flex`}
                    style={{ background: color }}
                >
                    {isInCart ? 'Remove' : 'Add'}
                </button>
            );
            break;

        case "button-small":
            cartType = (
                <button
                    onClick={handleCartAction}
                    className="btn btn-outline w-auto border-gray-300 border border-solid rounded-[4px] hover:bg-white hover:border-gray-300 hover:text-black"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mb-1" fill="none" viewBox="0 0 14 12">
                        <path fill="#000" d="m13.484 2.982-1.437 5.17a1.348 1.348 0 0 1-1.293.986H5.216a1.348 1.348 0 0 1-1.298-.985L1.952 1.069H.948a.448.448 0 0 1 0-.897h1.345a.448.448 0 0 1 .432.329l.531 1.913h9.796a.448.448 0 0 1 .432.568Zm-8.501 7.052a.897.897 0 1 0 0 1.794.897.897 0 0 0 0-1.794Zm5.827 0a.897.897 0 1 0 0 1.794.897.897 0 0 0 0-1.794Z" />
                    </svg>
                    {isInCart ? 'Remove' : 'Add'}
                </button>
            );
            break;

        default:
            cartType = (
                <div className={`${size} rounded-[6px] border border-solid border-black flex justify-between sm:max-w-[150px] sm:min-w-[150px] overflow-hidden`}>
                    <button
                        className="btn bg-transparent rounded-none border-none shadow-none hover:bg-gray-100 min-h-[55px]"
                        onClick={CartMinus}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="2" fill="none" viewBox="0 0 13 2">
                            <path stroke="#000" d="M13 1.33H0" />
                        </svg>
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        className="border-none sm:w-full max-w-[50px] text-center !focus:border-none min-h-[55px]"
                       readOnly
                    />
                    <button
                        className="btn bg-transparent rounded-none border-none shadow-none hover:bg-gray-100 min-h-[55px]"
                        onClick={CartPlus}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none" viewBox="0 0 13 14">
                            <path stroke="#000" d="M6.5.83v13m6.5-6.5H0" />
                        </svg>
                    </button>
                </div>
            );
            break;
    }

    return <>{cartType}</>;
}
