import React, { useState } from "react";

const usePasswordToggle = () => {
    const [visible, setVisiblity] = useState(false);

    const Icon = (
        <div 
            className={visible ? "eye-slash" : "eye"} 
            title="Afficher le mot de passe" 
            onClick={() => setVisiblity(visiblity => !visiblity)}
        >
        </div>
    );

    const InputType = visible ? "text" : "password";
    return [InputType, Icon];
}
 
export default usePasswordToggle;