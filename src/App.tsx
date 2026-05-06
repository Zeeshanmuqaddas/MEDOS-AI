import { useState } from "react";
import { 
  LayoutDashboard, 
  Stethoscope, 
  Activity, 
  Pill, 
  Microscope, 
  BrainCircuit,
  Settings,
  Bell,
  Search,
  User,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import Dashboard from "./pages/Dashboard";
import Copilot from "./pages/Copilot";
import ICUMonitor from "./pages/ICUMonitor";
import Pharmacy from "./pages/Pharmacy";
import LabAnalyzer from "./pages/LabAnalyzer";
import PredictiveEngine from "./pages/PredictiveEngine";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "copilot", label: "Clinical Copilot", icon: Stethoscope },
    { id: "icu", label: "ICU Monitor", icon: Activity },
    { id: "pharmacy", label: "Pharmacy Intelligence", icon: Pill },
    { id: "labs", label: "Lab Analyzer", icon: Microscope },
    { id: "predictive", label: "Predictive Engine", icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur flex flex-col hidden md:flex">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">MEDOS AI</span>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-1 overflow-y-auto">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4 px-2">Agents</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full transition-colors">
            <Settings className="w-4 h-4" />
            System Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search patient records, reports, or agents..." 
                className="pl-9 bg-background/50 border-border focus-visible:ring-primary/50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                System Nominal
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive"></span>
            </Button>
            <div className="h-8 w-px bg-border mx-1"></div>
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium leading-none">Dr. Sarah Chen</div>
                <div className="text-xs text-muted-foreground mt-1">Chief Supervisor</div>
              </div>
              <Avatar className="w-8 h-8 border border-border">
                <AvatarImage src="https://i.pravatar.cc/150?u=dr_chen" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-background/95">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "copilot" && <Copilot />}
          {activeTab === "icu" && <ICUMonitor />}
          {activeTab === "pharmacy" && <Pharmacy />}
          {activeTab === "labs" && <LabAnalyzer />}
          {activeTab === "predictive" && <PredictiveEngine />}
        </div>
      </main>
    </div>
  );
}
