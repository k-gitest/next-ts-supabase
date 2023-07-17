"use client"

import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { supabase } from "lib/supabase"
import {AuthUserContext} from 'components/Provider/AuthProvider'
import {useState,useEffect} from 'react'

const Header = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const user = AuthUserContext()?.session
  
  const handleSignOut = async () => {
    try{
      await supabase.auth.signOut()
      router.push('/')
    }
    catch(err){
      console.log(err)
    }
  }
  
  return (
    <header className="flex p-3">
      <Link href="/">
       <h1>タイトル</h1>
      </Link>
      <ul className="block w-full flex justify-end">
        {user && (
          <>
            <li>
              <Link className="block bg-white border rounded p-2 mr-1" href={"/user"}>マイページ</Link>
            </li>
            <li>
              <button className="bg-white border rounded p-2" onClick={handleSignOut} >ログアウト</button>
            </li>
          </>
        )}
        {!user && (
          <>
            <li className="bg-blue-500 hover:bg-blue-800 rounded text-white mr-2 p-2">
              <Link href={"/signup"}>サインアップ</Link>
            </li>
            <li className="bg-red-500 hover:bg-red-800 rounded text-white p-2">
              <Link href={"/login"}>ログイン</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header