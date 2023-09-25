const channelInstances: { [key: string]: BroadcastChannel } = {};

export const getSingletonChannel = (name: string): BroadcastChannel => {
    if (!channelInstances[name]) {
        channelInstances[name] = new BroadcastChannel(name);
    }
    return channelInstances[name];
};
