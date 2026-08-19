import React, { useState } from 'react';
import { Search, Plus, Megaphone, Check, Sparkles } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import SkillTag from '../components/SkillTag';

export default function Opportunities({ 
  opportunities, 
  currentUser, 
  onToggleInterest, 
  onAddOpportunity 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState('Collaboration');
  const [newSkills, setNewSkills] = useState('');

  const opportunityTypes = [
    "Collaboration",
    "Hackathon",
    "Freelance",
    "Startup Partner",
    "Voluntary"
  ];

  // Extract all unique skills needed
  const allSkills = Array.from(
    new Set(opportunities.flatMap(o => o.skillsNeeded))
  ).sort();

  const handleCreateOpportunity = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) {
      alert("Please fill in both title and description.");
      return;
    }

    const skillsArray = newSkills
      ? newSkills.split(',').map(s => s.trim()).filter(Boolean)
      : ["React"];

    onAddOpportunity({
      title: newTitle,
      description: newDesc,
      type: newType,
      skillsNeeded: skillsArray
    });

    // Reset
    setNewTitle('');
    setNewDesc('');
    setNewType('Collaboration');
    setNewSkills('');
    setIsPosting(false);
  };

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.authorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType ? opp.type === selectedType : true;
    
    const matchesSkill = selectedSkill
      ? opp.skillsNeeded.some(s => s.toLowerCase() === selectedSkill.toLowerCase())
      : true;

    return matchesSearch && matchesType && matchesSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Header Banner */}
      <div className="mb-8 border-b border-sand pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-dark tracking-tight mb-2">
            Campus Collaboration Board
          </h1>
          <p className="text-sm text-muted">
            Find teams for hackathons, client projects, event support, and local startup ventures.
          </p>
        </div>
        <button
          onClick={() => setIsPosting(!isPosting)}
          className="px-5 py-3 bg-olive text-surface hover:bg-olive/90 text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-150 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Broadcast a Need</span>
        </button>
      </div>

      {/* Broadcaster Drawer */}
      {isPosting && (
        <div className="bg-[#FFFCF5] border border-sand p-6 mb-8 animate-slideDown">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-dark flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-terracotta" />
              <span>Broadcast a Project Collaboration Notice</span>
            </h3>
            <button 
              onClick={() => setIsPosting(false)} 
              className="text-xs font-semibold text-muted hover:text-dark"
            >
              Close Panel
            </button>
          </div>

          <form onSubmit={handleCreateOpportunity} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Opportunity Title / Role Wanted
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Flutter Mobile Dev, Event Photographer, Video Co-Editor"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Collaboration Category
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
                >
                  {opportunityTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                Detailed Scope of Work
              </label>
              <textarea 
                rows="4" 
                placeholder="Give a description of the project, deadline dates, required contribution hours, and what teammates will learn or earn."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                Target Skillsets (comma separated)
              </label>
              <input 
                type="text" 
                placeholder="e.g. React Native, Photoshop, Figma, Lightroom"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
              />
              <span className="text-[10px] text-muted">Separate multiple skills with commas.</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sand/40">
              <button 
                type="button" 
                onClick={() => setIsPosting(false)}
                className="px-4 py-2 border border-sand text-muted text-xs font-semibold hover:text-dark"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-olive text-surface text-xs font-bold hover:bg-olive/90 transition-colors"
              >
                Publish Notice
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Opportunities Filtering Dashboard */}
      <div className="bg-surface border border-sand p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by keywords, author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-3 w-full md:w-auto">
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full md:w-44 px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
          >
            <option value="">All Categories</option>
            {opportunityTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full md:w-44 px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
          >
            <option value="">All Skills</option>
            {allSkills.map((skill, idx) => (
              <option key={idx} value={skill}>{skill}</option>
            ))}
          </select>

        </div>

        {/* Clear Triggers */}
        {(searchTerm || selectedType || selectedSkill) && (
          <button
            onClick={() => { setSearchTerm(''); setSelectedType(''); setSelectedSkill(''); }}
            className="text-xs font-bold text-terracotta hover:text-dark transition-colors shrink-0"
          >
            Reset Filters
          </button>
        )}

      </div>

      {/* Grid of Results */}
      {filteredOpps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpps.map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              currentUserId={currentUser.id}
              onToggleInterest={onToggleInterest}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-sand p-16 text-center text-muted text-sm">
          No collaboration requirements match the filter criteria.
        </div>
      )}

    </div>
  );
}
