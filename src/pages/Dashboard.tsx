import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, AlertTriangle, BrainCircuit, ActivitySquare } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const performanceData = [
  { time: "00:00", activeAgents: 12, cpuLoad: 45 },
  { time: "04:00", activeAgents: 15, cpuLoad: 52 },
  { time: "08:00", activeAgents: 45, cpuLoad: 80 },
  { time: "12:00", activeAgents: 58, cpuLoad: 92 },
  { time: "16:00", activeAgents: 40, cpuLoad: 75 },
  { time: "20:00", activeAgents: 25, cpuLoad: 60 },
  { time: "24:00", activeAgents: 18, cpuLoad: 50 },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Autonomous Healthcare Operations</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 font-semibold px-3 py-1">
            <AlertTriangle className="w-4 h-4 mr-2" />
            2 Critical ICU Alerts
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
            <BrainCircuit className="w-4 h-4 mr-2" />
            7 Agents Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Patients</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from previous hour</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-destructive/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-destructive/10 rounded-bl-full" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-destructive">ICU Occupancy</CardTitle>
            <Activity className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">94%</div>
            <p className="text-xs text-destructive/80 mt-1">42/45 beds occupied</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg ER Triage Time</CardTitle>
            <ActivitySquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14m</div>
            <p className="text-xs text-green-500 mt-1">-2m from baseline</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Inferences (24h)</CardTitle>
            <BrainCircuit className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142.5k</div>
            <p className="text-xs text-muted-foreground mt-1">across all agents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">AI Operations Load</CardTitle>
            <CardDescription>System utilization vs active agent instances</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                  itemStyle={{ color: 'var(--color-foreground)' }}
                />
                <Area type="monotone" dataKey="cpuLoad" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Anomalies Detected</CardTitle>
            <CardDescription>Escalated by Medical Agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "Just now", patient: "PT-8829", ward: "ICU-3", issue: "Sudden BP drop (80/50)", agent: "ICU Agent", level: "Critical", levelColor: "bg-destructive/10 text-destructive border-destructive/20" },
                { time: "14m ago", patient: "PT-1092", ward: "ER-Triage", issue: "ECG denotes possible STEMI", agent: "Triage Agent", level: "Critical", levelColor: "bg-destructive/10 text-destructive border-destructive/20" },
                { time: "45m ago", patient: "PT-5521", ward: "Pharmacy", issue: "Warfarin + Aspirin interaction risk", agent: "Pharmacy Agent", level: "High", levelColor: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
                { time: "1h ago", patient: "PT-3310", ward: "Ward B", issue: "WBC rising (14.2k)", agent: "Lab Agent", level: "Medium", levelColor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 items-start p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors">
                  <div className="text-xs text-muted-foreground w-12 pt-1">{alert.time}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{alert.patient} - {alert.ward}</p>
                      <Badge variant="outline" className={alert.levelColor}>{alert.level}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.issue}</p>
                    <p className="text-xs font-mono text-primary/80">Source: {alert.agent}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
