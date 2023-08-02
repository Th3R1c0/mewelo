"use client";


import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../types_db";
import { useState } from "react";


interface SupbaseProviderProps {
    children: React.ReactNode;
}

const SupbaseProvider: React.FC<SupbaseProviderProps> =({children}) => {
    const [supabaseClient] = useState(() =>createClientComponentClient<Database>())
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
        {children}
        </SessionContextProvider>
    )
}


export default SupbaseProvider;