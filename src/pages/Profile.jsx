import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, MessageSquare, Plus, Check, UserPlus, UserCheck, Edit2, Save, ExternalLink } from 'lucide-react';
import SkillTag from '../components/SkillTag';

export default function Profile({ 
  students, 
  currentUser, 
  onUpdateCurrentUser, 
  connectedStudentIds, 
  onConnect, 
  businesses 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Determine if viewing own profile
  const isOwnProfile = !id || id === currentUser.id;
  
  // Find student target
  const student = isOwnProfile 
    ? currentUser 
    : students.find(s => s.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(student ? student.bio : '');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectRole, setNewProjectRole] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  if (!student) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-surface border border-sand text-center text-muted">
        Student profile not found.
        <Link to="/dashboard" className="block text-olive mt-4 font-bold">Back to Notices</Link>
      </div>
    );
  }

  // Find business details if owned by student
  const ownedBiz = businesses.find(b => b.ownerId === student.id);

  const isConnected = !isOwnProfile && connectedStudentIds.includes(student.id);

  const handleSaveBio = () => {
    onUpdateCurrentUser({
      ...currentUser,
      bio: editedBio
    });
    setIsEditing(false);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjectName || !newProjectDesc) {
      alert("Please fill in project name and description.");
      return;
    }

    const updatedProjects = [
      ...(currentUser.projects || []),
      {
        id: `p-${Date.now()}`,
        name: newProjectName,
        role: newProjectRole || "Contributor",
        description: newProjectDesc
      }
    ];

    onUpdateCurrentUser({
      ...currentUser,
      projects: updatedProjects
    });

    // Reset
    setNewProjectName('');
    setNewProjectRole('');
    setNewProjectDesc('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Back button */}
      <div className="mb-6">
        <Link to="/dashboard" className="text-xs font-semibold text-olive hover:text-terracotta transition-colors">
          ← Back to noticeboard
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-surface border border-sand p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          
          <img 
            src={student.avatarUrl} 
            alt={student.name} 
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-olive bg-bg-ves shrink-0"
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-black text-dark tracking-tight">
                  {student.name}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-muted mt-1">
                  <GraduationCap className="w-4 h-4 text-olive" />
                  <span>{student.year} • {student.department}</span>
                </div>
              </div>

              {/* Connections counters / actions */}
              <div className="flex items-center gap-3">
                
                {isOwnProfile ? (
                  <span className="px-3 py-1 text-xs font-bold bg-sand/30 text-olive border border-sand">
                    Your Portfolio
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => onConnect(student.id)}
                      className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isConnected
                          ? 'bg-olive/10 text-olive border border-olive/30'
                          : 'bg-olive text-surface hover:bg-olive/90'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Connected</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Connect</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => navigate(`/messages?chatWith=${student.id}`)}
                      className="p-2 border border-sand hover:border-olive text-muted hover:text-olive transition-colors bg-surface"
                      title="Direct Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </>
                )}

              </div>
            </div>

            <div className="h-px bg-sand w-full my-4"></div>

            <div className="flex items-center gap-6 text-xs text-muted">
              <div>
                <span className="font-bold text-dark text-sm mr-1">
                  {isOwnProfile ? currentUser.connectCount : student.connectCount + (isConnected ? 1 : 0)}
                </span> 
                Connections
              </div>
              <div>
                <span className="font-bold text-dark text-sm mr-1">
                  {student.projects ? student.projects.length : 0}
                </span> 
                Projects
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{student.email}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Details Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side detail specs */}
        <div className="space-y-6">
          
          {/* Skill List */}
          <div className="bg-surface border border-sand p-6 text-left">
            <h3 className="font-serif text-base font-bold text-dark mb-4">Skills & Endorsements</h3>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((skill, idx) => (
                <SkillTag key={idx} skill={skill} />
              ))}
            </div>
          </div>

          {/* Owned Business Widget */}
          {ownedBiz && (
            <div className="bg-surface border border-sand p-6 text-left relative overflow-hidden group">
              <span className="absolute top-3 right-3 text-[10px] uppercase font-bold text-terracotta tracking-wider">
                Venture
              </span>
              <h3 className="font-serif text-base font-bold text-dark mb-1 group-hover:text-olive transition-colors">
                {ownedBiz.name}
              </h3>
              <p className="text-xs text-muted mb-4">{ownedBiz.category}</p>
              <p className="text-xs text-muted mb-4 line-clamp-3 leading-relaxed">{ownedBiz.description}</p>
              <Link
                to="/businesses"
                className="inline-flex items-center gap-1 text-xs font-semibold text-olive hover:text-terracotta transition-colors"
              >
                <span>View in Marketplace</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          )}

        </div>

        {/* Right side Portfolio items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Biography Panel */}
          <div className="bg-surface border border-sand p-6 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-base font-bold text-dark">Biography</h3>
              {isOwnProfile && (
                <button
                  onClick={() => {
                    if (isEditing) handleSaveBio();
                    else setIsEditing(true);
                  }}
                  className="text-xs font-semibold text-olive hover:text-terracotta transition-colors flex items-center gap-1"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-3.5 h-3.5" /> Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-3.5 h-3.5" /> Edit Bio
                    </>
                  )}
                </button>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                rows="4"
                className="w-full p-3 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none leading-relaxed text-dark"
              ></textarea>
            ) : (
              <p className="text-sm text-muted leading-relaxed">
                {student.bio || "This student hasn't written a biography yet."}
              </p>
            )}
          </div>

          {/* Projects Portfolio Section */}
          <div className="bg-surface border border-sand p-6 text-left">
            <h3 className="font-serif text-base font-bold text-dark mb-4">Featured Projects</h3>
            
            {student.projects && student.projects.length > 0 ? (
              <div className="space-y-4">
                {student.projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-bg-ves/20 border border-sand/60">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h4 className="text-sm font-bold text-dark">{proj.name}</h4>
                      <span className="px-2 py-0.5 text-[9px] font-semibold bg-sand/30 text-olive border border-sand">
                        {proj.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted py-2">No projects showcased yet.</p>
            )}

            {/* In-page Project Addition for current logged-in user */}
            {isOwnProfile && (
              <div className="mt-8 pt-6 border-t border-sand/60">
                <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 text-terracotta" /> Add Project Showcase
                </h4>

                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. VESLocal Mobile"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                        Your Role
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Frontend Engineer, Product Lead"
                        value={newProjectRole}
                        onChange={(e) => setNewProjectRole(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1">
                      Project Description
                    </label>
                    <textarea
                      rows="2.5"
                      placeholder="Briefly explain what you built, what tech stack was used, and the impact of the project."
                      value={newProjectDesc}
                      onChange={(e) => setNewProjectDesc(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-olive hover:bg-olive/90 text-surface text-xs font-bold transition-colors"
                  >
                    Add to Showcase
                  </button>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
