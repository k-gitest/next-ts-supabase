"use client"

import type { NextPage } from 'next'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import AuthForm from 'components/AuthForm'
import { supabase } from "lib/supabase"
import {AuthUser} from 'types/auth'

const Login: NextPage = () => {

  const defaultState = {email: '', password: ''}
  const [account, setAccount] = useState<AuthUser>(defaultState)
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try{
      const { error } = await supabase.auth.signInWithPassword({email: account.email,password: account.password})
      if(error){
        setError(error.message)
      } else {
        router.push('/user')
      }
    }
    catch(error){
      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("ログインに失敗しました")
      }
    }
  }
  
  return (
    <div className="bg-lime-100">
      <p className="text-4xl font-bold text-blue-500">loginページ</p>
      {error && (<span className="text-red-500">{error}</span>)}
        <form onSubmit={handleSubmit} className="flex justify-center">
          <AuthForm account={account} setAccount={setAccount} />
        </form>
    </div>
  )
}

export default Login