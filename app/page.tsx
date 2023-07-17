import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex flex-col">
        <p className="text-4xl font-bold text-blue-500 mb-3">hoge トップ</p>
        <Link href="signup" className="text-center py-2 px-5 bg-blue-500 hover:bg-blue-800 rounded mb-3">新規登録</Link>
        <Link href="login" className="text-center py-2 px-5 bg-red-500 hover:bg-red-800 rounded">ログイン</Link>
      </div>
    </div>
  )
}

export default Home