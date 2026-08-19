import React from 'react';
import { Star, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkillTag from './SkillTag';

// Custom inline brand icons (recently deprecated/removed from Lucide)
const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function BusinessCard({ business, onMessageOwner }) {
  return (
    <div className="bg-surface border border-sand hover:border-olive transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Banner Image */}
        <div className="h-40 w-full overflow-hidden border-b border-sand relative">
          <img 
            src={business.bannerUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"} 
            alt={business.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-surface text-olive border border-sand shadow-sm">
              {business.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-left">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif text-lg font-bold text-dark tracking-tight leading-snug">
              {business.name}
            </h3>
            <div className="flex items-center gap-1 bg-sand/20 px-2 py-0.5 border border-sand/40">
              <Star className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
              <span className="text-xs font-bold text-dark">{business.rating.toFixed(1)}</span>
              <span className="text-[10px] text-muted">({business.reviewsCount})</span>
            </div>
          </div>

          <p className="text-xs text-muted mb-4">
            Owned by <Link to={`/profile/${business.ownerId}`} className="font-semibold text-olive hover:text-terracotta transition-colors">{business.ownerName}</Link>
          </p>

          <p className="text-sm text-muted mb-4 line-clamp-3 leading-relaxed">
            {business.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {business.tags.map((tag, idx) => (
              <SkillTag key={idx} skill={tag} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 pb-6 pt-4 border-t border-sand/60 flex items-center justify-between gap-4">
        {/* Social / External Links */}
        <div className="flex gap-2">
          {business.links.website && (
            <a 
              href={`https://${business.links.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full border border-sand hover:border-olive text-muted hover:text-olive transition-colors"
              title="Website"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
          {business.links.instagram && (
            <a 
              href={`https://instagram.com/${business.links.instagram.replace('@', '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full border border-sand hover:border-olive text-muted hover:text-olive transition-colors"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
          )}
          {business.links.github && (
            <a 
              href={`https://github.com/${business.links.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-full border border-sand hover:border-olive text-muted hover:text-olive transition-colors"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {onMessageOwner && (
          <button
            onClick={() => onMessageOwner(business.ownerId)}
            className="px-3 py-1.5 text-xs font-semibold bg-olive text-surface hover:bg-olive/90 transition-colors flex items-center gap-1"
          >
            <span>Inquire Service</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
