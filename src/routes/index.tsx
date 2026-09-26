import { createFileRoute } from '@tanstack/react-router'
import { NewsList } from '@/features/news'
import { ProPlayerSection } from '@/features/pro-players'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div className="space-y-12 pb-10">
      {/* Phần hiển thị 3 Pro Player / Thành viên trong nhóm */}
      <ProPlayerSection />

      {/* Tin tức cập nhật */}
      <NewsList />
    </div>
  )
}
