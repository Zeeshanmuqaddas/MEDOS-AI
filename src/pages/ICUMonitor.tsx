import { useState, useEffect } from "react";
import { Activity, AlertTriangle, HeartPulse, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const generateVitals = () => {
  return [
    { id: "PT-8829", name: "J. Doe", ward: "ICU-3", hr: 110, bp: "80/50", spo2: 88, status: "Critical", trend: "down" },
    { id: "PT-7712", name: "M. Smith", ward: "ICU-1", hr: 82, bp: "120/80", spo2: 98, status: "Stable", trend: "steady" },
    { id: "PT-9321", name: "A. Johnson", ward: "ICU-5", hr: 135, bp: "150/95", spo2: 92, status: "Warning", trend: "up" },
    { id: "PT-4211", name: "R. Williams", ward: "ICU-2", hr: 75, bp: "110/70", spo2: 99, status: "Stable", trend: "steady" },
    { id: "PT-1102", name: "C. Brown", ward: "ICU-4", hr: 55, bp: "90/60", spo2: 95, status: "Warning", trend: "down" },
  ];
};

export default function ICUMonitor() {
  const [patients, setPatients] = useState(generateVitals());

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(current => 
        current.map(p => {
          if (p.status === "Stable" && Math.random() > 0.8) return p;
          
          let newHr = p.hr + (Math.floor(Math.random() * 5) - 2);
          let newSpo2 = p.spo2 + (Math.floor(Math.random() * 3) - 1);
          if (newSpo2 > 100) newSpo2 = 100;
          if (newSpo2 < 80) newSpo2 = 80;

          return { ...p, hr: newHr, spo2: newSpo2 };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" /> ICU Autonomous Monitor
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time telemetry and predictive deterioration alerts.</p>
        </div>
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 animate-pulse">
            LIVE FEED
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <Card className="bg-card">
          <CardHeader className="pb-2">
             <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
               <HeartPulse className="w-4 h-4 text-rose-500" /> Avg ICU Heart Rate
             </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold">91 <span className="text-sm font-sans font-normal text-muted-foreground">bpm</span></div>
          </CardContent>
         </Card>
         <Card className="bg-card">
          <CardHeader className="pb-2">
             <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
               <Wind className="w-4 h-4 text-blue-500" /> Critical SpO2 Alerts (24h)
             </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-destructive">14</div>
          </CardContent>
         </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Active Telemetry Stream</CardTitle>
          <CardDescription>Continuous anomaly detection active across all monitored beds.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Patient ID</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>SpO2 %</TableHead>
                <TableHead>AI Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} className="border-border relative group">
                  <TableCell className="font-medium">
                    {patient.id}
                    <div className="text-xs text-muted-foreground">{patient.name}</div>
                  </TableCell>
                  <TableCell>{patient.ward}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <span className={`font-mono ${patient.hr > 120 || patient.hr < 60 ? 'text-destructive font-bold' : ''}`}>
                         {patient.hr}
                       </span>
                       <div className="w-16">
                         <div className={`h-1 rounded-full ${patient.hr > 120 ? 'bg-destructive' : patient.hr < 60 ? 'bg-orange-500' : 'bg-primary/50'}`} style={{width: `${Math.min(100, Math.max(0, (patient.hr / 200) * 100))}%`}} />
                       </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{patient.bp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <span className={`font-mono ${patient.spo2 < 92 ? 'text-destructive font-bold' : ''}`}>
                         {patient.spo2}%
                       </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`
                      ${patient.status === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20 animate-pulse' : ''}
                      ${patient.status === 'Warning' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''}
                      ${patient.status === 'Stable' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                    `}>
                      {patient.status === 'Critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-xs text-primary hover:underline hover:text-primary/80 font-medium transition-colors">
                      View AI Analysis
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* AI Recommendation Alert */}
      <div className="mt-4 p-4 rounded-lg bg-card border border-destructive/50 flex gap-4 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-bl-full pointer-events-none" />
        <div className="p-2 bg-destructive/10 rounded-md shrink-0">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h4 className="font-bold text-destructive text-sm uppercase tracking-wider mb-1">ICU Agent Intervention Recommended</h4>
          <p className="text-sm text-foreground/90">Patient PT-8829 (J. Doe) is showing signs of hypovolemic shock. Heart rate has steadily increased over the last 30 minutes while blood pressure presents a downward trend (currently 80/50). SpO2 is dropping.</p>
          <div className="mt-3 flex gap-2">
             <Badge variant="secondary" className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer">Dispatch Emergency Team</Badge>
             <Badge variant="outline" className="cursor-pointer">Review Labs</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
