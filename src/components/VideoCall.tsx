
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, VideoOff, Mic, MicOff, User } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  role: string;
  isOnline: boolean;
}

interface VideoCallProps {
  participants: Participant[];
  isVideoOn: boolean;
  isAudioOn: boolean;
}

const VideoCall = ({ participants, isVideoOn, isAudioOn }: VideoCallProps) => {
  return (
    <div className="h-full bg-slate-800 p-4">
      <div className="grid grid-cols-1 gap-3 h-full">
        {participants.map((participant) => (
          <Card key={participant.id} className="bg-slate-700 border-slate-600 relative overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-700 relative">
                {/* Mock video feed - in real implementation this would be actual video */}
                {isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-slate-600 flex items-center justify-center">
                      <User className="h-8 w-8 text-slate-300" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <VideoOff className="h-8 w-8 text-slate-400" />
                  </div>
                )}
                
                {/* Participant info */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={participant.role === 'interviewer' ? 'default' : 'secondary'}
                        className={`text-xs ${participant.role === 'interviewer' ? 'bg-purple-600' : 'bg-blue-600'}`}
                      >
                        {participant.name}
                      </Badge>
                      {participant.isOnline && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {isAudioOn ? (
                        <div className="p-1 bg-green-600/80 rounded">
                          <Mic className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="p-1 bg-red-600/80 rounded">
                          <MicOff className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;
