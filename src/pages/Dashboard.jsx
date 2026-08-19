import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Heart, Sparkles, Send, Megaphone, Share2, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import OpportunityCard from '../components/OpportunityCard';
import BusinessCard from '../components/BusinessCard';
import SkillTag from '../components/SkillTag';

export default function Dashboard({ 
  currentUser, 
  opportunities, 
  businesses, 
  collaborations, 
  notifications, 
  onToggleInterest,
  onAddOpportunity,
  onConnect,
  students
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('feed'); // feed, matches, businesses
  const [isPosting, setIsPosting] = useState(false);
  const [newOppTitle, setNewOppTitle] = useState('');
  const [newOppDesc, setNewOppDesc] = useState('');
  const [newOppType, setNewOppType] = useState('Collaboration');
  const [newOppSkills, setNewOppSkills] = useState('');

  const navigate = useNavigate();

  // Handle post creation
  const handlePostOpp = (e) => {
    e.preventDefault();
    if (!newOppTitle || !newOppDesc) {
      alert("Please fill in the title and description.");
      return;
    }

    const skillsArray = newOppSkills 
      ? newOppSkills.split(',').map(s => s.trim()).filter(Boolean)
      : ["React", "UI/UX"];

    onAddOpportunity({
      title: newOppTitle,
      description: newOppDesc,
      type: newOppType,
      skillsNeeded: skillsArray
    });

    // Reset Form
    setNewOppTitle('');
    setNewOppDesc('');
    setNewOppType('Collaboration');
    setNewOppSkills('');
    setIsPosting(false);
  };

  // Filter opportunities based on search
  const filteredOpps = opportunities.filter(opp => {
    const searchString = searchTerm.toLowerCase();
    return (
      opp.title.toLowerCase().includes(searchString) ||
      opp.description.toLowerCase().includes(searchString) ||
      opp.authorName.toLowerCase().includes(searchString) ||
      opp.skillsNeeded.some(s => s.toLowerCase().includes(searchString))
    );
  });

  // Match opportunities to currentUser's skills
  const matchedOpps = opportunities.filter(opp => 
    opp.skillsNeeded.some(skill => 
      currentUser.skills.some(userSkill => 
        userSkill.toLowerCase() === skill.toLowerCase()
      )
    ) && opp.authorId !== currentUser.id
  );

  // Filter businesses based on search
  const filteredBiz = businesses.filter(biz => {
    const searchString = searchTerm.toLowerCase();
    return (
      biz.name.toLowerCase().includes(searchString) ||
      biz.description.toLowerCase().includes(searchString) ||
      biz.category.toLowerCase().includes(searchString) ||
      biz.tags.some(t => t.toLowerCase().includes(searchString))
    );
  });

  // Find people who share skills or departments
  const peerStudents = students.filter(s => s.id !== currentUser.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full">
      
      {/* Welcome Board */}
      <div className="text-left mb-8 pb-6 border-b border-sand">
        <h1 className="font-serif text-3xl md:text-4xl font-black text-dark tracking-tight leading-none mb-2">
          Good afternoon, {currentUser.name}.
        </h1>
        <p className="text-sm text-muted">
          Here's what's happening around your campus.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Feed Content Column */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Dashboard Control Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface border border-sand p-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search notices, skills, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none placeholder:text-muted/60"
              />
            </div>

            {/* Interactive Tabs */}
            <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => { setActiveTab('feed'); setSearchTerm(''); }}
                className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'feed' 
                    ? 'bg-olive text-surface' 
                    : 'bg-bg-ves text-olive hover:bg-sand/30'
                }`}
              >
                Campus Feed
              </button>
              <button
                onClick={() => { setActiveTab('matches'); setSearchTerm(''); }}
                className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'matches' 
                    ? 'bg-olive text-surface' 
                    : 'bg-bg-ves text-olive hover:bg-sand/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Matched for Me ({matchedOpps.length})
              </button>
              <button
                onClick={() => { setActiveTab('businesses'); setSearchTerm(''); }}
                className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === 'businesses' 
                    ? 'bg-olive text-surface' 
                    : 'bg-bg-ves text-olive hover:bg-sand/30'
                }`}
              >
                Campus Ventures
              </button>
            </div>

            {/* Quick action button */}
            <button
              onClick={() => setIsOpen(true)} // Wait, we can toggle inline posting panel
              onClick={() => setIsPosting(!isPosting)}
              className="w-full sm:w-auto px-4 py-2 bg-terracotta text-surface hover:bg-terracotta/90 text-xs font-bold flex items-center justify-center gap-1 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Need</span>
            </button>

          </div>

          {/* Inline posting expansion */}
          {isPosting && (
            <div className="bg-[#FFFCF5] border-2 border-dashed border-sand p-6 text-left animate-slideDown">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-lg font-bold text-dark flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-terracotta" />
                  <span>Broadcast a Collaboration Opportunity</span>
                </h3>
                <button 
                  onClick={() => setIsPosting(false)} 
                  className="text-xs text-muted hover:text-dark font-semibold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handlePostOpp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                      Title / Role Needed
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Backend Node.js Dev, Event Photographer"
                      value={newOppTitle}
                      onChange={(e) => setNewOppTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                      Opportunity Type
                    </label>
                    <select
                      value={newOppType}
                      onChange={(e) => setNewOppType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark"
                    >
                      <option value="Collaboration">Collaboration</option>
                      <option value="Hackathon">Hackathon Partner</option>
                      <option value="Freelance">Freelance Gig</option>
                      <option value="Voluntary">Voluntary Help</option>
                      <option value="Startup Partner">Startup Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                    Description & Details
                  </label>
                  <textarea 
                    rows="3" 
                    placeholder="Describe the scope of the project, how many team members are involved, meeting schedule, and how to get started."
                    value={newOppDesc}
                    onChange={(e) => setNewOppDesc(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                    Skills Needed (Comma separated)
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. React, Node.js, Photoshop, Copywriting"
                    value={newOppSkills}
                    onChange={(e) => setNewOppSkills(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                  />
                  <span className="text-[10px] text-muted">Separate multiple skills with commas.</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsPosting(false)}
                    className="px-4 py-2 border border-sand text-muted text-xs hover:text-dark font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-olive text-surface text-xs font-bold hover:bg-olive/90 transition-colors"
                  >
                    Broadcast to Campus
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab Render: Main Campus Feed */}
          {activeTab === 'feed' && (
            <div className="space-y-6">
              <div className="text-left">
                <h3 className="font-serif text-xl font-bold text-dark mb-1">Campus Board</h3>
                <p className="text-xs text-muted">Showing all current requirements and announcements.</p>
              </div>

              {filteredOpps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="bg-surface border border-sand p-12 text-center text-muted text-sm">
                  No opportunities match your search. Try adjusting terms or post your own.
                </div>
              )}
            </div>
          )}

          {/* Tab Render: Matched for Me */}
          {activeTab === 'matches' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-left bg-olive/5 border border-olive/20 p-5">
                <h3 className="font-serif text-lg font-bold text-olive mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-terracotta" />
                  <span>Matching Your Skills</span>
                </h3>
                <p className="text-xs text-muted">
                  Showing opportunities seeking: {currentUser.skills.slice(0, 3).join(', ')} etc.
                </p>
              </div>

              {matchedOpps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedOpps.map(opp => (
                    <OpportunityCard 
                      key={opp.id} 
                      opportunity={opp} 
                      currentUserId={currentUser.id}
                      onToggleInterest={onToggleInterest}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-surface border border-sand p-12 text-center text-muted text-sm">
                  No active matches found. Add more skills to your profile to get matches!
                </div>
              )}
            </div>
          )}

          {/* Tab Render: Student Businesses */}
          {activeTab === 'businesses' && (
            <div className="space-y-6">
              <div className="text-left">
                <h3 className="font-serif text-xl font-bold text-dark mb-1">VESIT Ventures & Freelance</h3>
                <p className="text-xs text-muted">Supporting student-run initiatives and services.</p>
              </div>

              {filteredBiz.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBiz.map(biz => (
                    <BusinessCard 
                      key={biz.id} 
                      business={biz} 
                      onMessageOwner={(ownerId) => navigate(`/messages?chatWith=${ownerId}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-surface border border-sand p-12 text-center text-muted text-sm">
                  No student businesses match your search term.
                </div>
              )}
            </div>
          )}

          {/* People looking for your skills / Quick Connections List */}
          <div className="bg-surface border border-sand p-6 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg font-bold text-dark">
                Students You May Know
              </h3>
              <Link to="/discover" className="text-xs font-bold text-olive hover:text-terracotta transition-colors">
                View Directory
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {peerStudents.map(student => (
                <div key={student.id} className="p-4 bg-bg-ves/20 border border-sand flex flex-col justify-between">
                  <div className="flex items-center gap-2.5 mb-2">
                    <img 
                      src={student.avatarUrl} 
                      alt={student.name} 
                      className="w-8 h-8 rounded-full border border-sand bg-surface"
                    />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-dark truncate max-w-[120px]">
                        <Link to={`/profile/${student.id}`} className="hover:text-terracotta">
                          {student.name}
                        </Link>
                      </h4>
                      <p className="text-[9px] text-muted truncate max-w-[120px]">{student.department}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {student.skills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 text-[9px] bg-surface text-olive border border-sand rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onConnect(student.id)}
                    className="w-full py-1 bg-surface hover:bg-olive hover:text-surface text-[10px] font-bold text-olive border border-olive transition-colors"
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Component */}
        <Sidebar currentUser={currentUser} collaborations={collaborations} />

      </div>

    </div>
  );
}
