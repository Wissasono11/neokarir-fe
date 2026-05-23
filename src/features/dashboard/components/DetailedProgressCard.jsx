  import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';


const DetailedProgressCard = ({ progressData }) => {
  const defaultProgress = {
    overallReadiness: 68,
    categories: [
      { label: 'Profil Lengkap', value: 90, color: 'bg-emerald-500' },
      { label: 'Skill Match', value: 75, color: 'bg-primary' },
      { label: 'Roadmap Progress', value: 40, color: 'bg-amber-500' },
    ]
  };

  const data = progressData || defaultProgress;
  const overall = data.overallReadiness;

  return (
    <div className="bg-white rounded-3xl border border-border p-6 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Target size={24} className="text-primary" />
        </div>
        <h3 className="font-bold text-primary-text text-subtitle">Career Readiness</h3>
      </div>

      {/* Overall Score */}
      <div className="flex items-end gap-2 mb-5">
        <motion.span 
          className="text-heading-xl font-extrabold text-primary-text leading-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {overall}%
        </motion.span>
        <span className="text-caption font-semibold text-secondary-text pb-1">Overall Readiness</span>
      </div>

      {/* Category Breakdown */}
      <div className="flex-1 flex flex-col justify-end gap-3">
        {data.categories.map((cat, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-caption font-semibold text-secondary-text">{cat.label}</span>
              <span className="text-caption font-bold text-primary-text">{cat.value}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <motion.div 
                className={`h-2 rounded-full ${cat.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${cat.value}%` }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedProgressCard;
