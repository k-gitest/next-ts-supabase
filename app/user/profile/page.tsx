"use client"

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import type { User } from 'types/user'
import { supabase } from "lib/supabase"
import UserForm from 'components/Private/UserForm'
import UserProfile from 'components/Private/UserProfile'
import { AuthUserContext } from 'components/Provider/AuthProvider'

const Profile = () => {
  const authUser = AuthUserContext()?.session
  const router = useRouter()

  const defaultUserData = {
    name: '',
    address: '',
    email: '',
    gender: '男性',
    hobby: [],
    selectValue: '',
    comment: ''
  }
  const [user, setUser] = useState<User>(defaultUserData)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')
    const userData = { ...user, uid: authUser?.user.id }
    try {
      const { data, error } = await supabase.from("Profile").select("*").eq("uid", authUser?.user.id)
      if (error) {
        setError(error.message)
        return;
      }

      if (data && data.length > 0) {
        const profileId = data[0].id;
        const { error: updateError } = await supabase.from("Profile")
          .update(userData)
          .eq("id", profileId);
        if (updateError) {
          setError(updateError.message)
        } else {
          setUser(user)
          router.push('/user')
        }
      } else {
        const { error: insertError } = await supabase.from("Profile").insert([userData]);

        if (insertError) {
          setError(insertError.message)
        } else {
          setUser(user)
          router.push('/user')
        }
      }
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("プロフィール設定に失敗しました")
      }
    }

  }

  return (
    <div>
      <h1>プロフィール</h1>
      <p>あなたのプロフィール</p>
      <UserProfile uid={authUser?.user.id} />
      <UserForm props={{ user: user, setUser: setUser, onRegister: handleRegister }} />
      <div>
        <button className="border p-3 rounded" onClick={() => router.back()}>戻る</button >
      </div>
    </div>
  )
}

export default Profile