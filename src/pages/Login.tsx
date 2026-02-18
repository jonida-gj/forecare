import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import forecareLogo from "@/assets/forecare-logo.png";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={forecareLogo} alt="ForeCare" className="h-10 w-10 object-contain" style={{ mixBlendMode: "multiply" }} />
            <span className="text-xl font-bold text-foreground">ForeCare</span>
          </Link>
        </div>

        <Card className="shadow-elevated">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Enterprise Login</CardTitle>
            <CardDescription>Sign in to access your care dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Business email</label>
                <Input
                  type="email"
                  placeholder="you@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-center text-muted-foreground mb-3">
                Demo credentials: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">demo@forecare.com</code> / <code className="text-xs bg-muted px-1.5 py-0.5 rounded">Demo1234!</code>
              </p>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Create enterprise account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">
          🔒 Encrypted connection · GDPR-aligned
        </p>
      </div>
    </div>
  );
};

export default Login;
