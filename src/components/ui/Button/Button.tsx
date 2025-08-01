import './button.css';

interface ButtonProps {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    className?: string | string[];
    title?: string;
    icon?: string;
    iconSvg?: React.FC<React.SVGProps<SVGSVGElement>>;
    altIcon?: string;
    isDisabled?: boolean;
    isSelected?: boolean; // Новый пропс для состояния выбора
}

export const Button = ({
    icon,
    iconSvg: IconSvg,
    altIcon,
    className,
    onClick,
    title = '',
    isDisabled,
    isSelected = false // Значение по умолчанию
}: ButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled && onClick) {
            onClick(event);
        }
    };

    const getButtonClasses = () => {
        const baseClass = 'button';
        const classes = Array.isArray(className)
            ? className
            : (className ? [className] : []);

        // Добавляем класс для выбранного состояния
        if (isSelected) {
            classes.push('selected');
        }

        return [baseClass, ...classes]
            .filter(c => c && typeof c === 'string')
            .join(' ');
    };

    return (
        <button
            onClick={handleClick}
            className={getButtonClasses()}
            disabled={isDisabled}
            aria-pressed={isSelected} // Для доступности
        >
            {icon && <img src={icon} alt={altIcon} />}
            {IconSvg && <IconSvg className='button-icon' />}
            {title && <span className='button-title'>{title}</span>}
        </button>
    );
};