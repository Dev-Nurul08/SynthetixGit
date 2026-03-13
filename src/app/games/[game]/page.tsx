'use client';

import { Suspense, useState, useEffect, useRef, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FiArrowLeft,
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiAward,
  FiZap,
  FiX,
  FiShield,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

type GameKey = 'snake' | 'breakout' | 'brick-breaker' | 'pacman';

function PlayGameContent({ params }: { params: Promise<{ game: string }> }) {
  const { game } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user') || 'octocat';

  const rawKey = game.toLowerCase();
  const activeGame: GameKey =
    rawKey === 'brick-breaker' || rawKey === 'breakout'
      ? 'breakout'
      : rawKey === 'pacman'
      ? 'pacman'
      : 'snake';

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCtaModal, setShowCtaModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Sync isPaused ref
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (gameOver) {
      setShowCtaModal(true);
    }
  }, [gameOver]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    isPausedRef.current = false;
    setShowCtaModal(false);
    initGameEngine();
  };

  const initGameEngine = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    isPausedRef.current = false;

    if (activeGame === 'snake') {
      runSnake(canvas, ctx);
    } else if (activeGame === 'breakout') {
      runBreakout(canvas, ctx);
    } else if (activeGame === 'pacman') {
      runPacman(canvas, ctx);
    }
  };

  useEffect(() => {
    initGameEngine();
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (cleanupRef.current) cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGame]);

  // ── 1. SNAKE GAME ENGINE ──
  const runSnake = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const cols = 52;
    const rows = 14;
    const cellSize = 14;
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
    const speed = 85;

    function spawnFood() {
      return {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        level: Math.floor(Math.random() * 4) + 1,
      };
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        isPausedRef.current = !isPausedRef.current;
        setIsPaused(isPausedRef.current);
        return;
      }
      if (isPausedRef.current) return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        if (dir.y === 0) nextDir = { x: 0, y: -1 };
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        if (dir.y === 0) nextDir = { x: 0, y: 1 };
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        if (dir.x === 0) nextDir = { x: -1, y: 0 };
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        if (dir.x === 0) nextDir = { x: 1, y: 0 };
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    cleanupRef.current = () => window.removeEventListener('keydown', handleKeyDown);

    function loop(time: number) {
      if (isPausedRef.current) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⏸ PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '11px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Press P or click Resume to continue', canvas.width / 2, canvas.height / 2 + 22);
        animationFrameId.current = requestAnimationFrame(loop);
        return;
      }

      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (delta > speed) {
        lastTime = time;
        dir = nextDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

        // Wrap around walls like contribution calendar
        if (head.x < 0) head.x = cols - 1;
        if (head.x >= cols) head.x = 0;
        if (head.y < 0) head.y = rows - 1;
        if (head.y >= rows) head.y = 0;

        // Self collision check
        if (snake.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return;
        }

        snake.unshift(head);

        // Food eating
        if (head.x === food.x && head.y === food.y) {
          currentScore += food.level * 25;
          setScore(currentScore);
          setHighScore((prev) => Math.max(prev, currentScore));
          food = spawnFood();
        } else {
          snake.pop();
        }

        // Render Canvas
        ctx.fillStyle = '#060911';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid Cells Background
        ctx.fillStyle = '#101623';
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }

        // Draw Food (Green Commit Tile)
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
  };

  // ── 2. BRICK BREAKER ENGINE ──
  const runBreakout = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvas.width = 728;
    canvas.height = 380;

    let paddleWidth = 100;
    let paddleHeight = 12;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height - 40;
    let ballDX = 4;
    let ballDY = -4;
    let ballRadius = 6;
    let currentScore = 0;

    const brickCols = 24;
    const brickRows = 6;
    const brickWidth = 26;
    const brickHeight = 14;
    const brickPadding = 3;
    const brickOffsetTop = 32;
    const brickOffsetLeft = (canvas.width - brickCols * (brickWidth + brickPadding)) / 2;

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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        isPausedRef.current = !isPausedRef.current;
        setIsPaused(isPausedRef.current);
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        paddleX = Math.max(0, paddleX - 25);
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        paddleX = Math.min(canvas.width - paddleWidth, paddleX + 25);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    cleanupRef.current = () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };

    function loop() {
      if (isPausedRef.current) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⏸ PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '11px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Press P or click Resume to continue', canvas.width / 2, canvas.height / 2 + 22);
        animationFrameId.current = requestAnimationFrame(loop);
        return;
      }

      ctx.fillStyle = '#060911';
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

      // Wall Bounce
      if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
      }
      if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
      } else if (ballY + ballDY > canvas.height - ballRadius - paddleHeight) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          ballDY = -ballDY;
        } else if (ballY > canvas.height) {
          setGameOver(true);
          return;
        }
      }

      // Brick Collision
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
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;

      // Draw Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(paddleX, canvas.height - paddleHeight - 6, paddleWidth, paddleHeight);

      animationFrameId.current = requestAnimationFrame(loop);
    }

    animationFrameId.current = requestAnimationFrame(loop);
  };

  // ── 3. PAC-MAN ENGINE ──
  const runPacman = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    canvas.width = 728;
    canvas.height = 360;
    let pacX = 40;
    let pacY = 180;
    let speed = 3;
    let mouthAngle = 0.2;
    let mouthDir = 1;
    let currentScore = 0;

    const dots: { x: number; y: number; active: boolean }[] = [];
    for (let x = 60; x < canvas.width - 40; x += 32) {
      dots.push({ x, y: 170, active: true });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
        isPausedRef.current = !isPausedRef.current;
        setIsPaused(isPausedRef.current);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    cleanupRef.current = () => window.removeEventListener('keydown', handleKeyDown);

    function loop() {
      if (isPausedRef.current) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#22d3ee';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('⏸ PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.font = '11px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Press P or click Resume to continue', canvas.width / 2, canvas.height / 2 + 22);
        animationFrameId.current = requestAnimationFrame(loop);
        return;
      }

      ctx.fillStyle = '#060911';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      pacX += speed;
      if (pacX > canvas.width + 40) pacX = -40;

      mouthAngle += 0.03 * mouthDir;
      if (mouthAngle > 0.4 || mouthAngle < 0.05) mouthDir = -mouthDir;

      // Draw Commit Dots
      dots.forEach((dot) => {
        if (dot.active) {
          if (Math.abs(pacX - dot.x) < 14) {
            dot.active = false;
            currentScore += 100;
            setScore(currentScore);
            setHighScore((prev) => Math.max(prev, currentScore));
          }
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#39d353';
          ctx.shadowColor = '#39d353';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw Pac-Man
      ctx.beginPath();
      ctx.arc(pacX, pacY, 20, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI);
      ctx.lineTo(pacX, pacY);
      ctx.fillStyle = '#ffd700';
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId.current = requestAnimationFrame(loop);
    }

    animationFrameId.current = requestAnimationFrame(loop);
  };

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-4xl space-y-4 flex flex-col items-center">
        {/* Top HUD Header */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 flex items-center justify-between shadow-2xl backdrop-blur-xl">
        <button
          type="button"
          onClick={() => router.push(`/games?user=${user}`)}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <FiArrowLeft size={16} />
          <span>Arcade Catalog</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            Score: <strong className="text-emerald-400">{score}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            High: <strong className="text-amber-400">{highScore}</strong>
          </div>

          {!gameOver && (
            <button
              type="button"
              onClick={togglePause}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isPaused
                  ? 'bg-emerald-400 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {isPaused ? <FiPlay size={12} /> : <FiPause size={12} />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Restart Game"
          >
            <FiRotateCcw size={14} />
          </button>
        </div>
      </div>

        {/* Main Game Container */}
        <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center w-full backdrop-blur-xl">
          <div className="w-full flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>🕹️ Playing {activeGame.toUpperCase()} — @{user}</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Press P or ESC to pause
          </span>
        </div>

          {/* Canvas wrapper */}
          <div className="w-full max-w-[728px] bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden shadow-inner">
            <canvas ref={canvasRef} className="max-w-full h-auto cursor-crosshair rounded-xl" />

          {/* Canvas Overlay Controls Legend */}
          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-500 pointer-events-none">
            Controls: Arrow Keys / WASD / Mouse Drag
          </div>
        </div>

        {/* On-Screen Mobile D-Pad Controls */}
        <div className="flex flex-col items-center gap-1.5 md:hidden mt-4">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))}
            className="w-12 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-sm"
          >
            ▲
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))}
              className="w-12 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-sm"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))}
              className="w-12 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-sm"
            >
              ▼
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
              className="w-12 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center active:scale-95 transition-all text-sm"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-slate-500 pt-1">
          SynthetixGit Commit Arcade • Generated dynamically for GitHub Profile READMEs
        </div>
      </div>

      {/* Post-Game CTA Modal Dialog */}
      {showCtaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-[90vw] sm:w-[480px] min-w-[300px] max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 shrink-0 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-bold text-white">Game Completed!</h3>
              <p className="text-xs text-slate-400">
                You scored <strong className="text-emerald-400">{score}</strong> points on @{user}&apos;s profile arcade!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                GitHub Profile Forge
              </span>
              <p className="text-xs text-slate-300 font-medium">
                Want a custom interactive README with playable arcade games &amp; contribution pixel art for your own GitHub profile?
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={() => router.push(`/builder?user=${user}`)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <FiZap size={14} />
                <span>Create My README</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlayGamePage({ params }: { params: Promise<{ game: string }> }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Game...</div>}>
      <PlayGameContent params={params} />
    </Suspense>
  );
}
