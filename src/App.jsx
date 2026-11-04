import { useEffect, useMemo, useState } from 'react';
import {
  Activity, ArrowLeft, ArrowRight, Bluetooth, CalendarDays, Check,
  CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  Clock3, Droplets, Dumbbell, Eye, EyeOff, Flame, Footprints, Gift,
  Heart, HeartHandshake, HeartPulse, House, Info, Lock, LogOut, Mail,
  Medal, Minus, Pause, Play, Plus, RotateCcw, Search,
  Settings2, ShieldCheck, SlidersHorizontal, Smartphone, Sparkles,
  Target, Thermometer, Timer, Trophy, UserRound, Users, Watch, X,
} from 'lucide-react';
import {
  ALL_TIME_ACTIVITY, CHALLENGES, EXERCISES, formatPoints, GIFT_CARDS,
  IMAGES, MONTHLY_ACTIVITY, TIME_ACTIVITY, WEEKLY_ACTIVITY, WORKOUTS,
} from './data';

const DEFAULT_PROFILE = {
  name: 'Alex Morgan', email: 'alex@example.com',
  gender: 'Female', goal: 'Lose Weight', focus: ['Flat belly', 'Lean legs'],
  height: 182, heightUnit: 'cm', birthYear: 1994,
  weight: 66.8, weightUnit: 'kg', goalWeight: 60,
};

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch { return initialValue; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`}>
      <HeartHandshake strokeWidth={1.65} size={compact ? 27 : 53} />
      <span>VitalTrack</span>
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, className = '', type = 'button' }) {
  return <button type={type} className={`primary-button ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

function IconButton({ icon: Icon, onClick, label, className = '' }) {
  return <button type="button" className={`icon-button ${className}`} aria-label={label} title={label} onClick={onClick}><Icon size={22} strokeWidth={1.9}/></button>;
}

function PageHeader({ title, onBack, action, subtitle, className = '' }) {
  return <header className={`page-header ${className}`}>
    <div className="page-heading">
      {onBack && <IconButton icon={ChevronLeft} onClick={onBack} label="Back" className="header-back"/>}
      <div><h1>{title}</h1>{subtitle && <p className="subtle">{subtitle}</p>}</div>
    </div>
    {action}
  </header>;
}

function SectionHeading({ children, onClick, actionText = 'See All' }) {
  return <div className="section-heading"><h2>{children}</h2>{onClick && <button className="link-button" onClick={onClick}>{actionText}</button>}</div>;
}

function Coin({ value, outlined = false }) {
  return <span className={`coin ${outlined ? 'coin--outline' : ''}`}><span className="coin-symbol">◎</span> {formatPoints(value)}</span>;
}

function ProgressCard({ onClick, progress = 75 }) {
  return <div className="progress-card">
    <div className="progress-card__content">
      <strong>Waist Cinching Workout</strong><span>{progress}% Completed</span>
      <div className="mini-progress"><span style={{ width: `${progress}%` }}/></div>
    </div>
    <button onClick={onClick} className="pill-button">Continue</button>
  </div>;
}

function StatsStrip({ workoutCount = 17, challengeCount = 7 }) {
  return <div className="stats-strip">
    <div><strong>{workoutCount}</strong><span>workouts<br/>completed</span></div>
    <div><strong>245</strong><span>hours spent<br/>on training</span></div>
    <div><strong>{challengeCount}</strong><span>challenges<br/>participated in</span></div>
  </div>;
}

function BarGraph({ values, labels, tall = false }) {
  return <div className={`bar-graph ${tall ? 'bar-graph--tall' : ''}`} aria-label="Sample activity bar chart">
    <div className="bar-graph__plot">
      <div className="gridline gridline--one"/><div className="gridline gridline--two"/><div className="gridline gridline--three"/>
      <div className="bar-graph__bars">
        {values.map((n, i) => <div className="bar-slot" key={`${labels[i]}-${i}`}>
          <div className={`bar ${i % 2 ? 'bar--soft' : ''}`} style={{ height: `${n}%` }} title={`${labels[i]}: ${n} activity units`}/>
        </div>)}
      </div>
    </div>
    <div className="bar-graph__labels">{labels.map((label, i) => <span key={`${label}-${i}`}>{label}</span>)}</div>
  </div>;
}

function FeatureCard({ image, title, caption, onClick, className = '' }) {
  return <button className={`feature-card ${className}`} onClick={onClick}>
    <img src={image} alt="Fitness workout"/><span className="feature-card__gradient"/>
    <span className="feature-card__text"><strong>{title}</strong><small>{caption}</small></span>
  </button>;
}

function WorkoutTile({ workout, onClick }) {
  return <button className="workout-tile" onClick={onClick}>
    <img src={workout.image} alt=""/>
    <strong>{workout.title}</strong><span>{workout.exercises} Exercises · {workout.level}</span>
  </button>;
}

function TabNav({ activeTab, onSelect }) {
  const items = [
    { key: 'home', text: 'Home', Icon: House },
    { key: 'workouts', text: 'Workout', Icon: Dumbbell },
    { key: 'challenges', text: 'Challenge', Icon: Trophy },
    { key: 'activities', text: 'Activities', Icon: Activity },
    { key: 'account', text: 'Account', Icon: UserRound },
  ];
  return <nav className="bottom-nav" aria-label="Main navigation">{items.map(({ key, text, Icon }) =>
    <button key={key} className={`bottom-nav__item ${key === activeTab ? 'active' : ''}`} onClick={() => onSelect(key)} aria-current={key === activeTab ? 'page' : undefined}>
      <Icon size={21} strokeWidth={key === activeTab ? 2.3 : 1.7}/><span>{text}</span>
    </button>)}</nav>;
}

function OnboardingStep({ step, profile, update, next, previous }) {
  const [localFocus, setLocalFocus] = useState(profile.focus || []);
  useEffect(() => { setLocalFocus(profile.focus || []); }, [profile.focus]);
  const set = (field, value) => update({ [field]: value });
  const percent = step / 7 * 100;
  const heightCm = profile.heightUnit === 'cm' ? profile.height : profile.height * 30.48;
  const weightKg = profile.weightUnit === 'kg' ? profile.weight : profile.weight / 2.20462;
  const bmi = weightKg / ((heightCm / 100) ** 2);
  const goalBmi = (profile.weightUnit === 'kg' ? profile.goalWeight : profile.goalWeight / 2.20462) / ((heightCm / 100) ** 2);
  const years = [profile.birthYear - 2, profile.birthYear - 1, profile.birthYear, profile.birthYear + 1, profile.birthYear + 2];
  const question = [
    'What’s your gender?', 'What’s your main goal?', 'What’s your focus area?',
    'What’s your Height?', 'What’s your birth year?', 'What’s your weight?', 'What’s your goal weight?',
  ];
  const genderOptions = [{ label: 'Male', image: IMAGES.male }, { label: 'Female', image: IMAGES.female }];
  const goals = [{ label: 'Lose Weight', image: IMAGES.loss }, { label: 'Build Muscles', image: IMAGES.muscle }, { label: 'Keep fit', image: IMAGES.fit }];
  const focusOptions = ['Toned arms', 'Flat belly', 'Bubble booty', 'Lean legs', 'Fit full body'];
  const changeUnit = (type, newUnit) => {
    if (type === 'heightUnit') {
      if (profile.heightUnit === newUnit) return;
      update({ heightUnit: newUnit, height: Number((newUnit === 'ft' ? profile.height / 30.48 : profile.height * 30.48).toFixed(newUnit === 'ft' ? 2 : 0)) });
    } else {
      if (profile.weightUnit === newUnit) return;
      const multiplier = newUnit === 'lb' ? 2.20462 : 1 / 2.20462;
      update({ weightUnit: newUnit, weight: Number((profile.weight * multiplier).toFixed(1)), goalWeight: Number((profile.goalWeight * multiplier).toFixed(1)) });
    }
  };
  return <div className="onboarding-page">
    <div className="onboarding-progress"><IconButton icon={ChevronLeft} onClick={previous} label="Previous step"/>
      <div className="onboarding-track"><span style={{ width: `${percent}%` }}/></div><b>{step}/7</b>
    </div>
    <h1 className="onboarding-title">{question[step-1]}</h1>
    <div className="onboarding-body">
      {step === 1 && <>
        <div className="tip-box"><Info size={23}/><span>Understanding your gender allows us to customize the workout experience. You can change this later.</span></div>
        <div className="gender-grid">{genderOptions.map(o => <button className={`gender-choice ${profile.gender === o.label ? 'selected' : ''}`} onClick={() => set('gender', o.label)} key={o.label}>
          <img src={o.image} alt={`${o.label} workout example`}/><strong>{o.label}</strong>
        </button>)}</div>
      </>}
      {step === 2 && <div className="goal-options">{goals.map(o => <button className={`goal-choice ${profile.goal === o.label ? 'selected' : ''}`} onClick={() => set('goal', o.label)} key={o.label}>
        <span>{o.label}</span><img src={o.image} alt=""/>
      </button>)}</div>}
      {step === 3 && <div className="focus-layout">
        <div className="focus-options">{focusOptions.map(o => <button className={localFocus.includes(o) ? 'selected' : ''} key={o} onClick={() => {
          const chosen = localFocus.includes(o) ? localFocus.filter(x => x !== o) : [...localFocus, o];
          setLocalFocus(chosen); set('focus', chosen);
        }}>{o}</button>)}</div><img src={IMAGES.focus} alt="Fitness inspiration"/>
      </div>}
      {step === 4 && <div className="height-step">
        <div className="segmented small">{['cm', 'ft'].map(u => <button key={u} onClick={() => changeUnit('heightUnit', u)} className={profile.heightUnit === u ? 'active' : ''}>{u}</button>)}</div>
        <div className="height-visual"><img src={IMAGES.height} alt="Athlete holding a dumbbell"/><div className="height-ruler">
          <strong>{profile.height} {profile.heightUnit}</strong><div className="ruler-lines"/>
          <div className="ruler-labels"><span>{profile.heightUnit === 'cm' ? '190' : '6.2'}</span><span>{profile.heightUnit === 'cm' ? '180' : '5.9'}</span><span>{profile.heightUnit === 'cm' ? '170' : '5.6'}</span><span>{profile.heightUnit === 'cm' ? '160' : '5.2'}</span><span>{profile.heightUnit === 'cm' ? '150' : '4.9'}</span></div>
        </div></div>
        <input type="range" className="range-input" aria-label="Your height" min={profile.heightUnit === 'cm' ? 130 : 4.3} max={profile.heightUnit === 'cm' ? 210 : 6.9} step={profile.heightUnit === 'cm' ? 1 : 0.01} value={profile.height} onChange={e => set('height', Number(e.target.value))}/>
      </div>}
      {step === 5 && <><div className="tip-box"><Info size={21}/><span>Knowing your age helps us tailor an enjoyable workout program to your health and well-being.</span></div>
        <div className="year-picker"><button aria-label="Earlier birth year" onClick={() => set('birthYear', Math.max(1920, profile.birthYear-1))}><ChevronDown className="up-chevron"/></button>
          {years.map((y,i) => <button key={y} onClick={() => set('birthYear', y)} className={i === 2 ? 'selected' : ''}>{y}</button>)}
          <button aria-label="Later birth year" onClick={() => set('birthYear', Math.min(new Date().getFullYear()-13, profile.birthYear+1))}><ChevronDown/></button>
        </div></>}
      {(step === 6 || step === 7) && <div className="weight-step">
        <div className="segmented small">{['kg','lb'].map(u => <button className={profile.weightUnit === u ? 'active' : ''} key={u} onClick={() => changeUnit('weightUnit',u)}>{u}</button>)}</div>
        <div className="weight-display">{step === 6 ? profile.weight : profile.goalWeight}<small>{profile.weightUnit}</small></div>
        <input type="range" className="range-input weight-range" aria-label={step === 6 ? 'Current weight' : 'Goal weight'} min={profile.weightUnit === 'kg' ? 35 : 77} max={profile.weightUnit === 'kg' ? 150 : 330} step="0.1" value={step === 6 ? profile.weight : profile.goalWeight} onChange={e => set(step === 6 ? 'weight' : 'goalWeight', Number(e.target.value))}/>
        <div className="weight-scale"><span>{profile.weightUnit === 'kg' ? 40 : 90}</span><span>{profile.weightUnit === 'kg' ? 60 : 130}</span><span>{profile.weightUnit === 'kg' ? 80 : 180}</span><span>{profile.weightUnit === 'kg' ? 100 : 220}</span><span>{profile.weightUnit === 'kg' ? 120 : 265}</span></div>
        <div className={`bmi-notice ${step === 7 && goalBmi < 18.5 ? 'bmi-notice--warning' : ''}`}>
          <strong>{step === 6 ? 'Current BMI' : goalBmi < 18.5 ? 'Attention' : 'Goal BMI'}</strong>
          <b>{(step === 6 ? bmi : goalBmi).toFixed(1)} <span>({(step === 6 ? bmi : goalBmi) < 18.5 ? 'underweight' : (step === 6 ? bmi : goalBmi) < 25 ? 'normal' : 'above normal'})</span></b>
          <small>{step === 7 && goalBmi < 18.5 ? 'This goal may be underweight. Consult a qualified healthcare professional before a weight-loss plan.' : 'BMI is a rough estimate, not a medical diagnosis.'}</small>
        </div>
      </div>}
    </div>
    <div className="onboarding-bottom"><PrimaryButton onClick={next} disabled={step === 3 && localFocus.length === 0}>{step === 7 ? 'Finish setup' : 'Next'}</PrimaryButton></div>
  </div>;
}

function Welcome({ onGetStarted, onLogin }) {
  return <div className="welcome-screen">
    <img src={IMAGES.welcome} alt="Runner exercising on the beach"/>
    <div className="welcome-overlay">
      <h1>Welcome to Vital Track</h1><p>Monitor and master your fitness journey</p>
      <PrimaryButton onClick={onGetStarted}>Get Started</PrimaryButton>
      <span>Already have an Account?</span><button className="welcome-login" onClick={onLogin}>Log in</button>
      <Brand/>
    </div>
  </div>;
}

function Auth({ mode, setMode, onSubmit, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const signup = mode === 'signup';
  const handleSubmit = e => {
    e.preventDefault();
    if (signup && password !== confirmPassword) return setError('Passwords do not match.');
    if (signup && !agree) return setError('Please accept the demo terms to continue.');
    setError(''); onSubmit({ name: name.trim() || email.split('@')[0], email });
  };
  return <div className="auth-screen">
    <div className="auth-top"><IconButton icon={ChevronLeft} label="Back" onClick={onBack}/><span>{signup ? 'Already have an account?' : 'New to VitalTrack?'} <button className="link-button" onClick={() => { setMode(signup ? 'login' : 'signup'); setError(''); }}>{signup ? 'Log in' : 'Sign up'}</button></span></div>
    <div className="auth-intro"><h1>{signup ? 'Welcome to Vital Track' : 'Welcome back!'}</h1><p>{signup ? 'Create your account to save your workout and activity progress' : 'Sign in to continue your fitness journey'}</p></div>
    <form className="auth-form" onSubmit={handleSubmit}>
      {signup && <label>Full Name <span><UserRound size={18}/><input required placeholder="Your name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)}/></span></label>}
      <label>Email <span><Mail size={18}/><input required type="email" placeholder="name@example.com" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></span></label>
      <label>Password <span><Lock size={18}/><input required type={visible ? 'text' : 'password'} minLength={6} placeholder="At least 6 characters" autoComplete={signup ? 'new-password' : 'current-password'} value={password} onChange={e=>setPassword(e.target.value)}/><button type="button" onClick={()=>setVisible(!visible)} aria-label="Toggle password visibility">{visible ? <EyeOff size={17}/> : <Eye size={17}/>}</button></span></label>
      {signup && <label>Confirm Password <span><Lock size={18}/><input required type={visible ? 'text' : 'password'} minLength={6} placeholder="Confirm password" autoComplete="new-password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/></span></label>}
      {signup && <label className="agreement"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/> <span>By continuing, I agree to VitalTrack’s <u>demo Terms of Service</u> and acknowledge the <u>Privacy Policy</u>.</span></label>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <PrimaryButton type="submit">{signup ? 'Continue' : 'Log in'}</PrimaryButton>
    </form>
    <div className="auth-footer"><div className="or-divider">OR</div><Brand compact/><p>This is a local UI demo. Sign-up and login do not contact a server.</p></div>
  </div>;
}

function Dashboard({ profile, workoutCount, challengeCount, onTab, onWorkout, onChallenge }) {
  return <div className="page dashboard-page">
    <div className="dashboard-top"><h1>Dashboard</h1><button className="avatar-button" aria-label="Open account" onClick={()=>onTab('account')}><img src={IMAGES.avatar} alt="User profile"/></button></div>
    <StatsStrip workoutCount={workoutCount} challengeCount={challengeCount}/>
    <ProgressCard onClick={()=>onWorkout('waist')}/>
    <SectionHeading onClick={()=>onTab('activities')}>Today Activity</SectionHeading>
    <p className="activity-caption">2 Hours workout · 387 kcal · 2.6 km</p>
    <BarGraph values={TIME_ACTIVITY} labels={['10 AM','11 AM','12 AM','01 AM','02 AM','03 AM','04 AM']}/>
    <button className="scroll-cue" aria-label="Scroll down" onClick={()=>document.querySelector('.scroll-container')?.scrollTo({top:650,behavior:'smooth'})}><ChevronDown/></button>
    <SectionHeading onClick={()=>onTab('workouts')}>Next Workouts</SectionHeading>
    <FeatureCard image={IMAGES.marathon} title="Get ready for the marathon" caption="244 Members · Medium level" onClick={()=>onWorkout('marathon')}/>
    <SectionHeading onClick={()=>onTab('challenges')}>Active Challenge</SectionHeading>
    <FeatureCard image={IMAGES.challenge} title="30-day fitness challenge" caption="244 Members · Medium level" onClick={onChallenge}/>
    <SectionHeading onClick={()=>onTab('activities')}>Friend’s Activity</SectionHeading>
    <FeatureCard image={IMAGES.friends} title="Movement matters" caption="Explore your activity statistics" onClick={()=>onTab('activities')}/>
  </div>;
}

function Workouts({ onWorkout, progress }) {
  const [filter,setFilter] = useState('For you');
  const recommended = filter === 'Most Popular' ? [WORKOUTS[2],WORKOUTS[1]] : filter === 'Pro Plan' ? [WORKOUTS[1],WORKOUTS[2]] : [WORKOUTS[0],WORKOUTS[3]];
  return <div className="page workouts-page">
    <PageHeader title="Workouts"/>
    <ProgressCard onClick={()=>onWorkout('waist')} progress={progress}/>
    <div className="workout-filters" role="tablist" aria-label="Workout category">{['For you','Most Popular','Pro Plan'].map(f =>
      <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'active' : ''} onClick={()=>setFilter(f)}>{f}{f === 'Pro Plan' && <span className="star"> ★</span>}</button>)}</div>
    <SectionHeading>New Sessions</SectionHeading>
    <div className="horizontal-tiles">{recommended.map(w=><WorkoutTile key={w.id} workout={w} onClick={()=>onWorkout(w.id)}/>)}</div>
    <SectionHeading>Recommended</SectionHeading>
    <div className="recommended-list">{[WORKOUTS[0],WORKOUTS[2],WORKOUTS[1]].map(w=><WorkoutTile key={w.id} workout={w} onClick={()=>onWorkout(w.id)}/>)}</div>
  </div>;
}

function WorkoutDetail({ workout, onBack, onStart }) {
  return <div className="workout-detail">
    <img src={workout.id === 'ball' ? IMAGES.cover : workout.image} alt="Workout inspiration" className="workout-detail__background"/>
    <div className="workout-detail__scrim"/><IconButton icon={ArrowLeft} onClick={onBack} label="Back to workouts" className="detail-back"/>
    <div className="workout-detail__content">
      <div className="detail-tag"><Sparkles size={16}/> Your workout</div>
      <h1>{workout.id === 'ball' ? 'Workouts\nwith Balls' : workout.title}</h1>
      <div className="detail-facts"><div><strong>{workout.exercises}</strong><span>Exercises</span></div><div><strong>{workout.level.split(' ')[0]}</strong><span>Level</span></div><div><strong>{workout.duration}</strong><span>Duration</span></div></div>
      <PrimaryButton onClick={onStart}>Start Workout <ArrowRight size={18}/></PrimaryButton>
    </div>
  </div>;
}

function WorkoutSession({ workout, onBack, onComplete, onSaveProgress }) {
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [seconds,setSeconds] = useState(0);
  const visibleExercises = EXERCISES.slice(0, workout.exercises);
  useEffect(()=>{
    if (!playing) return;
    const t = window.setInterval(()=>setSeconds(s=>s+1),1000);
    return ()=>window.clearInterval(t);
  },[playing]);
  const next = () => {
    if(index === visibleExercises.length - 1){setPlaying(false); onComplete();}
    else {setIndex(v=>v+1);setSeconds(0);setPlaying(false);onSaveProgress(index+1, visibleExercises.length);}
  };
  const time = `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
  return <div className="page workout-session-page">
    <PageHeader title="Workout in progress" subtitle={`${workout.title} · Demo session`} onBack={onBack}/>
    <div className="session-hero"><img src={workout.id === 'ball' ? IMAGES.exercise : workout.image} alt="Fitness exercise example"/>
      <div className="session-timer"><Timer size={14}/> {time}</div></div>
    <div className="session-part"><h2>Part 1</h2><span>{String(index+1).padStart(2,'0')}/{String(visibleExercises.length).padStart(2,'0')}</span></div>
    <div className="session-title"><strong>{visibleExercises[index].name}</strong><span>{visibleExercises[index].sets} Sets · {visibleExercises[index].rest} min Rest</span></div>
    <div className="session-progress"><span style={{width:`${(index+1)/visibleExercises.length*100}%`}}/></div>
    <div className="session-controls"><button onClick={()=>{setIndex(Math.max(0,index-1));setSeconds(0);setPlaying(false)}} disabled={!index} aria-label="Previous exercise"><ChevronLeft/></button>
      <button className="session-play" onClick={()=>setPlaying(!playing)}>{playing ? <Pause fill="currentColor"/> : <Play fill="currentColor"/>} {playing ? 'Pause' : 'Start timer'}</button>
      <button onClick={next} aria-label="Next exercise"><ChevronRight/></button></div>
    <SectionHeading actionText="Details">Exercises</SectionHeading>
    <div className="exercise-list">{visibleExercises.map((item,i)=><button key={item.name} className={`exercise-row ${index === i ? 'selected' : ''}`} onClick={()=>{setIndex(i);setSeconds(0);setPlaying(false);onSaveProgress(i, visibleExercises.length)}}>
      <div><strong>{item.name}</strong><small>{item.sets} Sets <span>│</span> {item.rest} min Rest</small></div><span>{i < index ? <CheckCircle2 size={19}/> : String(i+1).padStart(2,'0')}</span>
    </button>)}</div>
    <PrimaryButton onClick={next}>{index === visibleExercises.length - 1 ? 'Finish Workout' : 'Complete exercise & Next'} <ArrowRight size={16}/></PrimaryButton>
  </div>;
}

function WorkoutFinished({ onHome, onWorkouts, points }) {
  return <div className="finish-page"><div className="finish-icon"><Trophy size={65}/></div><span className="eyebrow">WORKOUT COMPLETED</span><h1>Amazing work!</h1><p>You have completed your sample workout. Keep showing up for yourself.</p>
    <div className="finish-reward"><Medal/><strong>+{points} points</strong><span>Demo rewards earned</span></div>
    <PrimaryButton onClick={onHome}>Go to dashboard</PrimaryButton><button className="secondary-button" onClick={onWorkouts}>Explore more workouts</button>
  </div>;
}

function Activities({ onWorkout, workoutCount, challengeCount }) {
  const [period,setPeriod] = useState('All-time');
  const values = period === 'Weekly' ? WEEKLY_ACTIVITY : period === 'Monthly' ? MONTHLY_ACTIVITY : ALL_TIME_ACTIVITY;
  const labels = period === 'Weekly' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
  return <div className="page activities-page"><PageHeader title="Activity" action={<span className="sample-tag">Sample stats</span>}/>
    <div className="activity-filters" role="tablist">{['Weekly','Monthly','All-time'].map(p=><button role="tab" aria-selected={period===p} className={period===p?'active':''} key={p} onClick={()=>setPeriod(p)}>{p}</button>)}</div>
    <BarGraph values={values} labels={labels} tall/>
    <div className="horizontal-tiles activity-workout-tiles">{[WORKOUTS[0],WORKOUTS[1],WORKOUTS[2]].map(w=><WorkoutTile key={w.id} workout={w} onClick={()=>onWorkout(w.id)}/>)}</div>
    <SectionHeading>Overall Stats</SectionHeading>
    <StatsStrip workoutCount={workoutCount} challengeCount={challengeCount}/>
    <div className="metric-row"><div className="metric-row__icon"><HeartPulse/></div><div><strong>Average Heart Rate</strong><small>Jan 2024 – Jul 2024</small></div><b>90</b></div>
    <div className="metric-row"><div className="metric-row__icon"><Footprints/></div><div><strong>Kilometres Run</strong><small>Jan 2024 – Jul 2024</small></div><b>67.1</b></div>
    <div className="note-card"><Info size={17}/> Activity charts and measurements are example data from the design, not live device readings.</div>
  </div>;
}

function Challenges({ claimed, onClaim, onGifts, points }) {
  const claimedCount = claimed.length;
  return <div className="page challenges-page">
    <PageHeader title="Rewards" action={<button className="coin-button" onClick={onGifts}><Coin value={points}/></button>}/>
    <div className="reward-wheel"><div className="reward-wheel__inside"><span>Steps</span><strong>{formatPoints(1449)}</strong><Footprints size={20}/></div></div>
    <div className="section-heading"><h2>Bonus Rewards</h2><button className="link-button" onClick={onGifts}>Win up to 10,000p!</button></div>
    <div className="reward-header"><h2>Challenges</h2><span>{claimedCount} / {CHALLENGES.length} demo claimed</span></div>
    <div className="challenge-grid">{CHALLENGES.map(ch => <button key={ch.id} className={`challenge-card ${claimed.includes(ch.id)?'claimed':''}`} onClick={()=>onClaim(ch)}>
      {ch.icon === 'steps' && <Footprints size={26}/>} {ch.icon === 'flame' && <Flame size={26}/>}{ch.icon === 'target' && <Target size={26}/>}{ch.icon === 'friend' && <Users size={26}/>}{ch.icon === 'trophy' && <Trophy size={26}/>}
      <strong>{ch.title}</strong><span className="challenge-points">{claimed.includes(ch.id) ? <><Check size={15}/> Claimed</> : <><span className="coin-symbol">◎</span> {formatPoints(ch.points)}p</>}</span>
    </button>)}</div>
    <div className="note-card"><Info size={17}/> Tap a challenge to claim its points in demo mode. Real progress verification requires a backend and activity data.</div>
    <PrimaryButton className="view-gifts-button" onClick={onGifts}>Browse gift cards <Gift size={18}/></PrimaryButton>
  </div>;
}

function GiftCards({ points, redeemed, onBack, onRedeem }) {
  const [query,setQuery] = useState('');
  const [sort,setSort] = useState('featured');
  const gifts = useMemo(()=>{
    const matches=GIFT_CARDS.filter(g=>`${g.brand} ${g.title}`.toLowerCase().includes(query.toLowerCase()));
    if(sort === 'low') return matches.sort((a,b)=>a.points-b.points);
    if(sort === 'high') return matches.sort((a,b)=>b.points-a.points);
    return matches;
  },[query,sort]);
  return <div className="page gift-page">
    <PageHeader title="Gift cards" onBack={onBack} action={<Coin value={points}/>}/>
    <div className="search-controls"><label className="search-box"><Search size={18}/><input placeholder="Search gift cards" value={query} onChange={e=>setQuery(e.target.value)}/></label><button aria-label="Change gift sorting" className="sort-button" onClick={()=>setSort(s=>s==='featured'?'low':s==='low'?'high':'featured')} title={`Sort: ${sort}`}><SlidersHorizontal size={20}/></button></div>
    <span className="sort-hint">{sort==='featured'?'Featured':sort==='low'?'Lowest points first':'Highest points first'}</span>
    <div className="gift-grid">{gifts.map(g=><button className="gift-card" key={g.id} onClick={()=>onRedeem(g)}>
      <strong className={`gift-brand gift-brand--${g.theme}`}>{g.brand}</strong>
      <span className="gift-title">{g.title}</span><Coin value={g.points}/>
    </button>)}</div>
    {gifts.length===0 && <p className="empty-state">No gift cards match your search.</p>}
    <div className="note-card"><Gift size={17}/> {redeemed.length ? `${redeemed.length} demo redemption(s) saved. ` : ''}No real gift cards are issued or purchased in this prototype.</div>
  </div>;
}

function DeviceConnect({ device, isConnected, onBack, onConnect, onVitals }) {
  const wearable = device === 'wearable';
  return <div className="device-screen">
    <IconButton icon={ChevronLeft} label="Back" onClick={onBack} className="device-back"/>
    <h1>{isConnected ? 'Device connected!' : wearable ? 'Connect your\nwearable!' : 'Connect with\nyour Phone'}</h1>
    <div className="device-ring"><div className="device-ring__two"><div className="device-ring__three">{wearable ? <Watch size={67} strokeWidth={1.1}/> : <Smartphone size={67} strokeWidth={1.1}/>}</div></div></div>
    <p>{isConnected ? 'Your demo device is connected. Explore example health readings.' : 'Pair a device to explore the health dashboard in this interactive prototype.'}</p>
    <PrimaryButton onClick={isConnected ? onVitals : onConnect}>{isConnected ? 'View vitals' : <><Bluetooth size={18}/> Connect (demo)</>}</PrimaryButton>
  </div>;
}

const VITALS = [
  { key: 'heart', label: 'Heart Rate', Icon: Heart, reading: '84', unit: 'bpm' },
  { key: 'spo2', label: 'spO₂', Icon: Droplets, reading: '98%', unit: 'oxygen saturation' },
  { key: 'temp', label: 'Temp', Icon: Thermometer, reading: '36.2°', unit: 'Celsius' },
  { key: 'distance', label: 'Distance', Icon: Footprints, reading: '56 m', unit: 'today' },
];

function VitalsMenu({ onBack, onVital }) {
  return <div className="page vitals-page"><div className="vitals-brand-row"><IconButton icon={ChevronLeft} onClick={onBack} label="Back"/><Brand compact/><span/></div>
    <h1>Your Health Data</h1><p className="subtle">Explore your sample measurements</p>
    <div className="vitals-grid">{VITALS.map(v=><button key={v.key} onClick={()=>onVital(v.key)}><v.Icon size={52} strokeWidth={1.5}/><strong>{v.label}</strong><small>{v.reading}</small></button>)}</div>
    <div className="note-card"><Info size={17}/> The measurements shown are mock data. No wearable or phone sensors are accessed.</div>
  </div>;
}

function VitalDetail({ vital, onBack, onSwitch }) {
  const [range,setRange] = useState(0);
  const item=VITALS.find(v=>v.key===vital) || VITALS[0];
  const heartPoints = [85,81,87,84,89,83,86,80,88,85,90,86,89,81,84,79,82,78,86,80,84,79,82,77,80,78,84,79,75].map((v,i)=> `${i/28*100},${(96-v)/24*100}`).join(' ');
  return <div className="page vital-detail-page"><PageHeader title={item.label} onBack={onBack}/>
    {vital==='heart' && <><div className="vital-big-number">84 <span>bpm</span></div>
      <svg className="heart-chart" viewBox="0 0 360 180" role="img" aria-label="Illustrative heart rate line fluctuating between 75 and 90 beats per minute">
        <defs><linearGradient id="heartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7775ff" stopOpacity=".32"/><stop offset="1" stopColor="#7775ff" stopOpacity=".07"/></linearGradient></defs>
        {[35,85,135].map(y=><line key={y} x1="10" y1={y} x2="316" y2={y} stroke="#a6a6a6" strokeDasharray="3 4" strokeWidth="1"/>)}
        <polygon points={`10,135 ${heartPoints.split(' ').map(p=>{const [x,y]=p.split(',');return `${10+Number(x)*3.06},${35+Number(y)}`}).join(' ')} 316,135`} fill="url(#heartFill)"/>
        <polyline points={heartPoints.split(' ').map(p=>{const [x,y]=p.split(',');return `${10+Number(x)*3.06},${35+Number(y)}`}).join(' ')} fill="none" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <g fill="#878787" fontSize="20" fontFamily="system-ui"><text x="326" y="41">90</text><text x="326" y="91">80</text><text x="326" y="141">70</text></g>
      </svg></>}
    {vital==='spo2' && <><div className="vital-ring"><Droplets size={29}/><strong>98%</strong><small>Blood oxygen</small></div><p className="vital-explainer">A sample oxygen saturation reading from the reference design.</p></>}
    {vital==='temp' && <><div className="vital-single-icon"><Thermometer size={34}/><span>AM 09:30</span></div><div className="vital-big-number">36.2° <span>C</span></div><p className="vital-explainer">Sample temperature reading from the reference design.</p></>}
    {vital==='distance' && <><div className="vital-ring"><Footprints size={30}/><strong>56 m</strong><small>Sample distance</small></div><div className="distance-summary"><div><strong>1,800 m</strong><small>Target distance</small></div><div><strong>16 laps</strong><small>Example session</small></div></div></>}
    <div className="vital-dots" aria-label="Switch measurement">{VITALS.map((v,i)=><button key={v.key} aria-label={`Show ${v.label}`} className={vital===v.key ? 'active' : ''} onClick={()=>{setRange(i);onSwitch(v.key)}}/>)}</div>
    <div className="note-card vital-note"><Info size={17}/> Example data only. VitalTrack does not provide medical advice or live monitoring in this demo.</div>
  </div>;
}

function Account({ profile, devices, points, onDevice, onGifts, onVitals, onReset, onLogout }) {
  const initial = profile.name?.split(' ')[0] || 'Athlete';
  return <div className="page account-page"><PageHeader title="Account" action={<Brand compact/>}/>
    <div className="profile-card"><div className="profile-avatar"><img src={IMAGES.avatar} alt="Profile"/></div><div><h2>{profile.name || initial}</h2><span>{profile.email || 'Demo member'}</span><small>{profile.goal} · {profile.focus?.join(', ') || 'Fitness focus'}</small></div></div>
    <div className="profile-summary"><div><span>Your points</span><strong><Coin value={points}/></strong></div><div><span>Current weight</span><strong>{profile.weight} {profile.weightUnit}</strong></div></div>
    <SectionHeading>My wellness</SectionHeading>
    <div className="account-menu">
      <button onClick={onVitals}><HeartPulse/><span><strong>Health measurements</strong><small>Heart rate, spO₂, temperature and distance</small></span><ChevronRight/></button>
      <button onClick={()=>onDevice('wearable')}><Watch/><span><strong>Wearable device</strong><small>{devices.wearable ? 'Connected (demo)' : 'Not connected'}</small></span><ChevronRight/></button>
      <button onClick={()=>onDevice('phone')}><Smartphone/><span><strong>Connect with phone</strong><small>{devices.phone ? 'Connected (demo)' : 'Not connected'}</small></span><ChevronRight/></button>
      <button onClick={onGifts}><Gift/><span><strong>Gift cards</strong><small>Browse and redeem demo points</small></span><ChevronRight/></button>
    </div>
    <SectionHeading>Demo settings</SectionHeading>
    <div className="account-menu"><button onClick={onReset}><RotateCcw/><span><strong>Reset prototype</strong><small>Clear local data and restart onboarding</small></span><ChevronRight/></button>
      <button onClick={onLogout}><LogOut/><span><strong>Log out</strong><small>Return to the welcome screen</small></span><ChevronRight/></button></div>
    <p className="account-disclaimer">VitalTrack interactive design prototype · No backend connected</p>
  </div>;
}

function ConfirmModal({ gift, points, onCancel, onConfirm }) {
  return <div className="modal-scrim" onClick={onCancel}><div className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="redeem-title" onClick={e=>e.stopPropagation()}>
    <IconButton icon={X} onClick={onCancel} label="Close" className="modal-close"/><div className="modal-icon"><Gift size={30}/></div>
    <h2 id="redeem-title">Redeem gift card?</h2><p>{gift.title}</p><div className="modal-cost"><span>Demo cost</span><Coin value={gift.points}/></div>
    <p className="modal-info">Your balance: {formatPoints(points)} points. This is a mock redemption, not a real voucher.</p>
    <PrimaryButton onClick={onConfirm} disabled={points < gift.points}>{points >= gift.points ? 'Confirm demo redemption' : 'Not enough points'}</PrimaryButton><button className="secondary-button" onClick={onCancel}>Cancel</button>
  </div></div>;
}

export default function App() {
  const [route,setRoute] = useStoredState('vitaltrack.route','welcome');
  const [activeTab,setActiveTab] = useStoredState('vitaltrack.tab','home');
  const [profile,setProfile] = useStoredState('vitaltrack.profile',DEFAULT_PROFILE);
  const [signupMode,setSignupMode] = useState('signup');
  const [onboardingStep,setOnboardingStep] = useStoredState('vitaltrack.onboardingStep',1);
  const [workoutId,setWorkoutId] = useState('ball');
  const [workoutCount,setWorkoutCount] = useStoredState('vitaltrack.workoutCount',17);
  const [progress,setProgress] = useStoredState('vitaltrack.progress',75);
  const [points,setPoints] = useStoredState('vitaltrack.points',8855);
  const [claimed,setClaimed] = useStoredState('vitaltrack.claimed',[]);
  const [redeemed,setRedeemed] = useStoredState('vitaltrack.redeemed',[]);
  const [devices,setDevices] = useStoredState('vitaltrack.devices',{ wearable:false,phone:false });
  const [selectedDevice,setSelectedDevice] = useState('wearable');
  const [selectedVital,setSelectedVital] = useState('heart');
  const [modalGift,setModalGift] = useState(null);
  const [toast,setToast] = useState('');
  const [earned,setEarned] = useState(150);
  const workout = WORKOUTS.find(w=>w.id===workoutId) || WORKOUTS[0];
  const tabs=['home','workouts','challenges','activities','account'];
  const showTabs = tabs.includes(route) || route==='workout-detail';
  const navTab = route === 'workout-detail' ? 'workouts' : activeTab;

  useEffect(()=>{document.title = `VitalTrack · ${route.charAt(0).toUpperCase()+route.slice(1)}`;},[route]);
  useEffect(()=>{if (!toast) return; const t=window.setTimeout(()=>setToast(''),3200);return ()=>window.clearTimeout(t);},[toast]);
  useEffect(()=>{document.querySelector('.scroll-container')?.scrollTo(0,0);},[route,onboardingStep]);
  const go=(next)=>{setRoute(next);if(tabs.includes(next))setActiveTab(next);};
  const updateProfile=(changes)=>setProfile(p=>({...p,...changes}));
  const selectWorkout=(id)=>{setWorkoutId(id);go('workout-detail');};
  const handleNext=()=>{if(onboardingStep<7)setOnboardingStep(s=>s+1);else {setOnboardingStep(7);go('home');setToast('Your VitalTrack demo is ready!');}};
  const handlePrev=()=>{if(onboardingStep>1)setOnboardingStep(s=>s-1);else go('auth');};
  const handleClaim=(ch)=>{
    if(claimed.includes(ch.id)){setToast('You already claimed this demo challenge.');return;}
    setClaimed(v=>[...v,ch.id]);setPoints(p=>p+ch.points);setToast(`+${formatPoints(ch.points)} demo points added!`);
  };
  const handleWorkoutComplete=()=>{setWorkoutCount(c=>c+1);setProgress(100);setPoints(p=>p+150);setEarned(150);go('workout-finished');};
  const handleRedeem=()=>{
    if(!modalGift || points<modalGift.points)return;
    setPoints(p=>p-modalGift.points);setRedeemed(r=>[...r,{id:modalGift.id,at:new Date().toISOString()}]);
    setToast(`${modalGift.brand} demo redemption saved.`);setModalGift(null);
  };
  const handleReset=()=>{
    if(!window.confirm('Clear all VitalTrack demo data and restart?'))return;
    for(const key of Object.keys(localStorage))if(key.startsWith('vitaltrack.'))localStorage.removeItem(key);
    window.location.reload();
  };
  const showVital=(key)=>{setSelectedVital(key);go('vital-detail');};
  const render = () => {
    switch(route){
      case 'welcome':return <Welcome onGetStarted={()=>{setSignupMode('signup');go('auth')}} onLogin={()=>{setSignupMode('login');go('auth')}}/>;
      case 'auth':return <Auth mode={signupMode} setMode={setSignupMode} onBack={()=>go('welcome')} onSubmit={({name,email})=>{updateProfile({name,email});if(signupMode==='signup'){setOnboardingStep(1);go('onboarding')}else go('home');}}/>;
      case 'onboarding':return <OnboardingStep step={onboardingStep} profile={profile} update={updateProfile} next={handleNext} previous={handlePrev}/>;
      case 'home':return <Dashboard profile={profile} workoutCount={workoutCount} challengeCount={7+claimed.length} onTab={go} onWorkout={selectWorkout} onChallenge={()=>go('challenges')}/>;
      case 'workouts':return <Workouts progress={progress} onWorkout={selectWorkout}/>;
      case 'workout-detail':return <WorkoutDetail workout={workout} onBack={()=>go('workouts')} onStart={()=>go('workout-session')}/>;
      case 'workout-session':return <WorkoutSession workout={workout} onBack={()=>go('workout-detail')} onComplete={handleWorkoutComplete} onSaveProgress={(i,total)=>{if(workoutId==='waist')setProgress(Math.round(i/total*100));}}/>;
      case 'workout-finished':return <WorkoutFinished points={earned} onHome={()=>go('home')} onWorkouts={()=>go('workouts')}/>;
      case 'activities':return <Activities onWorkout={selectWorkout} workoutCount={workoutCount} challengeCount={7+claimed.length}/>;
      case 'challenges':return <Challenges claimed={claimed} onClaim={handleClaim} onGifts={()=>go('gifts')} points={points}/>;
      case 'gifts':return <GiftCards points={points} redeemed={redeemed} onBack={()=>go('challenges')} onRedeem={setModalGift}/>;
      case 'account':return <Account profile={profile} points={points} devices={devices} onDevice={d=>{setSelectedDevice(d);go('connect')}} onGifts={()=>go('gifts')} onVitals={()=>go('vitals')} onReset={handleReset} onLogout={()=>go('welcome')}/>;
      case 'connect':return <DeviceConnect device={selectedDevice} isConnected={devices[selectedDevice]} onBack={()=>go('account')} onConnect={()=>{setDevices(d=>({...d,[selectedDevice]:true}));setToast('Connected in demo mode — no real Bluetooth pairing.')}} onVitals={()=>go('vitals')}/>;
      case 'vitals':return <VitalsMenu onBack={()=>go('account')} onVital={showVital}/>;
      case 'vital-detail':return <VitalDetail vital={selectedVital} onBack={()=>go('vitals')} onSwitch={showVital}/>;
      default:return <Welcome onGetStarted={()=>go('auth')} onLogin={()=>go('auth')}/>;
    }
  };
  return <main className="app-backdrop">
    <div className={`phone-shell route-${route}`}>
      <div className="status-bar" aria-hidden="true"><span>9:41</span><div className="status-bar__right"><span className="signal-bars"><i/><i/><i/><i/></span><span className="wifi-icon">◕</span><span className="battery-icon"/></div></div>
      <div className="scroll-container" key={`${route}-container`}>{render()}</div>
      {showTabs && <TabNav activeTab={navTab} onSelect={go}/>}
      <div className="home-indicator" aria-hidden="true"/>
      {toast && <div className="toast" role="status"><CheckCircle2 size={17}/>{toast}</div>}
      {modalGift && <ConfirmModal gift={modalGift} points={points} onCancel={()=>setModalGift(null)} onConfirm={handleRedeem}/>}
    </div>
    <aside className="desktop-sidebar">
      <Brand compact/><span className="sidebar-kicker">INTERACTIVE PROTOTYPE</span>
      <h2>Built from your VitalTrack UX design.</h2>
      <p>Explore the mobile app on the left. Onboarding, navigation, sample workouts, charts and rewards all respond to clicks.</p>
      <div className="sidebar-hints"><span><CheckCircle2/> React + Vite</span><span><CheckCircle2/> Original design photos</span><span><CheckCircle2/> LocalStorage persistence</span><span><Info/> Demo data, no backend</span></div>
      <button className="sidebar-reset" onClick={handleReset}><RotateCcw size={16}/> Restart demo</button>
    </aside>
  </main>;
}
