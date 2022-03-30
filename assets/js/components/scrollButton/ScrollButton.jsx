import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollButton.css";

const ScrollButton = () => {
    // The back-to-top button is hidden at the beginning
    const [showButton, setShowButton] = useState(false);
    // console.log(showButton);

    useEffect(() => {
        // How to fix the React memory leak warning
        let cancel = false;
        window.addEventListener("scroll", () => {
            if (cancel) return;
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
        return () => {
            cancel = true;
        }
    }, []);

    // This function will scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
        });
    };
    

    return ( 
        <>
        {showButton && (
            <div className="back-to-top d-flex align-items-center justify-content-center" onClick={scrollToTop}>
                <i><FaArrowUp/></i>
            </div>
        )}
        </>
     );
}
 
export default ScrollButton;