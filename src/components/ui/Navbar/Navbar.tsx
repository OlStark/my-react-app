import { useState } from "react";
import { Button } from "../Button/Button";
import { MeatballButton } from "../MeatballButton/MeatballButton";
import clsx from "classnames";
import styles from "./navbar.module.css";
import { useResponsiveButtons } from "../../../hooks";

interface NavbarProps {
    chipses: string[];
    navbarElements: number;
}

export const Navbar = ({ chipses, navbarElements = 6 }: NavbarProps) => {
    const maxVisibleButtons = useResponsiveButtons(navbarElements);

    const [popapIsOpen, setPopapIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedChips, setSelectedChips] = useState<string | null>(null);

    const chooseChip = (chips: string) => {
        setSelectedChips(chips);
        console.log('Выбран чипс', chips);
    };

    const togglePopap = () => {
        if (isAnimating) return;

        if (popapIsOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setPopapIsOpen(false);
                setIsAnimating(false);
            }, 250);
        } else {
            setPopapIsOpen(true);
        }
    };

    const renderChipButton = (chips: string, index: number) => (
        <Button
            key={`chip-${index}`}
            title={chips}
            onClick={() => chooseChip(chips)}
            isSelected={selectedChips === chips}
        />
    );

    const renderedVisibleChips = chipses.slice(0, maxVisibleButtons - 1).map(renderChipButton);
    const renderedHiddenChips = chipses.slice(maxVisibleButtons - 1).map((chip, index) => renderChipButton(chip, index));

    return (
        <div className={styles.chipsWrapper}>
            <div className={styles.chipsContainer}>
                {renderedVisibleChips}
                {(chipses.length > maxVisibleButtons) && <MeatballButton onClick={togglePopap} />}
            </div>

            {popapIsOpen && (
                <div className={clsx(styles.popap, isAnimating && styles.closing)}>
                    {renderedHiddenChips}
                </div>
            )}
        </div>
    )
};