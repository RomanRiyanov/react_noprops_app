import styles from './Switcher.module.css'
import { useEffect } from 'react';

function Switcher() {

    useEffect(() => {
        const toggleBtn = document.getElementById("toggle_btn");
        const page = document.getElementsByTagName("body")[0];
        const lightMode = localStorage.getItem("light_mode");

        const enableLightMode = () => {
            localStorage.setItem("light_mode", "enabled");
            page.classList.add("theme__light");
        };

        const disableLightMode = () => {
            localStorage.setItem("light_mode", "disabled");
            if (page.classList.contains('theme__light')) page.classList.remove("theme__light");            
        };

        const switcher = () => {
            const lightMode = localStorage.getItem("light_mode");
            console.log(lightMode);
            if (lightMode === "disabled" || lightMode === null) {
                enableLightMode();
            } else {
                disableLightMode();
            }
        }

        if (lightMode === "enabled") {
            enableLightMode();
        }

        toggleBtn?.addEventListener("click", switcher);

        return(() => {
            toggleBtn?.removeEventListener("click", switcher);
        })
    }, [])

    return ( 
        <label className={styles.label}>
            <input id='toggle_btn' className={styles.checkbox} type="checkbox" name="mode" />
            <span className={styles.visible}></span>
            <span className={styles.round}></span>
                Mode
        </label>
    );
}

export default Switcher;