import React, { useState, useEffect, useCallback, useMemo } from 'react';

const BattleGame = ({ isOpen, onClose }) => {
  // CORE GAME STATE
  const [gameState, setGameState] = useState({
    bboy: { x: 0, y: 0, rotation: 0, energy: 100, combo: 0, score: 0, isMoving: false },
    bgirl: { x: 0, y: 0, rotation: 0, energy: 100, combo: 0, score: 0, isMoving: false },
    currentMove: '',
    battlePhase: 'WARM UP',
    crowdEnergy: 50,
    winner: null,
    round: 1,
    maxRounds: 3
  });

  // REALISTIC BREAKING MOVES with proper street names and effects
  const moves = useMemo(() => ({
    // B-BOY MOVES (WASD + QE)
    'w': { 
      name: 'TOP ROCK', 
      emoji: '🕺', 
      type: 'bboy', 
      difficulty: 2, 
      energy: -8, 
      points: 15,
      duration: 800,
      effect: 'bounce',
      description: 'Classic foundation step'
    },
    'a': { 
      name: 'WINDMILL', 
      emoji: '🌪️', 
      type: 'bboy', 
      difficulty: 9, 
      energy: -35, 
      points: 90,
      duration: 2000,
      effect: 'spin',
      description: 'Continuous power move'
    },
    's': { 
      name: 'FREEZE', 
      emoji: '❄️', 
      type: 'bboy', 
      difficulty: 6, 
      energy: -20, 
      points: 60,
      duration: 1500,
      effect: 'freeze',
      description: 'Hold that position!'
    },
    'd': { 
      name: 'FLARE', 
      emoji: '🔥', 
      type: 'bboy', 
      difficulty: 10, 
      energy: -40, 
      points: 100,
      duration: 2500,
      effect: 'circle',
      description: 'Ultimate power move'
    },
    'q': { 
      name: 'HEADSPIN', 
      emoji: '🌀', 
      type: 'bboy', 
      difficulty: 8, 
      energy: -30, 
      points: 80,
      duration: 2000,
      effect: 'headspin',
      description: 'Spinning on the dome'
    },
    'e': { 
      name: '6-STEP', 
      emoji: '👟', 
      type: 'bboy', 
      difficulty: 4, 
      energy: -15, 
      points: 40,
      duration: 1200,
      effect: 'footwork',
      description: 'Classic footwork pattern'
    },

    // B-GIRL MOVES (Arrow Keys + Shift/Space)
    'ArrowUp': { 
      name: 'TOP ROCK', 
      emoji: '💃', 
      type: 'bgirl', 
      difficulty: 2, 
      energy: -8, 
      points: 15,
      duration: 800,
      effect: 'bounce',
      description: 'Stylish foundation'
    },
    'ArrowLeft': { 
      name: 'WINDMILL', 
      emoji: '🌪️', 
      type: 'bgirl', 
      difficulty: 9, 
      energy: -35, 
      points: 90,
      duration: 2000,
      effect: 'spin',
      description: 'Power windmills'
    },
    'ArrowDown': { 
      name: 'HOLLOWBACK', 
      emoji: '🌙', 
      type: 'bgirl', 
      difficulty: 7, 
      energy: -25, 
      points: 70,
      duration: 1800,
      effect: 'freeze',
      description: 'Signature arch freeze'
    },
    'ArrowRight': { 
      name: 'THREAD', 
      emoji: '🧵', 
      type: 'bgirl', 
      difficulty: 8, 
      energy: -28, 
      points: 80,
      duration: 2200,
      effect: 'thread',
      description: 'Leg threading flow'
    },
    ' ': { 
      name: 'CRICKET', 
      emoji: '🦗', 
      type: 'bgirl', 
      difficulty: 10, 
      energy: -40, 
      points: 100,
      duration: 2500,
      effect: 'hop',
      description: 'Hopping freeze mastery'
    },
    'Shift': { 
      name: 'BACKSPIN', 
      emoji: '💫', 
      type: 'bgirl', 
      difficulty: 5, 
      energy: -18, 
      points: 50,
      duration: 1500,
      effect: 'spin',
      description: 'Classic spinning technique'
    }
  }), []);

  // PHYSICS ENGINE - Makes moves look realistic
  const getMovePhysics = useCallback((move, time = 0) => {
    const progress = Math.min(time / move.duration, 1);
    
    switch (move.effect) {
      case 'spin':
        return {
          x: Math.sin(time * 0.01) * 40,
          y: Math.cos(time * 0.01) * 15,
          rotation: time * 0.5,
          scale: 1 + Math.sin(time * 0.02) * 0.2
        };
      
      case 'freeze':
        return {
          x: (Math.random() - 0.5) * 10,
          y: -30 - Math.random() * 20,
          rotation: (Math.random() - 0.5) * 30,
          scale: 1.2
        };
      
      case 'circle':
        const radius = 50;
        return {
          x: Math.cos(time * 0.02) * radius,
          y: Math.sin(time * 0.02) * radius * 0.5,
          rotation: time * 0.8,
          scale: 1.1
        };
      
      case 'headspin':
        return {
          x: Math.sin(time * 0.05) * 20,
          y: Math.cos(time * 0.05) * 10,
          rotation: time * 1.2,
          scale: 0.8
        };
      
      case 'footwork':
        return {
          x: Math.sin(time * 0.03) * 30,
          y: Math.abs(Math.sin(time * 0.06)) * 15,
          rotation: Math.sin(time * 0.04) * 20,
          scale: 1
        };
      
      case 'bounce':
        return {
          x: Math.sin(time * 0.02) * 25,
          y: Math.abs(Math.sin(time * 0.04)) * 20,
          rotation: Math.sin(time * 0.03) * 15,
          scale: 1 + Math.sin(time * 0.08) * 0.1
        };
      
      case 'thread':
        return {
          x: Math.sin(time * 0.025) * 35,
          y: Math.cos(time * 0.015) * 25,
          rotation: time * 0.3,
          scale: 1
        };
      
      case 'hop':
        const hopHeight = Math.abs(Math.sin(time * 0.06)) * 40;
        return {
          x: Math.sin(time * 0.04) * 30,
          y: -hopHeight,
          rotation: Math.sin(time * 0.08) * 45,
          scale: 1 + hopHeight * 0.01
        };
      
      default:
        return { x: 0, y: 0, rotation: 0, scale: 1 };
    }
  }, []);

  // EXECUTE MOVE - The main game logic
  const executeMove = useCallback((key) => {
    const move = moves[key];
    if (!move) return;

    setGameState(prev => {
      const dancer = move.type === 'bboy' ? prev.bboy : prev.bgirl;
      
      // Check if dancer has enough energy
      if (dancer.energy < Math.abs(move.energy)) {
        return {
          ...prev,
          currentMove: `${move.type.toUpperCase()} IS EXHAUSTED! 😮‍💨`,
          battlePhase: 'REST TIME'
        };
      }

      // Calculate scoring with combo multiplier
      const comboMultiplier = 1 + (dancer.combo * 0.1);
      const totalPoints = Math.floor(move.points * comboMultiplier);
      
      // Update crowd energy
      const crowdBoost = move.difficulty * 2;
      const newCrowdEnergy = Math.min(100, prev.crowdEnergy + crowdBoost);
      
      // Determine battle phase based on crowd energy
      let newBattlePhase;
      if (newCrowdEnergy > 85) newBattlePhase = '🔥 CROWD GOING WILD! 🔥';
      else if (newCrowdEnergy > 65) newBattlePhase = '⚡ ENERGY RISING! ⚡';
      else if (newCrowdEnergy > 45) newBattlePhase = '💫 BUILDING MOMENTUM 💫';
      else if (newCrowdEnergy < 25) newBattlePhase = '😴 CROWD GETTING BORED 😴';
      else newBattlePhase = '🎵 FEELING THE BEAT 🎵';

      const newDancer = {
        ...dancer,
        energy: Math.max(0, dancer.energy + move.energy),
        combo: dancer.combo + 1,
        score: dancer.score + totalPoints,
        isMoving: true
      };

      return {
        ...prev,
        [move.type]: newDancer,
        currentMove: `${move.name} (${move.difficulty}/10) - ${move.description} +${totalPoints}pts`,
        battlePhase: newBattlePhase,
        crowdEnergy: newCrowdEnergy
      };
    });

    // Reset dancer position after move duration
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        [move.type]: {
          ...prev[move.type],
          isMoving: false
        }
      }));
    }, move.duration);

    // Clear move display
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentMove: ''
      }));
    }, move.duration + 500);

  }, [moves]);

  // ENERGY RECOVERY SYSTEM
  useEffect(() => {
    if (!isOpen) return;
    
    const energyTimer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        bboy: {
          ...prev.bboy,
          energy: Math.min(100, prev.bboy.energy + 2)
        },
        bgirl: {
          ...prev.bgirl,
          energy: Math.min(100, prev.bgirl.energy + 2)
        }
      }));
    }, 1000);

    return () => clearInterval(energyTimer);
  }, [isOpen]);

  // COMBO RESET SYSTEM
  useEffect(() => {
    const comboTimer = setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        bboy: { ...prev.bboy, combo: Math.max(0, prev.bboy.combo - 1) },
        bgirl: { ...prev.bgirl, combo: Math.max(0, prev.bgirl.combo - 1) },
        crowdEnergy: Math.max(0, prev.crowdEnergy - 3)
      }));
    }, 3000);

    return () => clearTimeout(comboTimer);
  }, [gameState.bboy.combo, gameState.bgirl.combo]);

  // PHYSICS ANIMATION LOOP
  useEffect(() => {
    if (!isOpen) return;

    let animationFrame;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      setGameState(prev => {
        const bboyPhysics = prev.bboy.isMoving ? getMovePhysics(moves['w'], currentTime) : { x: 0, y: 0, rotation: 0, scale: 1 };
        const bgirlPhysics = prev.bgirl.isMoving ? getMovePhysics(moves['ArrowUp'], currentTime) : { x: 0, y: 0, rotation: 0, scale: 1 };

        return {
          ...prev,
          bboy: { ...prev.bboy, ...bboyPhysics },
          bgirl: { ...prev.bgirl, ...bgirlPhysics }
        };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen, gameState.bboy.isMoving, gameState.bgirl.isMoving, getMovePhysics, moves]);

  // KEYBOARD CONTROLS
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (event) => {
      event.preventDefault();
      executeMove(event.key);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, executeMove]);

  // RESET GAME
  const resetGame = useCallback(() => {
    setGameState({
      bboy: { x: 0, y: 0, rotation: 0, energy: 100, combo: 0, score: 0, isMoving: false },
      bgirl: { x: 0, y: 0, rotation: 0, energy: 100, combo: 0, score: 0, isMoving: false },
      currentMove: '',
      battlePhase: 'WARM UP',
      crowdEnergy: 50,
      winner: null,
      round: 1,
      maxRounds: 3
    });
  }, []);

  if (!isOpen) return null;

  // CROWD ENERGY COLOR
  const crowdColor = gameState.crowdEnergy > 80 ? '#ff1493' : 
                    gameState.crowdEnergy > 60 ? '#ffff00' : 
                    gameState.crowdEnergy > 40 ? '#00ff00' : '#666';

  return (
    <div className="battle-game">
      {/* CLOSE BUTTON */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: '#ff0000',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        ✕ EXIT BATTLE
      </button>

      {/* RESET BUTTON */}
      <button 
        onClick={resetGame}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: '#00ff00',
          color: 'black',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        🔄 RESET
      </button>

      {/* TITLE */}
      <h1 style={{ 
        marginBottom: '20px', 
        fontSize: '3rem', 
        color: crowdColor,
        textShadow: `0 0 20px ${crowdColor}`,
        animation: gameState.crowdEnergy > 80 ? 'pulse 1s infinite' : 'none'
      }}>
        🎮 BREAKIN' BATTLE ARENA 🎮
      </h1>

      {/* BATTLE STATUS */}
      <div style={{
        fontSize: '1.5rem',
        color: crowdColor,
        marginBottom: '15px',
        fontWeight: 'bold'
      }}>
        {gameState.battlePhase}
      </div>

      {/* CURRENT MOVE DISPLAY */}
      {gameState.currentMove && (
        <div style={{
          fontSize: '1.2rem',
          color: '#ffff00',
          background: 'rgba(0,0,0,0.8)',
          padding: '15px 30px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '2px solid #ffff00',
          textAlign: 'center',
          maxWidth: '600px'
        }}>
          {gameState.currentMove}
        </div>
      )}

      {/* GAME HUD */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '30px',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '30px',
        padding: '20px',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '15px',
        border: '3px solid #00ff00'
      }}>
        {/* B-BOY STATS */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: '#00bfff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            🕺 B-BOY
          </div>
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>
            Score: {gameState.bboy.score}
          </div>
          <div style={{ color: gameState.bboy.energy < 30 ? '#ff0000' : '#00ff00' }}>
            Energy: {gameState.bboy.energy}%
          </div>
          <div style={{ color: '#ffff00' }}>
            Combo: {gameState.bboy.combo}x
          </div>
        </div>

        {/* CROWD HYPE */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: crowdColor, fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
            🎵 CROWD HYPE 🎵
          </div>
          <div style={{ 
            fontSize: '2rem', 
            color: crowdColor,
            textShadow: `0 0 15px ${crowdColor}`
          }}>
            {gameState.crowdEnergy}%
          </div>
          <div style={{
            width: '200px',
            height: '20px',
            background: '#333',
            borderRadius: '10px',
            overflow: 'hidden',
            margin: '10px auto'
          }}>
            <div style={{
              width: `${gameState.crowdEnergy}%`,
              height: '100%',
              background: `linear-gradient(90deg, #00ff00, ${crowdColor})`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* B-GIRL STATS */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#ff69b4', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
            💃 B-GIRL
          </div>
          <div style={{ color: '#fff', fontSize: '1.2rem' }}>
            Score: {gameState.bgirl.score}
          </div>
          <div style={{ color: gameState.bgirl.energy < 30 ? '#ff0000' : '#00ff00' }}>
            Energy: {gameState.bgirl.energy}%
          </div>
          <div style={{ color: '#ffff00' }}>
            Combo: {gameState.bgirl.combo}x
          </div>
        </div>
      </div>

      {/* BATTLE ARENA */}
      <div className="battle-arena" style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, #001122, #000000)',
        border: `4px solid ${crowdColor}`,
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: `0 0 30px ${crowdColor}`,
        marginBottom: '30px'
      }}>
        {/* DANCE FLOOR */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: `linear-gradient(90deg, #00bfff, ${crowdColor}, #ff69b4)`,
          opacity: 0.8
        }}></div>

        {/* B-BOY CHARACTER */}
        <div style={{
          position: 'absolute',
          left: '100px',
          bottom: '50px',
          fontSize: '6rem',
          transform: `translate(${gameState.bboy.x}px, ${gameState.bboy.y}px) rotate(${gameState.bboy.rotation}deg) scale(${gameState.bboy.scale || 1})`,
          transition: gameState.bboy.isMoving ? 'none' : 'all 0.5s ease',
          color: '#00bfff',
          textShadow: '0 0 20px #00bfff',
          filter: gameState.bboy.energy < 30 ? 'brightness(0.5)' : 'brightness(1)',
          zIndex: 10
        }}>
          🕺
        </div>

        {/* B-GIRL CHARACTER */}
        <div style={{
          position: 'absolute',
          right: '100px',
          bottom: '50px',
          fontSize: '6rem',
          transform: `translate(${gameState.bgirl.x}px, ${gameState.bgirl.y}px) rotate(${gameState.bgirl.rotation}deg) scale(${gameState.bgirl.scale || 1})`,
          transition: gameState.bgirl.isMoving ? 'none' : 'all 0.5s ease',
          color: '#ff69b4',
          textShadow: '0 0 20px #ff69b4',
          filter: gameState.bgirl.energy < 30 ? 'brightness(0.5)' : 'brightness(1)',
          zIndex: 10
        }}>
          💃
        </div>

        {/* CROWD EFFECTS */}
        {gameState.crowdEnergy > 75 && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle, transparent 40%, ${crowdColor}20)`,
            animation: 'pulse 2s ease-in-out infinite',
            pointerEvents: 'none'
          }}></div>
        )}
      </div>

      {/* CONTROLS GUIDE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        maxWidth: '800px',
        background: 'rgba(0,0,0,0.6)',
        padding: '25px',
        borderRadius: '15px',
        border: '2px solid #00ff00'
      }}>
        {/* B-BOY CONTROLS */}
        <div>
          <h3 style={{ color: '#00bfff', marginBottom: '20px', fontSize: '1.5rem' }}>
            🕺 B-BOY CONTROLS
          </h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                background: '#333', 
                color: '#fff', 
                padding: '8px 12px', 
                borderRadius: '5px', 
                minWidth: '40px', 
                textAlign: 'center',
                fontWeight: 'bold'
              }}>W</div>
              <div style={{ color: '#fff' }}>TOP ROCK (2/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>A</div>
              <div style={{ color: '#fff' }}>WINDMILL (9/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>S</div>
              <div style={{ color: '#fff' }}>FREEZE (6/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>D</div>
              <div style={{ color: '#fff' }}>FLARE (10/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>Q</div>
              <div style={{ color: '#fff' }}>HEADSPIN (8/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>E</div>
              <div style={{ color: '#fff' }}>6-STEP (4/10)</div>
            </div>
          </div>
        </div>

        {/* B-GIRL CONTROLS */}
        <div>
          <h3 style={{ color: '#ff69b4', marginBottom: '20px', fontSize: '1.5rem' }}>
            💃 B-GIRL CONTROLS
          </h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>↑</div>
              <div style={{ color: '#fff' }}>TOP ROCK (2/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>←</div>
              <div style={{ color: '#fff' }}>WINDMILL (9/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>↓</div>
              <div style={{ color: '#fff' }}>HOLLOWBACK (7/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>→</div>
              <div style={{ color: '#fff' }}>THREAD (8/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '50px', textAlign: 'center', fontWeight: 'bold' }}>SPACE</div>
              <div style={{ color: '#fff' }}>CRICKET (10/10)</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: '#333', color: '#fff', padding: '8px 12px', borderRadius: '5px', minWidth: '50px', textAlign: 'center', fontWeight: 'bold' }}>SHIFT</div>
              <div style={{ color: '#fff' }}>BACKSPIN (5/10)</div>
            </div>
          </div>
        </div>
      </div>

      {/* GAME TIPS */}
      <div style={{
        marginTop: '25px',
        maxWidth: '600px',
        background: 'rgba(0,255,0,0.1)',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #00ff00',
        textAlign: 'center'
      }}>
        <div style={{ color: '#00ff00', fontSize: '1.2rem', marginBottom: '15px' }}>
          💡 BATTLE TIPS:
        </div>
        <div style={{ color: '#ffff00', lineHeight: '1.8' }}>
          🔥 Chain moves to build combos<br/>
          ⚡ Higher difficulty = more points<br/>
          💨 Manage your energy wisely<br/>
          👥 Hype the crowd for bonuses<br/>
          🎵 Feel the rhythm, feel the flow!
        </div>
      </div>

      {/* CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default BattleGame; 