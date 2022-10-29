import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import debounce from "lodash.debounce";

const useObserverEffect = (MAIN_DELAY, isFirst = false, isLast = false) => {
    const [variant, setVariant] = useState("hidden");
    const { ref, inView } = useInView({
        threshold: 0.3
    });

    // observable to detect current position of a slide
    useEffect(() => {
        if (inView) {
            setVariant("visible");
        } else setVariant("hidden");
    }, [inView]);

    const onMouseScroll = debounce((e) => {
        if (e.deltaY > 0 && variant === "visible")
            setVariant(isLast ? "visible" : "next");
        if (e.deltaY < 0 && variant === "visible")
            setVariant(isFirst ? "visible" : "previous");
    }, MAIN_DELAY);

    const onKeyNext = debounce((e) => {
        setVariant(isLast ? "visible" : "next");
    }, MAIN_DELAY);

    const onKeyPrevious = debounce((e) => {
        setVariant(isFirst ? "visible" : "previous");
    }, MAIN_DELAY);

    useEffect(() => {
        // window.addEventListener("wheel", onMouseScroll);
        document.onkeydown = checkKey;

        function checkKey(e) {

            e = e || window.event;

            if (e.keyCode == '38') {
                onKeyPrevious();
            }
            else if (e.keyCode == '40') {
                onKeyNext();
            }
            else if (e.keyCode == '37') {
                onKeyPrevious();
            }
            else if (e.keyCode == '39') {
                onKeyNext();
            }
        }
        // return () => {
        //     window.removeEventListener("wheel", onMouseScroll);
        // };
    });

    return {
        ref,
        variant
    };
};

export default useObserverEffect;