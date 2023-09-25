import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getSingletonChannel } from './broadcastSingleton';

function useBroadcastChannel(channelName: string, onMessageReceived: (message: any) => void) {
    const channel = useMemo(() => getSingletonChannel(channelName), [channelName]);
    const isSubscribed = useRef(false);

    useEffect(() => {
        if (!isSubscribed.current || process.env.NODE_ENV !== 'development') {
            channel.onmessage = (event) => onMessageReceived(event.data);
        }
        return () => {
            if (isSubscribed.current || process.env.NODE_ENV !== 'development') {
                channel.close();
                isSubscribed.current = true;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const postMessage = useCallback(
        (message: any) => {
            channel?.postMessage(message);
        },
        [channel]
    );

    return {
        postMessage,
    };
}

export default useBroadcastChannel;
