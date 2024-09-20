import { useCartContext } from "@/context/cartContext";
import { useThemeContext } from "@/context/themeContext";
import { useEffect, useMemo, useState } from "react";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'

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
            color = "#c89a3f";
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
           <PlusIcon className="text-black size-4"/>
                    {isInCart ? 'Remove' : 'Add'}
                </button>
            );
            break;

        default:
            cartType = (
                <div className={`${size} rounded-[6px] border border-solid border-black flex justify-between sm:max-w-[150px] sm:min-w-[150px] overflow-hidden`}>
                    <button
                        className="btn bg-transparent rounded-none border-none shadow-none  hover:bg-white min-h-[55px]"
                        onClick={CartMinus}
                    >
                   <MinusIcon className="text-black size-5"/>
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        className="border-none sm:w-full max-w-[50px] text-center !focus:border-none min-h-[55px]"
                       readOnly
                    />
                    <button
                        className="btn bg-transparent rounded-none border-none shadow-none  hover:bg-white min-h-[55px]"
                        onClick={CartPlus}
                    >
                       <PlusIcon className="text-black size-5"/>
                    </button>
                </div>
            );
            break;
    }

    return <>{cartType}</>;
}
