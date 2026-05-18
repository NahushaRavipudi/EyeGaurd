import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  Settings, 
  ShieldCheck, 
  Baby, 
  ArrowRight, 
  Gamepad2,
  LayoutGrid,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ScanEye,
  Leaf,
  Play,
  Puzzle,
  BookOpen,
  Lightbulb,
  Trees,
  Timer,
  Flame,
  Ruler,
  Moon,
  Lock,
  Sun,
  Star,
  Activity,
  Heart,
  Droplets,
  ArrowLeftRight,
  RefreshCw,
  Compass,
  Monitor,
  CheckCircle,
  HelpCircle,
  Trophy,
  Bell,
  Sparkles,
  BrainCircuit,
  BaggageClaim
} from 'lucide-react';

// --- Shared Types ---
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'reward';
}

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden z-[210] relative border border-slate-100"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <Lock className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CHILD_PROFILES = [
  { id: 'leo', name: 'Leo', seed: 'Leo', rank: 'Eye Hero', pts: '12.5k', badges: 15 },
  { id: 'mia', name: 'Mia', seed: 'Mia', rank: 'Visionary', pts: '8.2k', badges: 9 },
  { id: 'sam', name: 'Sam', seed: 'Sam', rank: 'Star Gazer', pts: '4.1k', badges: 4 },
];

const Layout = ({ children, hideNav = false, activeTab, currentChild, onSwitchChild, notifications, removeNotification, currentMode, profiles = CHILD_PROFILES, onAddChild }: { 
  children: ReactNode, 
  hideNav?: boolean, 
  activeTab?: string, 
  currentChild: any, 
  onSwitchChild: (c: any) => void,
  notifications?: Notification[],
  removeNotification?: (id: string) => void,
  currentMode: 'parent' | 'child' | 'none',
  profiles?: any[],
  onAddChild?: () => void
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHealthTipsOpen, setIsHealthTipsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Toast Notifications */}
      <div className="fixed top-24 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications?.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="w-80 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl shadow-slate-200/50 flex gap-4 pointer-events-auto"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                n.type === 'reward' ? 'bg-amber-100 text-amber-600' : 
                n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 
                'bg-indigo-100 text-indigo-600'
              }`}>
                {n.type === 'reward' ? <Trophy className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900">{n.title}</p>
                <p className="text-xs font-medium text-slate-500">{n.message}</p>
              </div>
              <button 
                onClick={() => removeNotification?.(n.id)}
                className="text-slate-300 hover:text-slate-500 p-1"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-20 flex items-center justify-between px-4 md:px-20 w-full shrink-0">
        <Link to="/" className="flex items-center gap-3 outline-none">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">E</div>
          <h1 className="text-xl font-bold tracking-tight text-indigo-900 hidden sm:block">EyeGuard Pro</h1>
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsHealthTipsOpen(true)}
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            title="Healthy Habits"
          >
            <Leaf className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-2 p-1 pr-3 rounded-2xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-sm">
               <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentChild.seed}`} 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-black text-slate-700 hidden sm:block">{currentChild.name}</span>
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors hover:rotate-90 active:scale-90"
          >
            <Settings className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </header>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        currentChild={currentChild}
        onSwitchChild={onSwitchChild}
        onAddChild={onAddChild}
        profiles={profiles}
      />
      <HealthTipsModal isOpen={isHealthTipsOpen} onClose={() => setIsHealthTipsOpen(false)} />

      <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={useLocation().pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideNav && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-2 bg-white/80 backdrop-blur-xl shadow-lg rounded-t-[32px] border-t border-slate-200">
          {currentMode === 'parent' && <NavLink to="/parent-analytics" icon={TrendingUp} label="Stats" active={activeTab === 'stats'} />}
          {currentMode === 'parent' && <NavLink to="/performance" icon={BrainCircuit} label="Performance" active={activeTab === 'performance'} />}
          {currentMode === 'child' && <NavLink to="/child-dashboard" icon={LayoutGrid} label="Dashboard" active={activeTab === 'dashboard'} />}
          {currentMode === 'child' && <NavLink to="/eye-exercises" icon={ScanEye} label="Exercises" active={activeTab === 'exercises'} />}
          <NavLink to="/awards" icon={Award} label="Awards" active={activeTab === 'awards'} />
          <NavLink to="/" icon={Users} label="Mode" active={activeTab === 'mode'} />
        </nav>
      )}
    </div>
  );
};

const NavLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex flex-col items-center justify-center px-6 py-2 rounded-2xl transition-all active:scale-90 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-400 hover:bg-slate-100'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-[10px] font-black mt-1 uppercase tracking-wider">{label}</span>
  </Link>
);

// --- Screens ---

const ModeSelection = ({ onSelectMode }: { onSelectMode: (mode: 'parent' | 'child') => void }) => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-8 md:py-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Choose Your Space</h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">Personalized experience for every family member</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        <button 
          onClick={() => {
            onSelectMode('parent');
            navigate('/parent-analytics');
          }}
          className="group cursor-pointer w-full md:w-80 p-10 bg-white border-4 border-white hover:border-indigo-500 rounded-[40px] shadow-2xl shadow-indigo-100/50 transition-all text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-indigo-100 rounded-3xl mb-8 flex items-center justify-center text-5xl">🛡️</div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Parent</h3>
          <p className="text-slate-500 leading-relaxed font-medium">View analytics and manage settings</p>
        </button>

        <button 
          onClick={() => {
            onSelectMode('child');
            navigate('/child-dashboard');
          }}
          className="group cursor-pointer w-full md:w-80 p-10 bg-white border-4 border-white hover:border-emerald-500 rounded-[40px] shadow-2xl shadow-emerald-100/50 transition-all text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-emerald-100 rounded-3xl mb-8 flex items-center justify-center text-5xl">🎨</div>
          <h3 className="text-2xl font-black text-slate-900 mb-2">Child</h3>
          <p className="text-slate-500 leading-relaxed font-medium">Start sessions and earn rewards</p>
        </button>
      </div>
    </div>
  );
};

const analyticsData = [
  { day: 'Mon', h: 2, m: 10, pct: 40, color: 'bg-indigo-300', breaks: 14, posture: 82, outdoor: 30 },
  { day: 'Tue', h: 3, m: 25, pct: 60, color: 'bg-indigo-300', breaks: 18, posture: 85, outdoor: 45 },
  { day: 'Wed', h: 4, m: 50, pct: 85, color: 'bg-indigo-400', breaks: 22, posture: 78, outdoor: 90 },
  { day: 'Thu', h: 2, m: 55, pct: 50, color: 'bg-indigo-300', breaks: 15, posture: 88, outdoor: 15 },
  { day: 'Fri', h: 5, m: 12, pct: 95, color: 'bg-indigo-600', breaks: 24, posture: 92, outdoor: 60 },
  { day: 'Sat', h: 1, m: 45, pct: 30, color: 'bg-indigo-200', breaks: 8, posture: 95, outdoor: 120 },
  { day: 'Sun', h: 3, m: 58, pct: 70, color: 'bg-indigo-400', breaks: 16, posture: 84, outdoor: 110 },
];

const REWARD_SUGGESTIONS = [
  "15 extra minutes of outdoor play",
  "Choosing the menu for dinner tonight",
  "One extra bedtime story",
  "Small ice cream treat",
  "A gold star sticker for the chart",
  "Building a Lego set together",
  "Choosing a movie for family night",
  "Visit to the local park"
];

const ParentAnalytics = ({ 
  currentChild, 
  onSwitchChild, 
  notifications, 
  removeNotification, 
  rewards, 
  onFulfillReward,
  isMonitoring,
  onToggleMonitoring,
  postureState,
  onTriggerScan,
  lightLevel,
  outdoorTime,
  onAddOutdoorTime,
  nextBreakSeconds,
  currentMode,
  setRewards,
  profiles,
  onAddChild
}: { 
  currentChild: any, 
  onSwitchChild: (c: any) => void, 
  notifications: Notification[], 
  removeNotification: (id: string) => void,
  rewards: any[],
  onFulfillReward: (id: string) => void,
  isMonitoring: boolean,
  onToggleMonitoring: () => void,
  postureState: 'good' | 'bad' | 'checking',
  onTriggerScan: () => void,
  lightLevel: number,
  outdoorTime: number,
  onAddOutdoorTime: () => void,
  nextBreakSeconds: number,
  currentMode: 'parent' | 'child' | 'none',
  setRewards: (r: any) => void,
  profiles?: any[],
  onAddChild?: () => void
}) => {
  const [activeItem, setActiveItem] = useState(analyticsData[4]); // Default to Friday (peak)
  const [isExporting, setIsExporting] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const totalMinutes = analyticsData.reduce((acc, curr) => acc + curr.h * 60 + curr.m, 0);
  const totalOutdoor = analyticsData.reduce((acc, curr) => acc + curr.outdoor, 0);
  const totalBreaks = analyticsData.reduce((acc, curr) => acc + curr.breaks, 0);
  const avgHours = Math.floor(totalMinutes / 7 / 60);
  const avgMins = Math.floor((totalMinutes / 7) % 60);

  const pendingRewards = rewards.filter(r => r.progress >= r.goal && !r.fulfilled);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEditing = (id: string, currentVal: string) => {
    setEditingId(id);
    setEditValue(currentVal);
  };

  const saveEdit = (id: string, setRewards: any) => {
    setRewards((prev: any[]) => prev.map(r => r.id === id ? { ...r, item: editValue } : r));
    setEditingId(null);
  };

  const getSuggestion = () => {
    const random = REWARD_SUGGESTIONS[Math.floor(Math.random() * REWARD_SUGGESTIONS.length)];
    setSuggestion(random);
  };

  const exportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const content = `EyeGuard Pro Health Report\nGenerated: ${new Date().toLocaleDateString()}\n\nWeekly Summary:\nAvg Screen Time: ${avgHours}h ${avgMins}m\n\nDaily Data:\n${analyticsData.map(d => `${d.day}: ${d.h}h ${d.m}m - ${d.breaks} breaks - ${d.outdoor}m outdoor`).join('\n')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EyeGuard_Report_${activeItem.day}.txt`;
      a.click();
      setIsExporting(false);
    }, 1500);
  };

  const today = new Date();
  const first = today.getDate() - today.getDay();
  const last = first + 6;
  const firstDay = new Date(new Date().setDate(first));
  const lastDay = new Date(new Date().setDate(last));
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const dateRange = `${formatDate(firstDay)} - ${formatDate(lastDay)}`;

  return (
    <Layout currentChild={currentChild} onSwitchChild={onSwitchChild} activeTab="stats" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={onAddChild}>
      <div className="px-6 py-10 space-y-10">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <p className="text-indigo-600 font-black uppercase tracking-widest text-xs mb-1">Health Center</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Parent Dashboard</h2>
            <div className="flex items-center gap-4 mt-4">
               <button 
                onClick={onToggleMonitoring}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isMonitoring 
                    ? 'bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-500/10' 
                    : 'bg-indigo-50 text-indigo-600'
                }`}
               >
                 <Users className="w-4 h-4" />
                 {isMonitoring ? 'MONITORING ACTIVE: ' : 'SWITCH ON MONITORING: '}{currentChild.name.toUpperCase()}
               </button>
               <p className="text-slate-400 text-xs font-bold italic flex items-center gap-1">
                 <ShieldCheck className="w-3 h-3 text-emerald-500" />
                 {isMonitoring ? 'Live Sync Active' : 'Waiting for Session'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 font-black text-slate-500 uppercase tracking-widest text-xs">
              {dateRange}
            </div>
            <button 
              onClick={exportReport}
              className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              Export Global Report
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Rewards to Give</h3>
              </div>
              <span className="bg-amber-100 text-amber-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                {pendingRewards.length} PENDING
              </span>
            </div>

            <div className="space-y-4">
              {pendingRewards.length > 0 ? (
                pendingRewards.map(reward => (
                  <div key={reward.id} className="p-6 bg-slate-50 rounded-3xl flex items-center justify-between border border-dashed border-slate-200">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl">{reward.icon}</div>
                      <div className="flex-1">
                        {editingId === reward.id ? (
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={editValue} 
                              onChange={(e) => setEditValue(e.target.value)}
                              className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-sm font-black w-full"
                              autoFocus
                            />
                            <button onClick={() => saveEdit(reward.id, setRewards)} className="text-emerald-500 font-black text-[10px]">SAVE</button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group/edit">
                            <p className="text-sm font-black text-slate-900">{reward.item}</p>
                            <button onClick={() => startEditing(reward.id, reward.item)} className="p-1 opacity-0 group-hover/edit:opacity-100 text-slate-400 hover:text-indigo-600">
                              <Settings className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed Goal!</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onFulfillReward(reward.id)}
                      className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100"
                    >
                      FULFILL NOW
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 font-bold text-sm">No rewards currently pending fulfillment.</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Inspiration Corner</p>
                <button 
                  onClick={getSuggestion}
                  className="text-xs font-black text-indigo-600 hover:underline"
                >
                  Gen Suggestion
                </button>
              </div>
              {suggestion && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-indigo-50 text-indigo-900 rounded-2xl font-bold text-sm flex items-center gap-3"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  {suggestion}
                </motion.div>
              )}
            </div>
          </section>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <ScanEye className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Observation</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className={`bg-white border text-left border-slate-100 shadow-sm p-6 rounded-3xl flex flex-col relative overflow-hidden transition-all hover:border-indigo-200 cursor-default`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  {postureState === 'good' ? <CheckCircle2 className="w-6 h-6" /> : postureState === 'checking' ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Activity className="w-6 h-6" />}
                </div>
                <button 
                  onClick={onTriggerScan}
                  disabled={postureState === 'checking'}
                  className="p-2 hover:bg-slate-50 rounded-lg text-indigo-600 flex items-center gap-1 text-[10px] font-black uppercase"
                >
                  <RefreshCw className={`w-3 h-3 ${postureState === 'checking' ? 'animate-spin' : ''}`} />
                  SCAN
                </button>
              </div>
              <h4 className="font-black text-slate-900 text-lg">Posture Integrity</h4>
              <p className={`text-sm font-bold ${postureState === 'bad' ? 'text-red-500' : 'text-slate-500'}`}>
                {postureState === 'checking' ? 'AI Analyzing...' : postureState === 'good' ? 'Great Alignment' : 'Slouched Detected'}
              </p>
            </div>

            <div className="bg-white border text-left border-slate-100 shadow-sm p-6 rounded-3xl flex flex-col hover:border-amber-200 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <Sun className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-md">{Math.round(820 * (lightLevel / 85))} LUX</span>
                  <span className="text-[8px] font-black text-amber-400 uppercase mt-1">Sensed Just Now</span>
                </div>
              </div>
              <h4 className="font-black text-slate-900 text-lg">Ambient Lighting</h4>
              <p className="text-sm font-bold text-slate-500">{lightLevel}% efficiency</p>
            </div>

            <div className="bg-white border text-left border-slate-100 shadow-sm p-6 rounded-3xl flex flex-col hover:border-indigo-200 cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <Trees className="w-6 h-6" />
                </div>
                <button 
                  onClick={onAddOutdoorTime}
                  className="p-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-100"
                >
                  ADD 15M
                </button>
              </div>
              <h4 className="font-black text-slate-900 text-lg">Outdoor Log</h4>
              <p className="text-sm font-bold text-slate-500">{Math.floor(outdoorTime / 60)}h {outdoorTime % 60}m tracked today</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <BaggageClaim className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Weekly Trend Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Avg Screen Time', value: `${avgHours}h ${avgMins}m`, progress: Math.min(100, (avgHours / 5) * 100), color: 'bg-indigo-500' },
              { label: 'Eye Breaks Taken', value: `${totalBreaks} / ${7 * 24}`, progress: Math.min(100, (totalBreaks / (7 * 24)) * 100), color: 'bg-emerald-500' },
              { label: 'Outdoor Time', value: `${Math.floor(totalOutdoor / 7)}m Daily`, progress: Math.min(100, (totalOutdoor / (7 * 120)) * 100), color: 'bg-indigo-400' },
              { label: 'Focus Score', value: '88%', progress: 88, color: 'bg-amber-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-2">{stat.label}</p>
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }} 
                    className={`h-full ${stat.color} transition-all duration-1000`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 relative group/chart">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest text-[10px]">Usage Duration History</h3>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span>DAILY SCREEN MINUTES</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between h-64 gap-4 md:gap-6 pt-4 relative">
              {analyticsData.map((item, i) => (
                <div 
                  key={item.day} 
                  className="flex-1 flex flex-col items-center gap-4 group/bar relative h-full"
                  onMouseEnter={() => setActiveItem(item)}
                  onClick={() => setActiveItem(item)}
                >
                  <div className="w-full bg-slate-50/50 rounded-t-2xl h-full relative overflow-hidden cursor-pointer hover:bg-slate-100/50 transition-colors">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${item.pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute bottom-0 w-full rounded-t-2xl shadow-inner-white ${item.color} group-hover/bar:brightness-110 transition-all ${activeItem.day === item.day ? 'ring-4 ring-indigo-500/20 brightness-110' : ''}`}
                    />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeItem.day === item.day ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-xl flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">{activeItem.day}'s Detailed View</h4>
                <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black tracking-widest">ANALYZED</div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Timer className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{activeItem.h}h {activeItem.m}m</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Active Time</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Trees className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-3xl font-black">{activeItem.outdoor}m</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Verified Outdoors</p>
                  </div>
                </div>

                <motion.div 
                  key={activeItem.day}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6 bg-white/5 rounded-[32px] border border-white/5"
                >
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Health Compliance</p>
                  <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-indigo-400">{activeItem.posture}%</span>
                    <div className="mb-2">
                       <span className="text-xs font-black text-emerald-400 block tracking-widest">OPTIMAL</span>
                       <span className="text-[8px] font-bold text-slate-500 uppercase">Posture Avg.</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const BreakReminder = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(20);
  const [exerciseStep, setExerciseStep] = useState(0);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t === 15) setExerciseStep(1);
        if (t === 10) setExerciseStep(2);
        if (t === 5) setExerciseStep(3);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const steps = [
    { text: "Look 20 feet away", icon: <Compass className="w-16 h-16 text-emerald-400" />, sub: "Find a distant tree or star!" },
    { text: "Blink 10 times", icon: <motion.div animate={{ scale: [1, 0.8, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}><Droplets className="w-16 h-16 text-blue-400" /></motion.div>, sub: "Refresh those eyes naturally" },
    { text: "Rotate your eyes", icon: <RefreshCw className="w-16 h-16 text-purple-400 animate-spin-slow" />, sub: "Slowly circle your vision" },
    { text: "Look Left & Right", icon: <ArrowLeftRight className="w-16 h-16 text-amber-400 animate-bounce" />, sub: "Exercise your eye muscles" }
  ];

  const nutriTips = [
    { title: "Vitamin A Power", text: "Carrots and spinach help you see in the dark!", icon: "🥕" },
    { title: "DHA Brain Fuel", text: "Salmon and seeds keep your vision sharp.", icon: "🐟" }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-indigo-950 flex flex-col items-center justify-center p-6 sm:p-12 text-center overflow-hidden">
      {/* Dynamic Background Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 blur-3xl"
            initial={{ 
              width: Math.random() * 300 + 100, 
              height: Math.random() * 300 + 100,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-12 w-full">
          <div className="flex-1 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-48 h-48 md:w-64 md:h-64 mb-8 flex items-center justify-center"
            >
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="50%" cy="50%" r="45%" className="stroke-white/5 fill-none" strokeWidth="10" />
                 <motion.circle
                   cx="50%" cy="50%" r="45%"
                   className="stroke-emerald-400 fill-none"
                   strokeWidth="10"
                   strokeLinecap="round"
                   initial={{ pathLength: 1 }}
                   animate={{ pathLength: timeLeft / 20 }}
                   transition={{ duration: 1, ease: "linear" }}
                 />
               </svg>
               <div className="flex flex-col items-center">
                 <motion.span 
                   key={timeLeft}
                   initial={{ y: 5, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="text-6xl md:text-7xl font-black text-white"
                 >
                   {timeLeft}
                 </motion.span>
                 <span className="text-emerald-400/60 font-black uppercase tracking-widest text-[10px] mt-1">REST TIME</span>
               </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={exerciseStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="bg-white/5 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 w-full"
              >
                <div className="flex justify-center mb-6">{steps[exerciseStep].icon}</div>
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                  {steps[exerciseStep].text}
                </h2>
                <p className="text-indigo-200 font-bold opacity-80">{steps[exerciseStep].sub}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-sm">
            <div className="text-left">
              <p className="text-emerald-400 font-black uppercase tracking-widest text-xs mb-4">Nutri-Tips for Super Vision</p>
              <div className="space-y-4">
                {nutriTips.map((tip, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="p-5 bg-white/5 border border-white/10 rounded-3xl flex gap-4 items-start"
                  >
                    <span className="text-3xl">{tip.icon}</span>
                    <div>
                      <h4 className="text-white font-black text-sm">{tip.title}</h4>
                      <p className="text-indigo-200/60 text-xs font-bold leading-relaxed">{tip.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-amber-400/10 border border-amber-400/20 rounded-3xl text-left">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h4 className="text-amber-400 font-black text-sm uppercase">20-20-20 Rule</h4>
              </div>
              <p className="text-white/70 text-xs font-medium leading-relaxed">
                Looking at the distance relaxes the tiny muscles in your eyes that get tired from looking too closely at your screen.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 w-full flex flex-col md:flex-row gap-6 justify-center">
          <button 
            disabled={timeLeft > 0}
            onClick={() => navigate('/child-dashboard')}
            className={`px-12 py-5 rounded-[32px] font-black text-2xl transition-all shadow-2xl ${
              timeLeft === 0 
              ? 'bg-emerald-400 text-emerald-950 shadow-emerald-500/40 hover:scale-105 active:scale-95' 
              : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
            }`}
          >
            {timeLeft === 0 ? "I'm Fully Charged! ⚡" : "Recharging..."}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ isOpen, onClose, currentChild, onSwitchChild, onAddChild, profiles }: { isOpen: boolean, onClose: () => void, currentChild: any, onSwitchChild: (c: any) => void, onAddChild?: () => void, profiles?: any[] }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Profiles">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-[32px] bg-indigo-50 border-4 border-white shadow-xl overflow-hidden relative group">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentChild.seed}`} alt="User" />
            <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-all cursor-pointer" />
          </div>
          <div className="text-center">
            <h4 className="text-xl font-black text-slate-900">{currentChild.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Award className="w-4 h-4 text-amber-500" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{currentChild.rank}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button className="py-4 bg-slate-900 text-white rounded-2xl font-black transition-all hover:bg-slate-800 text-xs">
              EDIT AVATAR
            </button>
            <button 
              onClick={() => onAddChild?.()}
              className="py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-black transition-all hover:bg-indigo-100 text-xs flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              ADD CHILD
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Switch Child</p>
          <div className="grid grid-cols-3 gap-3">
            {(profiles || CHILD_PROFILES).map((child) => (
              <button 
                key={child.id}
                onClick={() => {
                  onSwitchChild(child);
                  onClose();
                }}
                className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                  currentChild.id === child.id 
                    ? 'border-indigo-600 bg-indigo-50' 
                    : 'border-slate-100 bg-slate-50 hover:bg-white'
                }`}
              >
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${child.seed}`} 
                  className="w-12 h-12 rounded-xl mb-2" 
                  alt={child.name} 
                />
                <span className="text-xs font-bold text-slate-700">{child.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 text-center">
            <p className="text-2xl font-black text-indigo-600 mb-1">{currentChild.pts}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Pts</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 text-center">
            <p className="text-2xl font-black text-emerald-600 mb-1">{currentChild.badges}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Badges</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const HealthTipsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vision Health Guide">
      <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Super Food & Nutrients</h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-5 bg-emerald-50 rounded-[32px] border border-emerald-100 flex items-start gap-4">
              <div className="text-3xl">🥦</div>
              <div>
                <p className="font-black text-emerald-900 text-sm">Vitamin A (Retinol)</p>
                <p className="text-emerald-700/70 text-xs font-bold leading-relaxed">Essential for night vision. Found in carrots, sweet potatoes, and leafy greens.</p>
              </div>
            </div>
            <div className="p-5 bg-indigo-50 rounded-[32px] border border-indigo-100 flex items-start gap-4">
              <div className="text-3xl">🐟</div>
              <div>
                <p className="font-black text-indigo-900 text-sm">DHA (Omega-3)</p>
                <p className="text-indigo-700/70 text-xs font-bold leading-relaxed">Supports retinal health and eye moisture. Found in oily fish and certain seeds.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-red-500">
            <div className="p-2 bg-red-100 rounded-xl">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Digital Eye Strain</h4>
          </div>
          <div className="p-6 bg-red-50 rounded-[40px] border border-red-100 space-y-6">
            <div>
              <p className="text-xs font-black text-red-900 uppercase tracking-widest mb-3">Causes & Symptoms</p>
              <p className="text-xs font-bold text-red-800 leading-relaxed mb-4">
                Digital eye strain (CVS) happens when your eyes get tired from looking at screens for too long. Symptoms include blurry vision, headaches, dry eyes, and neck pain.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { t: 'Dryness', i: '🌵' },
                  { t: 'Blurriness', i: '🌫️' },
                  { t: 'Headaches', i: '🤕' },
                  { t: 'Tiredness', i: '😴' }
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-red-100/50">
                    <span>{s.i}</span>
                    <span className="text-[10px] font-black text-red-900 uppercase">{s.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-3">Prevention Gameplan</p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <span className="text-lg">📏</span>
                  <p className="text-[11px] font-bold text-emerald-900">Keep screens at least 20 inches away.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <span className="text-lg">☀️</span>
                  <p className="text-[11px] font-bold text-emerald-900">Balance screen light with room light.</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <span className="text-lg">💧</span>
                  <p className="text-[11px] font-bold text-emerald-900">Remember to blink frequently!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-indigo-600">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Habits Tracker</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest px-1">Good Habits ✅</p>
              <div className="space-y-2">
                {[
                  { text: "Reading with good lighting", icon: "💡" },
                  { text: "Outdoor play for 2+ hours", icon: "⚽" },
                  { text: "Frequent blinking during play", icon: "👁️" },
                  { text: "Keeping screen at arm's length", icon: "📏" }
                ].map((habit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span className="text-xl">{habit.icon}</span>
                    <span className="text-xs font-bold text-emerald-900">{habit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest px-1">Bad Habits ✕</p>
              <div className="space-y-2">
                {[
                  { text: "Rubbing eyes frequently", icon: "🖐️" },
                  { text: "Using screens in the dark", icon: "🌑" },
                  { text: "Holding phone too close", icon: "📱" },
                  { text: "Skipping eye breaks", icon: "⏰" }
                ].map((habit, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-red-50 rounded-2xl border border-red-100 opacity-80">
                    <span className="text-xl">{habit.icon}</span>
                    <span className="text-xs font-bold text-red-900">{habit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-amber-600">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight">Device Best Practices</h4>
          </div>
          <div className="p-5 bg-amber-50 rounded-[32px] border border-amber-100 space-y-4">
            <div className="flex justify-between items-center text-xs font-black text-amber-900 uppercase">
              <span>Screen Type</span>
              <span>Safe Distance</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                <span className="font-bold">Phones</span>
                <span className="font-mono text-indigo-600">30-40 cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                <span className="font-bold">Tablets</span>
                <span className="font-mono text-indigo-600">40-50 cm</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                <span className="font-bold">Laptops</span>
                <span className="font-mono text-indigo-600">50-60 cm</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

const SettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="App Settings">
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Notifications</p>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-slate-700">Break Reminders</span>
          <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 shadow-inner">
            <div className="w-4 h-4 bg-white rounded-full translate-x-6 shadow-sm"></div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="font-bold text-slate-700">Posture Alerts</span>
          <div className="w-12 h-6 bg-slate-300 rounded-full relative p-1 transition-all">
            <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Vision Safety</p>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <div className="flex justify-between font-bold text-sm">
            <span className="text-slate-700">Max Brightness Guard</span>
            <span className="text-indigo-600">Active</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-3/4"></div>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-black border border-red-100 hover:bg-red-100 transition-colors">
        LOG OUT
      </button>
    </div>
  </Modal>
);

const ChildDashboard = ({ 
  currentChild, 
  onSwitchChild, 
  addNotification, 
  notifications, 
  removeNotification, 
  rewards, 
  onIncrementReward, 
  onCreateGoal,
  isMonitoring,
  onToggleMonitoring,
  nextBreakSeconds,
  currentMode,
  profiles,
  onAddChild
}: { 
  currentChild: any, 
  onSwitchChild: (c: any) => void, 
  addNotification: (n: Omit<Notification, 'id'>) => void,
  notifications: Notification[],
  removeNotification: (id: string) => void,
  rewards: any[],
  onIncrementReward: (id: string) => void,
  onCreateGoal: (goal: any) => void,
  isMonitoring: boolean,
  onToggleMonitoring: () => void,
  nextBreakSeconds: number,
  currentMode: 'parent' | 'child' | 'none',
  profiles?: any[],
  onAddChild?: () => void
}) => {
  const navigate = useNavigate();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isHealthTipsOpen, setIsHealthTipsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [newGoal, setNewGoal] = useState({ item: '', icon: '📚', goal: 3, unit: 'Books' });
  const [selectedReward, setSelectedReward] = useState<any | null>(null);

  const addCustomGoal = () => {
    if (!newGoal.item) return;
    const goal = {
      id: Math.random().toString(36).substr(2, 9),
      ...newGoal,
      progress: 0,
      color: 'bg-emerald-400',
      type: 'custom',
      notified: false,
      fulfilled: false
    };
    onCreateGoal(goal);
    setIsAddGoalOpen(false);
    setNewGoal({ item: '', icon: '📚', goal: 3, unit: 'Books' });
  };

  const incrementProgress = (id: string) => {
    onIncrementReward(id);
    if (selectedReward?.id === id) {
      setSelectedReward(prev => prev ? { ...prev, progress: Math.min(prev.goal, prev.progress + 1) } : null);
    }
  };

  useEffect(() => {
    // Check for rank achievement (mockup logic)
    if (parseFloat(currentChild.pts.replace('k', '')) > 13 && currentChild.rank !== 'Super Eye Hero') {
      addNotification({
        title: 'Rank Up!',
        message: `${currentChild.name} is now a Super Eye Hero!`,
        type: 'success'
      });
    }
  }, [currentChild.pts, currentChild.name, currentChild.rank, addNotification]);

  // Break Timer logic removed as it's now in App.tsx

  const toggleMonitoring = () => {
    onToggleMonitoring();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Layout currentChild={currentChild} onSwitchChild={onSwitchChild} activeTab="dashboard" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={onAddChild}>
      <div className="px-6 py-8 flex flex-col md:flex-row gap-10 h-full">
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-10 rounded-[40px] text-white shadow-xl shadow-indigo-100 overflow-hidden relative group">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-extrabold mb-2">Hi, {currentChild.name}! 👋</h2>
                <p className="opacity-90 text-xl font-medium">You've been focused for 45 minutes today.</p>
              </div>
              <button 
                onClick={toggleMonitoring}
                className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isMonitoring ? 'bg-emerald-400 text-emerald-900 shadow-lg shadow-emerald-500/20' : 'bg-white/20 text-white backdrop-blur-md'}`}
              >
                {isMonitoring ? '● Monitoring Active' : 'Start Monitoring'}
              </button>
            </div>
            
            <div className="bg-white/20 p-8 rounded-[32px] backdrop-blur-md">
              <div className="flex justify-between mb-4 font-black">
                <span className="uppercase tracking-widest text-sm">Next Eye Break</span>
                <span className="font-mono text-2xl">{isMonitoring ? formatTime(nextBreakSeconds) : 'Paused'}</span>
              </div>
              <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                   animate={{ width: isMonitoring ? `${(nextBreakSeconds / (20 * 60)) * 100}%` : '0%' }}
                   transition={{ duration: 1, ease: "linear" }}
                   className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button 
              onClick={() => setIsQuizOpen(true)}
              disabled={quizCompleted}
              className={`md:col-span-3 bg-gradient-to-r from-orange-50 to-amber-50 border-4 border-white shadow-lg shadow-orange-100/50 p-10 rounded-[40px] flex items-center justify-between group active:scale-95 transition-all text-left ${quizCompleted ? 'opacity-60 grayscale' : ''}`}
            >
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-5xl shadow-sm group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <div>
                  <h4 className="text-3xl font-black text-orange-900 mb-2">Daily Super Brain Quiz</h4>
                  <p className="text-orange-700 text-lg font-bold">
                    {quizCompleted ? "You've finished today's quiz! Come back tomorrow." : "Play now for +500 Eye Points!"}
                  </p>
                </div>
              </div>
              {!quizCompleted && (
                <div className="w-16 h-16 rounded-3xl bg-orange-500 text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-xl shadow-orange-200">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </button>

            <button 
              onClick={() => setIsHealthTipsOpen(true)}
              className="md:col-span-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-4 border-white shadow-lg shadow-emerald-100/30 p-8 rounded-[40px] flex items-center justify-between group active:scale-95 transition-all text-left"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm group-hover:rotate-6 transition-transform">
                  🎓
                </div>
                <div>
                  <h4 className="text-2xl font-black text-emerald-900 mb-1">Vision Health Guide</h4>
                  <p className="text-emerald-700 font-bold">Learn how to keep your super vision sharp!</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-lg shadow-emerald-200">
                <ArrowRight className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        <div className="w-full md:w-96 flex flex-col gap-8">
          <div className="bg-white border border-slate-100 rounded-[40px] p-8 flex flex-col shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Sibling Leaderboard</h3>
            <div className="space-y-4">
              {(profiles || CHILD_PROFILES).sort((a, b) => parseFloat(b.pts) - parseFloat(a.pts)).map((child, i) => (
                <div key={child.id} className={`flex items-center gap-4 p-3 rounded-2xl ${child.id === currentChild.id ? 'bg-indigo-50 border border-indigo-100' : ''}`}>
                  <div className="w-6 h-6 font-black text-slate-400 text-xs flex items-center justify-center">{i + 1}</div>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${child.seed}`} className="w-10 h-10 rounded-lg" alt={child.name} />
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800">{child.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{child.rank}</p>
                  </div>
                  <div className="text-sm font-black text-indigo-600">{child.pts}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] p-8 flex flex-col shadow-xl shadow-slate-200/50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Rewards Tracker</h3>
            <button 
              onClick={() => setIsAddGoalOpen(true)}
              className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
              title="Add Custom Goal"
            >
              <Star className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {rewards.map((reward) => (
              <div 
                key={reward.id} 
                onClick={() => setSelectedReward(reward)}
                className="p-5 bg-slate-50 rounded-3xl flex items-center gap-5 border border-slate-100 group cursor-pointer hover:bg-white transition-colors relative overflow-hidden"
              >
                {reward.progress >= reward.goal && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-emerald-500/5 flex items-center justify-center"
                  >
                     <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">READY!</div>
                  </motion.div>
                )}
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">{reward.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800 mb-2">{reward.item}</p>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(reward.progress / reward.goal) * 100}%` }}
                      className={`h-full ${reward.color}`} 
                    />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    {Math.round(reward.progress)} / {reward.goal} {reward.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selectedReward && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-6 p-6 bg-indigo-900 rounded-[32px] text-white relative shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedReward(null)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                  ✕
                </button>
                <div className="text-4xl mb-3">{selectedReward.icon}</div>
                <h4 className="font-black text-xl mb-1">{selectedReward.item}</h4>
                <p className="text-indigo-200 text-sm font-medium mb-4">
                  {selectedReward.progress >= selectedReward.goal 
                    ? "Congratulations! You've earned this reward. Ask your parents to claim it!"
                    : `Keep up your healthy habits to unlock this. You're doing great!`}
                </p>

                {selectedReward.type === 'custom' && selectedReward.progress < selectedReward.goal && (
                  <button 
                    onClick={() => incrementProgress(selectedReward.id)}
                    className="w-full py-3 mb-4 bg-emerald-400 text-emerald-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Mark 1 {selectedReward.unit} Done!
                  </button>
                )}

                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-400" style={{ width: `${(selectedReward.progress / selectedReward.goal) * 100}%` }} />
                </div>
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
                  {Math.round((selectedReward.progress / selectedReward.goal) * 100)}% Completed
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-10">
            <button 
              onClick={() => navigate('/awards')}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl shadow-slate-300 hover:bg-slate-800 active:scale-95 transition-all"
            >
              View All Rewards
            </button>
          </div>
        </div>
      </div>
    </div>

      <Modal isOpen={isAddGoalOpen} onClose={() => setIsAddGoalOpen(false)} title="Set a New Goal">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Goal Name</label>
            <input 
              type="text" 
              placeholder="e.g. Read 3 books this week"
              value={newGoal.item}
              onChange={(e) => setNewGoal({ ...newGoal, item: e.target.value })}
              className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Target Count</label>
              <input 
                type="number" 
                value={newGoal.goal}
                onChange={(e) => setNewGoal({ ...newGoal, goal: parseInt(e.target.value) || 1 })}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Unit</label>
              <input 
                type="text" 
                placeholder="Books, Stars, etc."
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Pick an Icon</label>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {['📚', '🏃', '🥦', '🎸', '🎨', '🧹', '🧩', '🥛'].map((icon) => (
                <button 
                  key={icon}
                  onClick={() => setNewGoal({ ...newGoal, icon })}
                  className={`w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl transition-all ${newGoal.icon === icon ? 'bg-indigo-600 shadow-lg shadow-indigo-200 border-none' : 'bg-slate-100 border border-slate-200 opacity-60 hover:opacity-100'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={addCustomGoal}
            className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all mt-4"
          >
            CREATE GOAL
          </button>
        </div>
      </Modal>

      <HealthTipsModal isOpen={isHealthTipsOpen} onClose={() => setIsHealthTipsOpen(false)} />
      
      <SuperBrainQuiz 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        onComplete={(earnedScore: number) => {
          setQuizCompleted(true);
          const currentVal = parseFloat(currentChild.pts.replace('k', ''));
          const bonus = earnedScore * 0.2; // 0.2k per correct answer
          onSwitchChild({ ...currentChild, pts: (currentVal + bonus).toFixed(1) + 'k' });
          addNotification({
            title: 'Quiz Finished!',
            message: `You earned +${(bonus * 1000).toFixed(0)} Eye Points!`,
            type: 'reward'
          });
        }}
      />
    </Layout>
  );
};

const SuperBrainQuiz = ({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: (score: number) => void }) => {
  const [step, setStep] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "What is 15 + 12?",
      options: ["25", "27", "29", "22"],
      correct: 1
    },
    {
      q: "Which fruit is famous for Vitamin A?",
      options: ["Apple", "Orange", "Mango", "Blueberry"],
      correct: 2
    },
    {
      q: "How far should you look away during a break?",
      options: ["5 feet", "10 feet", "20 feet", "100 feet"],
      correct: 2
    },
    {
      q: "What is the 20-20-20 rule for?",
      options: ["Cooking", "Eye Health", "Running", "Gaming"],
      correct: 1
    },
    {
      q: "What is 120 divided by 10?",
      options: ["10", "12", "14", "20"],
      correct: 1
    },
    {
      q: "Which nutrient helps with brain & eye health?",
      options: ["Vitamin C", "DHA", "Iron", "Glucose"],
      correct: 1
    },
    {
      q: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Rome"],
      correct: 2
    },
    {
      q: "How many hours of outdoor play is recommended?",
      options: ["30 mins", "1 hour", "2+ hours", "None"],
      correct: 2
    }
  ];

  const handleNext = () => {
    if (selectedOpt === questions[step].correct) {
      setScore(s => s + 1);
    }
    
    if (step === questions.length - 1) {
      setShowResult(true);
    } else {
      setStep(step + 1);
      setSelectedOpt(null);
    }
  };

  const handleFinish = () => {
    onComplete(score);
    // Reset state for next time
    setStep(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Quiz Results!">
        <div className="text-center space-y-8">
          <div className="w-40 h-40 bg-amber-50 rounded-full flex items-center justify-center text-8xl mx-auto shadow-inner relative">
            <motion.div
              initial={{ scale: 0.5, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              className="z-10"
            >
              {score === questions.length ? '🏆' : score > 0 ? '🥈' : '🥉'}
            </motion.div>
            <div className="absolute inset-0 animate-ping rounded-full bg-amber-400/10" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">Quiz Complete!</h3>
            <p className="text-slate-500 font-bold text-lg">You got {score} out of {questions.length} questions correct!</p>
          </div>
          <div className="bg-emerald-50 p-8 rounded-[40px] border-4 border-white shadow-lg space-y-2">
             <p className="text-emerald-500 font-black uppercase tracking-widest text-xs">Total Eye Points Earned</p>
             <p className="text-4xl font-black text-emerald-900">+{score * 200} ✨</p>
          </div>
          <button 
            onClick={handleFinish}
            className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            CLAIM REWARDS & CLOSE!
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Daily Super Brain Quiz">
      <div className="space-y-8">
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
            <span className="text-sm font-black text-indigo-600 font-mono">Q{step + 1} OF {questions.length}</span>
          </div>
          <div className="flex gap-1.5">
            {questions.map((_, i) => (
              <div key={i} className={`w-10 h-2.5 rounded-full transition-all duration-500 ${i === step ? 'bg-orange-500 w-16' : i < step ? 'bg-orange-200' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        <div className="text-center py-4">
           <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">
             <HelpCircle className="w-8 h-8" />
           </div>
           <h3 className="text-2xl font-black text-slate-900 mb-8 leading-tight px-4">{questions[step].q}</h3>
           <div className="grid grid-cols-1 gap-4">
             {questions[step].options.map((opt, i) => (
               <button 
                key={i}
                onClick={() => setSelectedOpt(i)}
                className={`w-full py-6 rounded-[32px] font-black text-lg transition-all border-4 ${
                  selectedOpt === i 
                    ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-xl shadow-orange-100 translate-y-[-2px]' 
                    : 'border-slate-50 bg-slate-50 text-slate-600 hover:border-slate-200'
                }`}
               >
                 {opt}
               </button>
             ))}
           </div>
        </div>

        <button 
          disabled={selectedOpt === null}
          onClick={handleNext}
          className={`w-full py-6 rounded-[32px] font-black text-xl shadow-2xl transition-all group overflow-hidden relative ${
            selectedOpt !== null 
              ? 'bg-orange-500 text-white shadow-orange-200 hover:brightness-110 active:scale-95' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">
            {step === questions.length - 1 ? 'FINISH & SEE RESULT! ✨' : 'NEXT QUESTION 🚀'}
          </span>
          {selectedOpt !== null && (
            <motion.div 
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          )}
        </button>
      </div>
    </Modal>
  );
};

const Awards = ({ currentChild, onSwitchChild, notifications, removeNotification, currentMode, profiles, onAddChild }: { 
  currentChild: any, 
  onSwitchChild: (c: any) => void, 
  notifications: Notification[], 
  removeNotification: (id: string) => void,
  currentMode: 'parent' | 'child' | 'none',
  profiles?: any[],
  onAddChild?: () => void
}) => {
  const navigate = useNavigate();
  const [isOpeningBox, setIsOpeningBox] = useState(false);
  const [prize, setPrize] = useState<{ icon: string, name: string } | null>(null);

  const openBox = () => {
    setIsOpeningBox(true);
    setTimeout(() => {
      const prizes = [
        { icon: '🍦', name: 'Premium Ice Cream' },
        { icon: '🕹️', name: 'Extra Gaming Hour' },
        { icon: '🎬', name: 'Movie Night Ticket' },
        { icon: '🎢', name: 'Theme Park Trip' },
      ];
      setPrize(prizes[Math.floor(Math.random() * prizes.length)]);
      setIsOpeningBox(false);
    }, 2000);
  };

  return (
    <Layout currentChild={currentChild} onSwitchChild={onSwitchChild} activeTab="awards" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={onAddChild}>
      <div className="px-6 py-10 space-y-12">
        <section className="text-center">
           <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Trophy Room</h2>
           <p className="text-slate-500 font-bold text-lg">Collect stars to unlock amazing prizes!</p>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Early Bird', sub: 'Unlocked 2 days ago', icon: '⭐', borderColor: 'border-amber-400' },
            { label: 'Focus Master', sub: 'Unlocked yesterday', icon: '🎖️', borderColor: 'border-indigo-400' },
            { label: 'Eye Hero', sub: '12 sessions to go', icon: '💎', borderColor: 'border-slate-300', locked: true },
            { label: 'Space Cadet', sub: '5 day streak', icon: '🚀', borderColor: 'border-slate-300', locked: true },
          ].map((trophy, i) => (
            <div key={i} className={`bg-white p-8 rounded-[40px] border-4 ${trophy.borderColor} text-center shadow-xl shadow-slate-200/50 flex flex-col items-center group hover:-translate-y-2 transition-transform ${trophy.locked ? 'opacity-50 grayscale border-dashed bg-slate-50' : ''}`}>
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500">{trophy.icon}</div>
              <h4 className="font-extrabold text-slate-900 text-xl mb-1">{trophy.label}</h4>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{trophy.sub}</p>
            </div>
          ))}
        </section>

        <section className="bg-indigo-900 rounded-[50px] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-200 overflow-hidden relative">
          <motion.div 
            animate={isOpeningBox ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1.1, 1] } : {}}
            transition={{ repeat: isOpeningBox ? Infinity : 0, duration: 0.3 }}
            className="flex items-center gap-8 z-10"
          >
            <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center text-5xl shadow-2xl shadow-amber-400/40">📦</div>
            <div>
              <h3 className="text-3xl font-black mb-2 tracking-tight">Mystery Box Unlocked!</h3>
              <p className="opacity-80 text-lg font-medium">You've reached your weekly goal of 20 eye breaks.</p>
            </div>
          </motion.div>
          <button 
            onClick={openBox}
            disabled={isOpeningBox}
            className="px-12 py-5 bg-white text-indigo-900 rounded-[28px] font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-950/20 z-10"
          >
            {isOpeningBox ? 'OPENING...' : 'OPEN NOW'}
          </button>
          
          <AnimatePresence>
            {prize && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-indigo-600/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8"
              >
                <motion.div 
                  initial={{ y: 20 }} animate={{ y: 0 }}
                  className="text-8xl mb-6"
                >
                  {prize.icon}
                </motion.div>
                <h4 className="text-3xl font-black mb-2">YOU WON!</h4>
                <p className="text-xl font-bold opacity-90 mb-8">{prize.name}</p>
                <button 
                  onClick={() => setPrize(null)}
                  className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:scale-105"
                >
                  AWESOME!
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </Layout>
  );
};

const Performance = ({ currentChild, onSwitchChild, notifications, removeNotification, currentMode, profiles, onAddChild }: { 
  currentChild: any, 
  onSwitchChild: (c: any) => void, 
  notifications: Notification[], 
  removeNotification: (id: string) => void,
  currentMode: 'parent' | 'child' | 'none',
  profiles?: any[],
  onAddChild?: () => void
}) => {
  return (
    <Layout currentChild={currentChild} onSwitchChild={onSwitchChild} activeTab="performance" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={onAddChild}>
      <div className="px-6 py-10 space-y-10">
        <section className="text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Family Performance</h2>
          <p className="text-slate-500 font-bold text-lg">Detailed quiz scores and cognitive tracking</p>
        </section>

        <section className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sibling Hall of Fame</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(profiles || CHILD_PROFILES).sort((a, b) => parseFloat(b.pts) - parseFloat(a.pts)).map((child, i) => (
                <div key={child.id} className={`p-8 rounded-[40px] border-4 transition-all hover:scale-105 ${i === 0 ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-white'}`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-[24px] bg-white shadow-md overflow-hidden p-1">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${child.seed}`} alt={child.name} className="w-full h-full" />
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'bg-amber-400 text-amber-900' : 'bg-slate-200 text-slate-500'}`}>
                      {i === 0 ? '🏆 CHAMPION' : `RANK #${i + 1}`}
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-1">{child.name}</h4>
                  <p className="text-indigo-600 font-black text-xs uppercase tracking-widest mb-4">{child.rank}</p>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-white rounded-2xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">POINTS</p>
                      <p className="text-xl font-black text-slate-900">{child.pts}</p>
                    </div>
                    <div className="flex-1 p-4 bg-white rounded-2xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase mb-1">BADGES</p>
                      <p className="text-xl font-black text-slate-900">{child.badges}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-100">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-orange-500" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Child: {currentChild.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-orange-50 rounded-[32px] text-center border-2 border-white shadow-sm">
                  <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Pass Rate</p>
                  <p className="text-5xl font-black text-orange-900">100%</p>
                </div>
                <div className="p-8 bg-indigo-50 rounded-[32px] text-center border-2 border-white shadow-sm">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Points Earned</p>
                  <p className="text-5xl font-black text-indigo-900">4.1k</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-500" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Learning Milestones</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Total Quizzes", value: "12" },
                  { label: "Average Score", value: "92%" },
                  { label: "Favorite Topic", value: "Eye Health" },
                  { label: "Streak", value: "5 Days" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className="text-sm font-black text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 tracking-tight px-2">Knowledge Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { category: 'Eye Anatomy', score: 85, color: 'bg-indigo-500' },
                { category: 'Healthy Habits', score: 98, color: 'bg-emerald-500' },
                { category: 'Digital Safety', score: 92, color: 'bg-orange-500' },
              ].map((cat, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-black text-slate-900">{cat.category}</span>
                    <span className="text-sm font-black text-indigo-600">{cat.score}%</span>
                  </div>
                  <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      className={`h-full ${cat.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const DistanceSentinel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<'too_close' | 'safe' | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setResult(Math.random() > 0.5 ? 'safe' : 'too_close');
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Distance Sentinel">
      <div className="text-center space-y-8">
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse" />
          <motion.div 
            animate={isScanning ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className={`absolute inset-0 border-4 border-dashed rounded-full ${isScanning ? 'border-blue-500' : 'border-slate-200'}`}
          />
          <div className="absolute inset-0 flex items-center justify-center text-6xl">
            {isScanning ? '🔍' : result === 'safe' ? '✅' : result === 'too_close' ? '⚠️' : '📱'}
          </div>
          {isScanning && (
            <motion.div 
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6] z-10"
            />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">
            {isScanning ? 'Analyzing Proximity...' : result === 'safe' ? "Perfect Distance! 🎊" : result === 'too_close' ? "Too Close! 🛑" : "Ready to Scan"}
          </h3>
          <p className="text-slate-500 font-bold">
            {isScanning ? "Please stay still and look at the screen." : result === 'safe' ? "You're at a healthy distance. Keep it up!" : result === 'too_close' ? "Back up a bit and try scanning again." : "Tap start and see if you're sitting safely."}
          </p>
        </div>

        {result === 'too_close' && (
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-3 text-left">
            <div className="text-2xl">📏</div>
            <p className="text-xs font-bold text-orange-800">Pro Tip: Try to keep your screen at an arm's length (about 20 inches) away!</p>
          </div>
        )}

        <button 
          onClick={startScan}
          disabled={isScanning}
          className={`w-full py-5 rounded-[28px] font-black text-xl shadow-xl transition-all ${isScanning ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:scale-105 active:scale-95 shadow-blue-200'}`}
        >
          {isScanning ? 'SCANNING...' : result ? 'RE-SCAN' : 'START DISTANCE SCAN'}
        </button>
      </div>
    </Modal>
  );
};

const EyeExercises = ({ currentChild, onSwitchChild, notifications, removeNotification, currentMode, profiles, onAddChild }: { 
  currentChild: any, 
  onSwitchChild: (c: any) => void, 
  notifications: Notification[], 
  removeNotification: (id: string) => void,
  currentMode: 'parent' | 'child' | 'none',
  profiles?: any[],
  onAddChild?: () => void
}) => {
  const navigate = useNavigate();
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [exerciseTime, setExerciseTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isDistanceOpen, setIsDistanceOpen] = useState(false);

  const exercises = [
    { 
      id: 0, 
      name: "Super Blinks", 
      desc: "Blink fast to hydrate your eyes!", 
      icon: <Droplets className="w-12 h-12" />, 
      color: "bg-blue-500", 
      duration: 30,
      visual: (
        <motion.div 
          animate={{ scale: [1, 0.8, 1], opacity: [1, 0.5, 1] }} 
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl"
        >
          👁️
        </motion.div>
      )
    },
    { 
      id: 1, 
      name: "Focus Shift", 
      desc: "Look at your thumb, then far away!", 
      icon: <Compass className="w-12 h-12" />, 
      color: "bg-emerald-500", 
      duration: 45,
      visual: (
        <motion.div 
          animate={{ x: [-50, 50, -50], scale: [1, 1.5, 1] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center text-5xl shadow-xl"
        >
          👍
        </motion.div>
      )
    },
    { 
      id: 2, 
      name: "Eye Rolls", 
      desc: "Roll your eyes in big circles!", 
      icon: <RefreshCw className="w-12 h-12" />, 
      color: "bg-purple-500", 
      duration: 30,
      visual: (
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-32 h-32 rounded-full bg-purple-100 flex items-center justify-center text-5xl"
        >
          🌀
        </motion.div>
      )
    },
    { 
      id: 3, 
      name: "The Palming", 
      desc: "Cover your eyes and see deep space!", 
      icon: <Moon className="w-12 h-12" />, 
      color: "bg-slate-900", 
      duration: 60,
      visual: (
        <motion.div 
          animate={{ opacity: [0.3, 0.8, 0.3] }} 
          transition={{ repeat: Infinity, duration: 4 }}
          className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center text-5xl shadow-2xl"
        >
          🌑
        </motion.div>
      )
    }
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (activeExercise !== null && exerciseTime > 0) {
      timer = setInterval(() => {
        setExerciseTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeExercise, exerciseTime]);

  const startExercise = (idx: number) => {
    setActiveExercise(idx);
    setExerciseTime(exercises[idx].duration);
    setIsFinished(false);
  };

  const finishExercise = () => {
    setActiveExercise(null);
    setIsFinished(false);
  };

  return (
    <Layout currentChild={currentChild} onSwitchChild={onSwitchChild} activeTab="exercises" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={onAddChild}>
      <div className="px-6 py-10 space-y-12">
        <section className="text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Eye Gym</h2>
          <p className="text-slate-500 font-bold max-w-lg mx-auto leading-relaxed">
            Train your eye muscles to become a true Eye Hero! ⚡
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDistanceOpen(true)}
            className="md:col-span-2 group relative bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-[40px] shadow-xl shadow-blue-100 transition-all text-left flex items-center justify-between overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-8 text-white">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:rotate-12 transition-transform">
                📏
              </div>
              <div>
                <h3 className="text-2xl font-black mb-1 leading-tight">Distance Sentinel</h3>
                <p className="text-blue-100 font-bold text-sm">Check if your screen is too close!</p>
              </div>
            </div>
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center group-hover:translate-x-2 transition-transform text-white">
              <Ruler className="w-7 h-7" />
            </div>
            {/* Decorative background circle */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
          </motion.button>

          {exercises.map((ex, i) => (
            <motion.button
              key={ex.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startExercise(i)}
              className="group relative bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all text-left flex flex-col"
            >
              <div className={`w-16 h-16 rounded-3xl ${ex.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                {ex.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{ex.name}</h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed mb-6">{ex.desc}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ex.duration} SECONDS</span>
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <section className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-white rounded-[48px] p-12 text-center shadow-xl shadow-orange-100/50">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-sm">💡</div>
          <h3 className="text-2xl font-black text-orange-900 mb-2 tracking-tight">Pro Tip: The Blink Trick</h3>
          <p className="text-orange-700 font-bold max-w-xl mx-auto leading-relaxed">
            Did you know? Blinking often acts like a tiny "car wash" for your eyes, keeping them clean and sparkly!
          </p>
        </section>

        <AnimatePresence>
          {activeExercise !== null && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-[48px] w-full max-w-2xl p-12 text-center shadow-2xl relative overflow-hidden"
              >
                {!isFinished ? (
                  <>
                    <h2 className="text-4xl font-black text-slate-900 mb-4">{exercises[activeExercise].name}</h2>
                    <p className="text-slate-500 font-bold mb-12">{exercises[activeExercise].desc}</p>
                    
                    <div className="flex justify-center mb-16">
                      {exercises[activeExercise].visual}
                    </div>

                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="50%" cy="50%" r="45%" className="stroke-slate-100 fill-none" strokeWidth="8" />
                        <motion.circle
                          cx="50%" cy="50%" r="45%"
                          className={`fill-none ${exercises[activeExercise].color.replace('bg-', 'stroke-')}`}
                          strokeWidth="8"
                          strokeLinecap="round"
                          initial={{ pathLength: 1 }}
                          animate={{ pathLength: exerciseTime / exercises[activeExercise].duration }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </svg>
                      <span className="text-6xl font-black text-slate-900">{exerciseTime}</span>
                    </div>

                    <button 
                      onClick={finishExercise}
                      className="mt-12 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-600"
                    >
                      SKIP EXERCISE
                    </button>
                  </>
                ) : (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-6xl mx-auto shadow-xl shadow-emerald-100/50">✨</div>
                    <div>
                      <h2 className="text-4xl font-black text-slate-900 mb-2">Great Job!</h2>
                      <p className="text-slate-500 font-bold">You've strengthened your super vision today.</p>
                    </div>
                    <div className="p-6 bg-emerald-50 rounded-[32px] border-2 border-emerald-100 inline-block font-black text-emerald-600 uppercase tracking-widest text-sm">
                      +150 EYE POINTS EARNED!
                    </div>
                    <button 
                      onClick={finishExercise}
                      className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      AWESOME!
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

// --- App Root ---

const RemindersWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default function App() {
  const [currentChild, setCurrentChild] = useState(CHILD_PROFILES[0]);
  const [profiles, setProfiles] = useState(CHILD_PROFILES);

  const handleAddChild = () => {
    const newId = `child-${Math.random().toString(36).substr(2, 9)}`;
    const newChild = { 
      id: newId, 
      name: 'New Child', 
      seed: 'Adventurer', 
      rank: 'Star Gazer', 
      pts: '0', 
      badges: 0 
    };
    setProfiles(prev => [...prev, newChild]);
    addNotification({
      title: 'Success!',
      message: 'New child profile added!',
      type: 'success'
    });
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [rewards, setRewards] = useState([
    { id: '1', item: 'Ice Cream Trip', icon: '🍦', progress: 75, color: 'bg-pink-400', goal: 100, unit: 'Break Stars', type: 'system', notified: false, fulfilled: false },
    { id: '2', item: 'Gaming Hour', icon: '🕹️', progress: 25, color: 'bg-indigo-400', goal: 50, unit: 'Posture Points', type: 'system', notified: false, fulfilled: false },
  ]);

  // Shared Health & Monitoring State
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [postureState, setPostureState] = useState<'good' | 'bad' | 'checking'>('good');
  const [lightLevel, setLightLevel] = useState(85);
  const [outdoorTime, setOutdoorTime] = useState(45);
  const [nextBreakSeconds, setNextBreakSeconds] = useState(20 * 60);
  const [currentMode, setCurrentMode] = useState<'parent' | 'child' | 'none'>('none');

  const navigate = useNavigate();

  const addNotification = useCallback((n: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...n, id }]);
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, 5000);
  }, []);

  const triggerPostureScan = useCallback(() => {
    setPostureState('checking');
    setTimeout(() => {
      const isGood = Math.random() > 0.3;
      setPostureState(isGood ? 'good' : 'bad');
      setLightLevel(Math.floor(Math.random() * (95 - 75 + 1) + 75));
      if (!isGood) {
        addNotification({
          title: 'Posture Alert',
          message: `${currentChild.name} needs to sit up straight!`,
          type: 'info'
        });
      }
    }, 2000);
  }, [currentChild.name, addNotification]);

  // Break Timer Logic (Global)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isMonitoring && nextBreakSeconds > 0) {
      interval = setInterval(() => {
        setNextBreakSeconds(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate('/break-reminder');
            return 20 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring, nextBreakSeconds, navigate]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleIncrementReward = (id: string) => {
    setRewards(prev => prev.map(r => {
      if (r.id === id) {
        const newProgress = Math.min(r.goal, r.progress + 1);
        if (newProgress === r.goal && !r.notified) {
          addNotification({
            title: 'Reward Unlocked!',
            message: `You earned: ${r.item}! Ask parent to fulfill.`,
            type: 'reward'
          });
          return { ...r, progress: newProgress, notified: true };
        }
        return { ...r, progress: newProgress };
      }
      return r;
    }));
  };

  const handleCreateGoal = (goal: any) => {
    setRewards(prev => [...prev, goal]);
    addNotification({
      title: 'New Goal Set!',
      message: `Time to crush: ${goal.item}`,
      type: 'info'
    });
  };

  const fulfillReward = (id: string) => {
    setRewards(prev => prev.filter(r => r.id !== id));
    addNotification({
      title: 'Reward Gifted! 🎁',
      message: `Successfully fulfilled for ${currentChild.name}`,
      type: 'success'
    });
  };

  return (
    <RemindersWrapper>
      <Routes>
        <Route path="/" element={<Layout currentChild={currentChild} onSwitchChild={setCurrentChild} hideNav activeTab="mode" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={handleAddChild}><ModeSelection onSelectMode={setCurrentMode} /></Layout>} />
        <Route path="/parent-analytics" element={
          currentMode !== 'parent' ? <Layout currentChild={currentChild} onSwitchChild={setCurrentChild} hideNav activeTab="mode" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={handleAddChild}><ModeSelection onSelectMode={setCurrentMode} /></Layout> : (
          <ParentAnalytics 
            currentChild={currentChild} 
            onSwitchChild={setCurrentChild} 
            notifications={notifications} 
            removeNotification={removeNotification} 
            rewards={rewards} 
            onFulfillReward={fulfillReward}
            isMonitoring={isMonitoring}
            onToggleMonitoring={() => setIsMonitoring(!isMonitoring)}
            postureState={postureState}
            onTriggerScan={triggerPostureScan}
            lightLevel={lightLevel}
            outdoorTime={outdoorTime}
            onAddOutdoorTime={() => setOutdoorTime(prev => prev + 15)}
            nextBreakSeconds={nextBreakSeconds}
            currentMode={currentMode}
            setRewards={setRewards}
            profiles={profiles}
            onAddChild={handleAddChild}
          />)
        } />
        <Route path="/performance" element={
          currentMode !== 'parent' ? <Layout currentChild={currentChild} onSwitchChild={setCurrentChild} hideNav activeTab="mode" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={handleAddChild}><ModeSelection onSelectMode={setCurrentMode} /></Layout> : (
          <Performance
            currentChild={currentChild}
            onSwitchChild={setCurrentChild}
            notifications={notifications}
            removeNotification={removeNotification}
            currentMode={currentMode}
            profiles={profiles}
            onAddChild={handleAddChild}
          />)
        } />
        <Route path="/break-reminder" element={<BreakReminder />} />
        <Route path="/child-dashboard" element={
          currentMode !== 'child' ? <Layout currentChild={currentChild} onSwitchChild={setCurrentChild} hideNav activeTab="mode" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={handleAddChild}><ModeSelection onSelectMode={setCurrentMode} /></Layout> : (
          <ChildDashboard 
            currentChild={currentChild} 
            onSwitchChild={setCurrentChild} 
            addNotification={addNotification} 
            notifications={notifications} 
            removeNotification={removeNotification} 
            rewards={rewards} 
            onIncrementReward={handleIncrementReward} 
            onCreateGoal={handleCreateGoal}
            isMonitoring={isMonitoring}
            onToggleMonitoring={() => setIsMonitoring(!isMonitoring)}
            nextBreakSeconds={nextBreakSeconds}
            currentMode={currentMode}
            profiles={profiles}
            onAddChild={handleAddChild}
          />)
        } />
        <Route path="/eye-exercises" element={
          currentMode !== 'child' ? <Layout currentChild={currentChild} onSwitchChild={setCurrentChild} hideNav activeTab="mode" notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={handleAddChild}><ModeSelection onSelectMode={setCurrentMode} /></Layout> : (
          <EyeExercises
            currentChild={currentChild}
            onSwitchChild={setCurrentChild}
            notifications={notifications}
            removeNotification={removeNotification}
            currentMode={currentMode}
            profiles={profiles}
            onAddChild={handleAddChild}
          />)
        } />
        <Route path="/awards" element={<Awards currentChild={currentChild} onSwitchChild={setCurrentChild} notifications={notifications} removeNotification={removeNotification} currentMode={currentMode} profiles={profiles} onAddChild={handleAddChild} />} />
      </Routes>
    </RemindersWrapper>
  );
}
