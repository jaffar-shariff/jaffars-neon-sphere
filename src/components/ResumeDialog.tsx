import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Download, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeDialogProps {
  children: React.ReactNode;
}

const ResumeDialog = ({ children }: ResumeDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const resumeUrl = '/lovable-uploads/4614d283-261b-46c8-95ec-4ab6cbfbfada.png';

  const handleView = () => {
    window.open(resumeUrl, '_blank');
    setIsOpen(false);
    toast({
      title: "Resume Opened",
      description: "Opening resume in new tab for viewing",
    });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Jaffar_Shariff_Resume.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
    toast({
      title: "Download Started",
      description: "Your resume is being downloaded",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card border-primary/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary flex items-center justify-center gap-2">
            <FileText className="w-6 h-6" />
            Resume Options
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          <p className="text-center text-muted-foreground text-lg">
            Choose how you'd like to access the resume
          </p>
          
          <div className="flex flex-col gap-4">
            <Button 
              onClick={handleView}
              className="neon-button w-full py-4 flex items-center justify-center gap-3 text-lg font-semibold transform-gpu hover:scale-105"
            >
              <Eye className="w-5 h-5" />
              View Resume
            </Button>
            
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="glass-card border-primary/30 text-foreground hover:bg-primary/10 w-full py-4 flex items-center justify-center gap-3 text-lg font-semibold transform-gpu hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">
              Web & Tech Specialist • Hosting Expert • AI Tools
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDialog;