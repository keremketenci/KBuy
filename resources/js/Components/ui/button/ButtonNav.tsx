// button.tsx

// react
import React from 'react';

import { useTheme } from '@/Components/Theme/theme-provider'; // path to your ThemeContext

// styles
import styles from '@/components/ui/button/ButtonNav.module.css';

interface ButtonNavProps {
    onClick?: () => void;
    checked?: boolean;
    backgroundColor?: string;
}

export const ButtonNav: React.FC<ButtonNavProps> = ({
    onClick,
    checked,
    backgroundColor,
}) => {
    const { theme } = useTheme();
    // console.log(theme);

    if (theme === 'dark') {
        backgroundColor = 'white';
    } else if (theme === 'light') {
        backgroundColor = 'black';
    } else if (theme === 'system') {
        backgroundColor = undefined;
    }

    return (
        <label
            className={`${styles.ButtonNav}`}
            htmlFor="ButtonNav"
            style={
                {
                    '--span-background': backgroundColor || 'green',
                } as React.CSSProperties
            } // Set CSS variable
        >
            <input
                type="checkbox"
                id="ButtonNav"
                onClick={onClick}
                checked={checked}
                readOnly
            />
            <span></span>
            <span></span>
            <span></span>
        </label>
    );
};

export default ButtonNav;
