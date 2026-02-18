import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

const Settings = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-sm text-muted-foreground">Manage facility and notification preferences</p>
    </div>

    <Card className="shadow-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Facility Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Facility Name</Label>
          <Input defaultValue="Sunrise Senior Living" className="bg-muted/30" />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Location</Label>
          <Input defaultValue="Berlin, Germany" className="bg-muted/30" />
        </div>
        <Button size="sm">Save Changes</Button>
      </CardContent>
    </Card>

    <Card className="shadow-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Critical alerts</p>
            <p className="text-xs text-muted-foreground">Push notifications for high-risk residents</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Device offline alerts</p>
            <p className="text-xs text-muted-foreground">Notify when sensors go offline</p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Weekly summary</p>
            <p className="text-xs text-muted-foreground">Email digest of facility trends</p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-card border-border border-primary/20">
      <CardContent className="py-4 px-5 flex items-start gap-3">
        <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Security & Compliance</p>
          <p className="text-sm text-muted-foreground">
            All data is encrypted at rest and in transit. ForeCare is GDPR compliant with role-based access controls and privacy-by-design architecture.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Settings;
