'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { FiArrowLeft, FiPlay, FiPause, FiRotateCcw, FiVolume2, FiVolumeX, FiStar, FiX } from 'react-icons/fi';

type GameType = 'snake' | 'brick-breaker' | 'breakout' | 'pacman';

const CTA_DISMISSED_KEY = 'synthetixgit-game-cta-dismissed';
const LAST_USER_KEY = 'synthetixgit:last-username';
const VISITOR_BANNER_KEY = 'synthetixgit-visitor-banner-dismissed';

export default function PlayGamePage() {
  const params = useParams();
  const router = useRouter();
  const username = (params?.username as string) || 'octocat';
  const rawGame = (params?.game as string) || 'snake';
  const gameType: GameType = rawGame === 'breakout' ? 'brick-breaker' : (rawGame as GameType);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeGame, setActiveGame] = useState<GameType>(gameType);
  const [showCtaModal, setShowCtaModal] = useState<boolean>(false);
  const [showVisitorBanner, setShowVisitorBanner] = useState<boolean>(false);

  // Game Loop State Refs
  const gameStateRef = useRef<any>({});
  const animationFrameId = useRef<number | null>(null);
  const gameOverCtaShownRef = useRef<boolean>(false);
  const toastCtaShownRef = useRef<boolean>(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function getLocalStorageLastUser(): string {
    if (typeof window === 'undefined') return '';
    try {
      return window.localStorage.getItem(LAST_USER_KEY) || '';
    } catch {
      return '';
    }
  }

  function isCtaDismissed(): boolean {
    if (typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(CTA_DISMISSED_KEY) === '1';
    } catch {
      return false;
    }
  }

  function markCtaDismissed() {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CTA_DISMISSED_KEY, '1');
      }
    } catch {
      /* ignore */
    }
  }

  function handleCtaPrimary() {
    const lastUser = getLocalStorageLastUser();
    if (lastUser) {
      router.push(`/studio?user=${lastUser}`);
    } else {
      router.push('/');
    }
  }

  function dismissCtaModal() {
    setShowCtaModal(false);
    markCtaDismissed();
  }

  function showToastCta() {
    if (isCtaDismissed()) return;
    if (toastCtaShownRef.current) return;
    toastCtaShownRef.current = true;

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-300 max-w-sm w-full bg-bg-primary border border-border-primary rounded-2xl shadow-2xl p-4 relative`}
        >
          <button
            type="button"
            onClick={() => {
              markCtaDismissed();
              toast.dismiss(t.id);
            }}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-bg-secondary text-text-muted hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <FiX size={14} />
          </button>
          <div className="pr-6">
            <div className="flex items-start gap-2.5 mb-1.5">
              <span className="text-lg leading-none">🎮</span>
              <h4 className="text-sm font-bold text-text-primary leading-snug">
                Love this game? 🚀 Generate YOUR GitHub README with playable arcade games
              </h4>
            </div>
            <p className="text-xs text-text-muted mb-3 pl-7">
              Create a profile README just like @{username}&apos;s in under 2 minutes.
            </p>
            <div className="flex items-center gap-2 pl-7">
              <button
                type="button"
                onClick={() => {
                  toast.dismiss(t.id);
                  handleCtaPrimary();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>✨</span>
                <span>Generate My README</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  markCtaDismissed();
                  toast.dismiss(t.id);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-transparent hover:bg-bg-secondary text-text-muted hover:text-text-secondary font-bold text-xs cursor-pointer transition-colors border border-border-primary"
              >
                Dismiss
              </button>
            </div>
            <p className="text-[10px] text-text-muted mt-3 pl-7">
              Trusted by 1,200+ developers to stand out on GitHub.
            </p>
          </div>
        </div>
      ),
      {
        position: 'bottom-right',
        duration: Infinity,
        id: 'synthetixgit-game-welcome-cta',
      }
    );
  }

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(LAST_USER_KEY, username);
      }
    } catch {
      /* ignore */
    }
  }, [username]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const lastUser = window.localStorage.getItem(LAST_USER_KEY) || '';
      const bannerDismissed = window.localStorage.getItem(VISITOR_BANNER_KEY) === '1';
      if (!bannerDismissed && username !== lastUser && lastUser !== '') {
        setShowVisitorBanner(true);
      }
    } catch {
      /* ignore */
    }
  }, [username]);

  function dismissVisitorBanner() {
    setShowVisitorBanner(false);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(VISITOR_BANNER_KEY, '1');
      }
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isCtaDismissed()) return;

    toastTimerRef.current = setTimeout(() => {
      showToastCta();
    }, 25000);

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!gameOver) return;
    if (gameOverCtaShownRef.current) return;
    if (isCtaDismissed()) return;

    gameOverCtaShownRef.current = true;
    setShowCtaModal(true);
  }, [gameOver]);

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
    <div className="min-h-screen bg-bg-canvas text-text-primary flex flex-col items-center justify-between p-4 sm:p-6 font-sans">
      <Toaster />
      {/* ── Top Header ── */}
      <header className="w-full max-w-5xl flex items-center justify-between py-3 border-b border-border-primary">
        <button
          type="button"
          onClick={() => router.push(`/studio?user=${username}`)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-bg-primary hover:bg-bg-secondary text-text-tertiary hover:text-white border border-border-primary text-xs font-bold transition-all cursor-pointer"
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
                  ? 'bg-brand-500 text-white shadow-card'
                  : 'bg-bg-primary text-text-muted hover:text-text-secondary border border-border-primary'
              }`}
            >
              {g.replace('-', ' ')}
            </button>
          ))}
        </div>
      </header>

      {/* ── Visitor Banner CTA ── */}
      {showVisitorBanner && (
        <div className="bg-accent-violet-soft border border-accent-violet-border rounded-2xl px-4 py-3 max-w-5xl w-full mx-auto mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0">👋</span>
            <p className="text-sm leading-snug min-w-0">
              <strong className="font-bold">Playing @{username}&apos;s arcade — want YOUR own README with playable games?</strong>{' '}
              <span className="text-text-tertiary text-xs">Generate one in 2 minutes on SynthetixGit Studio.</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                const lastUser = getLocalStorageLastUser();
                router.push(`/studio?user=${lastUser || username}&mode=profile`);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>✨</span>
              <span>Start Studio</span>
            </button>
            <button
              type="button"
              onClick={dismissVisitorBanner}
              className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── CTA Modal (Game Over / Triggered) ── */}
      {showCtaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-bg-primary border border-border-secondary rounded-3xl shadow-2xl p-6">
            <button
              type="button"
              onClick={dismissCtaModal}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-bg-tertiary text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <FiX size={16} />
            </button>
            <div className="text-center space-y-4 pt-2">
              <div className="text-4xl leading-none">🎮</div>
              <h3 className="text-xl font-black tracking-tight text-text-primary leading-snug">
                Turn Your GitHub Into a Playable Arcade
              </h3>
              <p className="text-sm text-text-tertiary leading-relaxed">
                Your profile visitors can play games too. SynthetixGit auto-generates everything — README, play badges, snake workflow, and more!
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    dismissCtaModal();
                    handleCtaPrimary();
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>✨</span>
                  <span>Generate My README</span>
                </button>
                <button
                  type="button"
                  onClick={dismissCtaModal}
                  className="px-4 py-2 rounded-xl bg-transparent hover:bg-bg-secondary text-text-muted hover:text-text-secondary font-bold text-sm cursor-pointer transition-colors border border-border-primary"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Arcade Frame ── */}
      <main className="flex-1 flex flex-col items-center justify-center my-6 max-w-5xl w-full">
        <div className="p-5 rounded-3xl bg-bg-primary/90 border-2 border-border-primary shadow-2xl space-y-4 w-full text-center">
          {/* Score & HUD */}
          <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-bg-canvas border border-border-primary">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-xs font-mono font-bold text-text-tertiary">
                PLAYER: <span className="text-brand-400">@{username}</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-xs font-mono font-bold">
                <span className="text-text-muted mr-1.5">SCORE:</span>
                <span className="text-accent-emerald text-sm">{score}</span>
              </div>
              <div className="text-xs font-mono font-bold">
                <span className="text-text-muted mr-1.5">HIGH:</span>
                <span className="text-accent-amber text-sm">{highScore}</span>
              </div>
            </div>
          </div>

          {/* Game Canvas Container */}
          <div className="relative rounded-2xl overflow-hidden border border-border-primary bg-[#080b13] flex items-center justify-center shadow-inner min-h-[320px]">
            <canvas ref={canvasRef} className="max-w-full h-auto cursor-crosshair" />

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                <h2 className="text-2xl font-black text-accent-rose tracking-wider">GAME OVER</h2>
                <p className="text-xs text-text-tertiary font-mono">Final Score: {score}</p>
                <button
                  type="button"
                  onClick={() => {
                    setGameOver(false);
                    setActiveGame((prev) => prev);
                  }}
                  className="px-5 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-card-lg"
                >
                  <FiRotateCcw size={14} />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-text-muted px-2">
            <span>🕹️ Controls: Arrow Keys / WASD / Mouse Drag</span>
            <span className="text-accent-emerald font-mono">Live Commit Levels Enabled</span>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full text-center text-xs text-text-muted py-3 border-t border-border-primary">
        SynthetixGit Interactive Arcade Suite • Powered by HTML5 Canvas & GitHub Commits
      </footer>
      {/* On-screen Mobile D-Pad Controls */}
      <div className="flex flex-col items-center gap-1.5 md:hidden mt-4 pb-6">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))}
          className="w-14 h-12 rounded-2xl bg-bg-primary border border-border-primary text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
        >
          ▲
        </button>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))}
            className="w-14 h-12 rounded-2xl bg-bg-primary border border-border-primary text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))}
            className="w-14 h-12 rounded-2xl bg-bg-primary border border-border-primary text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
          >
            ▼
          </button>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
            className="w-14 h-12 rounded-2xl bg-bg-primary border border-border-primary text-white font-bold flex items-center justify-center active:scale-95 transition-all text-lg shadow-lg"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
