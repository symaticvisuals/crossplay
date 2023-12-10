import { HuddleProvider, HuddleClient } from '@huddle01/react';
 
const huddleClient = new HuddleClient({
  projectId: env.NEXT_PUBLIC_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 8,
    },
  },
});