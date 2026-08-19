import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, UserPlus, UserCheck, GraduationCap, X } from 'lucide-react';
import StudentCard from '../components/StudentCard';

export default function Discover({ students, currentUser, connectedStudentIds, onConnect }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const skillParam = searchParams.get('skill');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(skillParam || '');

  // Keep skill search param updated with form state
  useEffect(() => {
    if (skillParam) {
      setSelectedSkill(skillParam);
    }
  }, [skillParam]);

  const departments = [
    "Computer Engineering",
    "Information Technology",
    "Electronics & Telecommunication",
    "Artificial Intelligence & Data Science",
    "Instrumentation Engineering"
  ];

  const years = [
    "First Year",
    "Second Year",
    "Third Year",
    "Fourth Year"
  ];

  // Extract all unique skills across all students to populate a skill dropdown
  const allSkills = Array.from(
    new Set(students.flatMap(s => s.skills))
  ).sort();

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDept('');
    setSelectedYear('');
    setSelectedSkill('');
    setSearchParams({});
  };

  const filteredStudents = students.filter(student => {
    // Hide current user from discovery list
    if (student.id === currentUser.id) return false;

    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept ? student.department === selectedDept : true;
    const matchesYear = selectedYear ? student.year === selectedYear : true;
    const matchesSkill = selectedSkill 
      ? student.skills.some(s => s.toLowerCase() === selectedSkill.toLowerCase())
      : true;

    return matchesSearch && matchesDept && matchesYear && matchesSkill;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Header */}
      <div className="mb-8 border-b border-sand pb-6">
        <h1 className="font-serif text-3xl font-black text-dark tracking-tight mb-2">
          Discover VESIT Talent
        </h1>
        <p className="text-sm text-muted">
          Find classmates, research partners, technical co-founders, and freelance experts.
        </p>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-surface border border-sand p-6 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Text Search */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search by name, biography keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none"
            />
          </div>

          {/* Department Filter */}
          <div className="w-full md:w-60">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
            >
              <option value="">All Departments</option>
              {departments.map((d, idx) => (
                <option key={idx} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
            >
              <option value="">All Years</option>
              {years.map((y, idx) => (
                <option key={idx} value={y}>{y}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Skill tag filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-sand/50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-dark uppercase tracking-wider">Skill:</span>
            <select
              value={selectedSkill}
              onChange={(e) => {
                setSelectedSkill(e.target.value);
                setSearchParams(e.target.value ? { skill: e.target.value } : {});
              }}
              className="px-2.5 py-1 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none rounded font-medium text-dark cursor-pointer"
            >
              <option value="">Select Skill</option>
              {allSkills.map((skill, idx) => (
                <option key={idx} value={skill}>{skill}</option>
              ))}
            </select>

            {selectedSkill && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-olive/10 text-olive border border-olive/30 rounded">
                <span>{selectedSkill}</span>
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-terracotta" 
                  onClick={() => { setSelectedSkill(''); setSearchParams({}); }}
                />
              </span>
            )}
          </div>

          {(searchTerm || selectedDept || selectedYear || selectedSkill) && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-terracotta hover:text-dark transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Directory Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              isConnected={connectedStudentIds.includes(student.id)}
              onConnect={onConnect}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-sand p-16 text-center text-muted text-sm">
          No students found matching your filter selection. Try removing filter queries.
        </div>
      )}

    </div>
  );
}
