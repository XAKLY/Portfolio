import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Video, Search, Bell, Calendar as CalendarIcon, Home, BarChart3, Settings, Menu, X, Check, AlertTriangle, Eye, Edit, Trash2, MapPin, Star } from 'lucide-react';

function App() {
  const HOUR_HEIGHT = 64; // match the cell class h-16 (4rem = 64px) - used for consistent sizing/positioning

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Weekly');
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [pendingMove, setPendingMove] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '1',
    type: 'meeting'
  });

  // Nouveau état pour le modal "+ more"
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [moreModalEvents, setMoreModalEvents] = useState([]);
  const [moreModalTitle, setMoreModalTitle] = useState('');

  const dragCounter = useRef(0);

  // Sample participant NAMES (we'll render colored letter avatars like Gmail)
  const participants = [
    'Alice Johnson',
    'Bob Smith',
    'Caroline Lee',
    'David Kim',
    'Eve Martinez',
    'Frank Zhao'
  ];

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'
  ];

  // -- design des types d'événements
  // color (hex) sera utilisé pour le texte ET pour la bordure gauche
 const eventTypes = {
  meeting: { 
    color: '#F97316',      // même couleur que text-orange-500
    pillBgClass: 'bg-orange-100',
    textClass: 'text-orange-500'
  },
  personal: { 
    color: '#3B82F6',      // même couleur que text-blue-500
    pillBgClass: 'bg-blue-100',
    textClass: 'text-blue-500'
  },
  work: { 
    color: '#10B981',      // même couleur que text-green-500
    pillBgClass: 'bg-green-100',
    textClass: 'text-green-500'
  },
  other: { 
    color: '#8B5CF6',      // même couleur que text-purple-500
    pillBgClass: 'bg-purple-100',
    textClass: 'text-purple-500'
  }
};


  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: CalendarIcon, label: 'Calendar', active: true },
    { icon: Clock, label: 'Event', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
  ];

  // Helper: deterministic color from string (so same name -> same color)
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // convert to 32bit integer
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += (`00${value.toString(16)}`).slice(-2);
    }
    return color;
  };

  const getInitial = (name) => {
    if (!name) return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  // Fonction pour obtenir les jours selon la vue
  const getViewDays = (date, viewType) => {
    const days = [];
    const today = new Date();

    if (viewType === 'Daily') {
      const currentDay = new Date(date);
      const isToday = currentDay.toDateString() === today.toDateString();
      
      days.push({
        date: currentDay.getDate(),
        name: currentDay.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase().substring(0, 3),
        fullName: currentDay.toLocaleDateString('en-US', { weekday: 'long' }),
        fullDate: new Date(currentDay),
        isToday,
        dateString: currentDay.toDateString()
      });
    } else if (viewType === 'Weekly') {
      const startOfWeek = new Date(date);
      const day = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
      startOfWeek.setDate(diff);

      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        
        const isToday = currentDay.toDateString() === today.toDateString();
        
        days.push({
          date: currentDay.getDate(),
          name: currentDay.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase().substring(0, 3),
          fullName: currentDay.toLocaleDateString('en-US', { weekday: 'long' }),
          fullDate: new Date(currentDay),
          isToday,
          dateString: currentDay.toDateString()
        });
      }
    } else if (viewType === 'Monthly') {
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      // Commencer par le lundi de la première semaine
      const startDate = new Date(startOfMonth);
      const startDay = startDate.getDay();
      const diff = startDate.getDate() - startDay + (startDay === 0 ? -6 : 1);
      startDate.setDate(diff);

      // Générer 42 jours (6 semaines)
      for (let i = 0; i < 42; i++) {
        const currentDay = new Date(startDate);
        currentDay.setDate(startDate.getDate() + i);
        
        const isToday = currentDay.toDateString() === today.toDateString();
        const isCurrentMonth = currentDay.getMonth() === date.getMonth();
        
        days.push({
          date: currentDay.getDate(),
          name: currentDay.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase().substring(0, 3),
          fullName: currentDay.toLocaleDateString('en-US', { weekday: 'long' }),
          fullDate: new Date(currentDay),
          isToday,
          isCurrentMonth,
          dateString: currentDay.toDateString()
        });
      }
    } else if (viewType === 'Yearly') {
      // Pour la vue annuelle, on affiche les 12 mois
      for (let i = 0; i < 12; i++) {
        const monthDate = new Date(date.getFullYear(), i, 1);
        days.push({
          date: i + 1,
          name: months[i].substring(0, 3),
          fullName: months[i],
          fullDate: monthDate,
          isToday: monthDate.getMonth() === today.getMonth() && monthDate.getFullYear() === today.getFullYear(),
          dateString: monthDate.toDateString()
        });
      }
    }
    
    return days;
  };

  const viewDays = getViewDays(currentDate, view);

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    
    switch (view) {
      case 'Daily':
        newDate.setDate(newDate.getDate() + direction);
        break;
      case 'Weekly':
        newDate.setDate(newDate.getDate() + (direction * 7));
        break;
      case 'Monthly':
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case 'Yearly':
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
    }
    
    setCurrentDate(newDate);
  };

  const openModalWithDateTime = (dayIndex, timeIndex) => {
    const selectedDay = viewDays[dayIndex];
    if (!selectedDay) return;

    setFormData(prev => ({
      ...prev,
      date: selectedDay.dateString,
      time: timeSlots[timeIndex],
      title: '',
      description: '',
      duration: '1',
      type: 'meeting'
    }));
    setIsModalOpen(true);
  };

  const handleCellClick = (dayIndex, timeIndex) => {
    if (view === 'Monthly' || view === 'Yearly') return;
    
    const selectedDay = viewDays[dayIndex];
    if (!selectedDay) return;

    // On ouvre le modal même si déjà des événements (permet d'ajouter)
    openModalWithDateTime(dayIndex, timeIndex);
  };

  const handleEventDoubleClick = (event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) return;

    const timeIndex = timeSlots.indexOf(formData.time);
    if (timeIndex < 0) return;

    const eventDate = new Date(formData.date);

    // merge the event type colors/classes
    const typeProps = eventTypes[formData.type] || eventTypes.other;
    
    const newEvent = {
      id: Date.now(),
      title: formData.title,
      time: formData.time,
      dateString: formData.date,
      eventDate: eventDate,
      timeIndex,
      duration: parseInt(formData.duration),
      // design props: color (hex) used for text AND for left border
      color: typeProps.color,
      pillBgClass: typeProps.pillBgClass,
      textClass: typeProps.textClass,
      // choose a random subset of participant NAMES
      participants: participants.slice(0, Math.floor(Math.random() * participants.length) + 1),
      description: formData.description,
      type: formData.type
    };

    setEvents(prev => [...prev, newEvent]);
    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '1',
      type: 'meeting'
    });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDragStart = (e, event) => {
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, dayIndex, timeIndex) => {
    e.preventDefault();
    setDragOverCell({ dayIndex, timeIndex });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragOverCell(null);
    }
  };

  const handleDrop = (e, dayIndex, timeIndex) => {
    e.preventDefault();
    setDragOverCell(null);

    if (!draggedEvent || view === 'Monthly' || view === 'Yearly') {
      setDraggedEvent(null);
      return;
    }

    const selectedDay = viewDays[dayIndex];
    if (!selectedDay) {
      setDraggedEvent(null);
      return;
    }

    // Allow moving even if target slot already has events (stacking)
    if (draggedEvent.dateString === selectedDay.dateString && draggedEvent.timeIndex === timeIndex) {
      setDraggedEvent(null);
      return;
    }

    const oldDay = new Date(draggedEvent.dateString);
    
    setPendingMove({
      event: draggedEvent,
      newDateString: selectedDay.dateString,
      newTimeIndex: timeIndex,
      oldDay: oldDay.toLocaleDateString('en-US', { weekday: 'long' }),
      newDay: selectedDay.fullName,
      oldTime: timeSlots[draggedEvent.timeIndex],
      newTime: timeSlots[timeIndex]
    });
    setIsConfirmModalOpen(true);
  };

  const confirmMove = () => {
    if (!pendingMove) return;

    setEvents(prev => prev.map(event => 
      event.id === pendingMove.event.id 
        ? { 
            ...event, 
            dateString: pendingMove.newDateString,
            eventDate: new Date(pendingMove.newDateString),
            timeIndex: pendingMove.newTimeIndex, 
            time: pendingMove.newTime 
          }
        : event
    ));

    setIsConfirmModalOpen(false);
    setPendingMove(null);
    setDraggedEvent(null);
  };

  const cancelMove = () => {
    setIsConfirmModalOpen(false);
    setPendingMove(null);
    setDraggedEvent(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
  };

  const isEventSpanning = (event, dayIndex, timeIndex) => {
    const dayDate = viewDays[dayIndex];
    if (!dayDate) return false;
    
    return event.dateString === dayDate.dateString && 
           timeIndex >= event.timeIndex && 
           timeIndex < event.timeIndex + event.duration;
  };

  // Return events that start exactly at this timeIndex (useful for stacked small pills)
  const getEventsAtPosition = (dayIndex, timeIndex) => {
    const dayDate = viewDays[dayIndex];
    if (!dayDate) return [];
    
    return events.filter(event => 
      event.dateString === dayDate.dateString && 
      event.timeIndex === timeIndex
    );
  };

  // Return spanning events that cover this cell (duration > 1) and start at this timeIndex
  const getSpanningEventAtPosition = (dayIndex, timeIndex) => {
    const dayDate = viewDays[dayIndex];
    if (!dayDate) return null;
    
    return events.find(event => 
      event.dateString === dayDate.dateString && 
      event.timeIndex === timeIndex && 
      event.duration > 1
    );
  };

  const getEventsForDay = (dayIndex) => {
    const dayDate = viewDays[dayIndex];
    if (!dayDate) return [];
    
    return events.filter(event => event.dateString === dayDate.dateString);
  };

  // Ouvre le modal "+ more" avec la liste des événements passés
  const openMoreModal = (eventsList, title) => {
    setMoreModalEvents(eventsList);
    setMoreModalTitle(title);
    setIsMoreModalOpen(true);
  };

  const renderCalendarGrid = () => {
    if (view === 'Monthly') {
      return (
        <div className="p-6">
          <div className="grid grid-cols-7 gap-3 bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* En-têtes des jours */}
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <div key={day} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center text-sm font-bold text-gray-600 border-b-2 border-gray-200">
                {day}
              </div>
            ))}
            
            {/* Grille mensuelle */}
            {viewDays.map((day, index) => {
              const dayEvents = getEventsForDay(index);
              return (
                <div 
                  key={index} 
                  className={`bg-white p-3 min-h-[120px] border border-gray-100 transition-all duration-200 hover:bg-gray-50 overflow-hidden ${
                    day.isCurrentMonth ? '' : 'bg-gray-50 text-gray-400'
                  } ${day.isToday ? 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className={`text-sm font-bold ${day.isToday ? 'bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg' : ''}`}>
                      {day.date}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {/* On affiche des "pills" petits, with left border color and text in same color bold */}
                    {dayEvents.slice(0, 3).map((event) => (
                      <div 
                        key={event.id}
                        onDoubleClick={() => handleEventDoubleClick(event)}
                        className={`text-xs px-2 py-1 truncate cursor-pointer shadow-sm transition-all duration-150 flex items-center ${event.pillBgClass || 'bg-gray-100'}`}
                        title={`${event.time} — ${event.title}`}
                        style={{ borderLeft: `4px solid ${event.color}` }}
                      >
                        {/* dot removed */}
                        <div className="flex-1">
                          <div className="truncate" style={{ color: event.color, fontWeight: 700 }}>{event.title}</div>
                          <div className="opacity-75 text-[11px]">{event.time}</div>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <button
                        onClick={() => openMoreModal(dayEvents, `${day.fullDate.toDateString()}`)}
                        className="text-xs text-gray-600 font-medium px-2 py-1 bg-white border border-gray-100 rounded-lg hover:bg-gray-50"
                      >
                        +{dayEvents.length - 3} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (view === 'Yearly') {
      return (
        <div className="grid grid-cols-3 gap-8 p-8">
          {viewDays.map((month, index) => {
            const monthEvents = events.filter(event => {
              const eventDate = new Date(event.dateString);
              return eventDate.getMonth() === index && eventDate.getFullYear() === currentDate.getFullYear();
            });
            
            return (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`text-xl font-bold mb-4 ${month.isToday ? 'text-orange-500' : 'text-gray-900'}`}>
                  {month.fullName}
                </div>
                <div className="space-y-3">
                  {monthEvents.slice(0, 4).map((event) => (
                    <div 
                      key={event.id}
                      className={`text-sm p-3 rounded-xl ${event.pillBgClass || 'bg-gray-100'} cursor-pointer shadow-sm hover:shadow-md transition-all duration-200`}
                      onDoubleClick={() => handleEventDoubleClick(event)}
                      style={{ borderLeft: `4px solid ${event.color}` }}
                    >
                      <div className="font-semibold truncate" style={{ color: event.color }}>{event.title}</div>
                      <div className="text-xs opacity-75 mt-1">{event.time}</div>
                    </div>
                  ))}
                  {monthEvents.length > 4 && (
                    <button
                      onClick={() => openMoreModal(monthEvents, `${month.fullName} ${currentDate.getFullYear()}`)}
                      className="text-sm text-gray-500 font-medium text-center py-2 bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                      +{monthEvents.length - 4} more events
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Vue Daily et Weekly - Grille fixe et moderne
    return (
      <div className="flex flex-col h-full">
        {/* En-tête de la semaine/jour moderne */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex">
            {/* Colonne vide pour l'alignement avec les heures */}
            <div className="w-20 flex-shrink-0 p-4 bg-gray-50 border-r border-gray-200"></div>
            
            {/* Jours de la semaine */}
            <div className="flex flex-1">
              {viewDays.map((day, index) => (
                <div key={index} className="flex-1 p-4 text-center border-r border-gray-200 last:border-r-0">
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">{day.name}</span>
                    <div className={`text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full ${day.isToday ? 'bg-orange-500 text-white' : 'text-gray-700'}`}>
                      {day.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corps du calendrier */}
        <div className="flex-1 flex">
          {/* Colonne des heures */}
          <div className="w-20 flex-shrink-0 bg-gray-50 border-r border-gray-200">
            {timeSlots.map((time, index) => (
              <div key={index} className="h-16 px-2 py-2 text-xs font-medium text-gray-600 border-b border-gray-100 flex items-start pt-2">
                {time}
              </div>
            ))}
          </div>

          {/* Grille des jours */}
          <div className="flex-1">
            <div className="flex">
              {viewDays.map((day, dayIndex) => (
                // Make the day column relative and allow overflow-visible so multi-hour blocks can extend beyond the start cell properly
                <div key={dayIndex} className="flex-1 border-r border-gray-200 last:border-r-0 relative overflow-visible">
                  {timeSlots.map((time, timeIndex) => {
                    // Collect events starting at this slot (can include duration >1)
                    const slotEvents = getEventsAtPosition(dayIndex, timeIndex);
                    // Spanning event (duration > 1) starting at this slot
                    const spanningEvent = getSpanningEventAtPosition(dayIndex, timeIndex);

                    return (
                      <div 
                        key={timeIndex} 
                        className={`h-16 border-b border-gray-100 relative cursor-pointer ${
                          dragOverCell?.dayIndex === dayIndex && dragOverCell?.timeIndex === timeIndex
                            ? 'bg-orange-100' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleCellClick(dayIndex, timeIndex)}
                        onDragOver={handleDragOver}
                        onDragEnter={(e) => handleDragEnter(e, dayIndex, timeIndex)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, dayIndex, timeIndex)}
                      >
                        {/* Spanning event (large block) */}
                        {spanningEvent && (
                          <div 
                            draggable
                            onDragStart={(e) => handleDragStart(e, spanningEvent)}
                            onDoubleClick={() => handleEventDoubleClick(spanningEvent)}
                            className={`absolute left-1 right-1 p-2 text-xs cursor-move select-none ${spanningEvent.pillBgClass || ''}`}
                            style={{ 
                              // Use the HOUR_HEIGHT constant so heights align with the grid (prevents overflow/incorrect sizing)
                              height: `${spanningEvent.duration * HOUR_HEIGHT - 8}px`,
                              top: '4px', // small offset from top of the starting cell
                              zIndex: 10,
                              borderLeft: `4px solid ${spanningEvent.color}`,
                              boxSizing: 'border-box'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="font-semibold truncate" style={{ color: spanningEvent.color }}>{spanningEvent.title}</div>
                            <div className="text-xs opacity-90">{spanningEvent.time}</div>
                          </div>
                        )}

                        {/* Small stacked pills for events in same slot (max 2 visible) */}
                        {slotEvents.length > 0 && (
                          // reduce z so the sticky header (z-40) always stays above these pills
                          <div className="absolute left-1 right-1 top-1 flex flex-col gap-1 z-10">
                            {slotEvents.slice(0, 2).map((ev, idx) => (
                              <div
                                key={ev.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, ev)}
                                onDoubleClick={() => handleEventDoubleClick(ev)}
                                className={`flex items-center gap-2 text-[12px] px-2 py-1 cursor-move select-none ${ev.pillBgClass || 'bg-gray-100'}`}
                                style={{
                                  height: 22,
                                  alignItems: 'center',
                                  borderLeft: `4px solid ${ev.color}`,
                                  boxSizing: 'border-box'
                                }}
                                onClick={(e) => e.stopPropagation()}
                                title={`${ev.time} — ${ev.title}`}
                              >
                                {/* dot removed */}
                                <div className="truncate" style={{ color: ev.color, fontWeight: 700 }}>{ev.title}</div>
                              </div>
                            ))}

                            {slotEvents.length > 2 && (
                              <button
                                className="text-[12px] text-gray-600 px-2 py-0.5 bg-white rounded-md hover:bg-gray-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const day = viewDays[dayIndex];
                                  openMoreModal(slotEvents, `${day.fullDate.toDateString()} • ${time}`);
                                }}
                              >
                                +{slotEvents.length - 2} more
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg text-gray-900">CalendarPro</span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="flex-1 px-4 py-6">
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-4">Main Menu</h3>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    item.active
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-orange-50'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Schedule Management Card */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Manage Schedule</h3>
            <p className="text-xs text-gray-600 mb-4">
              Create and organize events with our calendar system.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Create Event
            </button>
          </div>

          <div className="mt-8 text-xs text-gray-500 px-2">
            <p>Calendar Admin</p>
            <p>© 2024 CalendarPro</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 w-64"
                />
              </div>

              {/* Notifications */}
              <div className="flex items-center space-x-3">
                <button className="relative p-2 hover:bg-orange-50 rounded-lg">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                    {events.length}
                  </span>
                </button>
                <button className="relative p-2 hover:bg-orange-50 rounded-lg">
                  <Settings className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-orange-200"
                />
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">EN</span>
                  <ChevronRight className="h-3 w-3 text-gray-500 rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => navigateDate(-1)}
                  className="p-2 hover:bg-orange-50 rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                </button>
                <h2 className="text-lg font-bold text-gray-900">
                  {view === 'Yearly' 
                    ? currentDate.getFullYear()
                    : `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  }
                </h2>
                <button 
                  onClick={() => navigateDate(1)}
                  className="p-2 hover:bg-orange-50 rounded-lg"
                >
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((viewOption) => (
                  <button 
                    key={viewOption}
                    onClick={() => setView(viewOption)}
                    className={`px-3 py-1.5 rounded-md text-sm ${view === viewOption ? 'bg-orange-500 text-white' : 'text-gray-600 hover:text-gray-900 hover:bg-white'}`}
                  >
                    {viewOption}
                  </button>
                ))}
              </div>

              {/* New Schedule Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Schedule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-auto bg-white">
          {renderCalendarGrid()}
        </div>
      </div>

      {/* Create Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg m-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-orange-500 text-white rounded-t-2xl">
              <h2 className="text-xl font-bold">Create New Event</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter event title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white resize-none text-gray-900 placeholder-gray-500"
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value ? new Date(e.target.value).toDateString() : '' }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                  <div className="relative">
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white appearance-none cursor-pointer text-gray-900"
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <div className="relative">
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white appearance-none cursor-pointer text-gray-900"
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white appearance-none cursor-pointer text-gray-900"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="personal">Personal</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-semibold"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {isDetailModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md m-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center`} style={{ backgroundColor: selectedEvent.pillBgClass ? undefined : '#fff' }}>
                  <Eye className={`h-6 w-6`} style={{ color: selectedEvent.color }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Event Details</h2>
                  <p className="text-sm text-gray-500">Double-click to view details</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Title</label>
                  <p className="text-lg font-semibold" style={{ color: selectedEvent.color }}>{selectedEvent.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Description</label>
                  <p className="text-gray-700">{selectedEvent.description || 'No description provided'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Date</label>
                    <p className="text-gray-900 font-medium">{new Date(selectedEvent.dateString).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Time</label>
                    <p className="text-gray-900 font-medium">{selectedEvent.time}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Duration</label>
                    <p className="text-gray-900 font-medium">{selectedEvent.duration} hour(s)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-1">Type</label>
                    <p className="text-gray-900 font-medium capitalize">{selectedEvent.type}</p>
                  </div>
                </div>

                {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2">Participants</label>
                    <div className="flex -space-x-2">
                      {selectedEvent.participants.map((participant, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-3 border-white flex items-center justify-center text-sm font-medium text-white"
                          style={{ backgroundColor: stringToColor(participant) }}
                          title={participant}
                        >
                          {getInitial(participant)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold flex items-center justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Close</span>
                </button>
                <button
                  onClick={() => deleteEvent(selectedEvent.id)}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 font-semibold flex items-center justify-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Move Confirmation Modal */}
      {isConfirmModalOpen && pendingMove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md m-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Confirm Event Move</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to move "<span className="font-semibold text-orange-600">{pendingMove.event.title}</span>"?
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">From:</span>
                    <span className="font-semibold text-gray-900">
                      {pendingMove.oldDay} at {pendingMove.oldTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">To:</span>
                    <span className="font-semibold text-orange-600">
                      {pendingMove.newDay} at {pendingMove.newTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={cancelMove}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmMove}
                  className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 font-semibold flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Confirm Move</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "+ more" Modal */}
      {isMoreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl w-full max-w-lg m-4 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{moreModalTitle}</h3>
                <p className="text-sm text-gray-500">{moreModalEvents.length} event(s)</p>
              </div>
              <button onClick={() => setIsMoreModalOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-3 max-h-96 overflow-auto">
              {moreModalEvents.map(ev => (
                <div key={ev.id} className={`flex items-center justify-between p-3 rounded-md ${ev.pillBgClass || 'bg-gray-50'} hover:bg-gray-100 cursor-pointer`} style={{ borderLeft: `4px solid ${ev.color}` }}>
                  <div className="flex items-start gap-3">
                    <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: ev.color, marginTop: 6 }} />
                    <div>
                      <div className="font-semibold" style={{ color: ev.color }}>{ev.title}</div>
                      <div className="text-xs text-gray-600">{ev.time} • {new Date(ev.dateString).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { handleEventDoubleClick(ev); setIsMoreModalOpen(false); }} className="text-sm text-gray-600 hover:text-gray-800">View</button>
                    <button onClick={() => deleteEvent(ev.id)} className="text-sm text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button onClick={() => setIsMoreModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;