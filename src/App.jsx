import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DivineParticles from './components/DivineParticles';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import IkukuWelcome from './components/divine/IkukuWelcome';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ChatPage from './pages/ChatPage';
import StartProjectPage from './pages/StartProjectPage';
import AdminPage from './pages/AdminPage';

const FULLSCREEN_ROUTES = ['/chat/', '/admin'];
const NO_FOOTER_ROUTES  = ['/chat/'];

function AppShell() {
  const location = useLocation();
  const isFullscreen = FULLSCREEN_ROUTES.some(r => location.pathname.startsWith(r));
  const isAdmin      = location.pathname.startsWith('/admin');
  const showIkuku    = !isFullscreen && !isAdmin;
  const showFooter   = !NO_FOOTER_ROUTES.some(r => location.pathname.startsWith(r));

  return (
    <div style={{ background: 'var(--deep)', minHeight: '100vh', position: 'relative' }}>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Wind Particles — fixed bg, always running */}
      <DivineParticles count={window.innerWidth < 768 ? 20 : 40} />

      {/* Custom Cursor — desktop only */}
      <CustomCursor />

      {/* Navigation */}
      {!isAdmin && <Navbar />}

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/projects"        element={<Projects />} />
          <Route path="/projects/:id"    element={<ProjectDetail />} />
          <Route path="/about"           element={<About />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/chat/:god"       element={<ChatPage />} />
          <Route path="/start-project"   element={<StartProjectPage />} />
          <Route path="/start"           element={<StartProjectPage />} />
          <Route path="/admin"           element={<AdminPage />} />
        </Routes>
      </main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* Ikuku Floating Chat Bubble */}
      {showIkuku && <IkukuWelcome />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
