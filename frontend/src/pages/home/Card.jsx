import React from 'react';
import { useSpring, animated } from 'react-spring';

const GlassmorphicCard = () => {
  const [props, set] = useSpring(() => ({
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    config: { mass: 5, tension: 350, friction: 40 }
  }));

  const calc = (x, y) => {
    const card = document.getElementById('card');
    const rect = card.getBoundingClientRect();
    return [
      -(y - rect.top - rect.height / 2) / 20,
      (x - rect.left - rect.width / 2) / 20,
      1.05
    ];
  };

  const trans = (x, y, s) => 
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <animated.div
        id="card"
        className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl"
        onMouseMove={({ clientX: x, clientY: y }) => set({ rotateX: calc(x, y)[0], rotateY: calc(x, y)[1], scale: calc(x, y)[2] })}
        onMouseLeave={() => set({ rotateX: 0, rotateY: 0, scale: 1 })}
        style={{
          transform: props.rotateX.to((x, y, s) => trans(x, y, s)),
          scale: props.scale
        }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Glassmorphic Card</h2>
        <p className="text-white text-opacity-80">
          This is a beautiful glassmorphic card with hover animations.
          Move your mouse over the card to see the effect!
        </p>
      </animated.div>
    </div>
  );
};

export default GlassmorphicCard;