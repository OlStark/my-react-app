import { useEffect, useState } from "react";
import { throttle } from "../helpers";

export function useResponsiveButtons(defaultCount: number) {
    const [count, setCount] = useState(defaultCount);

    useEffect(() => {
        const update = () => {
            const width = window.innerWidth;
            if (width < 480) setCount(2);
            else if (width < 768) setCount(4);
            else setCount(6);
        };

        const throttled = throttle(update, 100);
        window.addEventListener("resize", throttled);
        update();

        return () => window.removeEventListener("resize", throttled);
    }, []);

    return count;
}
