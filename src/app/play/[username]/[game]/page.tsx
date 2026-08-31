'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiPlay, FiPause, FiRotateCcw, FiVolume2, FiVolumeX, FiStar } from 'react-icons/fi';

type GameType = 'snake' | 'brick-breaker' | 'breakout' | 'pacman';

export default function PlayGamePage() {
  const params = useParams();
  const router = useRouter();
  const username = (params?.username as string) || 'Dev-Nurul08';
  const rawGame = (params?.game as string) || 'snake';
  const gameType: GameType = rawGame === 'breakout' ? 'brick-breaker' : (rawGame as GameType);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeGame, setActiveGame] = useState<GameType>(gameType);

  // Game Loop State Refs
  const gameStateRef = useRef<any>({});
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset score
    setScore(0);
    setGameOver(false);
    setIsPaused(false);

    // Initialize Game Engine based on activeGame
    if (activeGame === 'snake') {
      initSnakeGame(canvas, ctx);
    } else if (activeGame === 'brick-breaker') {
      initBrickBreakerGame(canvas, ctx);
    } else if (activeGame === 'pacman') {
      initPacmanGame(canvas, ctx);
    }

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [activeGame]);

  // ── 1. SNAKE ENGINE ──
  function initSnakeGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const cols = 52;
    const rows = 14;
    const cellSize = 16;
    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    let snake = [
      { x: 10, y: 7 },
      { x: 9, y: 7 },
      { x: 8, y: 7 },
    ];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let food = spawnFood();
    let currentScore = 0;
    let lastTime = 0;
    const speed = 90; // ms per tick

    function spawnFood() {
      return {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        level: Math.floor(Math.random() * 4) + 1,
      };
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') { if (dir.y === 0) nextDir = { x: 0, y: -1 }; }
      if (e.key === 'ArrowDown' || e.key === 's') { if (dir.y === 0) nextDir = { x: 0, y: 1 }; }
      if (e.key === 'ArrowLeft' || e.key === 'a') { if (dir.x === 0) nextDir = { x: -1, y: 0 }; }
      if (e.key === 'ArrowRight' || e.key === 'd') { if (dir.x === 0) nextDir = { x: 1, y: 0 }; }
    };
    window.addEventListener('keydown', handleKeyDown);

    function loop(time: number) {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (delta > speed) {
        lastTime = time;
        dir = nextDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        // Wall collision wrap
        if (head.x < 0) head.x = cols - 1;
        if (head.x >= cols) head.x = 0;
        if (head.y < 0) head.y = rows - 1;
        if (head.y >= rows) head.y = 0;

        // Self collision
        if (snake.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return;
        }

        snake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          currentScore += food.level * 25;
          setScore(currentScore);
          setHighScore((prev) => Math.max(prev, currentScore));
          food = spawnFood();
        } else {
          snake.pop();
        }

        // Draw Canvas
        ctx.fillStyle = '#0a0d16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Commit Grid Backdrop
        ctx.fillStyle = '#141c2c';
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }

        // Draw Food (Green contribution tile)
        const greenLevels = ['#0e4429', '#006d32', '#26a641', '#39d353'];
        ctx.fillStyle = greenLevels[food.level - 1] || '#39d353';
        ctx.shadowColor = '#39d353';
        ctx.shadowBlur = 8;
        ctx.fillRect(food.x * cellSize + 1, food.y * cellSize + 1, cellSize - 2, cellSize - 2);
        ctx.shadowBlur = 0;

        // Draw Snake
        snake.forEach((s, idx) => {
          ctx.fillStyle = idx === 0 ? '#38bdf8' : '#818cf8';
          ctx.fillRect(s.x * cellSize + 1, s.y * cellSize + 1, cellSize - 2, cellSize - 2);
        });
      }

      animationFrameId.current = requestAnimationFrame(loop);
    }

    animationFrameId.current = requestAnimationFrame(loop);
    gameStateRef.current = { cleanup: () => window.removeEventListener('keydown', handleKeyDown) };
  }

  // ── 2. BRICK BREAKER ENGINE ──
  function initBrickBreakerGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.width = 832;
    canvas.height = 420;

    let paddleWidth = 110;
    let paddleHeight = 12;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 40;
    let ballDX = 4;
    let ballDY = -4;
    let ballRadius = 6;
    let currentScore = 0;

    const brickCols = 26;
    const brickRows = 6;
    const brickWidth = 28;
    const brickHeight = 14;
    const brickPadding = 3;
    const brickOffsetTop = 40;
    const brickOffsetLeft = 14;

    const greenColors = ['#0e4429', '#006d32', '#26a641', '#39d353'];
    const bricks: { x: number; y: number; status: number; color: string }[][] = [];

    for (let c = 0; c < brickCols; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRows; r++) {
        const level = (r % 4) + 1;
        bricks[c][r] = { x: 0, y: 0, status: 1, color: greenColors[level - 1] };
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    function loop() {
      ctx.fillStyle = '#080b13';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Bricks
      for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.fillStyle = bricks[c][r].color;
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          }
        }
      }

      // Ball Movement
      ballX += ballDX;
      ballY += ballDY;

      // Ball Wall Collisions
      if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) ballDX = -ballDX;
      if (ballY + ballDY < ballRadius) ballDY = -ballDY;
      else if (ballY + ballDY > canvas.height - ballRadius - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          ballDY = -ballDY;
        } else if (ballY > canvas.height) {
          setGameOver(true);
          return;
        }
      }

      // Ball Brick Collision
      for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
              ballDY = -ballDY;
              b.status = 0;
              currentScore += 50;
              setScore(currentScore);
              setHighScore((prev) => Math.max(prev, currentScore));
            }
          }
        }
      }

      // Draw Ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;

      // Draw Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(paddleX, canvas.height - paddleHeight - 6, paddleWidth, paddleHeight);

      animationFrameId.current = requestAnimationFrame(loop);
    }

    animationFrameId.current = requestAnimationFrame(loop);
  }

  // ── 3. PAC-MAN ENGINE ──
  function initPacmanGame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.width = 832;
    canvas.height = 360;
    let pacX = 40;
    let pacY = 180;
    let speed = 3;
    let mouthAngle = 0.2;
    let mouthDir = 1;
    let currentScore = 0;

    const dots: { x: number; y: number; active: boolean }[] = [];
    for (let x = 60; x < canvas.width - 40; x += 35) {
      dots.push({ x, y: 180, active: true });
    }

    function loop() {
      ctx.fillStyle = '#080b13';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pacX += speed;
      if (pacX > canvas.width + 40) pacX = -40;

      mouthAngle += 0.03 * mouthDir;
      if (mouthAngle > 0.4 || mouthAngle < 0.05) mouthDir = -mouthDir;

      // Draw Dots
      dots.forEach((dot) => {
        if (dot.active) {
          if (Math.abs(pacX - dot.x) < 15) {
            dot.active = false;
            currentScore += 100;
            setScore(currentScore);
            setHighScore((prev) => Math.max(prev, currentScore));
          }
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#39d353';
          ctx.shadowColor = '#39d353';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw Pac-Man
      ctx.beginPath();
      ctx.arc(pacX, pacY, 22, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI);
      ctx.lineTo(pacX, pacY);
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId.current = requestAnimationFrame(loop);
    }

    animationFrameId.current = requestAnimationFrame(loop);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 font-sans">
      {/* ── Top Header ── */}
      <header className="w-full max-w-5xl flex items-center justify-between py-3 border-b border-slate-800">
        <button
          type="button"
          onClick={() => router.push(`/studio?user=${username}`)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all cursor-pointer"
        >
          <FiArrowLeft size={14} />
          <span>Back to Studio</span>
        </button>

        <div className="flex items-center gap-2">
          {(['snake', 'brick-breaker', 'pacman'] as GameType[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setActiveGame(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                activeGame === g
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {g.replace('-', ' ')}
            </button>
          ))}
        </div>
      </header>

      {/* ── Arcade Frame ── */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 max-w-5xl w-full">
        <div className="p-5 rounded-3xl bg-slate-900/90 border-2 border-slate-800 shadow-2xl space-y-4 w-full text-center">
          {/* Score & HUD */}
          <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-300">
                PLAYER: <span className="text-blue-400">@{username}</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-xs font-mono font-bold">
                <span className="text-slate-400 mr-1.5">SCORE:</span>
                <span className="text-emerald-400 text-sm">{score}</span>
              </div>
              <div className="text-xs font-mono font-bold">
                <span className="text-slate-400 mr-1.5">HIGH:</span>
                <span className="text-amber-400 text-sm">{highScore}</span>
              </div>
            </div>
          </div>

          {/* Game Canvas Container */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#080b13] flex items-center justify-center shadow-inner min-h-[320px]">
            <canvas ref={canvasRef} className="max-w-full h-auto cursor-crosshair" />

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                <h2 className="text-2xl font-black text-red-500 tracking-wider">GAME OVER</h2>
                <p className="text-xs text-slate-300 font-mono">Final Score: {score}</p>
                <button
                  type="button"
                  onClick={() => {
                    setGameOver(false);
                    setActiveGame((prev) => prev);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <FiRotateCcw size={14} />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>🕹️ Controls: Arrow Keys / WASD / Mouse Drag</span>
            <span className="text-emerald-400 font-mono">Live Commit Levels Enabled</span>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full text-center text-xs text-slate-500 py-3 border-t border-slate-800">
        SynthetixGit Interactive Arcade Suite • Powered by HTML5 Canvas & GitHub Commits
      </footer>
      {/* On-screen Mobile D-Pad Controls */}
      <div className="flex flex-col items-center gap-1.5 md:hidden mt-4 pb-6">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))}
          className="w-14 h-12 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
        >
          ▲
        </button>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))}
            className="w-14 h-12 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))}
            className="w-14 h-12 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
          >
            ▼
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
            className="w-14 h-12 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
