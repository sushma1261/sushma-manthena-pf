import React, { useEffect, useState } from "react";

interface TypewriterProps {
  strings: string[]; // List of strings to display
  typingSpeed?: number; // Speed of typing (in ms per character)
  delayBetweenStrings?: number; // Delay before switching strings (in ms)
  isAnimating?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  strings,
  typingSpeed = 80,
  delayBetweenStrings = 1000,
  isAnimating = true,
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[currentStringIndex];

    const type = () => {
      if (!isAnimating) {
        return;
      }
      if (!isDeleting) {
        // Typing effect
        setDisplayedText((prev) => currentString.substring(0, prev.length + 1));
      } else {
        // Deleting effect
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));
      }

      // Determine the next typing delay
      let typingDelay = typingSpeed;

      if (!isDeleting && displayedText === currentString) {
        // Pause before deleting
        typingDelay = delayBetweenStrings;
        setTimeout(() => setIsDeleting(true), delayBetweenStrings);
      } else if (isDeleting && displayedText === "") {
        // Move to the next string
        setIsDeleting(false);
        setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
      }

      return typingDelay;
    };

    const typingTimer = setTimeout(type, typingSpeed);
    return () => clearTimeout(typingTimer); // Cleanup on unmount
  }, [
    displayedText,
    isDeleting,
    strings,
    currentStringIndex,
    typingSpeed,
    delayBetweenStrings,
    isAnimating,
  ]);

  return (
    <div>
      <p className="text-muted-foreground">{displayedText}▌</p>
    </div>
  );
};

export default Typewriter;
