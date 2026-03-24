import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Mail, Lock, User, Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + "/dashboard" }
      });
      if (error) throw error;
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      setError(error.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (isSignUp && !name) {
      setError("Please provide your name.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      let error = null;
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name }
          }
        });
        error = signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        error = signInError;
      }

      if (error) throw error;
      
      // Since email verification is disabled in Supabase, successful signup immediately logs us in.
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Authentication error:", error);
      setError(error.message || "An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative overflow-hidden py-12 px-4">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 md:p-10 glass rounded-3xl w-full max-w-md text-center relative z-10 border border-white/10 shadow-2xl glow-cyan"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-gradient-cyber-solid text-white shadow-lg">
            <ShieldCheck className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">
          <span className="text-gradient">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-sm">
          {isSignUp 
            ? "Sign up to access advanced AI-driven URL analysis" 
            : "Sign in to your PHISHIELD dashboard"}
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          <AnimatePresence mode="popLayout">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-background/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-cyber-solid text-primary-foreground hover:opacity-90 transition-all font-bold text-lg h-12 rounded-xl mt-2 relative overflow-hidden group shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none"></div>
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isSignUp ? "Sign Up" : "Sign In")}
          </Button>
        </form>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border w-full"></div>
          <span className="text-xs text-muted-foreground uppercase font-semibold">Or continue with</span>
          <div className="h-px flex-1 bg-border w-full"></div>
        </div>
        
        <Button 
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variant="outline"
          className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-foreground transition-all font-semibold flex items-center justify-center gap-3 h-12 rounded-xl"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          Google
        </Button>

        <div className="mt-8 text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button 
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-primary font-semibold hover:underline transition-all"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
