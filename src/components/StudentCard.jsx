import React from 'react';
import { MessageSquare, UserPlus, UserCheck, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkillTag from './SkillTag';

export default function StudentCard({ student, isConnected, onConnect, onMessageClick }) {
  return (
    <div className="bg-surface border border-sand hover:border-olive transition-all duration-200 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-start gap-4 mb-4">
          <img 
            src={student.avatarUrl || "https://api.dicebear.com/7.x/adventurer/svg?seed=placeholder"} 
            alt={student.name} 
            className="w-14 h-14 rounded-full border border-sand bg-bg-ves"
          />
          <div className="text-left">
            <h3 className="font-serif text-lg font-bold text-dark tracking-tight leading-snug">
              <Link to={`/profile/${student.id}`} className="hover:text-terracotta transition-colors">
                {student.name}
              </Link>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-olive" />
              <span>{student.year} • {student.department}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted mb-4 line-clamp-3 leading-relaxed text-left">
          {student.bio || "No biography provided yet."}
        </p>

        <div className="mb-6 text-left">
          <div className="flex flex-wrap gap-1.5">
            {student.skills.map((skill, index) => (
              <SkillTag key={index} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-sand/60 flex items-center justify-between gap-2">
        <Link 
          to={`/profile/${student.id}`}
          className="text-xs font-semibold text-olive hover:text-terracotta transition-colors"
        >
          View Profile
        </Link>

        <div className="flex gap-2">
          {onConnect && (
            <button
              onClick={() => onConnect(student.id)}
              className={`px-3 py-1.5 text-xs font-medium transition-all duration-150 flex items-center gap-1 ${
                isConnected
                  ? 'bg-olive/10 text-olive border border-olive/30'
                  : 'bg-olive text-surface hover:bg-olive/90 border border-olive'
              }`}
            >
              {isConnected ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  Connected
                </>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  Connect
                </>
              )}
            </button>
          )}

          {isConnected && onMessageClick && (
            <button
              onClick={() => onMessageClick(student.id)}
              className="p-1.5 bg-surface text-muted border border-sand hover:border-olive hover:text-olive transition-all duration-150"
              title="Message Student"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
