import React, { useState, useImperativeHandle, forwardRef } from 'react';

// Usage: <FlyToCart ref={flyToCartRef} />
// Call flyToCartRef.current.trigger({ src, rect }) to animate
const FlyToCart = forwardRef((props, ref) => {
  const [animations, setAnimations] = useState([]);

  // Get cart icon position
  const getCartPosition = () => {
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return { x: 0, y: 0 };
    const rect = cartIcon.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  };

  // Expose trigger method
  useImperativeHandle(ref, () => ({
    trigger({ src, rect }) {
      const targetPos = getCartPosition();
      const startPos = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      const id = Date.now() + Math.random();
      const style = {
        position: 'fixed',
        left: startPos.x,
        top: startPos.y,
        transform: 'translate(-50%, -50%)',
        width: rect.width + 'px',
        height: rect.height + 'px',
        borderRadius: '8px',
        zIndex: 1000,
        opacity: 1,
        boxShadow: '0 8px 24px 0 rgba(80, 0, 120, 0.12)',
        transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
        pointerEvents: 'none',
      };
      setAnimations(prev => [...prev, { id, src, style, targetPos }]);

      // Animate in next frame
      setTimeout(() => {
        const el = document.querySelector(`[data-animation-id="${id}"]`);
        if (el) {
          el.style.left = `${targetPos.x}px`;
          el.style.top = `${targetPos.y}px`;
          el.style.opacity = '0.3';
          el.style.transform = 'translate(-50%, -50%) scale(0.3)';
          el.style.boxShadow = '0 2px 8px 0 rgba(80, 0, 120, 0.08)';
        }
      }, 20);

      // Remove after animation
      setTimeout(() => {
        setAnimations(prev => prev.filter(a => a.id !== id));
        if (props.onComplete) props.onComplete();
      }, 800);
    }
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {animations.map(({ id, src, style }) => (
        <img
          key={id}
          data-animation-id={id}
          src={src}
          style={style}
          alt="fly-to-cart"
        />
      ))}
    </div>
  );
});

export default FlyToCart;