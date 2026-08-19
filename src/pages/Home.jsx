import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageSquare, Search, Award, Briefcase } from 'lucide-react';
import OpportunityCard from '../components/OpportunityCard';
import BusinessCard from '../components/BusinessCard';
import SkillTag from '../components/SkillTag';

export default function Home({ opportunities, businesses, currentUser, isLoggedIn }) {
  const featuredOpps = opportunities.slice(0, 3);
  const featuredBiz = businesses.slice(0, 3);
  
  const popularSkills = [
    "Video Editing", "UI/UX", "React", "Graphic Design", "Photography", "Social Media", "Python", "IoT"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 md:px-8 py-20 md:py-28 bg-[#FFFCF5] border-b border-sand text-center overflow-hidden">
        {/* Subtle geometric lines to fit editorial vibe */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-px h-full bg-sand"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-sand"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 border border-terracotta/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Campus Networking for VESIT
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-dark tracking-tight leading-[1.08] mb-6">
            Find your people. <br />
            <span className="text-olive">Build something together.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
            A student-powered network for discovering talent, opportunities, businesses and ideas within VESIT.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to={isLoggedIn ? "/opportunities" : "/login"} 
              className="w-full sm:w-auto px-8 py-4 bg-olive text-surface hover:bg-olive/90 font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 border border-olive"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to={isLoggedIn ? "/dashboard" : "/register"} 
              className="w-full sm:w-auto px-8 py-4 bg-surface text-olive hover:text-dark hover:border-olive border border-sand font-semibold text-sm transition-all duration-150 flex items-center justify-center"
            >
              {isLoggedIn ? "Go to Noticeboard" : "Join VESLocal"}
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-dark tracking-tight mb-3">
            A Student-Powered Campus Ecosystem
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            VESLocal bypasses corporate algorithms. It's built by students, for students, to foster localized collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-surface border border-sand p-8 text-left hover:border-olive transition-colors">
            <div className="w-10 h-10 bg-olive/10 text-olive flex items-center justify-center font-bold text-sm mb-6 border border-olive/20">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-dark mb-2">Showcase Your Work</h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Build your student profile detailing your skills, portfolio links, and even campus-based micro-businesses or freelance work.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-surface border border-sand p-8 text-left hover:border-olive transition-colors">
            <div className="w-10 h-10 bg-olive/10 text-olive flex items-center justify-center font-bold text-sm mb-6 border border-olive/20">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-dark mb-2">Broadcast Opportunities</h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Need a hackathon teammate, a graphic designer for a college fest poster, or a videographer for a product pitch? Post it on the noticeboard.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-surface border border-sand p-8 text-left hover:border-olive transition-colors">
            <div className="w-10 h-10 bg-olive/10 text-olive flex items-center justify-center font-bold text-sm mb-6 border border-olive/20">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-dark mb-2">Build Together</h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Browse campus listings, express interest, connect via direct chat, and form local teams to launch your projects.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Showcase Section */}
      <section className="bg-surface border-y border-sand py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 text-center md:text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-2">
                Discover Skills & Talent
              </h2>
              <p className="text-xs sm:text-sm text-muted max-w-md">
                Looking for expertise? Filter and search through our student database.
              </p>
            </div>
            <Link 
              to={isLoggedIn ? "/discover" : "/register"} 
              className="text-sm font-semibold text-olive hover:text-terracotta transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Search Students Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
            {popularSkills.map((skill, index) => (
              <Link 
                key={index} 
                to={isLoggedIn ? `/discover?skill=${encodeURIComponent(skill)}` : "/login"}
                className="px-4 py-2 bg-bg-ves border border-sand hover:border-olive hover:bg-surface text-sm font-medium text-dark transition-all duration-150 cursor-pointer"
              >
                {skill}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Active Opportunities Previews */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12 text-center md:text-left">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-2">
              Recent Collaboration Requests
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-md">
              Fresh opportunities posted on the campus noticeboard.
            </p>
          </div>
          <Link 
            to={isLoggedIn ? "/opportunities" : "/register"} 
            className="text-sm font-semibold text-olive hover:text-terracotta transition-colors flex items-center gap-1 shrink-0"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOpps.map(opp => (
            <OpportunityCard 
              key={opp.id} 
              opportunity={opp} 
              currentUserId={currentUser?.id} 
            />
          ))}
        </div>
      </section>

      {/* Student Businesses Section */}
      <section className="bg-[#FFFCF5] border-t border-sand px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12 text-center md:text-left">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-2">
                Featured Student Businesses
              </h2>
              <p className="text-xs sm:text-sm text-muted max-w-md">
                Support student-owned businesses, catering services, photography, and consulting on campus.
              </p>
            </div>
            <Link 
              to={isLoggedIn ? "/businesses" : "/register"} 
              className="text-sm font-semibold text-olive hover:text-terracotta transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBiz.map(biz => (
              <BusinessCard 
                key={biz.id} 
                business={biz} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
