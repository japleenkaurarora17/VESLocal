import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MessageSquare, Compass, ShieldAlert, Award } from 'lucide-react';

export default function Sidebar({ currentUser, collaborations }) {
  return (
    <aside className="flex flex-col gap-6 w-full lg:w-80 shrink-0">
      
      {/* Mini Profile Card */}
      <div className="bg-surface border border-sand p-6 text-center">
        <img 
          src={currentUser.avatarUrl} 
          alt={currentUser.name} 
          className="w-20 h-20 rounded-full border-2 border-olive mx-auto mb-4 bg-bg-ves"
        />
        <h3 className="font-serif text-lg font-bold text-dark mb-1">{currentUser.name}</h3>
        <p className="text-xs text-muted mb-3">{currentUser.year} • {currentUser.department}</p>
        
        <div className="h-px bg-sand w-full my-4"></div>
        
        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <div className="border-r border-sand">
            <div className="text-lg font-bold text-olive">{currentUser.connectCount}</div>
            <div className="text-[10px] text-muted uppercase tracking-wider">Connections</div>
          </div>
          <div>
            <div className="text-lg font-bold text-olive">{collaborations ? collaborations.length : 0}</div>
            <div className="text-[10px] text-muted uppercase tracking-wider">Active Teams</div>
          </div>
        </div>

        <Link 
          to={`/profile/${currentUser.id}`}
          className="block w-full text-center py-2 mt-5 border border-olive text-olive hover:bg-olive hover:text-surface text-xs font-semibold transition-all duration-150"
        >
          Customize Showcase
        </Link>
      </div>

      {/* Campus Noticeboard Widgets */}
      <div className="bg-surface border border-sand p-6 text-left">
        <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>Campus Notices</span>
        </h4>
        
        <ul className="space-y-4">
          <li className="group pb-3 border-b border-sand/50 last:border-0 last:pb-0">
            <div className="flex gap-2.5 items-start">
              <Calendar className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">Aug 28</span>
                <h5 className="text-xs font-semibold text-dark leading-snug group-hover:text-olive transition-colors">
                  VESIT Internal Hackathon
                </h5>
                <p className="text-[10px] text-muted mt-0.5">Registration closes tonight at 11 PM.</p>
              </div>
            </div>
          </li>
          <li className="group pb-3 border-b border-sand/50 last:border-0 last:pb-0">
            <div className="flex gap-2.5 items-start">
              <Award className="w-4 h-4 text-olive shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider">Sep 02</span>
                <h5 className="text-xs font-semibold text-dark leading-snug group-hover:text-olive transition-colors">
                  E-Cell Idea Pitching
                </h5>
                <p className="text-[10px] text-muted mt-0.5">Win up to ₹15,000 seed funding from E-Cell.</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Active Collaborations */}
      <div className="bg-surface border border-sand p-6 text-left">
        <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">
          My Active Teams
        </h4>
        {collaborations && collaborations.length > 0 ? (
          <div className="space-y-3.5">
            {collaborations.map(collab => (
              <Link 
                to="/teams" 
                key={collab.id} 
                className="block p-3 border border-sand/60 hover:border-olive bg-bg-ves/20 hover:bg-bg-ves/50 transition-all duration-150"
              >
                <div className="text-xs font-bold text-dark mb-0.5">{collab.name}</div>
                <div className="text-[10px] text-muted truncate">
                  {collab.members.join(', ')}
                </div>
                <div className="mt-1.5 flex justify-between items-center text-[9px]">
                  <span className="text-[10px] font-semibold text-olive bg-olive/10 px-1.5 py-0.5">{collab.status}</span>
                  <span className="text-muted/80">{collab.meetingTime.split(' (')[0]}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-xs text-muted py-2">
            No active collaborations yet. Explore opportunities to build something together!
          </div>
        )}
      </div>

    </aside>
  );
}
