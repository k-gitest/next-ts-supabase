"use client"

import Link from 'next/link'
import { useRouter, usePathname , useSearchParams } from "next/navigation"
import { supabase } from "lib/supabase"
import { useEffect, useState } from 'react'
import type {User} from 'types/user'

const Profile = ({ uid }: { uid: string | undefined }) => {
  const pathName = usePathname()
  const [data, setData] = useState<User | null>(null)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('Profile')
          .select('*')
          .eq('uid', uid)

        if (error) {
          console.error('プロフィールの読み込みに失敗しました')
        } else {
          console.log(data)
          setData(data[0])
        }
      } catch (error) {
        console.error('プロフィールの読み込みに失敗しました')
      }
    }

    fetchProfile()
  }, [])

  return (
    <>
    {data && (
      <div className="mb-2">
        <div>
          <p className="border-b mb-2">名前：{data.name}</p>
          <p className="border-b mb-2">住所：{data.address}</p>
          <p className="border-b mb-2">メール：{data.email}</p>
          <p className="border-b mb-2">性別：{data.gender}</p>
          {data.hobby && data.hobby.length > 0 && (
            <p className="border-b mb-2">趣味：{data.hobby.map((item: string) => <span key={item}>{item} </span>)}</p>
          )}
          <p className="border-b mb-2">選択：{data.selectValue}</p>
          <p className="border-b mb-2">コメント：{data.comment}</p>
        </div>
      </div>
    )}
  </>
  )
}

export default Profile