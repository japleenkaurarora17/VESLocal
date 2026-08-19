import React from 'react';
import { Calendar, User, ArrowUpRight, Check } from 'lucide-react';
import SkillTag from './SkillTag';

export default function OpportunityCard({ opportunity, currentUserId, onToggleInterest, onConnect }) {
  const isInterested = opportunity.interestedStudents.includes(currentUserId);

  return (
    <div className="bg-surface border border-sand hover:border-olive transition-all duration-200 p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          <span className="inline-block px-2 py-0.5 text-xs font-semibold tracking-wide uppercase bg-sand/30 text-olive border border-sand">
            {opportunity.type}
          </span>
          <div className="flex items-center text-xs text-muted">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {opportunity.date}
          </div>
        </div>

        <h3 className="font-serif text-lg font-bold text-dark mb-2 tracking-tight group-hover:text-terracotta transition-colors">
          {opportunity.title}
        </h3>
        
        <p className="text-sm text-muted mb-5 line-clamp-3 leading-relaxed">
          {opportunity.description}
        </p>

        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.skillsNeeded.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-sand/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img 
            src={opportunity.authorAvatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=placeholder"} 
            alt={opportunity.authorName} 
            className="w-8 h-8 rounded-full border border-sand"
          />
          <div className="text-left">
            <div className="text-xs font-bold text-dark leading-tight">{opportunity.authorName}</div>
            <div className="text-[10px] text-muted">Posted Opportunity</div>
          </div>
        </div>

        <div className="flex gap-2">
          {onToggleInterest && (
            <button
              onClick={() => onToggleInterest(opportunity.id)}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                isInterested
                  ? 'bg-olive text-surface border border-olive'
                  : 'bg-surface text-olive border border-olive hover:bg-olive hover:text-surface'
              }`}
            >
              {isInterested ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Interested
                </>
              ) : (
                'I\'m Interested'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
