import React, { useState, useEffect, useCallback, useMemo } from 'react';

const BattleGame = ({ isOpen, onClose }) => {
  const [bBoyPos, setBBoyPos] = useState({ x: 0, y: 0, rotation: 0, move: '🕺', energy: 100 });
  const [bGirlPos, setBGirlPos] = useState({ x: 0, y: 0, rotation: 0, move: '💃', energy: 100 });
  const [score, setScore] = useState({ bboy: 0, bgirl: 0 });
  const [currentMove, setCurrentMove] = useState('');
  const [combo, setCombo] = useState(0);
  const [crowdHype, setCrowdHype] = useState(50);
  const [battlePhase, setBattlePhase] = useState('GETTING READY...');
  const [moveHistory, setMoveHistory] = useState([]);
  const [isSpinning, setIsSpinning] = useState({ bboy: false, bgirl: false });

  // REALISTIC BREAKING MOVES with actual street names and difficulty
  const moves = useMemo(() => ({
    // B-Boy Foundation moves
    'q': { name: 'TOP ROCK', emoji: '🕺', type: 'bboy', difficulty: 1, energy: -5, hype: 5, description: 'Basic uprock step' },
    'w': { name: 'WINDMILL', emoji: '🌪️', type: 'bboy', difficulty: 8, energy: -25, hype: 30, description: 'Continuous back spins' },
    'e': { name: 'FREEZE', emoji: '🧊', type: 'bboy', difficulty: 5, energy: -15, hype: 20, description: 'Power freeze hold' },
    'a': { name: '6-STEP', emoji: '👟', type: 'bboy', difficulty: 3, energy: -10, hype: 10, description: 'Classic footwork' },
    's': { name: 'HEADSPIN', emoji: '🌀', type: 'bboy', difficulty: 9, energy: -30, hype: 40, description: 'Spinning on head' },
    'd': { name: 'FLARE', emoji: '🔥', type: 'bboy', difficulty: 10, energy: -35, hype: 50, description: 'Continuous leg circles' },
    'r': { name: 'BABY FREEZE', emoji: '❄️', type: 'bboy', difficulty: 2, energy: -8, hype: 8, description: 'Basic freeze' },
    't': { name: 'AIR TRACK', emoji: '✈️', type: 'bboy', difficulty: 7, energy: -20, hype: 25, description: 'Airborne footwork' },
    
    // B-Girl Foundation moves  
    'u': { name: 'TOP ROCK', emoji: '💃', type: 'bgirl', difficulty: 1, energy: -5, hype: 5, description: 'Stylish uprock' },
    'i': { name: 'WINDMILL', emoji: '🌪️', type: 'bgirl', difficulty: 8, energy: -25, hype: 30, description: 'Power windmills' },
    'o': { name: 'FREEZE', emoji: '🧊', type: 'bgirl', difficulty: 5, energy: -15, hype: 20, description: 'Signature freeze' },
    'j': { name: 'THREAD', emoji: '🧵', type: 'bgirl', difficulty: 6, energy: -18, hype: 22, description: 'Leg threading move' },
    'k': { name: 'BACKSPIN', emoji: '🌀', type: 'bgirl', difficulty: 4, energy: -12, hype: 15, description: 'Continuous spins' },
    'l': { name: 'FLARE', emoji: '🔥', type: 'bgirl', difficulty: 10, energy: -35, hype: 50, description: 'Perfect leg circles' },
    'n': { name: 'HOLLOWBACK', emoji: '🌙', type: 'bgirl', difficulty: 7, energy: -22, hype: 28, description: 'Arched back freeze' },
    'm': { name: 'CRICKET', emoji: '🦗', type: 'bgirl', difficulty: 9, energy: -30, hype: 45, description: 'Hopping freeze' },
  }), []);

  // REALISTIC PHYSICS ENGINE
  const executeMove = useCallback((key) => {
    const move = moves[key.toLowerCase()];
    if (!move) return;

    const currentDancer = move.type === 'bboy' ? bBoyPos : bGirlPos;
    const setDancer = move.type === 'bboy' ? setBBoyPos : setBGirlPos;

    // Check energy - realistic stamina system
    if (currentDancer.energy < Math.abs(move.energy)) {
      setCurrentMove(`${move.type.toUpperCase()} IS EXHAUSTED! 😮‍💨`);
      setTimeout(() => setCurrentMove(''), 1500);
      return;
    }

    // REALISTIC MOVE PHYSICS
    let newX = 0, newY = 0, newRotation = currentDancer.rotation;
    
    switch(move.name) {
      case 'WINDMILL':
      case 'HEADSPIN':
      case 'BACKSPIN':
        // Spinning moves - continuous rotation
        setIsSpinning(prev => ({ ...prev, [move.type]: true }));
        newRotation += 360 * (move.difficulty / 5);
        newX = Math.sin(Date.now() / 100) * 30;
        newY = Math.cos(Date.now() / 100) * 15;
        setTimeout(() => setIsSpinning(prev => ({ ...prev, [move.type]: false })), 2000);
        break;
        
      case 'FLARE':
        // Power move - wide circular motion
        newX = Math.sin(Date.now() / 50) * 60;
        newY = Math.cos(Date.now() / 50) * 30;
        newRotation += 720;
        break;
        
      case 'FREEZE':
      case 'BABY FREEZE':
      case 'HOLLOWBACK':
        // Freeze moves - static hold
        newX = (Math.random() - 0.5) * 20;
        newY = -20; // Lifted off ground
        break;
        
      case 'TOP ROCK':
      case '6-STEP':
        // Footwork - ground movement
        newX = (Math.random() - 0.5) * 40;
        newY = Math.random() * 10;
        break;
        
      default:
        // Dynamic moves
        newX = (Math.random() - 0.5) * 50;
        newY = (Math.random() - 0.5) * 30;
        newRotation += Math.random() * 180;
    }

    // Update dancer state with physics
    setDancer(prev => ({
      ...prev,
      x: newX,
      y: newY,
      rotation: newRotation,
      move: move.emoji,
      energy: Math.max(0, prev.energy + move.energy)
    }));

    // SCORING SYSTEM - difficulty based
    const baseScore = move.difficulty * 5;
    const comboBonus = combo * 2;
    const energyBonus = currentDancer.energy > 50 ? 5 : 0;
    const totalScore = baseScore + comboBonus + energyBonus;

    setScore(prev => ({ 
      ...prev, 
      [move.type]: prev[move.type] + totalScore 
    }));

    // CROWD HYPE SYSTEM
    setCrowdHype(prev => {
      const newHype = Math.min(100, prev + move.hype);
      if (newHype > 80) setBattlePhase('CROWD GOING WILD! 🔥');
      else if (newHype > 60) setBattlePhase('BATTLE HEATING UP! 🌡️');
      else if (newHype < 30) setBattlePhase('CROWD GETTING BORED... 😴');
      else setBattlePhase('BUILDING MOMENTUM... ⚡');
      return newHype;
    });

    // COMBO SYSTEM
    setCombo(prev => prev + 1);
    setCurrentMove(`${move.name} (${move.difficulty}/10) - ${move.description}`);

    // MOVE HISTORY for authentic battle tracking
    setMoveHistory(prev => [
      ...prev.slice(-4), // Keep last 5 moves
      { name: move.name, dancer: move.type, difficulty: move.difficulty, timestamp: Date.now() }
    ]);

    // REALISTIC RECOVERY TIME based on move difficulty
    const recoveryTime = move.difficulty * 100 + 500;
    
    setTimeout(() => {
      setDancer(prev => ({ 
        ...prev, 
        x: 0, 
        y: 0, 
        move: move.type === 'bboy' ? '🕺' : '💃',
        energy: Math.min(100, prev.energy + 5) // Slow energy recovery
      }));
    }, recoveryTime);

    // Clear move display
    setTimeout(() => setCurrentMove(''), 2000);
  }, [moves, combo, bBoyPos, bGirlPos]);

  // ENERGY RECOVERY SYSTEM
  useEffect(() => {
    if (!isOpen) return;
    
    const energyTimer = setInterval(() => {
      setBBoyPos(prev => ({ ...prev, energy: Math.min(100, prev.energy + 1) }));
      setBGirlPos(prev => ({ ...prev, energy: Math.min(100, prev.energy + 1) }));
    }, 500);

    return () => clearInterval(energyTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (event) => {
      executeMove(event.key);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, executeMove]);

  // COMBO RESET with crowd effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (combo > 0) {
        setCrowdHype(prev => Math.max(0, prev - 10));
        setCombo(0);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [combo]);

  if (!isOpen) return null;

  // CROWD HYPE COLOR
  const crowdColor = crowdHype > 80 ? '#ff0000' : crowdHype > 60 ? '#ffff00' : crowdHype > 40 ? '#00ff00' : '#666';

  return (
    <div className="battle-game">
      <button className="close-battle" onClick={onClose}>
        ✕ PEACE OUT
      </button>
      
      {/* REALISTIC BATTLE HUD */}
      <div className="battle-hud" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '20px',
        marginBottom: '20px',
        padding: '15px',
        background: 'rgba(0,0,0,0.8)',
        borderRadius: '10px',
        border: '2px solid #00ff00'
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: '#00bfff', fontSize: '1.2rem', fontWeight: 'bold' }}>
            B-BOY: {score.bboy} pts
          </div>
          <div style={{ color: bBoyPos.energy < 30 ? '#ff0000' : '#00ff00' }}>
            Energy: {bBoyPos.energy}%
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: crowdColor, fontSize: '1.5rem', fontWeight: 'bold' }}>
            CROWD HYPE: {crowdHype}%
          </div>
          <div style={{ color: '#ffff00' }}>
            COMBO: {combo}x
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#ff69b4', fontSize: '1.2rem', fontWeight: 'bold' }}>
            B-GIRL: {score.bgirl} pts
          </div>
          <div style={{ color: bGirlPos.energy < 30 ? '#ff0000' : '#00ff00' }}>
            Energy: {bGirlPos.energy}%
          </div>
        </div>
      </div>

      <h1 style={{ marginBottom: '10px', fontSize: '2.5rem', color: '#00ff00' }}>
        🎮 AUTHENTIC BREAKIN' BATTLE 🎮
      </h1>
      
      <div style={{ color: crowdColor, fontSize: '1.3rem', marginBottom: '20px' }}>
        {battlePhase}
      </div>

      {currentMove && (
        <div style={{ 
          fontSize: '1.2rem', 
          color: '#ffff00', 
          textShadow: '0 0 10px #ffff00',
          marginBottom: '20px',
          fontWeight: 'bold',
          background: 'rgba(0,0,0,0.7)',
          padding: '10px',
          borderRadius: '5px'
        }}>
          {currentMove}
        </div>
      )}

      {/* REALISTIC BATTLE ARENA */}
      <div className="battle-arena" style={{ position: 'relative', height: '300px', margin: '20px 0' }}>
        {/* B-Boy with realistic physics */}
        <div 
          className="bboy-left"
          style={{
            position: 'absolute',
            left: '20%',
            top: '50%',
            transform: `translate(${bBoyPos.x}px, ${bBoyPos.y}px) rotate(${bBoyPos.rotation}deg)`,
            fontSize: bBoyPos.move !== '🕺' ? '5rem' : '4rem',
            transition: isSpinning.bboy ? 'none' : 'all 0.3s ease',
            filter: bBoyPos.energy < 30 ? 'brightness(0.5)' : 'brightness(1)',
            animation: isSpinning.bboy ? 'spin 0.2s linear infinite' : 'none'
          }}
        >
          {bBoyPos.move}
        </div>
        
        {/* B-Girl with realistic physics */}
        <div 
          className="bgirl-right"
          style={{
            position: 'absolute',
            right: '20%',
            top: '50%',
            transform: `translate(${bGirlPos.x}px, ${bGirlPos.y}px) rotate(${bGirlPos.rotation}deg)`,
            fontSize: bGirlPos.move !== '💃' ? '5rem' : '4rem',
            transition: isSpinning.bgirl ? 'none' : 'all 0.3s ease',
            filter: bGirlPos.energy < 30 ? 'brightness(0.5)' : 'brightness(1)',
            animation: isSpinning.bgirl ? 'spin 0.2s linear infinite' : 'none'
          }}
        >
          {bGirlPos.move}
        </div>

        {/* Battle floor with style */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '10%',
          right: '10%',
          height: '8px',
          background: `linear-gradient(90deg, #00bfff, ${crowdColor}, #ff69b4)`,
          boxShadow: `0 0 20px ${crowdColor}`,
          borderRadius: '4px'
        }}></div>
        
        {/* Crowd effect */}
        {crowdHype > 70 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle, transparent 60%, ${crowdColor}30)`,
            animation: 'pulse 1s ease-in-out infinite',
            pointerEvents: 'none'
          }}></div>
        )}
      </div>

      {/* MOVE HISTORY */}
      {moveHistory.length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '10px', 
          background: 'rgba(0,0,0,0.5)', 
          borderRadius: '5px' 
        }}>
          <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>LAST MOVES:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {moveHistory.map((move, index) => (
              <span key={index} style={{ 
                color: move.dancer === 'bboy' ? '#00bfff' : '#ff69b4',
                background: 'rgba(255,255,255,0.1)',
                padding: '5px 10px',
                borderRadius: '3px',
                fontSize: '0.9rem'
              }}>
                {move.name} ({move.difficulty}/10)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ENHANCED CONTROLS */}
      <div className="battle-controls">
        <h2 style={{ color: '#00ff00' }}>🎯 AUTHENTIC BREAKING MOVES 🎯</h2>
        
        <div className="control-instructions" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          <div>
            <h3 style={{ color: '#00bfff', marginBottom: '15px' }}>B-BOY FOUNDATION</h3>
            {Object.entries(moves).filter(([_, move]) => move.type === 'bboy').slice(0, 4).map(([key, move]) => (
              <div key={key} className="control-key" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <div className="key-button" style={{ 
                  minWidth: '30px', 
                  height: '30px', 
                  background: '#333', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  borderRadius: '5px'
                }}>{key.toUpperCase()}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>{move.name}</div>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Difficulty: {move.difficulty}/10</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ color: '#ffff00', marginBottom: '15px' }}>B-BOY POWER</h3>
            {Object.entries(moves).filter(([_, move]) => move.type === 'bboy').slice(4).map(([key, move]) => (
              <div key={key} className="control-key" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <div className="key-button" style={{ 
                  minWidth: '30px', 
                  height: '30px', 
                  background: '#333', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  borderRadius: '5px'
                }}>{key.toUpperCase()}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>{move.name}</div>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Difficulty: {move.difficulty}/10</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ color: '#ff69b4', marginBottom: '15px' }}>B-GIRL FOUNDATION</h3>
            {Object.entries(moves).filter(([_, move]) => move.type === 'bgirl').slice(0, 4).map(([key, move]) => (
              <div key={key} className="control-key" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <div className="key-button" style={{ 
                  minWidth: '30px', 
                  height: '30px', 
                  background: '#333', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  borderRadius: '5px'
                }}>{key.toUpperCase()}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>{move.name}</div>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Difficulty: {move.difficulty}/10</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ color: '#ff1493', marginBottom: '15px' }}>B-GIRL POWER</h3>
            {Object.entries(moves).filter(([_, move]) => move.type === 'bgirl').slice(4).map(([key, move]) => (
              <div key={key} className="control-key" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <div className="key-button" style={{ 
                  minWidth: '30px', 
                  height: '30px', 
                  background: '#333', 
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                  borderRadius: '5px'
                }}>{key.toUpperCase()}</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>{move.name}</div>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Difficulty: {move.difficulty}/10</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'rgba(0,255,0,0.1)', 
          borderRadius: '10px',
          border: '1px solid #00ff00'
        }}>
          <div style={{ color: '#00ff00', fontSize: '1.3rem', marginBottom: '10px' }}>
            💡 REALISTIC BATTLE MECHANICS:
          </div>
          <div style={{ color: '#ffff00', lineHeight: '1.6' }}>
            ⚡ <strong>Energy System:</strong> Power moves drain energy, manage stamina!<br/>
            🔥 <strong>Difficulty Scoring:</strong> Harder moves = more points<br/>
            👥 <strong>Crowd Hype:</strong> Sick moves get the crowd hyped<br/>
            🔄 <strong>Physics:</strong> Realistic spinning, freezing, and movement<br/>
            📈 <strong>Combo Multiplier:</strong> Chain moves for massive scores<br/>
            📊 <strong>Move History:</strong> Track your battle progression
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default BattleGame; 