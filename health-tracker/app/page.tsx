"use client"
import { useState, useEffect } from 'react';

export default function HealthDashboard() {
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0);

  useEffect(() => {
    const savedSteps = localStorage.getItem('my-steps');
    const savedWater = localStorage.getItem('my-water');
    if (savedSteps) setSteps(parseInt(savedSteps));
    if (savedWater) setWater(parseFloat(savedWater));
  }, []);

  useEffect(() => {
    localStorage.setItem('my-steps', steps.toString());
    localStorage.setItem('my-water', water.toString());
  }, [steps, water]);

  const waterGoal = 4.0;
  const stepGoal = 10000;
  
  // Calculate percentage for the progress bar
  const waterPercentage = Math.min((water / waterGoal) * 100, 100);
  const isWaterGoalMet = water >= waterGoal;
  const isStepGoalMet = steps >= stepGoal;
  const caloriesBurned = (steps * 0.04).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 font-sans">
      <div className="max-w-sm w-full bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">MY TRACKER</h1>
        </header>

        <div className="text-center mb-10">
           <p className="text-5xl font-black text-slate-800 tracking-tighter">{caloriesBurned}</p>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[3px]">Total Calories</p>
        </div>

        <div className="space-y-6">
          {/* Steps Card */}
          <div className={`p-6 rounded-[32px] transition-all border-2 ${
            isStepGoalMet ? 'bg-green-500 border-green-300 text-white' : 'bg-orange-500 border-orange-400 text-white'
          }`}>
            <p className="text-xs font-bold opacity-80 uppercase">{isStepGoalMet ? 'Goal Reached' : 'Steps'}</p>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-black">{steps.toLocaleString()}</p>
              <button 
                onClick={() => setSteps(s => s + 500)} 
                className="bg-white text-slate-900 w-12 h-12 rounded-2xl font-bold active:scale-90 shadow-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Water Card with Progress Bar */}
          <div className={`p-6 rounded-[32px] transition-all border-2 ${
            isWaterGoalMet ? 'bg-blue-600 border-blue-400 text-white' : 'bg-blue-500 border-blue-400 text-white'
          }`}>
            <p className="text-xs font-bold opacity-80 uppercase">Water Intake (4L Goal)</p>
            <div className="flex justify-between items-end mb-4">
              <p className="text-3xl font-black">{water.toFixed(2)}L</p>
              <button 
                onClick={() => setWater(w => Number((w + 0.25).toFixed(2)))} 
                className="bg-white text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center active:scale-90 shadow-lg"
              >
                {isWaterGoalMet ? '✅' : '💧'}
              </button>
            </div>
            
            {/* Progress Bar UI */}
            <div className="w-full bg-blue-900/20 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500 ease-out"
                style={{ width: `${waterPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { if(confirm("Reset today's data?")) { setSteps(0); setWater(0); } }} 
          className="mt-8 w-full py-3 text-[10px] font-black tracking-widest text-slate-300 hover:text-red-400"
        >
          RESET DATA
        </button>
      </div>
    </div>
  );
}