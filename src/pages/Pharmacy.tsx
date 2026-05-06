import { Pill, AlertTriangle, ArrowRightLeft, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Pharmacy() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Pill className="w-6 h-6 text-primary" /> Smart Pharmacy Intelligence
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time prescription validation, interactions, and supply forecasting.</p>
        </div>
        <div className="flex gap-2">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 font-semibold px-3 py-1">
                2 Critical Interactions Blocked Today
            </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden pb-6">
        {/* Interaction Warnings */}
        <Card className="border-border bg-card flex flex-col overflow-hidden">
          <CardHeader className="pb-3 border-b border-border bg-accent/30 shrink-0">
            <CardTitle className="text-lg flex items-center gap-2 text-orange-500">
               <ShieldAlert className="w-5 h-5" /> Live Interaction Intercepts
            </CardTitle>
            <CardDescription>Prescriptions flagged by AI before dispensing</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto">
             <div className="divide-y divide-border">
                {[
                  { pt: "PT-5521", drugs: ["Warfarin", "Aspirin"], risk: "High", reason: "Major bleeding risk. Cumulative antiplatelet/anticoagulant effect.", dr: "Dr. L. Vance" },
                  { pt: "PT-2918", drugs: ["Sildenafil", "Nitroglycerin"], risk: "Critical", reason: "Severe hypotension risk. Co-administration is strongly contraindicated.", dr: "Dr. S. Chen" },
                  { pt: "PT-1102", drugs: ["Clopidogrel", "Omeprazole"], risk: "Medium", reason: "Decreased efficacy of Clopidogrel. Consider Pantoprazole alternative.", dr: "Dr. R. Singh" },
                ].map((item, i) => (
                  <div key={i} className="p-5 hover:bg-accent/20 transition-colors">
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-mono text-xs text-muted-foreground">{item.pt} • Prescribed by {item.dr}</span>
                       <Badge variant="outline" className={
                         item.risk === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/20 font-bold uppercase' :
                         item.risk === 'High' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 font-bold uppercase' :
                         'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 font-bold uppercase'
                       }>
                         {item.risk}
                       </Badge>
                     </div>
                     <div className="flex items-center gap-3 font-semibold text-lg mb-2 mt-3">
                        <span className="text-foreground">{item.drugs[0]}</span>
                        <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{item.drugs[1]}</span>
                     </div>
                     <p className="text-sm text-foreground/80 bg-accent/50 p-3 rounded-md border border-border mt-3 relative overflow-hidden">
                       <span className="absolute left-0 top-0 w-1 h-full bg-orange-500/50" />
                       <span className="font-semibold block mb-1 text-xs uppercase tracking-wider text-muted-foreground">AI Assessment</span>
                       {item.reason}
                     </p>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Stock Prediction */}
        <Card className="border-border bg-card flex flex-col">
          <CardHeader className="pb-3 border-b border-border bg-accent/30 shrink-0">
            <CardTitle className="text-lg flex items-center gap-2">
               <AlertTriangle className="w-5 h-5 text-yellow-500" /> Stock Shortage Forecast
            </CardTitle>
            <CardDescription>Predictive algorithmic supply chain alerts</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto">
             <div className="p-5 space-y-6">
                {[
                  { name: "Propofol 10mg/mL", current: "120 vials", required: "180 vials", horizon: "48 hours", trend: "High ER usage today" },
                  { name: "Albuterol Sulf HFA", current: "15 units", required: "40 units", horizon: "5 days", trend: "Seasonal spike detected" },
                  { name: "Epinephrine Auto-I", current: "8 units", required: "15 units", horizon: "7 days", trend: "Expiring stock next week" },
                ].map((item, i) => (
                  <div key={i} className="border border-border rounded-lg p-4 bg-accent/10">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold">{item.name}</h3>
                       <Badge variant="secondary" className="text-xs">Alert in {item.horizon}</Badge>
                     </div>
                     <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Current Stock</p>
                          <p className="font-mono text-destructive font-semibold">{item.current}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">AI Predicted Need</p>
                          <p className="font-mono">{item.required}</p>
                        </div>
                     </div>
                     <p className="text-xs text-muted-foreground bg-accent/40 p-2 rounded flex items-center gap-2">
                       <TrendingIcon /> {item.trend}
                     </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function TrendingIcon() {
    return <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
}
