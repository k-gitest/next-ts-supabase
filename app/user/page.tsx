"use client"

import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { AuthUserContext } from 'components/Provider/AuthProvider'

const Login: NextPage = () => {
  const user = AuthUserContext()?.session
  const pathName = usePathname()

  return (
    <div className="bg-lime-100">
      <p className="text-4xl font-bold text-blue-500">userページ</p>
      <p>{user && ("true")} {!user && ("false")}</p>
      <div className="mb-2">
        <Link href={`${pathName}/profile`} className="block bg-blue-500 p-3 hover:bg-blue-800 rounded text-center text-white">
          プロフィールを更新する
        </Link>
      </div>
    </div>
  )
}

export default Login