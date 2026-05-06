import { Activity, Search, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const riskData = [
  { subject: 'Cardiovascular', A: 85, fullMark: 100 },
  { subject: 'Renal', A: 45, fullMark: 100 },
  { subject: 'Metabolic', A: 65, fullMark: 100 },
  { subject: 'Neurological', A: 30, fullMark: 100 },
  { subject: 'Pulmonary', A: 20, fullMark: 100 },
  { subject: 'Hepatic', A: 50, fullMark: 100 },
];

export default function PredictiveEngine() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" /> Predictive Disease Engine
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Estimating future health risks and trajectories using longitudinal patient data.</p>
        </div>
      </div>

      <div className="flex gap-4 items-center bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search patient ID (e.g. PT-10492)..." 
            className="pl-9 bg-background focus-visible:ring-primary/50"
            defaultValue="PT-8829"
          />
        </div>
        <Button>Load Patient Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Risk Profile Radar</CardTitle>
              <CardDescription>Multi-system vulnerability index</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }} />
                  <Radar name="Risk Level" dataKey="A" stroke="var(--color-destructive)" fill="var(--color-destructive)" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-md">Contributing Factors</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">Family Hx (CAD)</span>
                <Badge variant="outline" className="text-xs">High Impact</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">Hyperlipidemia</span>
                <Badge variant="outline" className="text-xs">Med Impact</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">Smoking (Past)</span>
                <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">Low Impact</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
           <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Primary Predictions</h3>
           
           <Card className="border-border relative overflow-hidden bg-card/80 backdrop-blur">
             <div className="absolute top-0 right-0 w-2 h-full bg-destructive" />
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                       Myocardial Infarction <span className="text-xs font-normal text-muted-foreground bg-accent px-2 py-0.5 rounded-full">Primary Risk</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">High probability event detected based on ascending lipid trajectory and familial markers.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-mono font-bold text-destructive">85%</div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Probability</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 p-4 rounded-lg bg-accent/30 border border-border">
                   <div>
                     <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold flex items-center gap-1"><Activity className="w-3 h-3" /> Time Horizon</p>
                     <p className="font-medium text-foreground">&lt; 12 Months</p>
                   </div>
                   <div>
                     <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-semibold flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trajectory</p>
                     <p className="font-medium text-destructive flex items-center gap-1">Accelerating +12% YoY</p>
                   </div>
                </div>

                <div className="mt-6 space-y-2">
                   <h4 className="text-xs font-bold text-foreground/80 uppercase">AI Preventive Recommendations</h4>
                   <ul className="space-y-2 text-sm text-muted-foreground">
                     <li className="flex gap-2 items-start">
                       <span className="text-primary mt-0.5">•</span> 
                       Initiate aggressive statin therapy (target LDL &lt; 55 mg/dL).
                     </li>
                     <li className="flex gap-2 items-start">
                       <span className="text-primary mt-0.5">•</span> 
                       Schedule cardiac stress test or Coronary CTA within 30 days to quantify plaque burden.
                     </li>
                     <li className="flex gap-2 items-start">
                       <span className="text-primary mt-0.5">•</span> 
                       Monitor HbA1c (current 5.9%) closely; pre-diabetic state exacerbating vascular risk.
                     </li>
                   </ul>
                </div>
             </CardContent>
           </Card>

           <Card className="border-border relative overflow-hidden bg-card/80 backdrop-blur opacity-80">
             <div className="absolute top-0 right-0 w-2 h-full bg-orange-500" />
             <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold">Type II Diabetes Mellitus</h2>
                    <p className="text-sm text-muted-foreground">Based on HbA1c trending upwards (5.4% ➔ 5.9% over 2 yrs) and BMI trajectory.</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-orange-500">65%</div>
                    <div className="text-xs text-muted-foreground uppercase font-semibold">Probability</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold text-foreground/80">Time Horizon:</span> 2 - 3 Years
                </div>
             </CardContent>
           </Card>

        </div>
      </div>
    </div>
  );
}
