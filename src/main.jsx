import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Landing from './pages/Landing/Landing.jsx';
import './index.css';

// Two "pages", no router dependency needed: "/" is the marketing landing
// page, "/app" (and anything under it) is the actual scene builder.
const isBuilder = window.location.pathname.replace(/\/+$/, '').startsWith('/app');

// The studio is a fixed-viewport app (no page scroll), the landing page is
// a normal scrolling marketing page. Both share one <body>, so which one
// gets `overflow: hidden` has to be toggled here rather than hard-coded
// in CSS — that hard-coding was the reason the landing page couldn't
// scroll at all.
document.body.classList.add(isBuilder ? 'is-studio' : 'is-landing');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{isBuilder ? <App /> : <Landing />}</React.StrictMode>
);
