"use client"
import { useState, useEffect } from 'react';

export default function HealthDashboard() {
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0); // This will now represent Liters

  useEffect(() => {
    const savedSteps = localStorage.getItem('my-steps');
    const savedWater = localStorage.getItem('my-water');
    if (savedSteps) setSteps(parseInt(savedSteps));
    if (savedWater) setWater(parseFloat(savedWater)); // Use parseFloat for decimal liters
  }, []);

  useEffect(() => {
    localStorage.setItem('my-steps', steps.toString());
    localStorage.setItem('my-water', water.toString());
  }, [steps, water]);

  const waterGoal = 4.0;
  const stepGoal = 10000;
  const isWaterGoalMet = water >= waterGoal;
  const isStepGoalMet = steps >= stepGoal;
  const caloriesBurned = (steps * 0.04).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-sm w-full bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">MY TRACKER</h1>
        </header>

        <div className="text-center mb-10">
           <p className="text-5xl font-black text-slate-800 tracking-tighter">{caloriesBurned}</p>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[3px]">Total Calories</p>
        </div>

        <div className="space-y-4">
          {/* Steps Card */}
          <div className={`p-6 rounded-[32px] transition-all border-2 ${
            isStepGoalMet ? 'bg-green-500 border-green-300 text-white' : 'bg-orange-500 border-orange-400 text-white'
          }`}>
            <p className="text-xs font-bold opacity-80 uppercase">{isStepGoalMet ? 'Goal Reached' : 'Steps'}</p>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-black">{steps.toLocaleString()}</p>
              <button 
                onClick={() => setSteps(s => s + 500)} 
                className="bg-white text-slate-900 w-12 h-12 rounded-2xl font-bold active:scale-90"
              >
                +
              </button>
            </div>
          </div>

          {/* Water Card - Updated for Liters */}
          <div className={`p-6 rounded-[32px] transition-all border-2 ${
            isWaterGoalMet ? 'bg-blue-600 border-blue-400 text-white' : 'bg-blue-500 border-blue-400 text-white'
          }`}>
            <p className="text-xs font-bold opacity-80 uppercase">{isWaterGoalMet ? 'Hydrated' : 'Water Intake'}</p>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-black">{water.toFixed(2)} <span className="text-lg opacity-60">L</span></p>
              <button 
                onClick={() => setWater(w => Math.min(w + 0.25, 10))} 
                className="bg-white text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center active:scale-90"
              >
                {isWaterGoalMet ? '✅' : '💧'}
              </button>
            </div>
            <p className="text-[10px] mt-2 font-bold opacity-60 uppercase tracking-wider">Goal: 4.00 Liters</p>
          </div>
        </div>

        <button 
          onClick={() => {setSteps(0); setWater(0);}} 
          className="mt-8 w-full py-3 text-[10px] font-black tracking-widest text-slate-300 hover:text-red-400"
        >
          RESET DATA
        </button>
      </div>
    </div>
  );
}