import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import Section from "./Section";

import "./diaporama.css";

const MAIN_DELAY = 500;

const Diaporama = ({
    user
}) => {
    const lyric = window.lyric;
    const transformLyric = lyric.content.split("<br>");
    const [activePage, setActivePage] = useState("");
    const activeHandler = (str) => setActivePage(str);

    const sectionsRef = useRef(null);

    sectionsRef.current = document.querySelectorAll("section");
    const totalSections = sectionsRef?.current?.length * 1 - 1;
    const onMouseScroll = debounce((e) => {
        let index = 0;
        if (e.deltaY < 0 && sectionsRef.current) {
            sectionsRef.current.forEach(({ id }, i) => {
                if (id === activePage) index = i;
            });
            if (index > 0) activeHandler(sectionsRef?.current[index - 1].id);
        } else if (Math.max(-1, Math.min(1, e.deltaY)) > 0) {
            sectionsRef.current.forEach(({ id }, i) => {
                if (id === activePage) index = i;
            });
            if (index < totalSections)
                activeHandler(sectionsRef?.current[index + 1].id);
            if (totalSections < 0) return activeHandler("section2");
        }
    }, MAIN_DELAY);

    const onKeyNext = debounce((e) => {
        let index = 0;
        sectionsRef.current.forEach(({ id }, i) => {
            if (id === activePage) index = i;
        });
        if (index < totalSections)
            activeHandler(sectionsRef?.current[index + 1].id);
        if (totalSections < 0) return activeHandler("section2");
    }, MAIN_DELAY);

    const onKeyPrevious = debounce((e) => {
        let index = 0;
        sectionsRef.current.forEach(({ id }, i) => {
            if (id === activePage) index = i;
        });
        if (index > 0) activeHandler(sectionsRef?.current[index - 1].id);
    }, MAIN_DELAY);

    useEffect(() => {
        activeHandler(window.location.hash.slice(1));
    }, []);

    useEffect(() => {
        window.addEventListener("wheel", onMouseScroll);
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

        if (!!activePage)
            window.history.pushState("/", "Diaporama", `#${activePage}`);
        if (sectionsRef.current) {
            sectionsRef.current.forEach(({ id }, i) => {
                if (id === activePage) sectionsRef.current[i].scrollIntoView();
            });
        }
        // return () => {
        //     window.removeEventListener("wheel", onMouseScroll);
        // };
    }, [activePage]);

    return (
        <div className="app-container">
            <Section MAIN_DELAY={MAIN_DELAY} text={lyric.title} artist={lyric.artists} idSection={1} />
            {
                transformLyric.filter(l => l).map((value, ind) => {
                    if (value) {
                        return (
                            <Section key={ind} MAIN_DELAY={MAIN_DELAY} text={value} idSection={ind} />
                        )
                    }
                })
            }
        </div>
    );
}

export default Diaporama;