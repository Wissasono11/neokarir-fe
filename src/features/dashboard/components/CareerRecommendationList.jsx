import React from 'react';
import { MapPin } from 'lucide-react';

const CareerRecommendationList = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-3xl border border-border p-4 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm md:text-[17px] font-bold text-primary-text">Top Career Recommendation</h3>
        <button className="text-[10px] md:text-xs font-semibold text-primary hover:text-primary/80 transition-colors shrink-0">
          See All
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3 md:gap-4">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className="flex items-center justify-between p-3 md:p-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-bg-secondary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border/50 bg-white shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                <img src={rec.icon} alt={rec.company} className="w-6 h-6 md:w-8 md:h-8 object-contain" onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="font-bold text-primary text-sm">${rec.company.charAt(0)}</span>`;
                }} />
              </div>
              
              <div className="min-w-0">
                <h4 className="font-bold text-sm md:text-base text-primary-text group-hover:text-primary transition-colors mb-0.5 truncate">
                  {rec.title}
                </h4>
                <div className="text-[10px] md:text-xs font-medium text-secondary-text mb-1 truncate">
                  {rec.company}
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[11px] font-medium text-secondary-text">
                  <span className="flex items-center gap-1 shrink-0"><MapPin size={10} /> {rec.location}</span>
                  <span className="text-emerald-600 font-semibold shrink-0">{rec.salary}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 pl-2">
              <div className="bg-accent-purple-light text-primary font-bold text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full mb-0.5 md:mb-1">
                {rec.matchScore}%
              </div>
              <span className="text-[8px] md:text-[9px] text-secondary-text uppercase font-semibold text-right">Match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendationList;
