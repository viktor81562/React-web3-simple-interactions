import "./MyButton.css";

import { useState } from "react";

export default function MyButton({count, handleClick}) {


    return (
        <button onClick={handleClick}>Clicked {count} times</button>
    );
}

