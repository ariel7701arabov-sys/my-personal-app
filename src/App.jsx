import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, Utensils, GraduationCap, BookOpen, LayoutDashboard, CheckCircle2, 
  Clock, Plus, Trash2, Pencil, ChevronLeft, Wallet, X, Save, TrendingUp, 
  ArrowDownLeft, ArrowUpRight, HeartHandshake, Book, Check, Beef, Flame, 
  AlertTriangle, AlertCircle, Moon, Sun, Droplets, Calculator, Archive, 
  Star, Package, History, ChevronDown, ChevronUp, Scale, List, RefreshCw, 
  Play, Pause, RotateCcw, SkipForward, BarChart3, Settings, Download, Upload,
  Calendar, Timer, LogOut
} from 'lucide-react';

// --- Hook לשמירה ב-LocalStorage ---
function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const stickyValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

// --- קבועים לתוכנית Ottermode ---
const OTTERMODE_MEALS = [
  { id: 'm1', name: 'בוקר: 3 ביצים, לחם עבה, אבוקדו/טחינה', cal: 650, prot: 25 },
  { id: 'm2', name: 'הבוסט הנוזלי: גיינר + 400מל חלב', cal: 800, prot: 40 },
  { id: 'm3', name: 'צהריים: 150ג בשר/עוף, אורז, ירקות', cal: 750, prot: 40 },
  { id: 'm4', name: 'אחרי אימון: טונה/קוטג, פחמימה, פרי', cal: 500, prot: 35 },
  { id: 'm5', name: 'לילה: יוגורט חלבון + שקדים', cal: 300, prot: 20 }
];

const WORKOUT_PLANS = {
  A: {
    title: 'אימון A: דחיפה (Push)',
    focus: 'חזה עליון וכתפיים',
    exercises: [
      { name: 'לחיצת חזה עליון (מכונה/משקולות)', sets: 3 },
      { name: 'לחיצת חזה שטוח', sets: 3 },
      { name: 'לחיצת כתפיים (ישיבה/עמידה)', sets: 3 },
      { name: 'הרחקת כתפיים לצדדים', sets: 5, note: 'עבודה נקייה' },
      { name: 'יד אחורית (פשיטה בכבל/משקולת)', sets: 3 }
    ]
  },
  B: {
    title: 'אימון B: משיכה (Pull)',
    focus: 'V-Taper ובטן',
    exercises: [
      { name: 'פולי עליון (אחיזה רחבה)', sets: 3 },
      { name: 'חתירה (פולי תחתון/מכונה)', sets: 3 },
      { name: 'כפיפת מרפקים (מוט/משקולות)', sets: 3 },
      { name: 'כפיפת מרפקים "פטישים"', sets: 3 },
      { name: 'כפיפות בטן בפולי עליון', sets: 3 },
      { name: 'הרמות רגליים בתלייה', sets: 3, note: 'עד כשל' }
    ]
  },
  C: {
    title: 'אימון C: רגליים (Legs)',
    focus: 'רגליים ותאומים',
    exercises: [
      { name: 'סקוואט (מכונה/מוט)', sets: 3 },
      { name: 'פשיטת ברכיים (מכונה)', sets: 3 },
      { name: 'כפיפת ברכיים (מכונה)', sets: 3 },
      { name: 'תאומים (עמידה/ישיבה)', sets: 4 }
    ]
  },
  Rest: { title: 'יום מנוחה', focus: 'התאוששות וגדילה', exercises: [] }
};

const WEEKLY_SCHEDULE = ['A', 'B', 'C', 'Rest', 'A', 'B', 'Rest'];

// --- רכיבי UI בסיסיים ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors ${className}`}>{children}</div>
);

const Button = ({ children, onClick, variant = "primary", className = "", size = "md" }) => {
  const baseStyle = "font-medium rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-none",
    secondary: "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600",
    danger: "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50",
    success: "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-200 dark:shadow-none",
    outline: "border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700",
    dark: "bg-slate-800 text-white hover:bg-slate-700"
  };
  const sizes = { xs: "px-2 py-1 text-xs", sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5", lg: "px-6 py-3 text-lg" };
  return <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}>{children}</button>;
};

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    green: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
    yellow: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300",
    red: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
    purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    gray: "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
  };
  return <span className={`${colors[color]} px-2.5 py-0.5 rounded-full text-xs font-bold`}>{children}</span>;
};

const IconButton = ({ icon: Icon, onClick, color = "slate" }) => {
  const colors = {
    slate: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700",
    red: "text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30",
    blue: "text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30",
  };
  return <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(e); }} className={`p-2 rounded-full transition-colors ${colors[color]}`}><Icon size={18} /></button>;
};

const ConfirmModal = ({ isOpen, text, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-sm scale-100 animate-in zoom-in-95 border dark:border-slate-700">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500"><AlertTriangle size={24} /></div>
          <div><h3 className="text-lg font-bold text-slate-800 dark:text-white">למחוק פריט זה?</h3><p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{text}</p></div>
          <div className="flex gap-3 w-full mt-2"><Button className="flex-1" variant="secondary" onClick={onCancel}>ביטול</Button><Button className="flex-1" variant="danger" onClick={onConfirm}>כן, מחק</Button></div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Functions ---
const isInCurrentWeek = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    const now = new Date();
    const dayOfWeek = now.getDay(); 
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    startOfWeek.setHours(0,0,0,0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23,59,59,999);
    return d >= startOfWeek && d <= endOfWeek;
};

const getTimeRemaining = (dateStr, timeStr) => {
    if (!dateStr) return null;
    const deadline = new Date(`${dateStr}T${timeStr || '23:59'}`);
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) return "הזמן עבר";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days} ימים, ${hours} שעות`;
    return `${hours} שעות, ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))} דקות`;
};

// --- מסכי הגדרות ---
const SettingsView = ({ targets, setTargets }) => {
    const handleExport = () => {
        const keys = Object.keys(localStorage);
        const exportObj = {};
        keys.forEach(k => exportObj[k] = JSON.parse(localStorage.getItem(k)));
        const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_mylife_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    Object.keys(data).forEach(key => {
                        localStorage.setItem(key, JSON.stringify(data[key]));
                    });
                    alert("הנתונים שוחזרו! מרענן...");
                    window.location.reload();
                } catch (err) { alert("שגיאה בטעינת הקובץ"); }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">הגדרות</h2>
            <Card className="p-4 bg-white dark:bg-slate-800">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2"><Dumbbell size={18} /> יעדי בריאות</h3>
                <div className="space-y-3">
                    <div><label className="text-xs text-slate-500 dark:text-slate-400">יעד קלוריות</label><input type="number" className="w-full p-2 rounded border dark:bg-slate-700 dark:text-white" value={targets.calories} onChange={(e) => setTargets({...targets, calories: parseInt(e.target.value) || 0})} /></div>
                    <div><label className="text-xs text-slate-500 dark:text-slate-400">יעד חלבון (גרם)</label><input type="number" className="w-full p-2 rounded border dark:bg-slate-700 dark:text-white" value={targets.protein} onChange={(e) => setTargets({...targets, protein: parseInt(e.target.value) || 0})} /></div>
                    <div><label className="text-xs text-slate-500 dark:text-slate-400">יעד מים (מ"ל)</label><input type="number" className="w-full p-2 rounded border dark:bg-slate-700 dark:text-white" value={targets.water} onChange={(e) => setTargets({...targets, water: parseInt(e.target.value) || 0})} /></div>
                </div>
            </Card>
            <Card className="p-4 bg-white dark:bg-slate-800">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2"><Save size={18} /> גיבוי ושחזור</h3>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={handleExport}><Download size={16} /> ייצוא</Button>
                    <Button variant="outline" className="flex-1" onClick={handleImport}><Upload size={16} /> ייבוא</Button>
                </div>
            </Card>
        </div>
    );
};

// --- מסך סטטיסטיקה וגרפים ---
const StatisticsView = ({ weightLog, jobs }) => {
    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 text-center">
            <h3 className="font-bold dark:text-white mb-2">סטטיסטיקה</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">כאן יופיעו הגרפים (דרושה ספריית Recharts)</p>
        </div>
    );
};

// 1. UniversityView 
const UniversityView = ({ assignments, setAssignments, courses, setCourses, askConfirm }) => {
  const [tab, setTab] = useState('assignments'); 
  const [assignFilter, setAssignFilter] = useState('active'); 
  const [form, setForm] = useState({ course: "", task: "", date: "", time: "23:59" });
  const [gradeForm, setGradeForm] = useState({ name: "", grade: "", credits: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const totalPoints = courses.reduce((acc, c) => acc + c.credits, 0);
  const weightedSum = courses.reduce((acc, c) => acc + (c.grade * c.credits), 0);
  const gpa = totalPoints > 0 ? (weightedSum / totalPoints).toFixed(2) : 0;

  const displayedAssignments = assignments.filter(a => 
    assignFilter === 'active' ? a.status !== 'submitted' : a.status === 'submitted'
  );

  const handleAssignSubmit = () => {
    if (!form.course || !form.task) return;
    if (editingId) { setAssignments(assignments.map(a => a.id === editingId ? { ...a, ...form } : a)); setEditingId(null); } 
    else { setAssignments([...assignments, { id: Date.now(), ...form, status: "pending" }]); }
    setForm({ course: "", task: "", date: "", time: "23:59" }); setIsFormOpen(false);
  };

  const handleGradeSubmit = () => {
      if (!gradeForm.name || !gradeForm.grade) return;
      setCourses([...courses, { id: Date.now(), name: gradeForm.name, grade: parseFloat(gradeForm.grade), credits: parseFloat(gradeForm.credits) || 0 }]);
      setGradeForm({ name: "", grade: "", credits: "" });
  };

  const updateStatus = (id, newStatus) => setAssignments(assignments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  const getStatusBadge = (status) => {
      switch(status) {
          case 'pending': return <Badge color="yellow">לביצוע</Badge>;
          case 'in_progress': return <Badge color="blue">בתהליך</Badge>;
          case 'done': return <Badge color="green">הושלם</Badge>;
          case 'submitted': return <Badge color="gray">הוגש</Badge>;
          default: return null;
      }
  };
  const handleDeleteAssign = (id) => askConfirm("המטלה תימחק לצמיתות.", () => setAssignments(assignments.filter(a => a.id !== id)));
  const handleDeleteCourse = (id) => askConfirm("למחוק קורס זה מהחישוב?", () => setCourses(courses.filter(c => c.id !== id)));

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
        <button onClick={() => setTab('assignments')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'assignments' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>מטלות</button>
        <button onClick={() => setTab('grades')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'grades' ? 'bg-white dark:bg-slate-600 shadow text-purple-600 dark:text-purple-300' : 'text-slate-500 dark:text-slate-400'}`}>ציונים</button>
      </div>

      {tab === 'assignments' ? (
          <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button onClick={() => setAssignFilter('active')} className={`text-sm px-3 py-1 rounded-full transition-colors ${assignFilter === 'active' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}>פעיל</button>
                    <button onClick={() => setAssignFilter('done')} className={`text-sm px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${assignFilter === 'done' ? 'bg-green-100 text-green-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}><History size={14} /> ארכיון</button>
                </div>
                <Button onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setForm({ course: "", task: "", date: "", time: "23:59" }); }} size="sm">{isFormOpen ? <X size={18} /> : <Plus size={18} />} {isFormOpen ? "סגור" : "חדש"}</Button>
              </div>
              {isFormOpen && (
                  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900">
                  <div className="grid gap-3">
                      <input placeholder="שם הקורס" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={form.course} onChange={e => setForm({...form, course: e.target.value})} />
                      <input placeholder="שם המטלה" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={form.task} onChange={e => setForm({...form, task: e.target.value})} />
                      <div className="flex gap-2"><input type="date" className="p-2 w-2/3 rounded border dark:bg-slate-700 dark:text-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /><input type="time" className="p-2 w-1/3 rounded border dark:bg-slate-700 dark:text-white" value={form.time} onChange={e => setForm({...form, time: e.target.value})} /></div>
                      <Button onClick={handleAssignSubmit}>{editingId ? "עדכן" : "הוסף"}</Button>
                  </div>
                  </Card>
              )}
              <div className="space-y-3">
                  {displayedAssignments.map(assign => (
                  <Card key={assign.id} className="p-4 border-l-4 border-l-blue-500 relative">
                      <div className="flex justify-between items-start mb-2">
                          <div><h3 className={`font-semibold ${assign.status === 'submitted' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>{assign.task}</h3><p className="text-sm text-slate-500 dark:text-slate-400">{assign.course}</p><div className="flex items-center gap-2 mt-1 text-xs font-mono text-orange-600 dark:text-orange-400">{getTimeRemaining(assign.date, assign.time)}</div></div>
                          <div className="flex flex-col items-end gap-1">{getStatusBadge(assign.status)}<div className="text-xs text-slate-400">{assign.date} {assign.time}</div></div>
                      </div>
                      <div className="flex justify-between items-end mt-3 border-t dark:border-slate-700 pt-2">
                          <div className="flex gap-2">
                               {assign.status === 'pending' && <button onClick={() => updateStatus(assign.id, 'in_progress')} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">התחל</button>}
                               {assign.status === 'in_progress' && <button onClick={() => updateStatus(assign.id, 'done')} className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded font-bold">סיים</button>}
                               {assign.status === 'done' && <button onClick={() => updateStatus(assign.id, 'submitted')} className="text-xs bg-slate-800 text-white px-2 py-1 rounded font-bold">הגש</button>}
                          </div>
                          <div className="flex gap-1"><IconButton icon={Pencil} color="blue" onClick={() => {setForm(assign); setEditingId(assign.id); setIsFormOpen(true)}} /><IconButton icon={Trash2} color="red" onClick={() => handleDeleteAssign(assign.id)} /></div>
                      </div>
                  </Card>
                  ))}
              </div>
            </>
        ) : (
            <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <div className="flex items-center gap-4"><div className="p-3 bg-white/20 rounded-full"><Calculator size={32} /></div><div><div className="text-purple-100 text-sm">ממוצע משוקלל</div><div className="text-4xl font-bold">{gpa}</div></div></div>
                </Card>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border dark:border-slate-700">
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">הוסף קורס וציון</h3>
                    <div className="grid gap-3 mb-4">
                        <input placeholder="שם הקורס" className="p-2 rounded border bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white w-full" value={gradeForm.name} onChange={e => setGradeForm({...gradeForm, name: e.target.value})} />
                        <div className="flex gap-2">
                            <input type="number" placeholder="ציון" className="p-2 rounded border bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white w-1/2" value={gradeForm.grade} onChange={e => setGradeForm({...gradeForm, grade: e.target.value})} />
                            <input type="number" placeholder="נ.ז" className="p-2 rounded border bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white w-1/2" value={gradeForm.credits} onChange={e => setGradeForm({...gradeForm, credits: e.target.value})} />
                        </div>
                        <Button onClick={handleGradeSubmit} className="w-full">שמור ציון</Button>
                    </div>
                </div>
                <div className="space-y-2">{courses.map(course => (<div key={course.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg"><div><div className="font-bold text-slate-800 dark:text-white">{course.name}</div><div className="text-xs text-slate-500">{course.credits} נ"ז</div></div><div className="flex items-center gap-3"><span className="font-bold text-lg text-purple-600 dark:text-purple-400">{course.grade}</span><IconButton icon={Trash2} color="red" onClick={() => handleDeleteCourse(course.id)} /></div></div>))}</div>
            </div>
        )}
      </div>
    );
};

// 2. BindingView
const BindingView = ({ jobs, setJobs, addTransaction, askConfirm, inventory, setInventory }) => {
    const [tab, setTab] = useState('jobs'); 
    const [form, setForm] = useState({ client: "", type: "", quantity: 1, price: "", cost: "" });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [invForm, setInvForm] = useState({ item: "", qty: "" });
    const pastClients = [...new Set(jobs.map(j => j.client))];
  
    const handleSubmit = () => {
      if (!form.client || !form.type) return;
      const jobData = { ...form, price: parseFloat(form.price)||0, cost: parseFloat(form.cost)||0, quantity: parseInt(form.quantity)||1 };
      const today = new Date().toISOString();
      if (editingId) { setJobs(jobs.map(j => j.id === editingId ? { ...j, ...jobData } : j)); setEditingId(null); } 
      else { setJobs([...jobs, { id: Date.now(), date: today, ...jobData, status: "received" }]); }
      setForm({ client: "", type: "", quantity: 1, price: "", cost: "" }); setIsFormOpen(false);
    };
  
    const handleDeliver = (job) => {
        addTransaction({ title: `כריכה - ${job.client}`, amount: job.price, type: 'income', date: new Date().toISOString().slice(0, 10) });
        setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'delivered'} : j));
    };
  
    const handleAddInventory = () => {
        if (!invForm.item) return;
        setInventory([...inventory, { id: Date.now(), item: invForm.item, qty: parseInt(invForm.qty) || 0 }]);
        setInvForm({ item: "", qty: "" });
    };

    const getStatusBadge = (status) => {
        switch(status) {
          case 'received': return <Badge color="purple">התקבל</Badge>;
          case 'in_progress': return <Badge color="blue">בעבודה</Badge>;
          case 'completed': return <Badge color="green">מוכן</Badge>;
          case 'delivered': return <Badge color="gray">נמסר</Badge>;
          default: return <Badge>לא ידוע</Badge>;
        }
      };

    const activeJobs = jobs.filter(j => j.status !== 'delivered');
    const deliveredJobs = jobs.filter(j => j.status === 'delivered');
    const totalRevenueActive = activeJobs.reduce((acc, job) => acc + job.price, 0);
    const netProfitMonthly = jobs.filter(job => {
        if(!job.date) return true;
        const d = new Date(job.date);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((acc, job) => acc + (job.price || 0) - (job.cost || 0), 0);

    return (
      <div className="space-y-6">
        <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
          <button onClick={() => setTab('jobs')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'jobs' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>הזמנות</button>
          <button onClick={() => setTab('inventory')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'inventory' ? 'bg-white dark:bg-slate-600 shadow text-amber-600 dark:text-amber-300' : 'text-slate-500 dark:text-slate-400'}`}>ניהול מלאי</button>
        </div>
        {tab === 'jobs' ? (
            <>
              <div className="bg-slate-900 dark:bg-black text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                      <div><p className="text-slate-400 text-xs">צפי הכנסות (פעיל)</p><h2 className="text-2xl font-bold">₪{totalRevenueActive.toLocaleString()}</h2></div>
                      <div className="text-right border-r border-slate-700 pr-4"><p className="text-green-400 text-xs">רווח נקי החודש</p><h2 className="text-2xl font-bold text-green-400">₪{netProfitMonthly.toLocaleString()}</h2></div>
                  </div>
              </div>
              <div className="flex justify-between items-center mt-6"><h3 className="font-bold text-lg dark:text-white">רשימת הזמנות</h3><Button size="sm" onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setForm({ client: "", type: "", quantity: 1, price: "", cost: "" }); }}>{isFormOpen ? <X size={16} /> : <Plus size={16} />} {isFormOpen ? "ביטול" : "הזמנה חדשה"}</Button></div>
              {isFormOpen && (
                  <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900 mb-4">
                  <div className="grid gap-3">
                      <div className="relative"><input list="clients" placeholder="שם הלקוח" className="p-2 rounded border w-full dark:bg-slate-700 dark:text-white" value={form.client} onChange={e => setForm({...form, client: e.target.value})} /><datalist id="clients">{pastClients.map((c, i) => <option key={i} value={c} />)}</datalist></div>
                      <input placeholder="סוג העבודה" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={form.type} onChange={e => setForm({...form, type: e.target.value})} />
                      <div className="flex gap-2"><div className="w-1/3"><input type="number" placeholder="כמות" className="p-2 w-full rounded border dark:bg-slate-700 dark:text-white" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} /></div><div className="w-1/3"><input type="number" placeholder="מחיר" className="p-2 w-full rounded border dark:bg-slate-700 dark:text-white" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div><div className="w-1/3"><input type="number" placeholder="עלות" className="p-2 w-full rounded border dark:bg-slate-700 dark:text-white" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} /></div></div>
                      <Button onClick={handleSubmit}>{editingId ? "עדכן הזמנה" : "צור הזמנה"}</Button>
                  </div>
                  </Card>
              )}
              <div className="space-y-3">{[...activeJobs, ...deliveredJobs].map(job => (<Card key={job.id} className={`p-4 border-l-4 relative group ${job.status === 'delivered' ? 'opacity-60 border-gray-400' : 'border-blue-500'}`}><div className="flex justify-between items-start"><div><h4 className="font-bold dark:text-white">{job.client}</h4><p className="text-sm text-slate-500">{job.type}</p></div><div className="text-right"><span className="font-bold dark:text-white">₪{job.price}</span><div className="text-xs">{getStatusBadge(job.status)}</div></div></div><div className="flex gap-2 mt-2">{job.status === 'received' && <button onClick={() => setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'in_progress'} : j))} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">התחל</button>}{job.status === 'in_progress' && <button onClick={() => setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'completed'} : j))} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">סמן מוכן</button>}{job.status === 'completed' && <button onClick={() => handleDeliver(job)} className="text-xs bg-gray-800 text-white px-2 py-1 rounded">מסור</button>}</div></Card>))}</div>
            </>
        ) : (
            <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border dark:border-slate-700">
                    <div className="grid gap-3 mb-4">
                        <input placeholder="שם פריט" className="p-2 rounded border w-full dark:bg-slate-700 dark:text-white" value={invForm.item} onChange={e => setInvForm({...invForm, item: e.target.value})} />
                        <div className="flex gap-2"><input type="number" placeholder="כמות" className="p-2 rounded border w-24 dark:bg-slate-700 dark:text-white" value={invForm.qty} onChange={e => setInvForm({...invForm, qty: e.target.value})} /><Button onClick={handleAddInventory} className="flex-1">הוסף</Button></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">{inventory.map(item => (<Card key={item.id} className="p-3 flex justify-between items-center bg-white dark:bg-slate-800"><div><div className="font-bold dark:text-white">{item.item}</div><div className="text-sm">מלאי: {item.qty}</div></div><div className="flex flex-col gap-1"><button onClick={() => setInventory(inventory.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))} className="text-green-500">+</button><button onClick={() => setInventory(inventory.map(i => i.id === item.id ? {...i, qty: Math.max(0, i.qty - 1)} : i))} className="text-red-500">-</button></div></Card>))}</div>
            </div>
        )}
      </div>
    );
};

// 3. HealthView (Ottermode)
const HealthView = ({ 
    calories, setCalories, protein, setProtein, water, setWater, 
    meals, setMeals, askConfirm, weightLog, setWeightLog, targets 
}) => {
  const [activeTab, setActiveTab] = useState('workout'); 
  const todayIndex = new Date().getDay(); 
  const todayPlanKey = WEEKLY_SCHEDULE[todayIndex];
  const todayWorkout = WORKOUT_PLANS[todayPlanKey];
  const [weekType, setWeekType] = useStickyState('strength', 'otter_week_type');
  const [activeSession, setActiveSession] = useState(null); 
  const [stopwatch, setStopwatch] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [showWeightUpdateModal, setShowWeightUpdateModal] = useState(false);
  const [weightInput, setWeightInput] = useState("");

  useEffect(() => { let wakeLock = null; const requestWakeLock = async () => { if ('wakeLock' in navigator && activeSession) try { wakeLock = await navigator.wakeLock.request('screen'); } catch (err) {} }; if (activeSession) requestWakeLock(); return () => { if (wakeLock) wakeLock.release(); }; }, [activeSession]);
  useEffect(() => { let interval; if (isStopwatchRunning) interval = setInterval(() => setStopwatch(p => p + 1), 1000); return () => clearInterval(interval); }, [isStopwatchRunning]);
  const formatTime = (secs) => { const m = Math.floor(secs / 60).toString().padStart(2, '0'); const s = (secs % 60).toString().padStart(2, '0'); return `${m}:${s}`; };

  const handleStartSession = () => { if (!todayWorkout.exercises.length) return; setActiveSession({ exIndex: 0, setNum: 1 }); setStopwatch(0); setIsStopwatchRunning(false); };
  const handleNextSet = () => { const currentEx = todayWorkout.exercises[activeSession.exIndex]; if (activeSession.setNum < currentEx.sets) { setActiveSession({ ...activeSession, setNum: activeSession.setNum + 1 }); setStopwatch(0); } else { setShowWeightUpdateModal(true); } };
  const handleWeightUpdateConfirm = () => { setShowWeightUpdateModal(false); if (activeSession.exIndex < todayWorkout.exercises.length - 1) { setActiveSession({ exIndex: activeSession.exIndex + 1, setNum: 1 }); setStopwatch(0); } else { setActiveSession(null); setStopwatch(0); setIsStopwatchRunning(false); alert("אימון הושלם! כל הכבוד."); } };
  const handleToggleMeal = (meal) => { const isEaten = meals.some(m => m.id === meal.id); if (!isEaten) { setMeals([...meals, { ...meal, time: new Date().toLocaleTimeString() }]); setCalories(c => c + meal.cal); setProtein(p => p + meal.prot); } else { setMeals(meals.filter(m => m.id !== meal.id)); setCalories(c => Math.max(0, c - meal.cal)); setProtein(p => Math.max(0, p - meal.prot)); } };
  const handleAddWeight = () => { if(!weightInput) return; const today = new Date().toLocaleDateString('he-IL'); setWeightLog([...weightLog, { id: Date.now(), date: today, weight: parseFloat(weightInput) }]); setWeightInput(""); };
  const currentWeight = weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : 66; 

  if (activeSession) {
      const currentEx = todayWorkout.exercises[activeSession.exIndex];
      const repsRange = weekType === 'strength' ? '6-8' : '12-15';
      const restTime = weekType === 'strength' ? '2-3 דק\'' : '60 שניות';
      return (
          <div className="space-y-6 h-full flex flex-col animate-in fade-in">
              <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700 p-3 rounded-xl"><div><h2 className="font-bold text-lg dark:text-white">{todayWorkout.title}</h2><p className="text-xs text-slate-500 dark:text-slate-300">שבוע {weekType === 'strength' ? 'כוח' : 'נפח'}</p></div><Button size="sm" variant="danger" onClick={() => setActiveSession(null)}>יציאה</Button></div>
              {showWeightUpdateModal && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"><Card className="p-6 w-full max-w-sm text-center"><h3 className="text-xl font-bold mb-4 dark:text-white">סיימת תרגיל!</h3><Button onClick={handleWeightUpdateConfirm} className="w-full">המשך לתרגיל הבא</Button></Card></div>)}
              <div className="flex-1 flex flex-col justify-center gap-6 text-center"><div><h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{currentEx.name}</h1><div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full font-bold">סט {activeSession.setNum} מתוך {currentEx.sets}</div></div><div className="grid grid-cols-2 gap-4"><Card className="p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600"><div className="text-slate-500 dark:text-slate-400 text-sm">יעד חזרות</div><div className="text-2xl font-bold dark:text-white">{repsRange}</div></Card><Card className="p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600"><div className="text-slate-500 dark:text-slate-400 text-sm">מנוחה מומלצת</div><div className="text-2xl font-bold dark:text-white">{restTime}</div></Card></div>{currentEx.note && <div className="text-amber-500 text-sm font-bold">⚠️ {currentEx.note}</div>}<div className="my-4"><div className="text-6xl font-mono font-bold text-slate-700 dark:text-slate-200 mb-4 tracking-wider">{formatTime(stopwatch)}</div><div className="flex justify-center gap-4"><button onClick={() => setIsStopwatchRunning(!isStopwatchRunning)} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isStopwatchRunning ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>{isStopwatchRunning ? <Pause size={32} /> : <Play size={32} />}</button><button onClick={() => { setIsStopwatchRunning(false); setStopwatch(0); }} className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shadow hover:bg-slate-200"><RotateCcw size={28} /></button></div></div></div><Button size="lg" className="w-full py-4 text-xl shadow-xl" onClick={handleNextSet}>{activeSession.setNum < currentEx.sets ? `סט הבא` : "סיים תרגיל"} <SkipForward className="mr-2" /></Button>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl"><button onClick={() => setActiveTab('workout')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'workout' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>אימונים</button><button onClick={() => setActiveTab('food')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'food' ? 'bg-white dark:bg-slate-600 shadow text-green-600 dark:text-green-300' : 'text-slate-500 dark:text-slate-400'}`}>תזונה</button><button onClick={() => setActiveTab('weight')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'weight' ? 'bg-white dark:bg-slate-600 shadow text-cyan-600 dark:text-cyan-300' : 'text-slate-500 dark:text-slate-400'}`}>משקל</button></div>
      {activeTab === 'workout' && (
          <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center"><h2 className="text-xl font-bold dark:text-white">Ottermode</h2><button onClick={() => setWeekType(weekType === 'strength' ? 'pump' : 'strength')} className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${weekType === 'strength' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-pink-100 text-pink-700 border-pink-200'}`}>{weekType === 'strength' ? '🏋️ כוח (6-8)' : '💪 נפח (12-15)'}</button></div>
              {todayWorkout.exercises.length > 0 ? (<Card className="p-0 overflow-hidden border-l-4 border-l-blue-500"><div className="p-5 bg-slate-50 dark:bg-slate-800/50"><h3 className="text-lg font-bold dark:text-white">{todayWorkout.title}</h3><p className="text-slate-500 text-sm">פוקוס: {todayWorkout.focus}</p><Button onClick={handleStartSession} className="w-full mt-4 py-3 text-lg"><Play size={20} /> התחל אימון</Button></div><div className="p-4 space-y-3">{todayWorkout.exercises.map((ex, idx) => (<div key={idx} className="flex justify-between items-center border-b dark:border-slate-700 last:border-0 pb-2 last:pb-0"><span className="font-medium dark:text-slate-200">{ex.name}</span><Badge color="gray">{ex.sets} סטים</Badge></div>))}</div></Card>) : (<Card className="p-8 text-center bg-green-50 dark:bg-green-900/20 border-green-200"><h3 className="text-xl font-bold text-green-700 dark:text-green-300">יום מנוחה</h3><p className="text-green-600 dark:text-green-400">תאכל טוב ותישן 8 שעות.</p></Card>)}
              <div className="grid grid-cols-2 gap-3"><Card className="p-3 bg-indigo-50 dark:bg-indigo-900/20"><h4 className="font-bold text-indigo-800 dark:text-indigo-300 text-sm mb-1">Overload</h4><p className="text-xs text-indigo-600 dark:text-indigo-400">+1 ק"ג/חזרה כל אימון</p></Card><Card className="p-3 bg-blue-50 dark:bg-blue-900/20"><h4 className="font-bold text-blue-800 dark:text-blue-300 text-sm mb-1">שינה</h4><p className="text-xs text-blue-600 dark:text-blue-400">7-8 שעות חובה!</p></Card></div>
          </div>
      )}
      {activeTab === 'food' && (
          <div className="space-y-6 animate-in fade-in">
              <Card className="p-4 relative overflow-hidden bg-slate-900 text-white"><div className="grid grid-cols-2 gap-4"><div className="text-center"><div className="text-xs text-slate-400 mb-1">קלוריות</div><div className="text-2xl font-bold">{calories} <span className="text-sm font-normal text-slate-400">/ {targets.calories}</span></div><div className="h-1.5 w-full bg-slate-700 rounded-full mt-2 overflow-hidden"><div className="h-full bg-green-500" style={{width: `${Math.min((calories/targets.calories)*100, 100)}%`}}></div></div></div><div className="text-center border-r border-slate-700"><div className="text-xs text-slate-400 mb-1">חלבון</div><div className="text-2xl font-bold text-blue-400">{protein}g <span className="text-sm font-normal text-slate-400">/ {targets.protein}</span></div><div className="h-1.5 w-full bg-slate-700 rounded-full mt-2 overflow-hidden"><div className="h-full bg-blue-500" style={{width: `${Math.min((protein/targets.protein)*100, 100)}%`}}></div></div></div></div><div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-700"><div className="flex items-center gap-2"><Droplets size={16} className="text-cyan-400" /><span className="text-sm">{water} מ"ל</span></div><button onClick={() => setWater(w => w + 200)} className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full hover:bg-cyan-500/30">+ כוס מים</button></div></Card>
              <div><h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">תפריט יומי (סמן)</h3><div className="space-y-3">{OTTERMODE_MEALS.map(meal => { const isEaten = meals.some(m => m.id === meal.id); return (<div key={meal.id} onClick={() => handleToggleMeal(meal)} className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${isEaten ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}><div><div className={`font-bold text-sm ${isEaten ? 'text-green-800 dark:text-green-300 line-through' : 'text-slate-800 dark:text-white'}`}>{meal.name}</div><div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{meal.cal} קלוריות • {meal.prot}ג חלבון</div></div>{isEaten && <CheckCircle2 className="text-green-600" size={24} />}</div>); })}</div></div>
          </div>
      )}
      {activeTab === 'weight' && (
          <div className="space-y-6 animate-in fade-in">
              <Card className="p-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white"><div className="flex items-center gap-4"><Scale size={40} className="opacity-80" /><div><div className="text-cyan-100 text-sm">משקל נוכחי</div><div className="text-4xl font-bold">{currentWeight} <span className="text-xl font-normal">ק"ג</span></div></div><div className="mr-auto text-right"><div className="text-cyan-100 text-sm">יעד שבועי</div><div className="text-xl font-bold">+0.5 ק"ג</div></div></div></Card>
              <div className="flex gap-2"><input type="number" placeholder="הכנס משקל (קג)" className="p-3 rounded-lg border flex-1 dark:bg-slate-800 dark:border-slate-600 dark:text-white" value={weightInput} onChange={e => setWeightInput(e.target.value)} /><Button onClick={handleAddWeight}>שמור</Button></div>
              <div className="space-y-2">{[...weightLog].reverse().map(log => (<div key={log.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg"><span className="text-slate-600 dark:text-slate-300">{log.date}</span><div className="flex items-center gap-3"><span className="font-bold text-slate-800 dark:text-white">{log.weight} ק"ג</span><IconButton icon={Trash2} color="red" onClick={() => askConfirm("למחוק?", () => setWeightLog(weightLog.filter(w => w.id !== log.id)))} /></div></div>))}</div>
          </div>
      )}
    </div>
  );
};

// 4. WalletView (עם תיקון תצוגה בארנק - טקסט לבן על רקע כהה תמיד)
const WalletView = ({ transactions, setTransactions, askConfirm }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({ title: "", amount: "", type: "income", date: new Date().toISOString().slice(0, 10) });
    const handleAdd = () => { if (!form.title || !form.amount) return; setTransactions([{ id: Date.now(), ...form, amount: parseFloat(form.amount) }, ...transactions]); setIsFormOpen(false); };
    const handleDelete = (id) => askConfirm("למחוק?", () => setTransactions(transactions.filter(t => t.id !== id)));
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    return (
        <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl">
                <div className="text-slate-400 text-sm mb-1">יתרה כוללת</div>
                <div className={`text-4xl font-bold ${balance < 0 ? 'text-red-400' : 'text-white'}`}>₪{balance.toLocaleString()}</div>
                <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-white/10 p-3 rounded-lg flex items-center gap-3"><div className="bg-green-500/20 p-2 rounded-full text-green-400"><ArrowDownLeft size={20} /></div><div><div className="text-xs text-slate-300">הכנסות</div><div className="font-bold">₪{income.toLocaleString()}</div></div></div>
                    <div className="flex-1 bg-white/10 p-3 rounded-lg flex items-center gap-3"><div className="bg-red-500/20 p-2 rounded-full text-red-400"><ArrowUpRight size={20} /></div><div><div className="text-xs text-slate-300">הוצאות</div><div className="font-bold">₪{expense.toLocaleString()}</div></div></div>
                </div>
            </Card>
            <div className="flex justify-between items-center"><h3 className="font-bold dark:text-white">תנועות אחרונות</h3><Button size="sm" onClick={() => setIsFormOpen(!isFormOpen)}>פעולה</Button></div>
            {isFormOpen && <Card className="p-4 bg-slate-100 dark:bg-slate-700"><div className="grid gap-3"><div className="flex gap-2"><button onClick={() => setForm({...form, type: 'income'})} className={`flex-1 py-2 rounded-lg text-sm font-bold ${form.type === 'income' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white dark:bg-slate-600 dark:text-slate-300'}`}>הכנסה</button><button onClick={() => setForm({...form, type: 'expense'})} className={`flex-1 py-2 rounded-lg text-sm font-bold ${form.type === 'expense' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white dark:bg-slate-600 dark:text-slate-300'}`}>הוצאה</button></div><input placeholder="תיאור" className="p-2 rounded border dark:bg-slate-600 dark:text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /><div className="flex gap-2"><input type="number" placeholder="סכום" className="p-2 rounded border w-1/2 dark:bg-slate-600 dark:text-white" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} /><input type="date" className="p-2 rounded border w-1/2 dark:bg-slate-600 dark:text-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} /></div><Button onClick={handleAdd}>שמור</Button></div></Card>}
            <div className="space-y-2">{transactions.map(t => (<div key={t.id} className="flex justify-between p-3 bg-white dark:bg-slate-800 rounded border dark:border-slate-700"><div><div className="font-bold dark:text-white">{t.title}</div><div className="text-xs text-slate-500">{t.date}</div></div><div className="flex items-center gap-2"><span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.amount}₪</span><IconButton icon={Trash2} color="red" onClick={() => handleDelete(t.id)} /></div></div>))}</div>
        </div>
    );
};

// 5. Dashboard (עם Daily Feed!)
const Dashboard = ({ changeTab, schedule, setSchedule, assignments, jobs, calories, protein, workouts, askConfirm, transactions, targets }) => {
  const [viewMode, setViewMode] = useState('plan'); // 'plan' or 'feed'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ time: '08:00', title: '', day: new Date().getDay() });
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  
  // Daily Feed Logic
  const generateDailyFeed = () => {
      const feed = [];
      const today = new Date().toDateString();
      transactions.filter(t => new Date(t.date).toDateString() === today).forEach(t => feed.push({ type: 'wallet', time: 'היום', ...t }));
      schedule.filter(s => s.day === new Date().getDay() && s.done).forEach(s => feed.push({ type: 'task', time: s.time, title: s.title }));
      workouts.filter(w => w.done && w.day === daysOfWeek[new Date().getDay()]).forEach(w => feed.push({ type: 'workout', time: 'היום', title: w.type }));
      return feed;
  };
  const dailyFeed = generateDailyFeed();

  const handleAddEvent = () => { setSchedule([...schedule, { id: Date.now(), ...formData, done: false }].sort((a,b) => a.time.localeCompare(b.time))); setIsFormOpen(false); };
  const toggleScheduleItem = (id) => setSchedule(schedule.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const dailySchedule = schedule.filter(item => (item.day !== undefined ? item.day : new Date().getDay()) === selectedDay);
  
  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "בוקר טוב,";
      if (hour >= 12 && hour < 18) return "צהריים טובים,";
      if (hour >= 18 && hour < 22) return "ערב טוב,";
      return "לילה טוב,";
  };
  const [quote] = useState("Believe you can and you're halfway there.");

  const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
  const openJobs = jobs.filter(j => j.status === 'in_progress' || j.status === 'received').length;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 dark:bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden"><div className="relative z-10"><h1 className="text-2xl font-light">{getGreeting()}</h1><p className="text-lg opacity-80 mt-1" dir="ltr">{quote}</p></div></div>
      <div className="grid grid-cols-2 gap-3"><div onClick={() => changeTab('uni')} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl"><div className="font-bold dark:text-white">לימודים</div></div><div onClick={() => changeTab('binding')} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl"><div className="font-bold dark:text-white">כריכה</div></div><div onClick={() => changeTab('health')} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl col-span-2"><div className="flex items-center gap-2 mb-3"><Dumbbell className="text-green-600 dark:text-green-400" size={20} /><div className="font-bold text-slate-800 dark:text-white">Ottermode (PPL)</div></div><div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide"><div className="flex-1 min-w-[100px] flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg"><Flame size={18} className="text-orange-500" /><div><div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">קלוריות</div><div className="text-sm font-bold text-slate-700 dark:text-white">{calories}/{targets.calories}</div></div></div><div className="flex-1 min-w-[100px] flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg"><Beef size={18} className="text-blue-500" /><div><div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">חלבון</div><div className="text-sm font-bold text-slate-700 dark:text-white">{protein}/{targets.protein}g</div></div></div></div></div></div>
      
      <div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-4">
            <button onClick={() => setViewMode('plan')} className={`flex-1 py-1.5 text-sm rounded-md transition-all ${viewMode === 'plan' ? 'bg-white dark:bg-slate-600 shadow' : 'text-slate-500'}`}>תכנון לו"ז</button>
            <button onClick={() => setViewMode('feed')} className={`flex-1 py-1.5 text-sm rounded-md transition-all ${viewMode === 'feed' ? 'bg-white dark:bg-slate-600 shadow' : 'text-slate-500'}`}>היום שהיה</button>
        </div>

        {viewMode === 'plan' ? (
            <>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-4">{daysOfWeek.map((day, index) => (<button key={index} onClick={() => setSelectedDay(index)} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${selectedDay === index ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500'}`}>{day}</button>))}</div>
                <div className="flex justify-between items-center mb-2"><h3 className="font-bold dark:text-white">משימות</h3><Button size="sm" variant="secondary" onClick={() => setIsFormOpen(!isFormOpen)}><Plus size={16} /></Button></div>
                {isFormOpen && <Card className="p-4 bg-slate-50 dark:bg-slate-800 mb-4"><div className="grid gap-3"><select className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={formData.day} onChange={e => setFormData({...formData, day: parseInt(e.target.value)})}>{daysOfWeek.map((d, i) => <option key={i} value={i}>{d}</option>)}</select><input type="time" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} /><input placeholder="משימה" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} /><Button onClick={handleAddEvent}>הוסף</Button></div></Card>}
                <div className="space-y-2">{dailySchedule.map(item => (<div key={item.id} className="flex gap-3 items-center p-3 bg-white dark:bg-slate-800 rounded border dark:border-slate-700"><span className="text-xs font-bold text-slate-500 w-10">{item.time}</span><span className={`flex-1 ${item.done ? 'line-through text-slate-400' : 'dark:text-white'}`}>{item.title}</span><input type="checkbox" checked={item.done} onChange={() => toggleScheduleItem(item.id)} /></div>))}</div>
            </>
        ) : (
            <div className="space-y-4 relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-2 py-2">
                {dailyFeed.length === 0 && <div className="text-sm text-slate-400 italic">עדיין לא נרשמה פעילות היום.</div>}
                {dailyFeed.map((item, i) => (
                    <div key={i} className="relative mb-6 last:mb-0">
                        <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900"></div>
                        <div className="text-xs text-slate-400 mb-1">{item.time}</div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border dark:border-slate-700 shadow-sm">
                            <div className="font-bold text-slate-800 dark:text-white">{item.title}</div>
                            {item.type === 'wallet' && <div className="text-xs text-green-600">פעולה בארנק: {item.amount}₪</div>}
                            {item.type === 'workout' && <div className="text-xs text-blue-600">אימון הושלם!</div>}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

// --- App ---
export default function App() {
  const [darkMode, setDarkMode] = useStickyState(false, 'darkMode');
  useEffect(() => { if (darkMode) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }, [darkMode]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [confirmState, setConfirmState] = useState({ isOpen: false, text: "", onConfirm: null });
  const askConfirm = (text, confirmAction) => setConfirmState({ isOpen: true, text, onConfirm: () => { confirmAction(); setConfirmState({ isOpen: false, text: "", onConfirm: null }); } });

  // State
  const [assignments, setAssignments] = useStickyState([], 'assignments');
  const [courses, setCourses] = useStickyState([], 'courses'); 
  const [jobs, setJobs] = useStickyState([], 'jobs');
  const [inventory, setInventory] = useStickyState([], 'inventory'); 
  const [calories, setCalories] = useStickyState(0, 'calories');
  const [protein, setProtein] = useStickyState(0, 'protein'); 
  const [water, setWater] = useStickyState(0, 'water');
  const [favMeals, setFavMeals] = useStickyState([], 'favMeals'); 
  const [workouts, setWorkouts] = useStickyState([], 'workouts');
  const [exerciseLibrary, setExerciseLibrary] = useStickyState([], 'exerciseLibrary'); 
  const [weightLog, setWeightLog] = useStickyState([], 'weightLog'); 
  const [meals, setMeals] = useStickyState([], 'meals');
  const [schedule, setSchedule] = useStickyState([], 'schedule');
  const [transactions, setTransactions] = useStickyState([], 'transactions');
  // Updated Targets for Ottermode
  const [targets, setTargets] = useStickyState({ calories: 3000, protein: 160, water: 3000 }, 'targets');
  const [lastResetDate, setLastResetDate] = useStickyState(new Date().toDateString(), 'lastResetDate');

  useEffect(() => {
      const today = new Date().toDateString();
      if (lastResetDate !== today) {
          setCalories(0); setProtein(0); setWater(0); setMeals([]); setSchedule(prev => prev.map(item => ({...item, done: false})));
          setLastResetDate(today);
      }
  }, [lastResetDate]);

  const addTransaction = (trans) => setTransactions([{ id: Date.now(), ...trans }, ...transactions]);

  // NEW: Notification Logic
  const lastNotifiedRef = useRef('');

  useEffect(() => {
    // Request permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const interval = setInterval(() => {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;

        const now = new Date();
        const currentDay = now.getDay();
        const currentTime = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

        // Prevent duplicate notifications for the same minute
        if (currentTime === lastNotifiedRef.current) return;

        schedule.forEach(item => {
            if (item.day === currentDay && item.time === currentTime && !item.done) {
                try {
                    new Notification("תזכורת למשימה 🔔", {
                        body: item.title,
                        icon: '/logo.png', // Assumes logo exists in public folder
                        vibrate: [200, 100, 200]
                    });
                } catch (err) {
                    console.error("Notification error:", err);
                }
            }
        });

        lastNotifiedRef.current = currentTime;
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [schedule]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard changeTab={setActiveTab} schedule={schedule} setSchedule={setSchedule} assignments={assignments} jobs={jobs} calories={calories} targetCalories={targets.calories} protein={protein} targetProtein={targets.protein} workouts={workouts} askConfirm={askConfirm} transactions={transactions} targets={targets} />;
      case 'uni': return <UniversityView assignments={assignments} setAssignments={setAssignments} courses={courses} setCourses={setCourses} askConfirm={askConfirm} />;
      case 'binding': return <BindingView jobs={jobs} setJobs={setJobs} addTransaction={addTransaction} askConfirm={askConfirm} inventory={inventory} setInventory={setInventory} />;
      case 'health': return <HealthView 
                              calories={calories} setCalories={setCalories} 
                              protein={protein} setProtein={setProtein} 
                              water={water} setWater={setWater} 
                              workouts={workouts} setWorkouts={setWorkouts} 
                              meals={meals} setMeals={setMeals} 
                              favMeals={favMeals} setFavMeals={setFavMeals} 
                              askConfirm={askConfirm} 
                              exerciseLibrary={exerciseLibrary} setExerciseLibrary={setExerciseLibrary}
                              weightLog={weightLog} setWeightLog={setWeightLog}
                              targets={targets}
                            />;
      case 'wallet': return <WalletView transactions={transactions} setTransactions={setTransactions} askConfirm={askConfirm} />;
      case 'settings': return <SettingsView targets={targets} setTargets={setTargets} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`} dir="rtl">
      <ConfirmModal isOpen={confirmState.isOpen} text={confirmState.text} onConfirm={confirmState.onConfirm} onCancel={() => setConfirmState({ isOpen: false, text: "", onConfirm: null })} />
      <header className={`sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center justify-between transition-colors ${darkMode ? 'bg-slate-800 border-b border-slate-700' : 'bg-white'}`}>
         <div className="flex items-center gap-3">{activeTab !== 'dashboard' && <button onClick={() => setActiveTab('dashboard')} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronLeft /></button>}<h1 className="font-bold text-lg">{activeTab === 'dashboard' ? 'סקירה יומית' : activeTab === 'uni' ? 'לימודים' : activeTab === 'binding' ? 'כריכה' : activeTab === 'health' ? 'Ottermode' : activeTab === 'wallet' ? 'ארנק' : 'הגדרות'}</h1></div>
         <div className="flex gap-3 items-center"><button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button><button onClick={() => setActiveTab('settings')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"><Settings size={20} /></button><div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600"><img src="/api/placeholder/32/32" alt="Profile" className="w-full h-full object-cover" /></div></div>
      </header>
      <main className="p-4 pb-24 max-w-lg mx-auto">{renderContent()}</main>
      <nav className={`fixed bottom-0 left-0 right-0 border-t px-6 py-2 flex justify-between items-center z-30 max-w-lg mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <button onClick={() => setActiveTab('uni')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'uni' ? 'text-blue-500' : 'text-slate-400'}`}><GraduationCap size={24} /><span className="text-[10px]">לימודים</span></button>
        <button onClick={() => setActiveTab('binding')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'binding' ? 'text-blue-500' : 'text-slate-400'}`}><BookOpen size={24} /><span className="text-[10px]">כריכה</span></button>
        <div className="relative -top-5"><button onClick={() => setActiveTab('dashboard')} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white ring-4 ring-blue-100 dark:ring-slate-600' : 'bg-slate-800 text-slate-300'}`}><LayoutDashboard size={24} /></button></div>
        <button onClick={() => setActiveTab('health')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'health' ? 'text-blue-500' : 'text-slate-400'}`}><Dumbbell size={24} /><span className="text-[10px]">בריאות</span></button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'wallet' ? 'text-blue-500' : 'text-slate-400'}`}><Wallet size={24} /><span className="text-[10px]">ארנק</span></button>
      </nav>
    </div>
  );
}