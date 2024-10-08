'use client';
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { getCallById } from '@/hooks/getCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

function Meeting({ params }: { params: { id: string } }) {
  const { isLoaded } = useUser();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  // it is user defind hook use to find the current call
  const { call, isCallLoading } = getCallById(params.id);

  if (!isLoaded || isCallLoading) return <Loader />;
  
  return (
    <main className='h-screen w-full'>

      {/* call will tell us in which call currently we are */}

      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupCompleted ? (
              <MeetingSetup setIsSetupCompleted={setIsSetupCompleted}/>
            ) : (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
