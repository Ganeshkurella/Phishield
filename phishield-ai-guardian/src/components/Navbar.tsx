import { useState, useEffect, useRef } from "react";
import { Shield, Menu, X, LogOut, LayoutDashboard, History, Settings, User as UserIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const landingLinks: { label: string; href: string; icon?: React.ElementType }[] = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact", href: "/#footer" },
];

import { FileWarning } from "lucide-react";

const dashboardLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Scan History", href: "/history", icon: History },
  { label: "Report Scam", href: "/report", icon: FileWarning },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = ["/dashboard", "/history", "/report"].includes(location.pathname);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-primary group-hover:drop-shadow-[0_0_8px_hsl(187_80%_48%/0.8)] transition-all" />
          <span className="text-xl font-bold text-gradient">PHISHIELD</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {!isDashboard && (
            <div className="flex items-center gap-6 mr-4 border-r border-white/10 pr-6">
              {landingLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href === "/dashboard" && !user ? "/login" : link.href}
                  onClick={(e) => {
                    if (location.pathname === '/' && link.href.startsWith('/#')) {
                      e.preventDefault();
                      const hash = link.href.replace('/#', '#');
                      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', link.href);
                    }
                  }}
                  className={`text-sm flex items-center gap-2 transition-colors ${
                    location.pathname === link.href
                      ? "text-primary font-semibold" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          
          {/* Auth / Profile Section */}
          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-3 px-3 py-1.5 rounded-full border transition-colors ${
                    profileOpen 
                      ? "bg-white/10 border-primary/50" 
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 pr-1">
                    <span className="text-sm font-medium text-foreground">
                      {user.user_metadata?.display_name?.split(" ")[0] || user.email?.split("@")[0] || "User"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl glass-strong border border-white/10 shadow-2xl p-2 z-50 glow-cyan-sm"
                    >
                      <div className="px-3 py-3 border-b border-white/10 mb-2">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {user.user_metadata?.display_name || user.email?.split("@")[0] || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1 mb-2">
                        {dashboardLinks.map((link) => (
                          <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors group"
                          >
                            <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            {link.label}
                          </Link>
                        ))}
                      </div>

                      <div className="h-px bg-white/10 my-2" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-2 rounded-xl text-sm font-medium text-danger hover:bg-danger/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-gradient-cyber-solid text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {/* Mobile User Profile */}
              {user && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-foreground truncate">{user.user_metadata?.display_name || user.email?.split("@")[0] || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Links */}
              {(!isDashboard ? landingLinks : dashboardLinks).map((link) => (
                <Link
                  key={link.label}
                  to={link.href === "/dashboard" && !user ? "/login" : link.href}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    location.pathname === link.href || (isDashboard && link.label === "Overview" && location.pathname === link.href)
                      ? "text-primary bg-primary/10 font-semibold" 
                      : "text-muted-foreground hover:text-primary hover:bg-white/5"
                  }`}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (location.pathname === '/' && link.href.startsWith('/#')) {
                      e.preventDefault();
                      const hash = link.href.replace('/#', '#');
                      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', link.href);
                    }
                  }}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              
              <div className="h-px bg-border my-2" />
              
              {user ? (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="justify-start px-2 text-danger hover:text-danger hover:bg-danger/10 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="w-full px-5 py-3 rounded-lg bg-gradient-cyber-solid text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex justify-center mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
