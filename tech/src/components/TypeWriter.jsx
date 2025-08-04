import { useState, useEffect } from 'react';
export default function TypeWriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className = ''
}) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(true);
  useEffect(() => {
    const text = texts[currentIndex];
    let timer;

    if (isDeleting) {
      // Deleting text
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Move to the next text after deleting
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % texts.length);
      }
    } else {
      // Typing text
      if (displayText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    displayText,
    isDeleting,
    currentIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    delayBetweenTexts
  ]);

  // Separate effect for cursor blinking
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 500);

    return () => {
      clearInterval(blinkTimer);
    };
  }, []);

  return (
    <div className={className}>
      {displayText}
      <span className={`inline-block w-0.5 h-5 ml-1 bg-primary-dark transition-opacity ${isBlinking ? 'opacity-100' : 'opacity-0'}`}>
        |
      </span>
    </div>
  );
}