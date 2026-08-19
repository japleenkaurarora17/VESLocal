import React, { useState } from 'react';
import { Search, Plus, Store, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessCard from '../components/BusinessCard';

export default function Businesses({ businesses, currentUser, onAddBusiness }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // New business form states
  const [bizName, setBizName] = useState('');
  const [bizCategory, setBizCategory] = useState('Design Services');
  const [bizDesc, setBizDesc] = useState('');
  const [bizTags, setBizTags] = useState('');
  const [bizWebsite, setBizWebsite] = useState('');
  const [bizInstagram, setBizInstagram] = useState('');

  const categories = [
    "Design Services",
    "Video & Editing",
    "Tech Services",
    "Photography",
    "Hostel Food & Delivery",
    "Campus Merch & Print"
  ];

  const handleRegisterBusiness = (e) => {
    e.preventDefault();
    if (!bizName || !bizDesc) {
      alert("Please fill in business name and description.");
      return;
    }

    const tagsArray = bizTags 
      ? bizTags.split(',').map(t => t.trim()).filter(Boolean)
      : ["Freelance", "VESIT"];

    // Default banner image presets based on category
    let bannerUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
    if (bizCategory === "Photography") {
      bannerUrl = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80";
    } else if (bizCategory === "Video & Editing") {
      bannerUrl = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80";
    } else if (bizCategory === "Tech Services") {
      bannerUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80";
    } else if (bizCategory === "Hostel Food & Delivery") {
      bannerUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80";
    }

    onAddBusiness({
      name: bizName,
      category: bizCategory,
      description: bizDesc,
      tags: tagsArray,
      bannerUrl,
      links: {
        website: bizWebsite,
        instagram: bizInstagram
      }
    });

    // Reset
    setBizName('');
    setBizDesc('');
    setBizTags('');
    setBizWebsite('');
    setBizInstagram('');
    setIsRegistering(false);
  };

  const filteredBiz = businesses.filter(biz => {
    const matchesSearch = 
      biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      biz.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory ? biz.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 w-full text-left">
      
      {/* Header Banner */}
      <div className="mb-8 border-b border-sand pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-black text-dark tracking-tight mb-2">
            Student Businesses & Services
          </h1>
          <p className="text-sm text-muted">
            Support your peers! Explore design consulting, campus baked goods, photographers, and dev agencies run by VESITians.
          </p>
        </div>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="px-5 py-3 bg-olive text-surface hover:bg-olive/90 text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-150 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>List My Venture</span>
        </button>
      </div>

      {/* Listing Form */}
      {isRegistering && (
        <div className="bg-[#FFFCF5] border border-sand p-6 mb-8 animate-slideDown">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-dark flex items-center gap-2">
              <Store className="w-5 h-5 text-terracotta" />
              <span>List Your Freelance Service or Micro-Business</span>
            </h3>
            <button 
              onClick={() => setIsRegistering(false)} 
              className="text-xs font-semibold text-muted hover:text-dark"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleRegisterBusiness} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Business / Agency / Service Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Chembur Crusts Bakeries, LogoCraft Designs"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none animate-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Venture Category
                </label>
                <select
                  value={bizCategory}
                  onChange={(e) => setBizCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                Service Description & Value Proposition
              </label>
              <textarea 
                rows="3" 
                placeholder="What services do you offer? Mention pricing details, turnaround times, and delivery options for hostel students."
                value={bizDesc}
                onChange={(e) => setBizDesc(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Tags (comma separated)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Logos, Figma, Branding"
                  value={bizTags}
                  onChange={(e) => setBizTags(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Website / Link (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. logocraft.design"
                  value={bizWebsite}
                  onChange={(e) => setBizWebsite(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-dark uppercase tracking-wider mb-1.5">
                  Instagram Handle (Optional)
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. @logocraft"
                  value={bizInstagram}
                  onChange={(e) => setBizInstagram(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-sand/40">
              <button 
                type="button" 
                onClick={() => setIsRegistering(false)}
                className="px-4 py-2 border border-sand text-muted text-xs font-semibold hover:text-dark"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-olive text-surface text-xs font-bold hover:bg-olive/90 transition-colors"
              >
                Register Venture
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Filtering */}
      <div className="bg-surface border border-sand p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by keywords, owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-bg-ves border border-sand focus:border-olive focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-56 px-3 py-2 text-xs bg-bg-ves border border-sand focus:border-olive focus:outline-none text-dark cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Clear Triggers */}
        {(searchTerm || selectedCategory) && (
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}
            className="text-xs font-bold text-terracotta hover:text-dark transition-colors shrink-0"
          >
            Reset Filters
          </button>
        )}

      </div>

      {/* Grid of Results */}
      {filteredBiz.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBiz.map(biz => (
            <BusinessCard
              key={biz.id}
              business={biz}
              onMessageOwner={(ownerId) => navigate(`/messages?chatWith=${ownerId}`)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-sand p-16 text-center text-muted text-sm">
          No student businesses match this category.
        </div>
      )}

    </div>
  );
}
