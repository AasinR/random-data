import { useState } from "react";

/**
 * Returns copy to clipboard, tooltip controll functions and a clicked boolean state.
 */
function useCopyClipboard(value: string) {
    const [clicked, setClicked] = useState<boolean>(false);

    // copy content to the clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setClicked(true);
    }

    // set tipClicked to false after 200 ms
    const handleCopyToggle = () => {
        if (clicked) {
            setTimeout(
                () => setClicked(false),
                200
            );
        }
    }

    return { handleCopy, handleCopyToggle, clicked };
}

export default useCopyClipboard;