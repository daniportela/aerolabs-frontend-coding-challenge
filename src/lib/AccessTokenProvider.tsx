"use client"

import { createContext, PropsWithChildren, useContext } from "react";

const AccessTokenCtx = createContext({ access_token: "", expires_in: 0 });

export default function AccessTokenProvider({ token, children }: PropsWithChildren<{ token: AccessTokenData }>) {
    return (
        <AccessTokenCtx.Provider value={token}>
            { children }
        </AccessTokenCtx.Provider>
    )
}

export function useAccessToken() {
    const accessTokenCtx = useContext(AccessTokenCtx);

    if (!accessTokenCtx) {
        throw new Error("useAccessToken must be used within an AccessTokenProvider");
    }

    return accessTokenCtx
}