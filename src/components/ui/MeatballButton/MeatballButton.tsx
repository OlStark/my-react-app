import './meatBall.css';

interface MeatballButtonProps {
    onClick?: () => void
}
export const MeatballButton = ({ onClick }: MeatballButtonProps) => {

    return (
        <button onClick={onClick} className='meatball-button'>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}