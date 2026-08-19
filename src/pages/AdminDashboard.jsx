import React from 'react';
import { Shield, Users, Megaphone, Store, Trash2, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

export default function AdminDashboard({ 
  students, 
  opportunities, 
  businesses, 
  onRemoveOpportunity,
  onFlagBusiness 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Header Banner */}
      <div className="mb-8 border-b border-sand pb-6">
        <h1 className="font-serif text-3xl font-black text-dark tracking-tight mb-2 flex items-center gap-2">
          <Shield className="w-8 h-8 text-terracotta" />
          <span>Campus Moderation Board</span>
        </h1>
        <p className="text-sm text-muted">
          VESLocal Student Moderator Panel. Review platform health, flag spam reviews, and audit collaboration notices.
        </p>
      </div>

      {/* Metrics Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
        
        <div className="bg-surface border border-sand p-6">
          <div className="flex justify-between items-start mb-4">
            <Users className="w-5 h-5 text-olive" />
            <span className="text-[10px] uppercase font-bold text-muted">Registered</span>
          </div>
          <div className="text-3xl font-black text-dark text-left">{students.length}</div>
          <div className="text-xs text-muted mt-1 text-left">Active VESIT Students</div>
        </div>

        <div className="bg-surface border border-sand p-6">
          <div className="flex justify-between items-start mb-4">
            <Megaphone className="w-5 h-5 text-olive" />
            <span className="text-[10px] uppercase font-bold text-muted">Broadcasts</span>
          </div>
          <div className="text-3xl font-black text-dark text-left">{opportunities.length}</div>
          <div className="text-xs text-muted mt-1 text-left">Active Collaboration Notices</div>
        </div>

        <div className="bg-surface border border-sand p-6">
          <div className="flex justify-between items-start mb-4">
            <Store className="w-5 h-5 text-olive" />
            <span className="text-[10px] uppercase font-bold text-muted">Ventures</span>
          </div>
          <div className="text-3xl font-black text-dark text-left">{businesses.length}</div>
          <div className="text-xs text-muted mt-1 text-left">Registered Student Startups</div>
        </div>

        <div className="bg-surface border border-sand p-6">
          <div className="flex justify-between items-start mb-4">
            <ShieldAlert className="w-5 h-5 text-terracotta" />
            <span className="text-[10px] uppercase font-bold text-terracotta">Review Audit</span>
          </div>
          <div className="text-3xl font-black text-terracotta text-left">0</div>
          <div className="text-xs text-muted mt-1 text-left">Flagged reports pending</div>
        </div>

      </div>

      {/* Audit Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Moderate Opportunities */}
        <div className="bg-surface border border-sand p-6">
          <h2 className="font-serif text-lg font-bold text-dark mb-4 pb-2 border-b border-sand/50">
            Moderate Collaboration Notices
          </h2>
          
          {opportunities.length > 0 ? (
            <div className="space-y-4">
              {opportunities.map(opp => (
                <div key={opp.id} className="p-4 bg-bg-ves/20 border border-sand flex justify-between gap-4 items-start text-xs">
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center mb-1">
                      <span className="font-bold text-dark truncate">{opp.title}</span>
                      <span className="px-1.5 py-0.5 text-[9px] bg-sand text-olive uppercase font-bold">{opp.type}</span>
                    </div>
                    <p className="text-muted leading-relaxed line-clamp-2">{opp.description}</p>
                    <span className="text-[10px] text-muted/80 block mt-1.5">Posted by {opp.authorName}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => alert(`Notice "${opp.title}" approved successfully.`)}
                      className="p-1.5 bg-surface border border-sand hover:border-olive text-olive hover:bg-olive/10 transition-colors flex items-center justify-center"
                      title="Approve Notice"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveOpportunity(opp.id)}
                      className="p-1.5 bg-surface border border-sand hover:border-terracotta text-terracotta hover:bg-terracotta/10 transition-colors flex items-center justify-center"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted py-4">No active collaboration notices to moderate.</p>
          )}
        </div>

        {/* Moderate Businesses */}
        <div className="bg-surface border border-sand p-6">
          <h2 className="font-serif text-lg font-bold text-dark mb-4 pb-2 border-b border-sand/50">
            Moderate Student Ventures
          </h2>

          {businesses.length > 0 ? (
            <div className="space-y-4">
              {businesses.map(biz => (
                <div key={biz.id} className="p-4 bg-bg-ves/20 border border-sand flex justify-between gap-4 items-start text-xs">
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center mb-1">
                      <span className="font-bold text-dark truncate">{biz.name}</span>
                      <span className="px-1.5 py-0.5 text-[9px] bg-sand text-olive uppercase font-bold">{biz.category}</span>
                    </div>
                    <p className="text-muted leading-relaxed line-clamp-2">{biz.description}</p>
                    <span className="text-[10px] text-muted/80 block mt-1.5">Owned by {biz.ownerName}</span>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => alert(`Venture "${biz.name}" approved.`)}
                      className="p-1.5 bg-surface border border-sand hover:border-olive text-olive hover:bg-olive/10 transition-colors flex items-center justify-center"
                      title="Approve Venture"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onFlagBusiness(biz.id)}
                      className="p-1.5 bg-surface border border-sand hover:border-terracotta text-terracotta hover:bg-terracotta/10 transition-colors flex items-center justify-center"
                      title="Flag/Warn Owner"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted py-4">No registered student businesses to moderate.</p>
          )}
        </div>

      </div>

    </div>
  );
}
