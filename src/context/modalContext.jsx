import React, { createContext, useContext, useEffect, useState } from "react";



const ModalContext = createContext({});

// ModalContextProvider component
export const ModalContextProvider = ({ children }) => {
    // State variables for modal and client data
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [modalFor, setModalFor] = useState('');
    const [isClassAdded, setIsClassAdded] = useState(false);


    useEffect(() => {
        if (isClassAdded) {
          document.body.classList.add('overflow-hidden'); // Add your class name here
        } else {
          document.body.classList.remove('overflow-hidden'); // Remove your class name here
        }
    
        // Cleanup function to remove the class when component unmounts
        return () => {
          document.body.classList.remove('overflow-hidden');
        };
      }, [isClassAdded]);




    return (
        <ModalContext.Provider
            value={{
                showModal,
                setShowModal,
                modalData,
                setModalData,
                modalFor,
                setModalFor,
                isClassAdded,
                setIsClassAdded
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

// Custom hook to consume ModalContext
export const useModalContext = () => useContext(ModalContext);
