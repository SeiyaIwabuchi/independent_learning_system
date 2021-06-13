export interface ISessionId {
    sessionId : string
};

export const SessionId = (params : ISessionId) => {
    return `sessionId=${params.sessionId}`
};