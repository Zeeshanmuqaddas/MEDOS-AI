import { useState } from "react";
import { UploadCloud, FileText, Microscope, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LabAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResults({
        patientName: "Robert Davis",
        testType: "Complete Blood Count (CBC) & CMP",
        date: "2026-05-06",
        flags: 2,
        interpretation: "The patient presents with elevated WBC indicating a potential systemic infection. BUN and Creatinine levels are slightly elevated, suggesting mild acute kidney injury (AKI) or dehydration. Recommend clinical correlation and potentially aggressive fluid resuscitation if dehydration is confirmed.",
        markers: [
          { name: "White Blood Cells (WBC)", value: "15.4", unit: "k/uL", ref: "4.5-11.0", status: "high" },
          { name: "Hemoglobin (HGB)", value: "13.2", unit: "g/dL", ref: "13.8-17.2", status: "low" },
          { name: "Platelets (PLT)", value: "210", unit: "k/uL", ref: "150-450", status: "normal" },
          { name: "Blood Urea Nitrogen (BUN)", value: "28", unit: "mg/dL", ref: "7-20", status: "high" },
          { name: "Creatinine", value: "1.4", unit: "mg/dL", ref: "0.7-1.3", status: "high" },
          { name: "Glucose", value: "98", unit: "mg/dL", ref: "70-99", status: "normal" },
        ]
      });
    }, 2500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Microscope className="w-6 h-6 text-primary" /> AI Lab Report Analyzer
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Upload unstructured lab PDFs for instant clinical interpretation and FHIR mapping.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Upload Report</CardTitle>
              <CardDescription>Supported formats: PDF, image, FHIR bundle JSON</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors bg-accent/30"
                onClick={handleUpload}
              >
                {analyzing ? (
                  <div className="space-y-4">
                    <Microscope className="w-10 h-10 text-primary mx-auto animate-pulse" />
                    <div className="text-sm font-medium">Extracting biomarkers and mapping to standard ontologies...</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF max 10MB</p>
                    </div>
                    <Button variant="secondary" size="sm" className="mt-2 text-xs">Simulate Upload</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
             <CardHeader className="pb-3">
               <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Recent Analyses</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
                {[
                  { name: "MRI Brain (PT-103)", date: "2 hrs ago", status: "Normal" },
                  { name: "Lipid Panel (PT-442)", date: "5 hrs ago", status: "Needs Review" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded-md hover:bg-accent cursor-pointer transition-colors">
                     <div className="flex items-center gap-2">
                       <FileText className="w-4 h-4 text-muted-foreground" />
                       <span className="text-sm font-medium">{item.name}</span>
                     </div>
                     <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                ))}
             </CardContent>
          </Card>
        </div>

        <div className="col-span-1 lg:col-span-2 space-y-6">
          {results ? (
            <Card className="border-border bg-card shadow-lg relative overflow-hidden animate-in slide-in-from-right-4 duration-500">
              <div className="absolute top-0 right-0 right-0 w-2 h-full bg-primary/20" />
              <CardHeader className="pb-2 border-b border-border bg-accent/20">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      Analysis Results <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">FHIR Mapped</Badge>
                    </CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2 text-sm text-foreground/80">
                      Patient: <span className="font-medium text-foreground">{results.patientName}</span> • Date: {results.date}
                    </CardDescription>
                  </div>
                  {results.flags > 0 ? (
                     <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 uppercase tracking-widest text-xs px-3 py-1 font-bold flex gap-1 items-center">
                       <AlertCircle className="w-3 h-3" /> {results.flags} Abnormal Flags
                     </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 uppercase tracking-widest text-xs px-3 py-1 font-bold flex gap-1 items-center">
                       <CheckCircle2 className="w-3 h-3" /> Normal
                     </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                <div className="space-y-3">
                   <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                     <Microscope className="w-4 h-4" /> Clinical Interpretation
                   </h3>
                   <div className="p-4 rounded-lg bg-accent/50 border border-border text-sm leading-relaxed text-foreground/90">
                     {results.interpretation}
                   </div>
                </div>

                <div className="space-y-3">
                   <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Biomarker Data</h3>
                   <div className="border border-border rounded-lg overflow-hidden">
                     <table className="w-full text-sm">
                       <thead className="bg-accent/50">
                         <tr>
                           <th className="text-left font-medium p-3">Biomarker</th>
                           <th className="text-left font-medium p-3">Value</th>
                           <th className="text-left font-medium p-3 text-muted-foreground">Reference</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-border">
                         {results.markers.map((marker: any, i: number) => (
                           <tr key={i} className="hover:bg-accent/30 transition-colors">
                             <td className="p-3 font-medium text-foreground/80">{marker.name}</td>
                             <td className="p-3">
                               <div className="flex items-center gap-2">
                                 <span className={`font-mono font-semibold ${
                                   marker.status === 'high' ? 'text-destructive' :
                                   marker.status === 'low' ? 'text-orange-500' : 'text-foreground'
                                 }`}>
                                   {marker.value} {marker.unit}
                                 </span>
                                 {marker.status !== 'normal' && (
                                   <Badge variant="outline" className={`text-[10px] uppercase h-5 px-1.5 ${
                                     marker.status === 'high' ? 'border-destructive/30 text-destructive' : 'border-orange-500/30 text-orange-500'
                                   }`}>
                                     {marker.status}
                                   </Badge>
                                 )}
                               </div>
                             </td>
                             <td className="p-3 text-muted-foreground font-mono text-xs">{marker.ref}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full border border-border bg-card/30 rounded-xl flex items-center justify-center border-dashed">
              <div className="text-center space-y-2 opacity-50">
                <FileText className="w-12 h-12 mx-auto" />
                <p className="text-lg font-medium">No Report Loaded</p>
                <p className="text-sm">Upload a report to see AI interpretation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
