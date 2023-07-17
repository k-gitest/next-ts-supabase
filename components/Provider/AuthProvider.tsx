"use client"

import {createContext, useState, useContext, useEffect} from 'react'
import { Session  } from "@supabase/supabase-js"
import { supabase } from 'lib/supabase'

type AuthCtx = {
  session: Session | null;
}

const AuthContext = createContext<AuthCtx | null>(null)

const AuthUserContext = () => {
  const user = useContext(AuthContext);
  return user ? user : null
}

const AuthProvider = ({children}: {children: React.ReactNode}) => {

  const [authUser, setAuthUser] = useState<AuthCtx | null>(null)
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthUser({ session })
    })

    return () => {
      subscription?.unsubscribe()
    }
  },[])
  
  return(
    <AuthContext.Provider value={authUser}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthUserContext }