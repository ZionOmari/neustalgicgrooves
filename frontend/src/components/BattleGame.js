import React, { useState, useEffect, useCallback } from 'react';

const BattleGame = ({ isOpen, onClose }) => {
  const [bBoyPos, setBBoyPos] = useState({ x: 0, y: 0, move: '🕺' });
  const [bGirlPos, setBGirlPos] = useState({ x: 0, y: 0, move: '💃' });
  const [score, setScore] = useState({ bboy: 0, bgirl: 0 });
  const [currentMove, setCurrentMove] = useState('');
  const [combo, setCombo] = useState(0);

  const moves = {
    // B-Boy moves (Left side)
    'q': { name: 'TOP ROCK', emoji: '🕺', type: 'bboy' },
    'w': { name: 'WINDMILL', emoji: '🌪️', type: 'bboy' },
    'e': { name: 'FREEZE', emoji: '🧊', type: 'bboy' },
    'a': { name: 'HEADSTAND', emoji: '🤸', type: 'bboy' },
    's': { name: 'BACKSPIN', emoji: '🌀', type: 'bboy' },
    'd': { name: 'FLARE', emoji: '🔥', type: 'bboy' },
    
    // B-Girl moves (Right side)
    'u': { name: 'TOP ROCK', emoji: '💃', type: 'bgirl' },
    'i': { name: 'WINDMILL', emoji: '🌪️', type: 'bgirl' },
    'o': { name: 'FREEZE', emoji: '🧊', type: 'bgirl' },
    'j': { name: 'HEADSTAND', emoji: '🤸', type: 'bgirl' },
    'k': { name: 'BACKSPIN', emoji: '🌀', type: 'bgirl' },
    'l': { name: 'FLARE', emoji: '🔥', type: 'bgirl' },
  };

  const executeMove = useCallback((key) => {
    const move = moves[key.toLowerCase()];
    if (!move) return;

    setCurrentMove(`${move.name} - ${move.emoji}`);
    setCombo(prev => prev + 1);

    if (move.type === 'bboy') {
      setBBoyPos(prev => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 50 - 25,
        move: move.emoji
      }));
      setScore(prev => ({ ...prev, bboy: prev.bboy + 10 + combo }));
    } else {
      setBGirlPos(prev => ({
        x: Math.random() * 100 - 50,
        y: Math.random() * 50 - 25,
        move: move.emoji
      }));
      setScore(prev => ({ ...prev, bgirl: prev.bgirl + 10 + combo }));
    }

    // Reset positions after move
    setTimeout(() => {
      if (move.type === 'bboy') {
        setBBoyPos(prev => ({ ...prev, x: 0, y: 0, move: '🕺' }));
      } else {
        setBGirlPos(prev => ({ ...prev, x: 0, y: 0, move: '💃' }));
      }
    }, 800);

    // Clear current move display
    setTimeout(() => {
      setCurrentMove('');
    }, 1000);
  }, [moves, combo]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (event) => {
      executeMove(event.key);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, executeMove]);

  // Reset combo after inactivity
  useEffect(() => {
    const timer = setTimeout(() => setCombo(0), 2000);
    return () => clearTimeout(timer);
  }, [combo]);

  if (!isOpen) return null;

  return (
    <div className="battle-game">
      <button className="close-battle" onClick={onClose}>
        ✕ CLOSE
      </button>
      
      <div className="battle-score">
        B-BOY: {score.bboy} | COMBO: {combo}x | B-GIRL: {score.bgirl}
      </div>

      <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>
        🎮 8-BIT BREAKIN' BATTLE 🎮
      </h1>

      {currentMove && (
        <div style={{ 
          fontSize: '1.5rem', 
          color: '#ffff00', 
          textShadow: '0 0 10px #ffff00',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          {currentMove}
        </div>
      )}

      <div className="battle-arena">
        <div 
          className="bboy-left"
          style={{
            transform: `translate(${bBoyPos.x}px, ${bBoyPos.y}px)`,
            fontSize: bBoyPos.move !== '🕺' ? '5rem' : '4rem'
          }}
        >
          {bBoyPos.move}
        </div>
        
        <div 
          className="bgirl-right"
          style={{
            transform: `translate(${bGirlPos.x}px, ${bGirlPos.y}px)`,
            fontSize: bGirlPos.move !== '💃' ? '5rem' : '4rem'
          }}
        >
          {bGirlPos.move}
        </div>

        {/* Battle floor */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #00bfff, #ff69b4)',
          boxShadow: '0 0 10px #00ff00'
        }}></div>
      </div>

      <div className="battle-controls">
        <h2>🎯 KEYBINDS - MASH THE KEYS! 🎯</h2>
        
        <div className="control-instructions">
          <div>
            <h3 style={{ color: '#00bfff', marginBottom: '15px' }}>B-BOY MOVES</h3>
            <div className="control-key">
              <div className="key-button">Q</div>
              <div className="move-name">TOP ROCK</div>
            </div>
            <div className="control-key">
              <div className="key-button">W</div>
              <div className="move-name">WINDMILL</div>
            </div>
            <div className="control-key">
              <div className="key-button">E</div>
              <div className="move-name">FREEZE</div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#ffff00', marginBottom: '15px' }}>POWER MOVES</h3>
            <div className="control-key">
              <div className="key-button">A</div>
              <div className="move-name">HEADSTAND</div>
            </div>
            <div className="control-key">
              <div className="key-button">S</div>
              <div className="move-name">BACKSPIN</div>
            </div>
            <div className="control-key">
              <div className="key-button">D</div>
              <div className="move-name">FLARE</div>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#ff69b4', marginBottom: '15px' }}>B-GIRL MOVES</h3>
            <div className="control-key">
              <div className="key-button">U</div>
              <div className="move-name">TOP ROCK</div>
            </div>
            <div className="control-key">
              <div className="key-button">I</div>
              <div className="move-name">WINDMILL</div>
            </div>
            <div className="control-key">
              <div className="key-button">O</div>
              <div className="move-name">FREEZE</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', fontSize: '1.2rem' }}>
          <div style={{ color: '#00ff00' }}>💡 COMBO SYSTEM: Chain moves for higher scores!</div>
          <div style={{ color: '#ffff00', marginTop: '10px' }}>
            ⚡ Each move = 10 + COMBO multiplier points!
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleGame; 