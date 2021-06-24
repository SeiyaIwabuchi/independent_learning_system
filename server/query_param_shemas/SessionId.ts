export interface ISessionId {
    sessionId : string
};

export const SessionId = (sessionId : string) => {
    return `sessionId=${sessionId}`
};