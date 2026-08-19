import React from 'react';
import { Bell, Check, Inbox, AlertCircle, Circle, Mail, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Notifications({ 
  notifications, 
  onMarkAllRead, 
  onMarkRead,
  currentUser,
  collaborations
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Header */}
      <div className="mb-8 border-b border-sand pb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-dark tracking-tight mb-2">
            Alerts & Activity
          </h1>
          <p className="text-sm text-muted">
            Stay updated with peer interests, connection approvals, and collaboration announcements.
          </p>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button
            onClick={onMarkAllRead}
            className="px-3.5 py-2 border border-olive text-olive hover:bg-olive hover:text-surface text-xs font-semibold transition-all duration-150 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Notifications list */}
        <div className="flex-1 w-full space-y-4">
          
          {notifications.length > 0 ? (
            <div className="bg-surface border border-sand divide-y divide-sand/50">
              {notifications.map(notif => (
                <div 
                  key={notif.id}
                  onClick={() => onMarkRead(notif.id)}
                  className={`p-5 flex gap-4 items-start cursor-pointer hover:bg-bg-ves/20 transition-colors ${
                    !notif.read ? 'bg-[#FFFCF5]' : 'opacity-85'
                  }`}
                >
                  {/* Icon depending on notif type */}
                  <div className="mt-0.5 shrink-0">
                    {!notif.read ? (
                      <Circle className="w-3 h-3 fill-terracotta text-terracotta mt-1.5" />
                    ) : (
                      <Check className="w-4 h-4 text-muted mt-1" />
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    <p className={`text-sm leading-relaxed ${!notif.read ? 'font-semibold text-dark' : 'text-muted'}`}>
                      {notif.text}
                    </p>
                    <span className="text-[10px] text-muted/80 block mt-1">{notif.time}</span>
                  </div>

                  {/* Actions for specific notif type (like direct chat links) */}
                  <div className="shrink-0 text-xs">
                    {!notif.read && (
                      <span className="px-2 py-0.5 bg-terracotta/10 text-terracotta font-semibold text-[10px]">
                        New
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface border border-sand p-16 text-center text-muted text-sm flex flex-col items-center justify-center gap-3">
              <Inbox className="w-12 h-12 text-sand" />
              <span>Your campus notification board is completely clean.</span>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <Sidebar currentUser={currentUser} collaborations={collaborations} />

      </div>

    </div>
  );
}
