import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import forecareLogo from "@/assets/forecare-logo.png";
import { UserPlus } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
    role: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(form);
    setLoading(false);
    if (success) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={forecareLogo} alt="ForeCare" className="h-10 w-10 object-contain" style={{ mixBlendMode: "multiply" }} />
            <span className="text-xl font-bold text-foreground">ForeCare</span>
          </Link>
        </div>

        <Card className="shadow-elevated">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create Enterprise Account</CardTitle>
            <CardDescription>Start monitoring with ForeCare</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full name</label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Dr. Jane Smith" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Organization</label>
                <Input value={form.organization} onChange={(e) => update("organization", e.target.value)} required placeholder="Sunrise Senior Living" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Business email</label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@organization.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Role</label>
                <Select value={form.role} onValueChange={(v) => update("role", v)}>
                  <SelectTrigger><SelectValue placeholder="Select your role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="care-manager">Care Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Country</label>
                <Input value={form.country} onChange={(e) => update("country", e.target.value)} required placeholder="Germany" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required minLength={6} placeholder="Minimum 6 characters" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                <UserPlus className="h-4 w-4 mr-2" />
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">
          🔒 Encrypted connection · GDPR-aligned
        </p>
      </div>
    </div>
  );
};

export default Register;
