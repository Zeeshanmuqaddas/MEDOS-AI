import { useState } from "react";
import { Send, FileText, Activity, Layers, AlertCircle, CheckCircle2, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function Copilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "AI Clinical Copilot initialized. I can assist with differential diagnosis, treatment plans, and lab interpretations. Remember: My suggestions are AI recommendations and require clinical verification."
    }
  ]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAnalyzing(true);

    // Simulate AI response based on the prompt's mandatory format
    setTimeout(() => {
      setAnalyzing(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "", // Content will be structured below
          analysis: {
            summary: "Patient presents with acute chest pain radiating to the left arm, diaphoresis, and shortness of breath starting 30 minutes ago.",
            riskLevel: "Critical",
            possibleConditions: [
              { name: "Myocardial Infarction (STEMI/NSTEMI)", reasoning: "Classic presentation of radiating chest pain and diaphoresis." },
              { name: "Aortic Dissection", reasoning: "Sudden onset of severe chest pain, though radiation is typically to the back." },
              { name: "Pulmonary Embolism", reasoning: "Sudden shortness of breath and chest pain." }
            ],
            recommendedTests: ["12-lead ECG (STAT)", "Troponin I/T", "Chest X-Ray", "D-dimer"],
            treatmentSuggestions: ["Administer Aspirin 324mg PO (chewed)", "Establish IV access", "Administer SL Nitroglycerin (if BP > 90 systolic and no right-sided involvement)", "Supplemental Oxygen if SpO2 < 90%"],
            alerts: ["Time-sensitive cardiac event suspected. Door-to-balloon time protocol activation recommended."],
            confidence: 94
          }
        }
      ]);
    }, 2000);
  };

  return (
    <div className="flex h-full max-w-7xl mx-auto border-x border-border">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-background relative">
        <header className="p-4 border-b border-border bg-card/80 backdrop-blur flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold leading-none">Diagnostic Agent</h2>
              <p className="text-xs text-muted-foreground mt-1">Clinical Copilot v2.4 (FHIR compatible)</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-muted-foreground">
            Session ID: #CPL-8892
          </Badge>
        </header>

        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6 pb-20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className="w-8 h-8 mt-1 border border-border">
                  {msg.role === "user" ? (
                    <>
                      <AvatarImage src="https://i.pravatar.cc/150?u=dr_chen" />
                      <AvatarFallback>DR</AvatarFallback>
                    </>
                  ) : msg.role === "system" ? (
                    <AvatarFallback className="bg-muted text-muted-foreground"><CheckCircle2 className="w-4 h-4" /></AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-primary/20 text-primary"><Activity className="w-4 h-4" /></AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`max-w-[85%] ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"} p-4 rounded-xl shadow-sm text-sm`}>
                  {msg.role === "system" && <div className="text-muted-foreground italic font-medium">{msg.content}</div>}
                  {msg.role === "user" && <div>{msg.content}</div>}
                  
                  {msg.role === "ai" && msg.analysis && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                          <BrainCircuit className="w-4 h-4 text-primary" />
                          <span className="font-bold text-xs tracking-widest text-primary uppercase">Medical Analysis</span>
                        </div>
                        <p className="text-foreground/90">{msg.analysis.summary}</p>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Risk Level</p>
                          <Badge className={msg.analysis.riskLevel === "Critical" ? "bg-destructive text-destructive-foreground" : ""}>
                            {msg.analysis.riskLevel}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Confidence</p>
                          <span className="font-mono text-lg font-bold text-primary">{msg.analysis.confidence}%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                          <Layers className="w-4 h-4" /> Possible Conditions
                        </h4>
                        <div className="space-y-2">
                          {msg.analysis.possibleConditions.map((cond: any, i: number) => (
                            <div key={i} className="pl-3 border-l-2 border-primary/40">
                              <span className="font-medium inline-block mr-2">{cond.name}</span>
                              <span className="text-muted-foreground text-xs">{cond.reasoning}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">🧪 Recommended Tests</h4>
                          <ul className="list-disc pl-4 text-foreground/80 space-y-1 text-xs">
                            {msg.analysis.recommendedTests.map((t: string, i: number) => <li key={i}>{t}</li>)}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">💊 Treatment (AI Guidance)</h4>
                          <ul className="list-disc pl-4 text-foreground/80 space-y-1 text-xs">
                            {msg.analysis.treatmentSuggestions.map((t: string, i: number) => <li key={i}>{t}</li>)}
                          </ul>
                        </div>
                      </div>

                      {msg.analysis.alerts.length > 0 && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md space-y-1">
                          <h4 className="text-xs font-bold text-destructive uppercase tracking-wider flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" /> Alerts
                          </h4>
                          <ul className="list-disc pl-5 text-destructive/90 text-xs">
                            {msg.analysis.alerts.map((a: string, i: number) => <li key={i}>{a}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {analyzing && (
              <div className="flex gap-4 flex-row">
                 <Avatar className="w-8 h-8 mt-1 border border-border">
                  <AvatarFallback className="bg-primary/20 text-primary"><Activity className="w-4 h-4 animate-spin" /></AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border p-4 rounded-xl shadow-sm text-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                  <span className="text-muted-foreground">Cross-referencing FHIR database and clinical guidelines...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-card/80 backdrop-blur border-t border-border shrink-0">
          <div className="max-w-3xl mx-auto relative flex items-end gap-2">
            <div className="absolute left-3 bottom-3 flex items-center gap-2 text-muted-foreground">
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><FileText className="w-4 h-4" /></Button>
            </div>
            <Textarea 
              className="resize-none min-h-[60px] max-h-[160px] pl-12 pr-14 py-3 bg-background border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary shadow-sm" 
              placeholder="Describe patient symptoms, labs, or history for AI analysis..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button 
              size="icon" 
              className="absolute right-2 bottom-2 h-9 w-9 rounded-lg"
              onClick={handleSend}
              disabled={!input.trim() || analyzing}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">AI suggestions must be verified by a licensed medical professional.</p>
        </div>
      </div>
    </div>
  );
}
