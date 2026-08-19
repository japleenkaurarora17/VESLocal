import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface border-t border-sand py-12 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
        
        {/* Branding Column */}
        <div className="md:col-span-2">
          <span className="font-serif text-xl font-black tracking-tight text-olive select-none">
            VES<span className="text-terracotta">Local</span>
          </span>
          <p className="text-sm text-muted mt-3 max-w-sm leading-relaxed">
            A campus-exclusive networking and collaboration ecosystem for the students of Vivekanand Education Society's Institute of Technology (VESIT).
          </p>
          <div className="text-xs text-muted/80 mt-6 font-medium">
            Find your people. Build something together.
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">Discover</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link to="/opportunities" className="hover:text-terracotta transition-colors">Project Matches</Link></li>
            <li><Link to="/discover" className="hover:text-terracotta transition-colors">Student Roster</Link></li>
            <li><Link to="/businesses" className="hover:text-terracotta transition-colors">Campus Ventures</Link></li>
            <li><Link to="/teams" className="hover:text-terracotta transition-colors">Team Hub</Link></li>
          </ul>
        </div>

        {/* Campus Links */}
        <div>
          <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">VESIT Links</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a 
                href="https://vesit.ves.ac.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-terracotta transition-colors"
              >
                Official Website
              </a>
            </li>
            <li>
              <a 
                href="https://vesit.ves.ac.in/departments/it" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-terracotta transition-colors"
              >
                IT Department
              </a>
            </li>
            <li>
              <a 
                href="https://vesit.ves.ac.in/cocurricular/ecell" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-terracotta transition-colors"
              >
                E-Cell VESIT
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-sand/60 flex flex-col sm:flex-row items-center justify-between text-xs text-muted/80">
        <div>
          © {currentYear} VESLocal. Made with ❤ for VESIT students.
        </div>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <Link to="/admin" className="hover:text-terracotta transition-colors font-medium">Campus Mod Admin</Link>
          <span>•</span>
          <span>Experiment 1 - Interactive UIs</span>
        </div>
      </div>
    </footer>
  );
}
