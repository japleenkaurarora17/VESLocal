import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useUser } from './context/UserContext';
import { studentsAPI, opportunitiesAPI } from './services/api';

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
  initialStudents,
  initialOpportunities,
  initialBusinesses,
  initialNotifications,
  initialMessages,
  initialCollaborations
} from './data/mockData';

export default function App() {
  // Session State from Context API (Experiment 3)
  const {
    isLoggedIn,
    currentUser,
    setCurrentUser,
    login,
    register: registerContext,
    logout,
    connectedStudentIds,
    handleConnect: toggleConnectContext
  } = useUser();

  const [students, setStudents] = useState(initialStudents);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [messages, setMessages] = useState(initialMessages);
  const [collaborations, setCollaborations] = useState(initialCollaborations);

  // Sync with backend API when reachable (Experiment 4 / Integration)
  useEffect(() => {
    let isMounted = true;
    studentsAPI.getAll()
      .then(res => {
        if (isMounted && res?.data?.length > 0) {
          setStudents(res.data);
        }
      })
      .catch(() => {
        // Retain initial mock students in offline demo mode
      });

    opportunitiesAPI.getAll()
      .then(res => {
        if (isMounted && res?.data?.length > 0) {
          setOpportunities(res.data);
        }
      })
      .catch(() => {
        // Retain initial mock opportunities in offline demo mode
      });

    return () => { isMounted = false; };
  }, []);

  const handleRegister = (registerData, token = null) => {
    const newProfile = registerContext(registerData, token);
    setStudents(prev => [...prev, newProfile]);
  };

  // Interactions Helper Methods

  // Toggle "I'm Interested" state on an opportunity
  const handleToggleInterest = (oppId) => {
    setOpportunities(prev =>
      prev.map(opp => {
        const id = opp.id || opp._id;
        if (id === oppId) {
          const currentUserId = currentUser.id || currentUser._id;
          const alreadyInterested = opp.interestedStudents?.includes(currentUserId);
          const updatedInterested = alreadyInterested
            ? opp.interestedStudents.filter(sid => sid !== currentUserId)
            : [...(opp.interestedStudents || []), currentUserId];

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
      authorId: currentUser.id || currentUser._id,
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
      ownerId: currentUser.id || currentUser._id,
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
    toggleConnectContext(studentId);
    const isConnected = connectedStudentIds.includes(studentId);

    if (!isConnected) {
      const targetStudent = students.find(s => s.id === studentId || s._id === studentId);
      if (targetStudent) {
        // Create matching notification
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
            studentId: targetStudent.id || targetStudent._id,
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
    setOpportunities(prev => prev.filter(opp => (opp.id || opp._id) !== oppId));
  };

  const handleFlagBusiness = () => {
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
                  : <Register register={handleRegister} />
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

            {/* Mod portal - admin role required */}
            <Route
              path="/admin"
              element={
                isLoggedIn && currentUser?.role === 'admin' ? (
                  <AdminDashboard
                    students={students}
                    opportunities={opportunities}
                    businesses={businesses}
                    onRemoveOpportunity={handleRemoveOpportunity}
                    onFlagBusiness={handleFlagBusiness}
                  />
                ) : isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
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
