import React, { useState } from 'react';
import { Users, Plus, UsersRound, Calendar, MessageSquare, Send, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Collaboration({ 
  collaborations, 
  currentUser, 
  onAddCollaboration,
  students
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [collabName, setCollabName] = useState('');
  const [collabDesc, setCollabDesc] = useState('');
  const [collabMeeting, setCollabMeeting] = useState('');
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);

  const peerStudents = students.filter(s => s.id !== currentUser.id);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (!collabName || !collabDesc) {
      alert("Please fill in the team name and description.");
      return;
    }

    // Map selected student names
    const memberNames = [currentUser.name];
    selectedMemberIds.forEach(id => {
      const match = students.find(s => s.id === id);
      if (match) memberNames.push(match.name);
    });

    onAddCollaboration({
      name: collabName,
      description: collabDesc,
      members: memberNames,
      status: "Ideation",
      meetingTime: collabMeeting || "TBD (Online)"
    });

    // Reset
    setCollabName('');
    setCollabDesc('');
    setCollabMeeting('');
    setSelectedMemberIds([]);
    setIsCreating(false);
  };

  const handleToggleMember = (id) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter(mId => mId !== id));
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Header */}
      <div className="mb-8 border-b border-sand pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-dark tracking-tight mb-2">
            Collaboration Hub
          </h1>
          <p className="text-sm text-muted">
            Manage your active study groups, hackathon squads, research project teams, and campus startup rosters.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-5 py-3 bg-olive text-surface hover:bg-olive/90 text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-150 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create new Team</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main section */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Creation drawer */}
          {isCreating && (
            <div className="bg-[#FFFCF5] border border-sand p-6 mb-6 animate-slideDown">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg font-bold text-dark flex items-center gap-2">
                  <UsersRound className="w-5 h-5 text-terracotta" />
                  <span>Register a New Project Team / Squad</span>
                </h3>
                <button 
                  onClick={() => setIsCreating(false)} 
                  className="text-xs font-semibold text-muted hover:text-dark"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateTeam} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                      Team Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Smart India Hackathon Group 4"
                      value={collabName}
                      onChange={(e) => setCollabName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                      Default Meeting Place / Schedule
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Tuesdays at 4:30 PM (Canteen)"
                      value={collabMeeting}
                      onChange={(e) => setCollabMeeting(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                    Project Goal / Scope
                  </label>
                  <textarea 
                    rows="3" 
                    placeholder="Briefly state what this squad is building and what responsibilities are divided."
                    value={collabDesc}
                    onChange={(e) => setCollabDesc(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                    required
                  ></textarea>
                </div>

                {/* Team selector checklist */}
                <div>
                  <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-2">
                    Select Team Members
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-40 overflow-y-auto p-3 border border-sand bg-bg-ves/30">
                    {peerStudents.map(student => {
                      const isSelected = selectedMemberIds.includes(student.id);
                      return (
                        <div 
                          key={student.id}
                          onClick={() => handleToggleMember(student.id)}
                          className={`p-2 border text-xs cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'bg-olive text-surface border-olive' 
                              : 'bg-surface text-dark border-sand hover:border-olive'
                          }`}
                        >
                          <span className="truncate">{student.name}</span>
                          {isSelected && <span className="text-[10px]">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-sand/40">
                  <button 
                    type="button" 
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 border border-sand text-muted text-xs font-semibold hover:text-dark"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-olive text-surface text-xs font-bold hover:bg-olive/90 transition-colors"
                  >
                    Launch Team
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Active squads list grid */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl font-bold text-dark">Active Projects</h2>

            {collaborations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaborations.map(collab => (
                  <div key={collab.id} className="bg-surface border border-sand p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h3 className="font-serif text-lg font-bold text-dark">{collab.name}</h3>
                        <span className="px-2 py-0.5 text-[10px] font-semibold text-olive bg-olive/10 border border-olive/20 uppercase tracking-wide">
                          {collab.status}
                        </span>
                      </div>

                      <p className="text-xs text-muted mb-5 leading-relaxed">
                        {collab.description}
                      </p>

                      <div className="mb-4">
                        <span className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-2">Team Members</span>
                        <div className="flex flex-wrap gap-1.5">
                          {collab.members.map((member, idx) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-1 text-xs bg-bg-ves text-dark border border-sand/60 font-semibold"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-sand/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-muted">
                        <Calendar className="w-3.5 h-3.5 text-olive" />
                        <span>{collab.meetingTime}</span>
                      </div>
                      
                      <button 
                        onClick={() => alert("Open group chat is a mock event. This will trigger real WebSocket channels in later experiments!")}
                        className="text-xs font-bold text-olive hover:text-terracotta transition-colors flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Space</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface border border-sand p-16 text-center text-muted text-sm">
                You are not in any active collaboration teams. Start a team or join opportunities to build together!
              </div>
            )}
          </div>

        </div>

        {/* Sidebar */}
        <Sidebar currentUser={currentUser} collaborations={collaborations} />

      </div>

    </div>
  );
}
