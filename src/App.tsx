import { chips } from './chips';
import './App.css';
import { Button, MeatballButton } from './components/ui';
import { useState, useEffect } from 'react';
import { throttle } from './helpers';

function App() {
  const [popapIsOpen, setPopapIsOpen] = useState(false);
  const [maxVisibleButtons, setMaxVisibleButtons] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedChip, setSelectedChip] = useState<string | null>(null); // Состояние для выбранного чипса

  useEffect(() => {
    const updateVisibleButtons = () => {
      const width = window.innerWidth;
      if (width < 480) setMaxVisibleButtons(2);
      else if (width < 768) setMaxVisibleButtons(4);
      else setMaxVisibleButtons(6);
    };

    const throttledResize = throttle(updateVisibleButtons, 100);
    window.addEventListener('resize', throttledResize);
    updateVisibleButtons();
    return () => window.removeEventListener('resize', throttledResize);
  }, []);

  const chooseChip = (chip: string) => {
    setSelectedChip(chip); // Устанавливаем выбранный чипс
    console.log('Selected chip:', chip);

    // Закрываем попап при выборе (опционально)
    if (popapIsOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setPopapIsOpen(false);
        setIsAnimating(false);
      }, 250);
    }
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

  const hiddenButtons = chips.length > maxVisibleButtons
    ? chips.slice(maxVisibleButtons - 1)
    : [];

  const visibleButtons = chips.length > maxVisibleButtons
    ? [
      ...chips.slice(0, maxVisibleButtons - 1).map(chip => (
        <Button
          key={chip}
          title={chip}
          onClick={() => chooseChip(chip)}
          isSelected={selectedChip === chip} // Передаем состояние выбора
        />
      )),
      <MeatballButton key="meatball" onClick={togglePopap} />
    ]
    : [
      ...chips.map(chip => (
        <Button
          key={chip}
          title={chip}
          onClick={() => chooseChip(chip)}
          isSelected={selectedChip === chip}
        />
      )),
      <MeatballButton key="meatball" onClick={togglePopap} />
    ];

  return (
    <div className="App">
      <div className="chips-wrapper">
        <div className="chips-container">
          {visibleButtons}
        </div>

        {popapIsOpen && (
          <div className={`popap ${isAnimating ? 'closing' : ''}`}>
            {hiddenButtons.map(chip => (
              <Button
                key={`popap-${chip}`}
                title={chip}
                onClick={() => chooseChip(chip)}
                isSelected={selectedChip === chip}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;