import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in successfully!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account!");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">IOB SecureGuard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLogin ? "Sign in to access the dashboard" : "Create your account"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-primary-foreground py-3 rounded-lg text-sm font-semibold disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
