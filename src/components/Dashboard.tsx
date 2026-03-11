"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import {
  CalendarIcon,
  RefreshCw,
  Settings,
  Grid3X3,
  XCircle,
  Monitor,
  Smartphone,
  Undo,
  Redo,
  Heart,
  Download,
  Copy,
  Check,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";
import {
  getPatternGrid,
  generateCommitScheduleFromGrid,
} from "@/lib/patternUtils";

function isCanceledError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    ((error as { name?: unknown }).name === "CanceledError" ||
      (error as { code?: unknown }).code === "ERR_CANCELED")
  );
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const PRESET_WORDS = ["NURUL", "DEV", "CODE", "GITHUB", "PRO", "COOL", "2025"];

const HEART_MATRIX = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

const INVADER_MATRIX = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
];

function centerMatrix(pattern: number[][]): number[][] {
  const result: number[][] = Array(7).fill(0).map(() => Array(52).fill(0));
  const patWidth = pattern[0].length;
  const startCol = Math.max(0, Math.floor((52 - patWidth) / 2));
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < patWidth && startCol + c < 52; c++) {
      result[r][startCol + c] = pattern[r][c];
    }
  }
  return result;
}

export interface DashboardProps {
  showFooter?: boolean;
  showHeader?: boolean;
  initialText?: string;
}

export default function Dashboard({
  showFooter = true,
  showHeader = true,
  initialText = "NURUL",
}: DashboardProps = {}) {
  const { data: session, update } = useSession();

  // Core State
  const [mode, setMode] = useState<"text" | "custom">("text");
  const [text, setText] = useState(initialText);
  const [previewGrid, setPreviewGrid] = useState<number[][]>(() => {
    const grid = getPatternGrid(initialText);
    return grid.map((row) => {
      const newRow = [...row];
      while (newRow.length < 52) newRow.push(0);
      return newRow.slice(0, 52);
    });
  });

  // Drag-to-paint state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawLevel, setDrawLevel] = useState<number>(1);

  // Request Cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Config State
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  const [intensity, setIntensity] = useState([1]);

  // UI/Loading State
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Credit System State
  const [credits, setCredits] = useState(3);
  const [accessRequested, setAccessRequested] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Profile State
  const [profileUrl, setProfileUrl] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Manual Date Input State
  const now = new Date();
  const [day, setDay] = useState(now.getDate().toString());
  const [month, setMonth] = useState((now.getMonth() + 1).toString());
  const [year, setYear] = useState(now.getFullYear().toString());
  const [dateError, setDateError] = useState<string | null>(null);

  // History State
  const [history, setHistory] = useState<number[][][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Viewport State
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  // Helper to get consistent username
  const getUsername = () => {
    if (!session?.user) return "octocat";
    const user = session.user as { username?: string; name?: string; email?: string };
    return (
      user.username ||
      user.name ||
      user.email?.split("@")[0] ||
      "octocat"
    );
  };

  useEffect(() => {
    if (session?.user?.image) {
      setProfileUrl(session.user.image);
    }
    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (mode === "text") {
      const grid = getPatternGrid(text);
      const paddedGrid = grid.map((row) => {
        const newRow = [...row];
        while (newRow.length < 52) {
          newRow.push(0);
        }
        return newRow.slice(0, 52);
      });
      setPreviewGrid(paddedGrid);
    }
  }, [text, mode]);

  // Save history snapshot before making changes
  const saveSnapshot = (currentGrid: number[][]) => {
    const copy = currentGrid.map((r) => [...r]);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), copy]);
    setHistoryIndex((prev) => prev + 1);
  };

  // Poll for status
  const checkStatus = async () => {
    const username = getUsername();
    if (!username || username === "octocat") return;
    try {
      const res = await apiClient.get(
        `/request/status?username=${encodeURIComponent(username)}`,
        {
          skipErrorHandling: true,
          shouldRetry: false,
        } as unknown as object
      );
      if (res.data?.success) {
        setCredits(res.data.credits ?? 3);
        setAccessRequested(res.data.accessRequested ?? false);
      }
    } catch {
      // Non-blocking fallback
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileUrl) return;
    try {
      const username = getUsername();
      if (!username) return;
      await apiClient.post("/user/profile", { username, profileUrl });
      await update({ image: profileUrl });
      toast.success("Profile updated successfully!");
      setIsProfileOpen(false);
    } catch {
      toast.error("Could not update profile");
    }
  };

  const handleManualDateChange = (type: "d" | "m" | "y", val: string) => {
    if (val === "") {
      if (type === "d") setDay("");
      if (type === "m") setMonth("");
      if (type === "y") setYear("");
      return;
    }

    const num = parseInt(val);
    if (isNaN(num)) return;

    let d = day;
    let m = month;
    let y = year;

    if (type === "d") {
      if (num > 31) return;
      setDay(val);
      d = val;
    }
    if (type === "m") {
      if (num > 12) return;
      setMonth(val);
      m = val;
    }
    if (type === "y") {
      if (val.length > 4) return;
      setYear(val);
      y = val;
    }

    if (d && m && y && y.length === 4) {
      const dayNum = parseInt(d);
      const monthNum = parseInt(m);
      const yearNum = parseInt(y);

      const constructed = new Date(yearNum, monthNum - 1, dayNum);
      if (
        constructed.getFullYear() === yearNum &&
        constructed.getMonth() === monthNum - 1 &&
        constructed.getDate() === dayNum
      ) {
        setDate(constructed);
        setDateError(null);
      } else {
        setDateError("Invalid Date");
      }
    }
  };

  const handleCalendarSelect = (d: Date | undefined) => {
    setDate(d);
    if (d) {
      setDay(d.getDate().toString());
      setMonth((d.getMonth() + 1).toString());
      setYear(d.getFullYear().toString());
      setDateError(null);
    }
  };

  const handleRequestCredit = async () => {
    if (!session) {
      toast.error("Please sign in to request credits");
      return;
    }
    setRequestLoading(true);
    try {
      const username = getUsername();
      const email = session.user?.email;
      await apiClient.post("/request-access", { username, email });
      toast.success("Request submitted! Waiting for approval.");
      checkStatus();
    } catch {
      toast.info("Credit request sent!");
    } finally {
      setRequestLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!session) {
      toast.error("Please sign in with GitHub first");
      return;
    }
    if (dateError) {
      toast.error("Please fix date errors first");
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userToken = (session as { accessToken?: string }).accessToken as string;
    const userEmail = session.user?.email as string;

    if (!userToken || !userEmail) {
      toast.error("GitHub authorization required. Please reconnect your account.");
      return;
    }

    setLoading(true);
    try {
      const username = getUsername();
      const safeDate = new Date(date || new Date());
      safeDate.setUTCDate(safeDate.getUTCDate() - safeDate.getUTCDay());

      const patternData = generateCommitScheduleFromGrid(
        previewGrid,
        safeDate,
        intensity[0]
      );

      const repoName =
        ((mode === "text" && text ? text : "art") + "-contributions")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-");

      const response = await apiClient.post(
        "/generate",
        {
          githubToken: userToken,
          repoName,
          owner: username,
          email: userEmail,
          patternData,
        },
        { signal: abortController.signal }
      );

      if (response.data?.success) {
        toast.success("Art generation dispatched! Check your GitHub repositories in a few moments.");
        checkStatus();
      }
    } catch (error: unknown) {
      if (isCanceledError(error)) {
        toast.info("Generation cancelled.");
        return;
      }
      toast.error("Failed to trigger automated generation. You can still export the Bash script below!");
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      toast.info("Cancelling generation request...");
    }
  };

  // Cell interaction with drag-to-paint support
  const paintCell = (rowIndex: number, colIndex: number, levelToSet?: number) => {
    setMode("custom");
    const targetVal = levelToSet !== undefined ? levelToSet : (previewGrid[rowIndex][colIndex] ? 0 : 1);
    setPreviewGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[rowIndex][colIndex] = targetVal;
      return next;
    });
  };

  const handleCellMouseDown = (rowIndex: number, colIndex: number) => {
    saveSnapshot(previewGrid);
    setIsMouseDown(true);
    const newVal = previewGrid[rowIndex][colIndex] ? 0 : drawLevel;
    paintCell(rowIndex, colIndex, newVal);
  };

  const handleCellMouseEnter = (rowIndex: number, colIndex: number) => {
    if (!isMouseDown) return;
    paintCell(rowIndex, colIndex, drawLevel);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleClear = () => {
    saveSnapshot(previewGrid);
    setText("");
    setMode("custom");
    setPreviewGrid(Array(7).fill(0).map(() => Array(52).fill(0)));
    toast.success("Canvas cleared");
  };

  const handleBlankCanvas = () => {
    saveSnapshot(previewGrid);
    setText("");
    setMode("custom");
    setPreviewGrid(Array(7).fill(0).map(() => Array(52).fill(0)));
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setPreviewGrid(history[historyIndex - 1]);
      setMode("custom");
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setPreviewGrid(history[historyIndex + 1]);
      setMode("custom");
    }
  };

  const applyShape = (name: "heart" | "invader" | "wave") => {
    saveSnapshot(previewGrid);
    setMode("custom");
    if (name === "heart") {
      setPreviewGrid(centerMatrix(HEART_MATRIX));
      toast.success("Applied Heart pattern!");
    } else if (name === "invader") {
      setPreviewGrid(centerMatrix(INVADER_MATRIX));
      toast.success("Applied Invader pattern!");
    } else if (name === "wave") {
      const wave = Array(7).fill(0).map(() => Array(52).fill(0));
      for (let c = 0; c < 52; c++) {
        const r = Math.round(3 + 2.5 * Math.sin(c / 3.5));
        if (r >= 0 && r < 7) wave[r][c] = 1;
      }
      setPreviewGrid(wave);
      toast.success("Applied Sine Wave pattern!");
    }
  };

  // Generate Bash script for direct local execution
  const buildScript = (type: "bash" | "powershell") => {
    const username = getUsername();
    const startDate = date || new Date();
    const safeDate = new Date(startDate);
    safeDate.setUTCDate(safeDate.getUTCDate() - safeDate.getUTCDay());

    const activeCells: Array<{ dayOffset: number; count: number }> = [];
    for (let c = 0; c < 52; c++) {
      for (let r = 0; r < 7; r++) {
        if (previewGrid[r][c] > 0) {
          activeCells.push({
            dayOffset: c * 7 + r,
            count: intensity[0] * 3,
          });
        }
      }
    }

    if (type === "bash") {
      const lines = [
        `#!/bin/bash`,
        `# SynthetixGit — Automated Calendar Painter`,
        `# Generated for @${username}`,
        `mkdir -p synthetix-art && cd synthetix-art`,
        `git init`,
        `git config user.name "${username}"`,
        `git config user.email "${session?.user?.email || username + '@users.noreply.github.com'}"`,
        `echo "# Contribution Art" > README.md`,
        `git add README.md`,
        `git commit -m "init"`,
      ];

      for (const cell of activeCells) {
        const d = new Date(safeDate);
        d.setUTCDate(safeDate.getUTCDate() + cell.dayOffset);
        const iso = d.toISOString().split("T")[0];
        for (let i = 0; i < cell.count; i++) {
          lines.push(
            `echo "${iso} #${i}" >> art.log && git add art.log && GIT_AUTHOR_DATE="${iso} 12:00:00" GIT_COMMITTER_DATE="${iso} 12:00:00" git commit -m "art ${iso} #${i}" --quiet`
          );
        }
      }
      lines.push(`echo "Done! Create a GitHub repo and run: git remote add origin <REPO_URL> && git push -u origin main"`);
      return lines.join("\n");
    } else {
      const lines = [
        `# SynthetixGit — Automated Calendar Painter (PowerShell)`,
        `# Generated for @${username}`,
        `New-Item -ItemType Directory -Force -Path "synthetix-art" | Out-Null`,
        `Set-Location -Path "synthetix-art"`,
        `git init`,
        `git config user.name "${username}"`,
        `git config user.email "${session?.user?.email || username + '@users.noreply.github.com'}"`,
        `"# Contribution Art" | Out-File -FilePath README.md`,
        `git add README.md`,
        `git commit -m "init"`,
      ];
      for (const cell of activeCells) {
        const d = new Date(safeDate);
        d.setUTCDate(safeDate.getUTCDate() + cell.dayOffset);
        const iso = d.toISOString().split("T")[0];
        for (let i = 0; i < cell.count; i++) {
          lines.push(
            `"${iso} #${i}" | Out-File -Append -FilePath art.log; git add art.log; $env:GIT_AUTHOR_DATE="${iso} 12:00:00"; $env:GIT_COMMITTER_DATE="${iso} 12:00:00"; git commit -m "art ${iso} #${i}" --quiet`
          );
        }
      }
      lines.push(`Write-Host "Done! Push to your GitHub repo to see your new calendar art live."`);
      return lines.join("\n");
    }
  };

  const copyScript = () => {
    const script = buildScript("bash");
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success("Bash script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadScript = (type: "bash" | "powershell") => {
    const content = buildScript(type);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "bash" ? "paint-contributions.sh" : "paint-contributions.ps1";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${a.download}`);
  };

  // Metrics
  const activeCellCount = previewGrid.reduce(
    (acc, row) => acc + row.filter((c) => c > 0).length,
    0
  );
  const estimatedCommits = activeCellCount * intensity[0] * 3;

  return (
    <div
      className="w-full max-w-7xl mx-auto space-y-6"
      onMouseUp={handleMouseUp}
    >
      {/* ── TOP HEADER ── */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black">
            <Sparkles size={22} className="text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-white">
                Contribution Graph Forge
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                52×7 Matrix
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Paint custom pixel art on your GitHub commit history with backdated scheduling
            </p>
          </div>
        </div>

        {/* User Identity / Profile Dialog */}
        <div className="flex items-center gap-3">
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-10 px-3.5 rounded-xl border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all text-xs font-semibold"
              >
                <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-700 bg-slate-800 relative mr-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profileUrl || "/placeholder-user.jpg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://github.com/github.png";
                    }}
                  />
                </div>
                <span className="text-slate-200">@{getUsername()}</span>
                <Settings className="w-3.5 h-3.5 ml-2 text-slate-400" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-slate-800 text-white">
              <DialogHeader>
                <DialogTitle>Update Profile Avatar</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Image URL</label>
                  <Input
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    placeholder="https://avatars.githubusercontent.com/..."
                    className="bg-slate-950 border-slate-700 text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleProfileUpdate} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold">
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      )}

      {/* ── MAIN STUDIO GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: CONTROLS & GENERATOR (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <Card className="border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-800/60 pb-3.5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Layers size={16} className="text-emerald-400" />
                  Pattern Configuration
                </CardTitle>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                  {mode === "text" ? "Word Mode" : "Freehand Draw"}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 pt-4">
              {/* Pattern Input & Word Chips */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-300 flex justify-between">
                  <span>Target Word or Text</span>
                  <span className="text-[11px] text-slate-500 font-mono">Max 8 chars</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    className="text-base font-mono font-bold tracking-widest uppercase bg-slate-950/80 border-slate-700/80 text-emerald-400 focus-visible:ring-emerald-500"
                    placeholder="HELLO"
                    value={text}
                    onChange={(e) => {
                      setMode("text");
                      setText(e.target.value.toUpperCase());
                    }}
                    maxLength={8}
                  />
                  {mode === "custom" ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setMode("text");
                        setText("HELLO");
                      }}
                      title="Reset to Text Mode"
                      className="border-slate-700 bg-slate-800 text-slate-300 shrink-0"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleBlankCanvas}
                      title="Clear to Blank Canvas"
                      className="border-slate-700 bg-slate-800 text-slate-300 shrink-0"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Fast Word Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_WORDS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        setMode("text");
                        setText(w);
                      }}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all",
                        text === w && mode === "text"
                          ? "bg-emerald-500 text-slate-950 shadow-sm shadow-emerald-500/20"
                          : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700"
                      )}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  Pixel Shape Templates
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyShape("heart")}
                    className="border-slate-700/80 bg-slate-800/40 hover:bg-slate-800 hover:text-rose-400 text-xs font-bold"
                  >
                    ❤️ Heart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyShape("invader")}
                    className="border-slate-700/80 bg-slate-800/40 hover:bg-slate-800 hover:text-emerald-400 text-xs font-bold"
                  >
                    👾 Invader
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyShape("wave")}
                    className="border-slate-700/80 bg-slate-800/40 hover:bg-slate-800 hover:text-cyan-400 text-xs font-bold"
                  >
                    🌊 Wave
                  </Button>
                </div>
              </div>

              {/* Start Date Picker */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  Calendar Start Date
                </label>
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-slate-950/80 border-slate-700/80 text-xs text-slate-200"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-emerald-400" />
                        {date ? format(date, "PPP") : <span>Pick calendar date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-800" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleCalendarSelect}
                        disabled={(d) =>
                          d < new Date("1995-01-01") || d > new Date("2035-12-31")
                        }
                        className="text-white"
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      className="text-center font-mono text-xs bg-slate-950/80 border-slate-700/80 text-white"
                      placeholder="DD"
                      value={day}
                      onChange={(e) => handleManualDateChange("d", e.target.value)}
                    />
                    <Input
                      className="text-center font-mono text-xs bg-slate-950/80 border-slate-700/80 text-white"
                      placeholder="MM"
                      value={month}
                      onChange={(e) => handleManualDateChange("m", e.target.value)}
                    />
                    <Input
                      className="text-center font-mono text-xs bg-slate-950/80 border-slate-700/80 text-white"
                      placeholder="YYYY"
                      value={year}
                      onChange={(e) => handleManualDateChange("y", e.target.value)}
                    />
                  </div>
                  {dateError && (
                    <p className="text-[11px] text-rose-400 font-medium">
                      {dateError}
                    </p>
                  )}
                </div>
              </div>

              {/* Intensity Multiplier Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Commit Intensity</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {intensity[0]}x Multiplier
                  </span>
                </div>
                <Slider
                  value={intensity}
                  onValueChange={setIntensity}
                  max={10}
                  min={1}
                  step={1}
                  className="py-1"
                />
                <p className="text-[11px] text-slate-400">
                  Higher intensity creates deeper green shades on your GitHub calendar.
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-4 w-4 mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-950 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-slate-400 leading-snug cursor-pointer select-none"
                >
                  I authorize repository creation on my GitHub account and agree to author credits.
                </label>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                {loading ? (
                  <Button
                    variant="destructive"
                    className="w-full h-11 text-sm font-black shadow-lg"
                    onClick={handleCancel}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Stop Generating
                  </Button>
                ) : credits > 0 ? (
                  <Button
                    className="w-full h-11 text-sm font-black shadow-lg shadow-emerald-500/20 bg-emerald-500 hover:bg-emerald-600 text-slate-950 cursor-pointer"
                    onClick={handleGenerate}
                    disabled={!termsAccepted}
                  >
                    <FiGithub className="mr-2 h-4 w-4" />
                    Commit Art to GitHub
                  </Button>
                ) : !accessRequested ? (
                  <Button
                    className="w-full h-11 text-sm font-black shadow-lg shadow-cyan-500/20 bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
                    onClick={handleRequestCredit}
                    disabled={requestLoading}
                  >
                    {requestLoading ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Heart className="mr-2 h-4 w-4" />
                    )}
                    Request 1 Free Credit
                  </Button>
                ) : (
                  <Button
                    className="w-full h-11 text-sm font-bold bg-slate-800 text-slate-400 cursor-not-allowed"
                    disabled
                  >
                    ⏳ Request Pending Approval
                  </Button>
                )}

                {/* Local Script Exporters */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyScript}
                    className="border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copied ? "Copied!" : "Copy Script"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadScript("bash")}
                    className="border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Download .sh
                  </Button>
                </div>
              </div>

              {/* Credits & Stats Footer */}
              <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                <span>Credits Remaining:</span>
                <span
                  className={cn(
                    "font-bold font-mono px-2 py-0.5 rounded",
                    credits > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  )}
                >
                  {credits} Available
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE 52x7 CANVAS (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col overflow-hidden">
            <CardHeader className="border-b border-slate-800/60 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-300">
                    Live 52-Week Preview
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">{activeCellCount}</span>
                    <span className="text-slate-500">/ 364 cells</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">~{estimatedCommits} commits</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Viewport switch */}
                  <div className="flex items-center gap-1 bg-slate-950/80 rounded-lg p-1 border border-slate-800">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-7 w-7 rounded",
                        viewport === "desktop" ? "bg-slate-800 text-white" : "text-slate-400"
                      )}
                      onClick={() => setViewport("desktop")}
                      title="Desktop view"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-7 w-7 rounded",
                        viewport === "mobile" ? "bg-slate-800 text-white" : "text-slate-400"
                      )}
                      onClick={() => setViewport("mobile")}
                      title="Mobile preview"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* History controls */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white"
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                      title="Undo"
                    >
                      <Undo className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      title="Redo"
                    >
                      <Redo className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="h-8 px-2.5 text-xs font-bold text-slate-400 hover:text-rose-400"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Canvas Viewport */}
            <CardContent
              className={cn(
                "flex flex-col py-6 overflow-x-auto px-4 sm:px-6 transition-all duration-300 select-none",
                viewport === "mobile"
                  ? "max-w-md mx-auto border-x border-slate-800 bg-slate-950/50"
                  : "w-full"
              )}
            >
              <div className="m-auto space-y-2">
                {/* Month labels header */}
                <div className="flex pl-8 text-[10px] font-mono font-bold text-slate-500 gap-[26px]">
                  {MONTH_NAMES.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>

                {/* 52x7 Grid Container */}
                <div className="flex gap-2">
                  {/* Day of week labels */}
                  <div className="flex flex-col justify-between text-[9px] font-mono text-slate-500 py-0.5 select-none">
                    <span>Sun</span>
                    <span>Tue</span>
                    <span>Thu</span>
                    <span>Sat</span>
                  </div>

                  {/* The 52x7 Blocks */}
                  <div className="flex flex-col gap-[3.5px] p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner">
                    {previewGrid.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex gap-[3.5px]">
                        {row.map((cell, colIndex) => {
                          const isActive = cell > 0;
                          return (
                            <div
                              key={`${rowIndex}-${colIndex}`}
                              onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                              onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                              className={cn(
                                "w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2.5px] transition-all duration-150 cursor-pointer select-none",
                                isActive
                                  ? "bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.6)] border border-[#26a641] hover:scale-125 hover:z-10"
                                  : "bg-[#161b22] hover:bg-slate-700/80 border border-slate-800/60 hover:scale-110"
                              )}
                              title={`Week ${colIndex + 1}, Day ${rowIndex + 1} (${isActive ? "Painted" : "Empty"})`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Palette Selector */}
                <div className="flex items-center justify-between pt-3 px-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="font-bold">Palette:</span>
                    <button
                      type="button"
                      onClick={() => setDrawLevel(0)}
                      className={cn(
                        "w-4 h-4 rounded-[2px] bg-[#161b22] border border-slate-700 transition-all",
                        drawLevel === 0 && "ring-2 ring-emerald-400"
                      )}
                      title="Eraser (0)"
                    />
                    <button
                      type="button"
                      onClick={() => setDrawLevel(1)}
                      className={cn(
                        "w-4 h-4 rounded-[2px] bg-[#0e4429] border border-slate-700 transition-all",
                        drawLevel === 1 && "ring-2 ring-emerald-400"
                      )}
                      title="Level 1"
                    />
                    <button
                      type="button"
                      onClick={() => setDrawLevel(2)}
                      className={cn(
                        "w-4 h-4 rounded-[2px] bg-[#006d32] border border-slate-700 transition-all",
                        drawLevel === 2 && "ring-2 ring-emerald-400"
                      )}
                      title="Level 2"
                    />
                    <button
                      type="button"
                      onClick={() => setDrawLevel(3)}
                      className={cn(
                        "w-4 h-4 rounded-[2px] bg-[#26a641] border border-slate-700 transition-all",
                        drawLevel === 3 && "ring-2 ring-emerald-400"
                      )}
                      title="Level 3"
                    />
                    <button
                      type="button"
                      onClick={() => setDrawLevel(4)}
                      className={cn(
                        "w-4 h-4 rounded-[2px] bg-[#39d353] border border-[#26a641] transition-all",
                        drawLevel === 4 && "ring-2 ring-emerald-400"
                      )}
                      title="Level 4 (Max neon)"
                    />
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono">
                    💡 Click or drag across the grid to draw
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── FOOTER ATTRIBUTION ── */}
      {showFooter && (
        <footer className="border-t border-slate-800/80 py-6 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a
                href="https://github.com/Dev-Shivam-05"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-slate-200 hover:text-emerald-400 transition-colors"
              >
                <FiGithub className="w-3.5 h-3.5" />
                Dev-Shivam-05
              </a>
              <span>&amp;</span>
              <a
                href="https://github.com/Dev-Nurul08"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-slate-200 hover:text-cyan-400 transition-colors"
              >
                Dev-Nurul08
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/shivam-bhadoriya-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <FiLinkedin className="w-3.5 h-3.5 text-blue-400" />
                Shivam Bhadoriya
              </a>
              <span>·</span>
              <a href="/studio" className="hover:text-white transition-colors">
                Studio
              </a>
              <span>·</span>
              <a href="/games" className="hover:text-white transition-colors">
                Arcade Games
              </a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
