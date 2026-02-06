import { createContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client.js";

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function checkSession() {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
            setUser(data.session.user)
        }
        setLoading(false)
      }
      checkSession()

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null)
      })

      return () => {
        subscription.unsubscribe()
      }
    }, [])

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }
    
    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }