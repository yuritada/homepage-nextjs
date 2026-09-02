import { getAllDocs } from '@/lib/documents'
import DocumentList from '@/components/DocumentList'

export const metadata = {
  title: '資料集 | 多田有里',
  description: '発表スライド・論文・ポスターなど、これまでに作った資料をまとめています。',
}

export default function DocumentsPage() {
  const docs = getAllDocs()

  return (
    <main className="relative z-10 min-h-screen pt-28 pb-16">
      <DocumentList docs={docs} />
    </main>
  )
}
