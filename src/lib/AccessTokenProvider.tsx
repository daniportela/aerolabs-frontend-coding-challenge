"use client"

import { createContext, useContext, useEffect, useState } from "react";
import getAccessToken from "./getAccessToken";

const AccessTokenCtx = createContext({ access_token: "", expires_in: 0 });

export default function AccessTokenProvider({ children }: { children: React.ReactNode }) {
    const [tokenData, setTokenData] = useState<AccessTokenData>({ access_token: "", expires_in: 0 });

    useEffect(() => {
        (async () => {
            const tokenResponse = await getAccessToken();
            setTokenData(tokenResponse)
        })();
    }, [])

    return (
        <AccessTokenCtx.Provider value={tokenData}>
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