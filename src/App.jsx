import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  GraduationCap, 
  BookOpen, 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Pencil,
  ChevronLeft,
  Wallet,
  X,
  Save,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  HeartHandshake,
  Book,
  Check,
  Beef,
  Flame,
  AlertTriangle,
  AlertCircle,
  Moon,
  Sun,
  Droplets,
  Calculator,
  Archive,
  Star,
  Package,
  History,
  ChevronDown,
  ChevronUp,
  Scale,
  List,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  BarChart3,
  Settings,
  Download,
  Upload
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

// --- רכיבי UI בסיסיים ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors ${className}`}>
    {children}
  </div>
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
  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
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
  return (
    <span className={`${colors[color]} px-2.5 py-0.5 rounded-full text-xs font-bold`}>
      {children}
    </span>
  );
};

const IconButton = ({ icon: Icon, onClick, color = "slate" }) => {
  const colors = {
    slate: "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700",
    red: "text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30",
    blue: "text-blue-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30",
  };
  return (
    <button 
      onClick={(e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        onClick(e); 
      }} 
      className={`p-2 rounded-full transition-colors ${colors[color]}`}
    >
      <Icon size={18} />
    </button>
  );
};

const ConfirmModal = ({ isOpen, text, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-sm scale-100 animate-in zoom-in-95 border dark:border-slate-700">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">למחוק פריט זה?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{text}</p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <Button className="flex-1" variant="secondary" onClick={onCancel}>ביטול</Button>
            <Button className="flex-1" variant="danger" onClick={onConfirm}>כן, מחק</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

// --- מסכי הגדרות חדש ---
const SettingsView = ({ targets, setTargets }) => {
    
    const handleExport = () => {
        const keys = ['assignments', 'courses', 'jobs', 'inventory', 'calories', 'protein', 'water', 'favMeals', 'workouts', 'exerciseLibrary', 'weightLog', 'meals', 'schedule', 'transactions', 'targets'];
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
                    alert("הנתונים שוחזרו בהצלחה! רענן את האפליקציה.");
                    window.location.reload();
                } catch (err) {
                    alert("שגיאה בטעינת הקובץ");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">הגדרות</h2>
            
            <Card className="p-4 bg-white dark:bg-slate-800">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Dumbbell size={18} /> יעדי בריאות יומיים
                </h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">יעד קלוריות</label>
                        <input 
                            type="number" 
                            className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            value={targets.calories}
                            onChange={(e) => setTargets({...targets, calories: parseInt(e.target.value) || 0})}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">יעד חלבון (גרם)</label>
                        <input 
                            type="number" 
                            className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            value={targets.protein}
                            onChange={(e) => setTargets({...targets, protein: parseInt(e.target.value) || 0})}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-slate-500 dark:text-slate-400 block mb-1">יעד מים (מ"ל)</label>
                        <input 
                            type="number" 
                            className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            value={targets.water}
                            onChange={(e) => setTargets({...targets, water: parseInt(e.target.value) || 0})}
                        />
                    </div>
                </div>
            </Card>

            <Card className="p-4 bg-white dark:bg-slate-800">
                <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                    <Save size={18} /> גיבוי ושחזור
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                    הנתונים נשמרים בדפדפן זה בלבד. מומלץ לייצא גיבוי מדי פעם.
                </p>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={handleExport}>
                        <Download size={16} /> ייצוא נתונים
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleImport}>
                        <Upload size={16} /> ייבוא מגיבוי
                    </Button>
                </div>
            </Card>
        </div>
    );
};

// 1. UniversityView
const UniversityView = ({ assignments, setAssignments, courses, setCourses, askConfirm }) => {
  const [tab, setTab] = useState('assignments'); 
  const [assignFilter, setAssignFilter] = useState('active'); 
  const [form, setForm] = useState({ course: "", task: "", date: "" });
  const [gradeForm, setGradeForm] = useState({ name: "", grade: "", credits: "" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const totalPoints = courses.reduce((acc, c) => acc + c.credits, 0);
  const weightedSum = courses.reduce((acc, c) => acc + (c.grade * c.credits), 0);
  const gpa = totalPoints > 0 ? (weightedSum / totalPoints).toFixed(2) : 0;

  const displayedAssignments = assignments.filter(a => 
    assignFilter === 'active' ? a.status !== 'done' : a.status === 'done'
  );

  const handleAssignSubmit = () => {
    if (!form.course || !form.task) return;
    if (editingId) {
      setAssignments(assignments.map(a => a.id === editingId ? { ...a, ...form } : a));
      setEditingId(null);
    } else {
      setAssignments([...assignments, { id: Date.now(), ...form, status: "pending" }]);
    }
    setForm({ course: "", task: "", date: "" });
    setIsFormOpen(false);
  };

  const handleGradeSubmit = () => {
      if (!gradeForm.name || !gradeForm.grade) return;
      setCourses([...courses, { id: Date.now(), name: gradeForm.name, grade: parseFloat(gradeForm.grade), credits: parseFloat(gradeForm.credits) || 0 }]);
      setGradeForm({ name: "", grade: "", credits: "" });
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
                    <button onClick={() => setAssignFilter('active')} className={`text-sm px-3 py-1 rounded-full transition-colors ${assignFilter === 'active' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}>לביצוע</button>
                    <button onClick={() => setAssignFilter('done')} className={`text-sm px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${assignFilter === 'done' ? 'bg-green-100 text-green-700 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}><History size={14} /> היסטוריה</button>
                </div>
                <Button onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setForm({ course: "", task: "", date: "" }); }} size="sm">
                {isFormOpen ? <X size={18} /> : <Plus size={18} />} {isFormOpen ? "סגור" : "חדש"}
                </Button>
            </div>

            {isFormOpen && (
                <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900">
                <div className="grid gap-3">
                    <input placeholder="שם הקורס" className="p-2 rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-700 dark:text-white" value={form.course} onChange={e => setForm({...form, course: e.target.value})} />
                    <input placeholder="שם המטלה" className="p-2 rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-700 dark:text-white" value={form.task} onChange={e => setForm({...form, task: e.target.value})} />
                    <input type="date" className="p-2 rounded border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-700 dark:text-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                    <Button onClick={handleAssignSubmit}>{editingId ? "עדכן" : "הוסף"}</Button>
                </div>
                </Card>
            )}

            <div className="space-y-3">
                {displayedAssignments.length === 0 && <div className="text-center py-8 text-slate-400 text-sm">{assignFilter === 'active' ? "אין מטלות פתוחות 🎉" : "עדיין לא סיימת מטלות"}</div>}
                {displayedAssignments.map(assign => (
                <Card key={assign.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow group">
                    <div className="flex items-start gap-3">
                    <button onClick={() => setAssignments(assignments.map(a => a.id === assign.id ? { ...a, status: a.status === "pending" ? "done" : "pending" } : a))} className={`mt-1 ${assign.status === 'done' ? 'text-green-500' : 'text-slate-300 hover:text-blue-500'}`}>
                        <CheckCircle2 size={24} fill={assign.status === 'done' ? "currentColor" : "none"} />
                    </button>
                    <div>
                        <h3 className={`font-semibold ${assign.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}`}>{assign.task}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{assign.course}</p>
                    </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                    <Badge color={assign.status === 'done' ? 'green' : 'yellow'}>{assign.date}</Badge>
                    <div className="flex gap-1">
                        <IconButton icon={Pencil} color="blue" onClick={() => {setForm(assign); setEditingId(assign.id); setIsFormOpen(true)}} />
                        <IconButton icon={Trash2} color="red" onClick={() => handleDeleteAssign(assign.id)} />
                    </div>
                    </div>
                </Card>
                ))}
            </div>
          </>
      ) : (
          <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full"><Calculator size={32} /></div>
                      <div>
                          <div className="text-purple-100 text-sm">ממוצע משוקלל</div>
                          <div className="text-4xl font-bold">{gpa}</div>
                      </div>
                  </div>
              </Card>

              {/* תיקון: עיצוב טופס ציונים למובייל */}
              <div>
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

              <div className="space-y-2">
                  {courses.map(course => (
                      <div key={course.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg">
                          <div>
                              <div className="font-bold text-slate-800 dark:text-white">{course.name}</div>
                              <div className="text-xs text-slate-500">{course.credits} נ"ז</div>
                          </div>
                          <div className="flex items-center gap-3">
                              <span className="font-bold text-lg text-purple-600 dark:text-purple-400">{course.grade}</span>
                              <IconButton icon={Trash2} color="red" onClick={() => handleDeleteCourse(course.id)} />
                          </div>
                      </div>
                  ))}
              </div>
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
    const priceNum = parseFloat(form.price) || 0;
    const costNum = parseFloat(form.cost) || 0;
    const qtyNum = parseInt(form.quantity) || 1;
    const today = new Date().toISOString();

    if (editingId) {
      setJobs(jobs.map(j => j.id === editingId ? { ...j, ...form, price: priceNum, quantity: qtyNum, cost: costNum } : j));
      setEditingId(null);
    } else {
      setJobs([...jobs, { id: Date.now(), date: today, ...form, price: priceNum, quantity: qtyNum, cost: costNum, status: "received" }]);
    }
    setForm({ client: "", type: "", quantity: 1, price: "", cost: "" });
    setIsFormOpen(false);
  };

  const handleEdit = (job) => {
    setForm({ client: job.client, type: job.type, quantity: job.quantity, price: job.price, cost: job.cost || "" });
    setEditingId(job.id);
    setIsFormOpen(true);
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
  
  const getCurrentMonthProfit = () => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyJobs = jobs.filter(job => {
          if (!job.date) return true; 
          const jobDate = new Date(job.date);
          return jobDate.getMonth() === currentMonth && jobDate.getFullYear() === currentYear;
      });
      const revenue = monthlyJobs.reduce((acc, job) => acc + (job.price || 0), 0);
      const cost = monthlyJobs.reduce((acc, job) => acc + (job.cost || 0), 0);
      return revenue - cost;
  };

  const totalRevenueActive = activeJobs.reduce((acc, job) => acc + job.price, 0);
  const netProfitMonthly = getCurrentMonthProfit();

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
                    <div>
                        <p className="text-slate-400 text-xs">צפי הכנסות (פעיל)</p>
                        <h2 className="text-2xl font-bold">₪{totalRevenueActive.toLocaleString()}</h2>
                    </div>
                    <div className="text-right border-r border-slate-700 pr-4">
                         <p className="text-green-400 text-xs">רווח נקי החודש</p>
                         <h2 className="text-2xl font-bold text-green-400">₪{netProfitMonthly.toLocaleString()}</h2>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <h3 className="font-bold text-lg dark:text-white">רשימת הזמנות</h3>
                <Button size="sm" onClick={() => { setIsFormOpen(!isFormOpen); setEditingId(null); setForm({ client: "", type: "", quantity: 1, price: "", cost: "" }); }}>
                {isFormOpen ? <X size={16} /> : <Plus size={16} />} {isFormOpen ? "ביטול" : "הזמנה חדשה"}
                </Button>
            </div>

            {isFormOpen && (
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900 mb-4">
                <div className="grid gap-3">
                    <div className="relative">
                        <input list="clients" placeholder="שם הלקוח" className="p-2 rounded border w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={form.client} onChange={e => setForm({...form, client: e.target.value})} />
                        <datalist id="clients">
                            {pastClients.map((c, i) => <option key={i} value={c} />)}
                        </datalist>
                    </div>
                    <input placeholder="סוג העבודה" className="p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={form.type} onChange={e => setForm({...form, type: e.target.value})} />
                    <div className="flex gap-2">
                         <div className="w-1/3"><input type="number" placeholder="כמות" className="p-2 w-full rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} /></div>
                         <div className="w-1/3"><input type="number" placeholder="מחיר" className="p-2 w-full rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
                         <div className="w-1/3"><input type="number" placeholder="עלות" className="p-2 w-full rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} /></div>
                    </div>
                    <Button onClick={handleSubmit}>{editingId ? "עדכן הזמנה" : "צור הזמנה"}</Button>
                </div>
                </Card>
            )}

            <div className="space-y-3">
                {[...activeJobs, ...deliveredJobs].map(job => (
                <Card key={job.id} className={`p-4 border-l-4 relative group transition-all ${job.status === 'delivered' ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60' : 'border-blue-500'}`}>
                    <div className="flex justify-between items-start">
                    <div>
                        <h4 className={`font-bold ${job.status === 'delivered' ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-white'}`}>{job.client}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{job.type} • {job.quantity} יח'</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className={`font-bold ${job.status === 'delivered' ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>₪{job.price}</span>
                        {job.cost > 0 && <span className="text-[10px] text-red-400">עלות: {job.cost}</span>}
                        {getStatusBadge(job.status)}
                    </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-end min-h-[32px]">
                        <div className="flex gap-2">
                            {job.status === 'received' && (
                                <button onClick={() => setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'in_progress'} : j))} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full font-bold border border-blue-100 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">התחל עבודה</button>
                            )}
                            {job.status === 'in_progress' && (
                                <button onClick={() => setJobs(jobs.map(j => j.id === job.id ? {...j, status: 'completed'} : j))} className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-full font-bold border border-green-100 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">סמן כמוכן</button>
                            )}
                            {job.status === 'completed' && (
                                <button onClick={() => handleDeliver(job)} className="text-xs bg-slate-800 text-white px-3 py-1.5 rounded-full font-bold shadow-lg shadow-slate-200 dark:shadow-none flex items-center gap-1 hover:bg-slate-700">
                                    <Check size={12} /> מסור וקבל תשלום
                                </button>
                            )}
                        </div>
                        
                        <div className="flex gap-1">
                            <IconButton icon={Pencil} color="blue" onClick={() => handleEdit(job)} />
                            <IconButton icon={Trash2} color="red" onClick={() => askConfirm("למחוק עבודה זו?", () => setJobs(jobs.filter(j => j.id !== job.id)))} />
                        </div>
                    </div>
                </Card>
                ))}
            </div>
          </>
      ) : (
          <div className="space-y-4">
              {/* תיקון: עיצוב טופס ניהול מלאי למובייל */}
              <div className="grid gap-3 mb-4">
                  <input placeholder="שם פריט (למשל: דבק)" className="p-2 rounded border w-full dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={invForm.item} onChange={e => setInvForm({...invForm, item: e.target.value})} />
                  <div className="flex gap-2">
                      <input type="number" placeholder="כמות" className="p-2 rounded border w-24 dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={invForm.qty} onChange={e => setInvForm({...invForm, qty: e.target.value})} />
                      <Button onClick={handleAddInventory} className="flex-1">הוסף</Button>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                  {inventory.map(item => (
                      <Card key={item.id} className="p-3 flex justify-between items-center bg-white dark:bg-slate-800">
                          <div>
                              <div className="font-bold dark:text-white">{item.item}</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">מלאי: {item.qty}</div>
                          </div>
                          <div className="flex flex-col gap-1">
                               <button onClick={() => setInventory(inventory.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))} className="text-green-500 hover:bg-green-50 rounded px-1">+</button>
                               <button onClick={() => setInventory(inventory.map(i => i.id === item.id ? {...i, qty: Math.max(0, i.qty - 1)} : i))} className="text-red-500 hover:bg-red-50 rounded px-1">-</button>
                          </div>
                      </Card>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

// 3. HealthView
const HealthView = ({ 
    calories, setCalories, 
    protein, setProtein, 
    water, setWater, 
    workouts, setWorkouts, 
    meals, setMeals, 
    favMeals, setFavMeals, 
    askConfirm,
    exerciseLibrary, setExerciseLibrary,
    weightLog, setWeightLog,
    targets
}) => {
  const [activeTab, setActiveTab] = useState('workout'); // workout | food | weight
  const [subTab, setSubTab] = useState('plan'); // plan | library
  
  // Workouts State
  const [workoutForm, setWorkoutForm] = useState({ day: "ראשון", type: "" });
  const [isWorkoutFormOpen, setIsWorkoutFormOpen] = useState(false);
  const [expandedWorkoutId, setExpandedWorkoutId] = useState(null);
  const [exerciseForm, setExerciseForm] = useState({ name: "", sets: "", reps: "", weight: "" });

  // Library State
  const [libForm, setLibForm] = useState({ name: "", sets: "", reps: "", weight: "" });

  // Food State
  const [mealForm, setMealForm] = useState({ name: "", cal: "", prot: "" });
  const [isMealFormOpen, setIsMealFormOpen] = useState(false);

  // Weight State
  const [weightInput, setWeightInput] = useState("");

  // Session State
  const [activeSession, setActiveSession] = useState(null); 
  const [stopwatch, setStopwatch] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isStopwatchRunning) {
      interval = setInterval(() => setStopwatch(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartSession = (workoutId) => {
    const workout = workouts.find(w => w.id === workoutId);
    if (!workout || !workout.exercises || workout.exercises.length === 0) {
        alert("אין תרגילים באימון זה"); 
        return;
    }
    setActiveSession({ workoutId, exIndex: 0, setNum: 1 });
    setStopwatch(0);
    setIsStopwatchRunning(false);
  };

  const handleNextSet = () => {
    const workout = workouts.find(w => w.id === activeSession.workoutId);
    const currentEx = workout.exercises[activeSession.exIndex];
    const totalSets = parseInt(currentEx.sets) || 1;

    if (activeSession.setNum < totalSets) {
        setActiveSession({ ...activeSession, setNum: activeSession.setNum + 1 });
        setStopwatch(0); 
    } else {
        if (activeSession.exIndex < workout.exercises.length - 1) {
            setActiveSession({ 
                workoutId: activeSession.workoutId, 
                exIndex: activeSession.exIndex + 1, 
                setNum: 1 
            });
            setStopwatch(0);
        } else {
            handleFinishWorkout();
        }
    }
  };

  const handleFinishWorkout = () => {
      setWorkouts(workouts.map(w => w.id === activeSession.workoutId ? { ...w, done: true } : w));
      setActiveSession(null);
      setStopwatch(0);
      setIsStopwatchRunning(false);
  };

  const handleQuitSession = () => {
      askConfirm("לצאת מהאימון? ההתקדמות לא תישמר.", () => {
          setActiveSession(null);
          setStopwatch(0);
          setIsStopwatchRunning(false);
      });
  };

  const handleAddWorkout = () => {
    if (!workoutForm.type) return;
    setWorkouts([...workouts, { id: Date.now(), ...workoutForm, done: false, exercises: [] }]);
    setWorkoutForm({ day: "ראשון", type: "" });
    setIsWorkoutFormOpen(false);
  };

  const handleAddToLibrary = () => {
      if(!libForm.name) return;
      const today = new Date().toLocaleDateString('he-IL');
      setExerciseLibrary([...exerciseLibrary, { 
          id: Date.now(), 
          name: libForm.name,
          sets: libForm.sets,
          reps: libForm.reps,
          weight: libForm.weight,
          lastUpdated: today
      }]);
      setLibForm({ name: "", sets: "", reps: "", weight: "" });
  };

  const handleDeleteFromLibrary = (id) => {
      askConfirm("למחוק תרגיל זה מהמאגר?", () => setExerciseLibrary(exerciseLibrary.filter(e => e.id !== id)));
  };

  const handleLibrarySelect = (e) => {
      const selectedName = e.target.value;
      const libItem = exerciseLibrary.find(ex => ex.name === selectedName);
      setExerciseForm({
          name: selectedName,
          sets: libItem ? libItem.sets : "",
          reps: libItem ? libItem.reps : "",
          weight: libItem ? libItem.weight : ""
      });
  };

  const handleAddExerciseToWorkout = (workoutId) => {
      if (!exerciseForm.name) return;
      const newExercise = {
          id: Date.now(),
          name: exerciseForm.name,
          sets: exerciseForm.sets,
          reps: exerciseForm.reps,
          weight: exerciseForm.weight,
          lastUpdated: new Date().toLocaleDateString('he-IL')
      };
      setWorkouts(workouts.map(w => {
          if (w.id === workoutId) {
              const currentExercises = w.exercises || [];
              return { ...w, exercises: [...currentExercises, newExercise] };
          }
          return w;
      }));
      setExerciseForm({ name: "", sets: "", reps: "", weight: "" });
  };

  const handleDeleteExercise = (workoutId, exerciseId) => {
      setWorkouts(workouts.map(w => {
          if (w.id === workoutId) {
              return { ...w, exercises: w.exercises.filter(e => e.id !== exerciseId) };
          }
          return w;
      }));
  };
  
  const handleAddWeight = () => {
      if(!weightInput) return;
      const today = new Date().toLocaleDateString('he-IL');
      setWeightLog([...weightLog, { id: Date.now(), date: today, weight: parseFloat(weightInput) }]);
      setWeightInput("");
  };

  const handleDeleteWeight = (id) => {
      askConfirm("למחוק שקילה זו?", () => setWeightLog(weightLog.filter(w => w.id !== id)));
  };

  const handleResetWeight = () => {
      askConfirm("האם אתה בטוח שברצונך לאפס את כל היסטוריית השקילות?", () => setWeightLog([]));
  };

  const handleAddMeal = (mealData = mealForm) => {
    if (!mealData.name || !mealData.cal) return;
    const newMeal = { 
        id: Date.now(), 
        name: mealData.name, 
        cal: parseInt(mealData.cal),
        prot: parseInt(mealData.prot) || 0
    };
    setMeals([...meals, newMeal]);
    setCalories(c => c + newMeal.cal);
    setProtein(p => p + newMeal.prot);
    if(mealData === mealForm) setMealForm({ name: "", cal: "", prot: "" });
    setIsMealFormOpen(false);
  };

  const handleSaveFav = () => {
      if (!mealForm.name || !mealForm.cal) return;
      setFavMeals([...favMeals, { id: Date.now(), ...mealForm }]);
  };
  
  const handleDeleteMeal = (id, cal, prot) => {
      askConfirm("הארוחה תימחק מהיומן.", () => {
          setMeals(meals.filter(m => m.id !== id));
          setCalories(c => Math.max(0, c - cal));
          setProtein(p => Math.max(0, p - (prot || 0)));
      });
  };

  const currentWeight = weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : 0;
  const startWeight = weightLog.length > 0 ? weightLog[0].weight : 0;
  const weightDiff = (currentWeight - startWeight).toFixed(1);

  if (activeSession) {
      const currentWorkout = workouts.find(w => w.id === activeSession.workoutId);
      const currentEx = currentWorkout.exercises[activeSession.exIndex];
      const totalSets = parseInt(currentEx.sets) || 1;
      const isLastSetOfEx = activeSession.setNum >= totalSets;
      const isLastExercise = activeSession.exIndex >= currentWorkout.exercises.length - 1;
      
      let nextLabel = "";
      if (!isLastSetOfEx) nextLabel = `סט הבא (${activeSession.setNum + 1})`;
      else if (!isLastExercise) nextLabel = `תרגיל הבא: ${currentWorkout.exercises[activeSession.exIndex + 1].name}`;
      else nextLabel = "סיים אימון";

      return (
          <div className="space-y-6 h-full flex flex-col animate-in fade-in">
              <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-700 p-3 rounded-xl">
                  <div>
                      <h2 className="font-bold text-lg dark:text-white">{currentWorkout.type}</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-300">אימון חי</p>
                  </div>
                  <Button size="sm" variant="danger" onClick={handleQuitSession}>יציאה</Button>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-6 text-center">
                  <div>
                      <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{currentEx.name}</h1>
                      <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-1 rounded-full font-bold">
                          סט {activeSession.setNum} מתוך {totalSets}
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                          <div className="text-slate-500 dark:text-slate-400 text-sm">משקל</div>
                          <div className="text-2xl font-bold dark:text-white">{currentEx.weight} <span className="text-sm">ק"ג</span></div>
                      </Card>
                      <Card className="p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600">
                          <div className="text-slate-500 dark:text-slate-400 text-sm">חזרות</div>
                          <div className="text-2xl font-bold dark:text-white">{currentEx.reps}</div>
                      </Card>
                  </div>

                  <div className="my-4">
                      <div className="text-6xl font-mono font-bold text-slate-700 dark:text-slate-200 mb-4 tracking-wider">
                          {formatTime(stopwatch)}
                      </div>
                      <div className="flex justify-center gap-4">
                          <button 
                            onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${isStopwatchRunning ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}
                          >
                              {isStopwatchRunning ? <Pause size={32} /> : <Play size={32} />}
                          </button>
                          <button 
                            onClick={() => { setIsStopwatchRunning(false); setStopwatch(0); }}
                            className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shadow hover:bg-slate-200"
                          >
                              <RotateCcw size={28} />
                          </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">שעון עצר למנוחה או ביצוע</p>
                  </div>
              </div>

              <Button size="lg" className="w-full py-4 text-xl shadow-xl shadow-blue-200 dark:shadow-none" onClick={handleNextSet}>
                  {nextLabel} {isLastSetOfEx && isLastExercise ? <CheckCircle2 className="mr-2" /> : <SkipForward className="mr-2" />}
              </Button>
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
        <button onClick={() => setActiveTab('workout')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'workout' ? 'bg-white dark:bg-slate-600 shadow text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>אימונים</button>
        <button onClick={() => setActiveTab('food')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'food' ? 'bg-white dark:bg-slate-600 shadow text-green-600 dark:text-green-300' : 'text-slate-500 dark:text-slate-400'}`}>תזונה</button>
        <button onClick={() => setActiveTab('weight')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === 'weight' ? 'bg-white dark:bg-slate-600 shadow text-cyan-600 dark:text-cyan-300' : 'text-slate-500 dark:text-slate-400'}`}>משקל</button>
      </div>

      {activeTab === 'workout' && (
          <>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
               <button onClick={() => setSubTab('plan')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${subTab === 'plan' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'}`}>תוכנית שבועית</button>
               <button onClick={() => setSubTab('library')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${subTab === 'library' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'}`}>מאגר תרגילים</button>
            </div>

            {subTab === 'library' ? (
                <div className="space-y-4 animate-in fade-in">
                    <Card className="p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <div className="grid gap-2">
                            <input placeholder="שם התרגיל (למשל: סקוואט)" className="p-2 rounded border w-full text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600" value={libForm.name} onChange={e => setLibForm({...libForm, name: e.target.value})} />
                            <div className="flex gap-2">
                                <input type="number" placeholder="סטים" className="p-2 rounded border w-1/3 text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600" value={libForm.sets} onChange={e => setLibForm({...libForm, sets: e.target.value})} />
                                <input type="number" placeholder="חזרות" className="p-2 rounded border w-1/3 text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600" value={libForm.reps} onChange={e => setLibForm({...libForm, reps: e.target.value})} />
                                <input type="number" placeholder='ק"ג' className="p-2 rounded border w-1/3 text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600" value={libForm.weight} onChange={e => setLibForm({...libForm, weight: e.target.value})} />
                            </div>
                            <Button size="sm" onClick={handleAddToLibrary}>הוסף למאגר</Button>
                        </div>
                    </Card>
                    <div className="space-y-2">
                        {exerciseLibrary.length === 0 && <div className="text-center text-slate-400 text-sm py-4">המאגר ריק. הוסף תרגילים כדי להשתמש בהם בתוכנית.</div>}
                        {exerciseLibrary.map(ex => (
                            <div key={ex.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg">
                                <div>
                                    <div className="font-bold text-sm dark:text-white">{ex.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {ex.sets} סטים • {ex.reps} חזרות • {ex.weight} ק"ג
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">עודכן: {ex.lastUpdated}</div>
                                </div>
                                <IconButton icon={Trash2} color="red" onClick={() => handleDeleteFromLibrary(ex.id)} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in">
                    <Card className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        <h3 className="font-bold text-lg mb-2">האימון הבא שלך</h3>
                        <div className="text-3xl font-bold mb-1">{workouts.find(w => !w.done)?.type || "מנוחה"}</div>
                        <p className="opacity-80">{workouts.find(w => !w.done)?.day || "הכל הושלם!"}</p>
                    </Card>

                    <div className="flex justify-between items-center mt-4">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300">תוכנית שבועית</h3>
                        <Button size="sm" onClick={() => setIsWorkoutFormOpen(!isWorkoutFormOpen)}>
                            {isWorkoutFormOpen ? <X size={16}/> : <Plus size={16} />}
                        </Button>
                    </div>

                    {isWorkoutFormOpen && (
                        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 flex gap-2 items-center">
                            <select className="p-2 rounded border text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600" value={workoutForm.day} onChange={e => setWorkoutForm({...workoutForm, day: e.target.value})}>
                                {["ראשון","שני","שלישי","רביעי","חמישי","שישי"].map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <input placeholder="שם האימון (למשל: חזה)" className="p-2 rounded border flex-1 text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600" value={workoutForm.type} onChange={e => setWorkoutForm({...workoutForm, type: e.target.value})} />
                            <Button size="sm" onClick={handleAddWorkout}><Save size={16} /></Button>
                        </Card>
                    )}

                    <div className="space-y-2">
                        {workouts.map((w) => (
                        <Card key={w.id} className={`border dark:border-slate-700 ${w.done ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60' : 'bg-white dark:bg-slate-800'}`}>
                            <div className="p-3 flex justify-between items-center">
                                <div className="flex items-center gap-3 flex-1">
                                <div onClick={() => setWorkouts(workouts.map(item => item.id === w.id ? {...item, done: !item.done} : item))} className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${w.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400'}`}>
                                    {w.done ? <CheckCircle2 size={16} /> : <Dumbbell size={16} />}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-white">{w.type}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{w.day} • {(w.exercises || []).length} תרגילים</div>
                                </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {(w.exercises && w.exercises.length > 0 && !w.done) && (
                                        <button 
                                            onClick={() => handleStartSession(w.id)}
                                            className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-transform"
                                            title="התחל אימון"
                                        >
                                            <Play size={16} fill="currentColor" />
                                        </button>
                                    )}
                                    <IconButton icon={expandedWorkoutId === w.id ? ChevronUp : ChevronDown} onClick={() => setExpandedWorkoutId(expandedWorkoutId === w.id ? null : w.id)} />
                                    <IconButton icon={Trash2} color="red" onClick={() => askConfirm("למחוק אימון זה?", () => setWorkouts(workouts.filter(i => i.id !== w.id)))} />
                                </div>
                            </div>

                            {expandedWorkoutId === w.id && (
                                <div className="border-t dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/50">
                                    <div className="space-y-2 mb-3">
                                        {(w.exercises || []).length === 0 && <div className="text-xs text-center text-slate-400">אין תרגילים. בחר מהמאגר.</div>}
                                        {(w.exercises || []).map(ex => (
                                            <div key={ex.id} className="flex justify-between items-center bg-white dark:bg-slate-700 p-2 rounded shadow-sm">
                                                <div>
                                                    <div className="font-bold text-sm dark:text-white">{ex.name}</div>
                                                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                                        {ex.sets} סטים | {ex.reps} חזרות | {ex.weight} ק"ג
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDeleteExercise(w.id, ex.id)} className="text-slate-300 hover:text-red-500 p-1"><X size={14} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="text-xs font-bold text-slate-500 mb-1">הוסף תרגיל מהמאגר:</div>
                                    <div className="grid grid-cols-4 gap-2 mb-2">
                                        <select 
                                            className="col-span-4 p-1.5 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm" 
                                            value={exerciseForm.name} 
                                            onChange={handleLibrarySelect}
                                        >
                                            <option value="">בחר תרגיל...</option>
                                            {exerciseLibrary.map(ex => <option key={ex.id} value={ex.name}>{ex.name}</option>)}
                                        </select>
                                        <input type="number" placeholder="סטים" className="p-1.5 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm" value={exerciseForm.sets} onChange={e => setExerciseForm({...exerciseForm, sets: e.target.value})} />
                                        <input type="number" placeholder="חזרות" className="p-1.5 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm" value={exerciseForm.reps} onChange={e => setExerciseForm({...exerciseForm, reps: e.target.value})} />
                                        <input type="number" placeholder='ק"ג' className="p-1.5 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm" value={exerciseForm.weight} onChange={e => setExerciseForm({...exerciseForm, weight: e.target.value})} />
                                        <button onClick={() => handleAddExerciseToWorkout(w.id)} className="bg-blue-600 text-white rounded p-1.5 flex items-center justify-center hover:bg-blue-700"><Plus size={16} /></button>
                                    </div>
                                    {exerciseLibrary.length === 0 && <div className="text-[10px] text-red-400 mt-1">* המאגר ריק. עבור ללשונית "מאגר תרגילים" כדי להוסיף.</div>}
                                </div>
                            )}
                        </Card>
                        ))}
                    </div>
                </div>
            )}
          </>
      )}

      {activeTab === 'weight' && (
          <div className="space-y-6 animate-in fade-in">
              <Card className="p-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full"><Scale size={32} /></div>
                      <div>
                          <div className="text-cyan-100 text-sm">משקל נוכחי</div>
                          <div className="text-4xl font-bold">{currentWeight} <span className="text-xl font-normal">ק"ג</span></div>
                      </div>
                      <div className="mr-auto text-right">
                          <div className="text-cyan-100 text-sm">שינוי</div>
                          <div className="text-2xl font-bold" dir="ltr">{weightDiff > 0 ? '+' : ''}{weightDiff}</div>
                      </div>
                  </div>
              </Card>

              <div>
                  <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3">תיעוד שקילה</h3>
                  <div className="flex gap-2 mb-4">
                      <input type="number" placeholder="משקל (קג)" className="p-2 rounded border flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={weightInput} onChange={e => setWeightInput(e.target.value)} />
                      <Button onClick={handleAddWeight}>שמור</Button>
                  </div>
                  
                  <div className="flex justify-end">
                      <button onClick={handleResetWeight} className="text-xs text-red-500 flex items-center gap-1 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded">
                          <RefreshCw size={12} /> אפס היסטוריה
                      </button>
                  </div>
              </div>

              <div className="space-y-2">
                  {[...weightLog].reverse().map(log => (
                      <div key={log.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg">
                          <div className="font-medium text-slate-800 dark:text-white">{log.date}</div>
                          <div className="flex items-center gap-3">
                              <span className="font-bold text-cyan-600 dark:text-cyan-400">{log.weight} ק"ג</span>
                              <IconButton icon={Trash2} color="red" onClick={() => handleDeleteWeight(log.id)} />
                          </div>
                      </div>
                  ))}
                  {weightLog.length === 0 && <div className="text-center text-slate-400 py-4">אין נתונים. הוסף שקילה ראשונה.</div>}
              </div>
          </div>
      )}

      {activeTab === 'food' && (
        <div className="space-y-6">
           <Card className="p-4 relative overflow-hidden">
             <div className="grid grid-cols-3 gap-2">
                 <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">קלוריות</div>
                    <div className="text-xl font-bold text-slate-700 dark:text-white">{calories}</div>
                 </div>
                 <div className="text-center border-x border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] text-slate-500 mb-1">חלבון</div>
                    <div className="text-xl font-bold text-blue-600">{protein}g</div>
                 </div>
                 <div className="text-center">
                     <div className="text-[10px] text-slate-500 mb-1">מים</div>
                     <div className="text-xl font-bold text-cyan-500">{water}ml</div>
                 </div>
             </div>
             <div className="mt-4 bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg flex items-center justify-between">
                 <div className="flex items-center gap-2">
                     <Droplets className="text-cyan-500" size={20} />
                     <div className="text-xs text-cyan-700 dark:text-cyan-300">שתית {water} מתוך {targets.water} מ"ל</div>
                 </div>
                 <button onClick={() => setWater(w => w + 200)} className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full hover:bg-cyan-600 transition-colors shadow-sm active:scale-95">+ כוס (200)</button>
             </div>
           </Card>

           <div>
             <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">ארוחות היום</h3>
             <div className="space-y-2">
               {meals.map(meal => (
                  <div key={meal.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg group">
                    <div className="flex items-center gap-2">
                         <span className="text-lg">🍽️</span>
                         <div className="font-medium text-sm dark:text-white">{meal.name}</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm">
                           {meal.prot > 0 && <span className="text-blue-600 font-bold">{meal.prot}g</span>}
                           <span className="text-green-600 font-bold">{meal.cal} cal</span>
                        </div>
                        <div>
                            <IconButton icon={Trash2} color="red" onClick={() => handleDeleteMeal(meal.id, meal.cal, meal.prot)} />
                        </div>
                    </div>
                  </div>
               ))}
               
               {isMealFormOpen ? (
                   <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border border-dashed border-slate-300 dark:border-slate-700">
                       {favMeals.length > 0 && (
                           <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                               {favMeals.map(fav => (
                                   <button key={fav.id} onClick={() => handleAddMeal(fav)} className="text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 px-2 py-1 rounded-full whitespace-nowrap hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white">
                                       ⭐ {fav.name}
                                   </button>
                               ))}
                           </div>
                       )}

                       <input placeholder="שם הארוחה" className="p-2 rounded border w-full text-sm mb-2 dark:bg-slate-800 dark:border-slate-600 dark:text-white" value={mealForm.name} onChange={e => setMealForm({...mealForm, name: e.target.value})} />
                       <div className="flex gap-2 mb-2">
                           <input placeholder="קק'ל" type="number" className="p-2 rounded border w-1/2 text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white" value={mealForm.cal} onChange={e => setMealForm({...mealForm, cal: e.target.value})} />
                           <input placeholder="חלבון (ג)" type="number" className="p-2 rounded border w-1/2 text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white" value={mealForm.prot} onChange={e => setMealForm({...mealForm, prot: e.target.value})} />
                       </div>
                       <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleAddMeal()} className="flex-1">שמור</Button>
                            <Button size="sm" onClick={handleSaveFav} variant="outline" className="px-2" title="שמור במועדפים"><Star size={16} /></Button>
                            <Button size="sm" onClick={() => setIsMealFormOpen(false)} variant="secondary" className="flex-1">ביטול</Button>
                       </div>
                   </div>
               ) : (
                   <button onClick={() => setIsMealFormOpen(true)} className="w-full flex justify-center p-3 bg-white dark:bg-slate-800 border rounded-lg border-dashed border-slate-300 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                     + הוסף ארוחה
                   </button>
               )}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

// 4. WalletView
const WalletView = ({ transactions, setTransactions, askConfirm }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [form, setForm] = useState({ title: "", amount: "", type: "income", date: new Date().toISOString().slice(0, 10) });

    const handleAdd = () => {
        if (!form.title || !form.amount) return;
        const newTrans = { 
            id: Date.now(), 
            title: form.title, 
            amount: parseFloat(form.amount), 
            type: form.type, 
            date: form.date 
        };
        setTransactions([newTrans, ...transactions]);
        setIsFormOpen(false);
        setForm({ title: "", amount: "", type: "income", date: new Date().toISOString().slice(0, 10) });
    };

    const handleDelete = (id) => {
        askConfirm("למחוק את הפעולה מהארנק?", () => {
             setTransactions(transactions.filter(t => t.id !== id));
        });
    };

    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;

    return (
        <div className="space-y-6">
            <Card className="bg-slate-900 text-white p-6">
                <div className="text-slate-400 text-sm mb-1">יתרה כוללת</div>
                <div className={`text-4xl font-bold ${balance < 0 ? 'text-red-400' : 'text-white'}`}>₪{balance.toLocaleString()}</div>
                <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-white/10 p-3 rounded-lg flex items-center gap-3">
                        <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                            <ArrowDownLeft size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-300">הכנסות</div>
                            <div className="font-bold">₪{income.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white/10 p-3 rounded-lg flex items-center gap-3">
                        <div className="bg-red-500/20 p-2 rounded-full text-red-400">
                            <ArrowUpRight size={20} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-300">הוצאות</div>
                            <div className="font-bold">₪{expense.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-700 dark:text-slate-300">תנועות אחרונות</h3>
                <Button size="sm" onClick={() => setIsFormOpen(!isFormOpen)}>
                    {isFormOpen ? <X size={16} /> : <Plus size={16} />} פעולה
                </Button>
            </div>

            {isFormOpen && (
                <Card className="p-4 bg-slate-100 dark:bg-slate-700 animate-in fade-in slide-in-from-top-2">
                    <div className="grid gap-3">
                        <div className="flex gap-2">
                             <button onClick={() => setForm({...form, type: 'income'})} className={`flex-1 py-2 rounded-lg text-sm font-bold ${form.type === 'income' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white dark:bg-slate-600 dark:text-slate-300'}`}>הכנסה</button>
                             <button onClick={() => setForm({...form, type: 'expense'})} className={`flex-1 py-2 rounded-lg text-sm font-bold ${form.type === 'expense' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white dark:bg-slate-600 dark:text-slate-300'}`}>הוצאה</button>
                        </div>
                        <input placeholder="תיאור (למשל: קניות בסופר)" className="p-2 rounded border dark:bg-slate-600 dark:border-slate-500 dark:text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        <div className="flex gap-2">
                            <input type="number" placeholder="סכום" className="p-2 rounded border w-1/2 dark:bg-slate-600 dark:border-slate-500 dark:text-white" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                            <input type="date" className="p-2 rounded border w-1/2 dark:bg-slate-600 dark:border-slate-500 dark:text-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                        </div>
                        <Button onClick={handleAdd} variant={form.type === 'income' ? 'success' : 'danger'}>שמור פעולה</Button>
                    </div>
                </Card>
            )}

            <div className="space-y-3">
                {transactions.length === 0 ? (
                    <div className="text-center text-slate-400 py-4">אין תנועות עדיין</div>
                ) : transactions.map(t => (
                    <Card key={t.id} className="p-4 flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                                {t.type === 'income' ? <TrendingUp size={18} /> : <Wallet size={18} />}
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 dark:text-white">{t.title}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{t.date}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`font-bold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} ₪
                            </div>
                            <div>
                                <IconButton icon={Trash2} color="red" onClick={() => handleDelete(t.id)} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// 5. Dashboard
const Dashboard = ({ changeTab, schedule, setSchedule, assignments, jobs, calories, targetCalories, protein, targetProtein, workouts, askConfirm, transactions, targets }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [formType, setFormType] = useState('meal'); 
  const [formData, setFormData] = useState({ time: '08:00', title: '', subTitle: '', detail: '' });

  const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "בוקר טוב,";
      if (hour >= 12 && hour < 18) return "צהריים טובים,";
      if (hour >= 18 && hour < 22) return "ערב טוב,";
      return "לילה טוב,";
  };

  const quotes = [
      "Believe you can and you're halfway there.",
      "The only way to do great work is to love what you do.",
      "Don't watch the clock; do what it does. Keep going.",
      "The future depends on what you do today.",
      "It always seems impossible until it is done.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "You are never too old to set another goal or to dream a new dream.",
      "Act as if what you do makes a difference. It does.",
      "Success usually comes to those who are too busy to be looking for it.",
      "Don't be afraid to give up the good to go for the great.",
      "I find that the harder I work, the more luck I seem to have.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "The way to get started is to quit talking and begin doing.",
      "Opportunities don't happen. You create them.",
      "Work hard in silence, let your success be your noise.",
      "Your time is limited, so don't waste it living someone else's life.",
      "Dream big and dare to fail.",
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
      "Hardships often prepare ordinary people for an extraordinary destiny.",
      "Do something today that your future self will thank you for."
  ];
  
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  const getUrgentAssignments = () => {
    const today = new Date(); today.setHours(0,0,0,0);
    const threeDaysFromNow = new Date(); threeDaysFromNow.setDate(today.getDate() + 3); threeDaysFromNow.setHours(23,59,59,999);
    return assignments.filter(a => {
      if (a.status !== 'pending') return false;
      const dueDate = new Date(a.date); dueDate.setHours(0,0,0,0);
      return dueDate <= threeDaysFromNow;
    });
  };

  const getWeeklyStats = () => {
      const weeklyAssignments = assignments.filter(a => a.status === 'done' && isInCurrentWeek(a.date));
      const weeklyJobs = jobs.filter(j => j.status === 'delivered' && isInCurrentWeek(j.date));
      const weeklyJobsIncome = weeklyJobs.reduce((acc, j) => acc + (j.price || 0), 0);
      const weeklyWorkouts = workouts.filter(w => w.done);
      const weeklyTransactions = transactions.filter(t => isInCurrentWeek(t.date));
      const weeklyIncome = weeklyTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const weeklyExpense = weeklyTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

      return {
          assignmentsCount: weeklyAssignments.length,
          jobsCount: weeklyJobs.length,
          jobsIncome: weeklyJobsIncome,
          workoutsCount: weeklyWorkouts.length,
          income: weeklyIncome,
          expense: weeklyExpense
      };
  };

  const urgentItems = getUrgentAssignments();
  const weeklyStats = getWeeklyStats();

  const activityTypes = [
      { id: 'meal', label: 'ארוחה', icon: Utensils, color: 'green' },
      { id: 'workout', label: 'אימון', icon: Dumbbell, color: 'blue' },
      { id: 'lecture', label: 'הרצאה', icon: GraduationCap, color: 'purple' },
      { id: 'homework', label: 'ש.ב', icon: Book, color: 'orange' },
      { id: 'volunteer', label: 'התנדבות', icon: HeartHandshake, color: 'pink' },
      { id: 'other', label: 'אחר', icon: Clock, color: 'slate' },
  ];

  const handleAddEvent = () => {
      const newItem = {
          id: Date.now(),
          type: formType,
          time: formData.time,
          title: formData.title || 'כללי',
          subTitle: formData.subTitle,
          detail: formData.detail
      };
      setSchedule([...schedule, newItem].sort((a,b) => a.time.localeCompare(b.time)));
      setIsFormOpen(false);
      setFormData({ time: '', title: '', subTitle: '', detail: '' });
  };

  const getTypeIcon = (type) => { const Icon = activityTypes.find(t => t.id === type)?.icon || Clock; return <Icon size={18} />; };
  const getTypeColor = (type) => activityTypes.find(t => t.id === type)?.color || 'slate';

  const pendingAssignments = assignments.filter(a => a.status === 'pending').length;
  const openJobs = jobs.filter(j => j.status === 'in_progress' || j.status === 'received').length;
  const workoutsDone = workouts.filter(w => w.done).length;

  return (
    <div className="space-y-6">
      {isSummaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <Card className="w-full max-w-sm p-0 bg-white dark:bg-slate-800 shadow-2xl relative">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-1">סיכום שבועי</h2>
                    <p className="text-blue-100 text-sm">ההישגים שלך השבוע</p>
                    <button onClick={() => setIsSummaryOpen(false)} className="absolute top-4 left-4 p-2 bg-white/20 rounded-full hover:bg-white/30 text-white">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-600 rounded-full"><CheckCircle2 size={20} /></div>
                            <span className="font-medium dark:text-white">מטלות שבוצעו</span>
                        </div>
                        <span className="font-bold text-xl dark:text-white">{weeklyStats.assignmentsCount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-full"><BookOpen size={20} /></div>
                            <div>
                                <div className="font-medium dark:text-white">כריכות שנמסרו</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">הכנסה משוערת: ₪{weeklyStats.jobsIncome}</div>
                            </div>
                        </div>
                        <span className="font-bold text-xl dark:text-white">{weeklyStats.jobsCount}</span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Dumbbell size={20} /></div>
                            <span className="font-medium dark:text-white">אימונים</span>
                        </div>
                        <span className="font-bold text-xl dark:text-white">{weeklyStats.workoutsCount}</span>
                    </div>

                    <div className="border-t dark:border-slate-700 pt-4 mt-2">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">ארנק שבועי</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800">
                                <span className="block text-xs text-green-600 dark:text-green-400">הכנסות</span>
                                <span className="block font-bold text-green-700 dark:text-green-300">₪{weeklyStats.income}</span>
                            </div>
                            <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-800">
                                <span className="block text-xs text-red-600 dark:text-red-400">הוצאות</span>
                                <span className="block font-bold text-red-700 dark:text-red-300">₪{weeklyStats.expense}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      )}

      <div className="bg-slate-800 dark:bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <h1 className="text-2xl font-light">{getGreeting()}</h1>
            <p className="text-xl font-bold italic opacity-90 mt-1 mb-4" dir="ltr">{quote}</p>
            <Button 
                onClick={() => setIsSummaryOpen(true)} 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-sm"
            >
                <BarChart3 size={16} /> צפה בסיכום שבועי
            </Button>
        </div>
      </div>

      {urgentItems.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold mb-2">
                  <AlertCircle size={20} />
                  <span>שים לב! מטלות דחופות</span>
              </div>
              <div className="space-y-2">
                  {urgentItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center bg-white dark:bg-slate-800 p-2 rounded border border-red-100 dark:border-red-900">
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.task} ({item.course})</span>
                          <span className="text-xs bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded-full font-bold">{item.date}</span>
                      </div>
                  ))}
              </div>
          </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div onClick={() => changeTab('uni')} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border border-blue-100 dark:border-blue-900">
          <GraduationCap className="text-blue-600 dark:text-blue-400 mb-2" />
          <div className="font-bold text-slate-800 dark:text-white">אוניברסיטה</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{pendingAssignments} מטלות פתוחות</div>
        </div>
        
        <div onClick={() => changeTab('binding')} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors border border-purple-100 dark:border-purple-900">
          <BookOpen className="text-purple-600 dark:text-purple-400 mb-2" />
          <div className="font-bold text-slate-800 dark:text-white">כריכה</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{openJobs} בהזמנה/עבודה</div>
        </div>
        
        <div onClick={() => changeTab('health')} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl col-span-2 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors border border-green-100 dark:border-green-900">
           <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="text-green-600 dark:text-green-400" size={20} />
              <div className="font-bold text-slate-800 dark:text-white">כושר ותזונה</div>
           </div>
           
           <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
               <div className="flex-1 min-w-[100px] flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                   <Flame size={18} className="text-orange-500" />
                   <div>
                       <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">קלוריות</div>
                       <div className="text-sm font-bold text-slate-700 dark:text-white">{calories}/{targets.calories}</div>
                   </div>
               </div>
               <div className="flex-1 min-w-[100px] flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                   <Beef size={18} className="text-blue-500" />
                   <div>
                       <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">חלבון</div>
                       <div className="text-sm font-bold text-slate-700 dark:text-white">{protein}/{targets.protein}g</div>
                   </div>
               </div>
               <div className="flex-1 min-w-[100px] flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                   <Dumbbell size={18} className="text-purple-500" />
                   <div>
                       <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">אימונים</div>
                       <div className="text-sm font-bold text-slate-700 dark:text-white">{workoutsDone}</div>
                   </div>
               </div>
           </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Clock size={20} /> הלו"ז היומי שלי
            </h3>
            <Button size="sm" variant="secondary" onClick={() => setIsFormOpen(!isFormOpen)}>
                {isFormOpen ? <X size={16} /> : <Plus size={16} />}
            </Button>
        </div>

        {isFormOpen && (
            <Card className="p-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 mb-4 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {activityTypes.map(type => (
                            <button key={type.id} onClick={() => { setFormType(type.id); setFormData({...formData, title: ''}); }} className={`flex flex-col items-center gap-1 min-w-[60px] p-2 rounded-lg border transition-all ${formType === type.id ? 'bg-blue-100 border-blue-300 text-blue-700' : 'bg-white dark:bg-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'}`}>
                                <type.icon size={20} />
                                <span className="text-[10px] font-bold">{type.label}</span>
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-3">
                        <input type="time" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                        <input placeholder="כותרת / נושא" className="p-2 rounded border dark:bg-slate-700 dark:text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                        <Button onClick={handleAddEvent}>הוסף ללו"ז</Button>
                    </div>
                </div>
            </Card>
        )}

        <div className="space-y-3 relative">
            <div className="absolute top-4 bottom-4 right-[27px] w-0.5 bg-slate-200 dark:bg-slate-700 -z-10"></div>
            {schedule.length === 0 ? <div className="text-center py-8 text-slate-400">הלו"ז ריק להיום.</div> : schedule.map((item) => (
                <div key={item.id} className="flex gap-3 items-start group">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold px-2 py-1 rounded text-slate-500 dark:text-slate-400 w-14 text-center mt-1">{item.time}</div>
                    <div className={`p-3 rounded-xl border flex-1 bg-white dark:bg-slate-800 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${getTypeColor(item.type)}-500`}></div>
                        <div className="flex justify-between items-start">
                            <div className="flex gap-2 items-start">
                                <div className={`text-${getTypeColor(item.type)}-500 mt-0.5`}>{getTypeIcon(item.type)}</div>
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-white">{item.title}</div>
                                    {item.subTitle && <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.subTitle}</div>}
                                </div>
                            </div>
                            <button onClick={() => askConfirm("למחוק?", () => setSchedule(schedule.filter(s => s.id !== item.id)))} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- קומפוננטה ראשית (State Management) ---

export default function App() {
  // ניהול מצב לילה
  const [darkMode, setDarkMode] = useStickyState(false, 'darkMode');
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [confirmState, setConfirmState] = useState({ isOpen: false, text: "", onConfirm: null });

  const askConfirm = (text, confirmAction) => {
    setConfirmState({ isOpen: true, text, onConfirm: () => { confirmAction(); setConfirmState({ isOpen: false, text: "", onConfirm: null }); } });
  };

  // --- Global State (עם LocalStorage) ---
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
  const [targets, setTargets] = useStickyState({ calories: 2500, protein: 150, water: 2500 }, 'targets');
  
  const addTransaction = (trans) => {
      setTransactions([{ id: Date.now(), ...trans }, ...transactions]);
  };

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

  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'סקירה יומית';
      case 'uni': return 'לימודים';
      case 'binding': return 'סטודיו לכריכה';
      case 'health': return 'כושר ותזונה';
      case 'wallet': return 'ארנק אישי';
      case 'settings': return 'הגדרות';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`} dir="rtl">
      <ConfirmModal isOpen={confirmState.isOpen} text={confirmState.text} onConfirm={confirmState.onConfirm} onCancel={() => setConfirmState({ isOpen: false, text: "", onConfirm: null })} />

      <header className={`sticky top-0 z-20 shadow-sm px-4 py-3 flex items-center justify-between transition-colors ${darkMode ? 'bg-slate-800 border-b border-slate-700' : 'bg-white'}`}>
         <div className="flex items-center gap-3">
           {activeTab !== 'dashboard' && <button onClick={() => setActiveTab('dashboard')} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronLeft /></button>}
           <h1 className="font-bold text-lg">{getTitle()}</h1>
         </div>
         <div className="flex gap-3 items-center">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setActiveTab('settings')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300">
                <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                <img src="/api/placeholder/32/32" alt="Profile" className="w-full h-full object-cover" />
            </div>
         </div>
      </header>

      <main className="p-4 pb-24 max-w-lg mx-auto">{renderContent()}</main>

      <nav className={`fixed bottom-0 left-0 right-0 border-t px-6 py-2 flex justify-between items-center z-30 max-w-lg mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <button onClick={() => setActiveTab('uni')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'uni' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'}`}><GraduationCap size={24} strokeWidth={activeTab === 'uni' ? 2.5 : 2} /><span className="text-[10px] font-medium">לימודים</span></button>
        <button onClick={() => setActiveTab('binding')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'binding' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'}`}><BookOpen size={24} strokeWidth={activeTab === 'binding' ? 2.5 : 2} /><span className="text-[10px] font-medium">כריכה</span></button>
        <div className="relative -top-5"><button onClick={() => setActiveTab('dashboard')} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${activeTab === 'dashboard' ? 'bg-slate-800 text-white ring-4 ring-blue-100 dark:ring-slate-600 scale-110' : 'bg-slate-800 text-slate-300'}`}><LayoutDashboard size={24} /></button></div>
        <button onClick={() => setActiveTab('health')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'health' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'}`}><Dumbbell size={24} strokeWidth={activeTab === 'health' ? 2.5 : 2} /><span className="text-[10px] font-medium">בריאות</span></button>
        <button onClick={() => setActiveTab('wallet')} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${activeTab === 'wallet' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'}`}><Wallet size={24} strokeWidth={activeTab === 'wallet' ? 2.5 : 2} /><span className="text-[10px] font-medium">ארנק</span></button>
      </nav>
    </div>
  );
}