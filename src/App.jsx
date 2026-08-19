import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Opportunities from './pages/Opportunities';
import Businesses from './pages/Businesses';
import Profile from './pages/Profile';
import Collaboration from './pages/Collaboration';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import AdminDashboard from './pages/AdminDashboard';

// Mock Data
import {
  initialCurrentUser,
  initialStudents,
  initialOpportunities,
  initialBusinesses,
  initialNotifications,
  initialMessages,
  initialCollaborations
} from './data/mockData';

export default function App() {
  // Session State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [students, setStudents] = useState(initialStudents);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [messages, setMessages] = useState(initialMessages);
  const [collaborations, setCollaborations] = useState(initialCollaborations);
  
  // List of student IDs the user is connected to (initially Rahul Mehta and Sakshi Patil)
  const [connectedStudentIds, setConnectedStudentIds] = useState(["student-2", "student-3"]);

  // Authentication Helpers
  const login = (email) => {
    setIsLoggedIn(true);
    // If logging in as the demo user Japleen Kaur
    if (email.toLowerCase() === 'japleen.kaur@ves.ac.in') {
      setCurrentUser(initialCurrentUser);
    } else {
      // Create a mock user session based on email input
      const extractedName = email.split('@')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setCurrentUser({
        id: `student-${Date.now()}`,
        name: extractedName || "VESIT Student",
        email: email,
        department: "Information Technology",
        year: "Third Year",
        skills: ["React", "UI/UX", "JavaScript"],
        bio: "VESIT undergraduate student. Excited to discover local collaborations and build cool projects!",
        connectCount: 5,
        avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${extractedName || "User"}&backgroundColor=b6e3f4`
      });
    }
  };

  const register = (registerData) => {
    setIsLoggedIn(true);
    const newStudentId = `student-${Date.now()}`;
    const newProfile = {
      id: newStudentId,
      name: registerData.name,
      email: registerData.email,
      department: registerData.department,
      year: registerData.year,
      skills: ["React", "Figma"],
      bio: "Freshly registered student on VESLocal. Let's connect!",
      connectCount: 0,
      avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${registerData.name}&backgroundColor=ffd5dc`
    };

    // Update students list
    setStudents(prev => [...prev, newProfile]);
    setCurrentUser(newProfile);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(initialCurrentUser);
    setConnectedStudentIds(["student-2", "student-3"]);
  };

  // Interactions Helper Methods
  
  // Toggle "I'm Interested" state on an opportunity
  const handleToggleInterest = (oppId) => {
    setOpportunities(prev => 
      prev.map(opp => {
        if (opp.id === oppId) {
          const alreadyInterested = opp.interestedStudents.includes(currentUser.id);
          const updatedInterested = alreadyInterested
            ? opp.interestedStudents.filter(id => id !== currentUser.id)
            : [...opp.interestedStudents, currentUser.id];

          // Post a notification if they expressed interest
          if (!alreadyInterested) {
            const newNotif = {
              id: `notif-${Date.now()}`,
              text: `You expressed interest in '${opp.title}' posted by ${opp.authorName}.`,
              time: "Just now",
              read: false,
              type: "interest"
            };
            setNotifications(n => [newNotif, ...n]);
          }

          return {
            ...opp,
            interestedStudents: updatedInterested
          };
        }
        return opp;
      })
    );
  };

  // Create a new opportunity notice
  const handleAddOpportunity = (oppData) => {
    const newOpp = {
      id: `opp-${Date.now()}`,
      title: oppData.title,
      description: oppData.description,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatarUrl,
      skillsNeeded: oppData.skillsNeeded,
      type: oppData.type,
      date: new Date().toISOString().split('T')[0],
      status: "Open",
      interestedStudents: []
    };
    setOpportunities(prev => [newOpp, ...prev]);

    // Push notification log
    const newNotif = {
      id: `notif-${Date.now()}`,
      text: `You successfully broadcasted your need: '${oppData.title}'.`,
      time: "Just now",
      read: false,
      type: "match"
    };
    setNotifications(n => [newNotif, ...n]);
  };

  // Create a student micro-business listing
  const handleAddBusiness = (bizData) => {
    const newBiz = {
      id: `biz-${Date.now()}`,
      name: bizData.name,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
      category: bizData.category,
      description: bizData.description,
      rating: 5.0,
      reviewsCount: 0,
      tags: bizData.tags,
      bannerUrl: bizData.bannerUrl,
      links: bizData.links
    };
    setBusinesses(prev => [newBiz, ...prev]);

    // Push notification log
    const newNotif = {
      id: `notif-${Date.now()}`,
      text: `Your venture '${bizData.name}' has been successfully listed.`,
      time: "Just now",
      read: false,
      type: "review"
    };
    setNotifications(n => [newNotif, ...n]);
  };

  // Connect or disconnect from student profile
  const handleConnect = (studentId) => {
    const isConnected = connectedStudentIds.includes(studentId);
    let updated;
    if (isConnected) {
      updated = connectedStudentIds.filter(id => id !== studentId);
    } else {
      updated = [...connectedStudentIds, studentId];
      
      const targetStudent = students.find(s => s.id === studentId);
      if (targetStudent) {
        // Create matching mock notification
        const newNotif = {
          id: `notif-${Date.now()}`,
          text: `You are now connected with ${targetStudent.name} (${targetStudent.department}).`,
          time: "Just now",
          read: false,
          type: "connect"
        };
        setNotifications(n => [newNotif, ...n]);

        // Start message thread if it doesn't exist
        const threadExists = messages.some(m => m.studentId === studentId);
        if (!threadExists) {
          const newThread = {
            id: `chat-${Date.now()}`,
            studentId: targetStudent.id,
            studentName: targetStudent.name,
            avatarUrl: targetStudent.avatarUrl,
            department: targetStudent.department,
            lastMessage: "Connection established. Say hi!",
            lastTimestamp: "Just now",
            unread: false,
            conversation: []
          };
          setMessages(prev => [newThread, ...prev]);
        }
      }
    }
    setConnectedStudentIds(updated);
  };

  // Direct chat send handler
  const handleSendMessage = (chatId, messageObj) => {
    setMessages(prev => 
      prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            lastMessage: messageObj.text,
            lastTimestamp: messageObj.time,
            conversation: [...chat.conversation, messageObj]
          };
        }
        return chat;
      })
    );
  };

  // Create a team collaboration roster
  const handleAddCollaboration = (collabData) => {
    const newCollab = {
      id: `collab-${Date.now()}`,
      name: collabData.name,
      members: collabData.members,
      description: collabData.description,
      status: collabData.status,
      meetingTime: collabData.meetingTime
    };
    setCollaborations(prev => [newCollab, ...prev]);
  };

  // Moderator actions
  const handleRemoveOpportunity = (oppId) => {
    setOpportunities(prev => prev.filter(opp => opp.id !== oppId));
  };

  const handleFlagBusiness = (bizId) => {
    alert("Venture flagged. A review warning has been sent to the listing owner.");
  };

  // Notification status controls
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-bg-ves text-dark">
        {/* Navigation header */}
        <Navbar 
          isLoggedIn={isLoggedIn} 
          currentUser={currentUser} 
          logout={logout}
          notifications={notifications}
          messages={messages}
        />

        {/* Dynamic Route Body */}
        <main className="flex-grow flex flex-col">
          <Routes>
            {/* Landing page */}
            <Route 
              path="/" 
              element={
                <Home 
                  opportunities={opportunities} 
                  businesses={businesses} 
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                />
              } 
            />

            {/* Account authentication */}
            <Route 
              path="/login" 
              element={
                isLoggedIn 
                  ? <Navigate to="/dashboard" replace /> 
                  : <Login login={login} />
              } 
            />
            
            <Route 
              path="/register" 
              element={
                isLoggedIn 
                  ? <Navigate to="/dashboard" replace /> 
                  : <Register register={register} />
              } 
            />

            {/* Authenticated dashboard */}
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? (
                  <Dashboard
                    currentUser={currentUser}
                    opportunities={opportunities}
                    businesses={businesses}
                    collaborations={collaborations}
                    notifications={notifications}
                    students={students}
                    onToggleInterest={handleToggleInterest}
                    onAddOpportunity={handleAddOpportunity}
                    onConnect={handleConnect}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Students directory */}
            <Route 
              path="/discover" 
              element={
                isLoggedIn ? (
                  <Discover 
                    students={students} 
                    currentUser={currentUser}
                    connectedStudentIds={connectedStudentIds}
                    onConnect={handleConnect}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Opportunities catalog */}
            <Route 
              path="/opportunities" 
              element={
                isLoggedIn ? (
                  <Opportunities 
                    opportunities={opportunities} 
                    currentUser={currentUser}
                    onToggleInterest={handleToggleInterest}
                    onAddOpportunity={handleAddOpportunity}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Startups market */}
            <Route 
              path="/businesses" 
              element={
                isLoggedIn ? (
                  <Businesses 
                    businesses={businesses} 
                    currentUser={currentUser}
                    onAddBusiness={handleAddBusiness}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Student portfolio profiles */}
            <Route 
              path="/profile/:id" 
              element={
                isLoggedIn ? (
                  <Profile 
                    students={students} 
                    currentUser={currentUser}
                    onUpdateCurrentUser={setCurrentUser}
                    connectedStudentIds={connectedStudentIds}
                    onConnect={handleConnect}
                    businesses={businesses}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Teams panel */}
            <Route 
              path="/teams" 
              element={
                isLoggedIn ? (
                  <Collaboration 
                    collaborations={collaborations}
                    currentUser={currentUser}
                    onAddCollaboration={handleAddCollaboration}
                    students={students}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Notification logger */}
            <Route 
              path="/notifications" 
              element={
                isLoggedIn ? (
                  <Notifications 
                    notifications={notifications} 
                    onMarkAllRead={handleMarkAllRead}
                    onMarkRead={handleMarkRead}
                    currentUser={currentUser}
                    collaborations={collaborations}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* DMs window */}
            <Route 
              path="/messages" 
              element={
                isLoggedIn ? (
                  <Messages 
                    messages={messages} 
                    currentUser={currentUser}
                    onSendMessage={handleSendMessage}
                    students={students}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Mod portal */}
            <Route 
              path="/admin" 
              element={
                isLoggedIn ? (
                  <AdminDashboard 
                    students={students} 
                    opportunities={opportunities} 
                    businesses={businesses}
                    onRemoveOpportunity={handleRemoveOpportunity}
                    onFlagBusiness={handleFlagBusiness}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
