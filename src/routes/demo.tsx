import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Loader2, RefreshCw, Search, User } from 'lucide-react'

export const Route = createFileRoute('/demo')({
  component: DemoComponent,
})

interface GithubUser {
  id: number
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  html_url: string
}

async function fetchGithubUser(username: string): Promise<GithubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.status || response.status === 404) {
    throw new Error(`Không tìm thấy người dùng "${username}"`)
  }
  if (!response.ok) {
    throw new Error('Lỗi khi tải thông tin từ GitHub')
  }
  return response.json()
}

function DemoComponent() {
  const [searchTerm, setSearchTerm] = useState('facebook')
  const [inputVal, setInputVal] = useState('facebook')

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['github-user', searchTerm],
    queryFn: () => fetchGithubUser(searchTerm),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputVal.trim()) {
      setSearchTerm(inputVal.trim())
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">TanStack Query Demo</h1>
        <p className="text-muted-foreground text-sm">
          Thử nghiệm fetch dữ liệu từ GitHub API với cache, background refetching và xử lý state tự động.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Nhập GitHub username (vd: facebook, vercel, shadcn)..."
            className="pl-9"
          />
        </div>
        <Button type="submit">Tìm kiếm</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          Refetch
        </Button>
      </form>

      {/* State rendering */}
      {isLoading && (
        <Card className="p-8 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm">Đang tải dữ liệu từ API...</p>
        </Card>
      )}

      {isError && (
        <Card className="border-destructive/50 bg-destructive/5 p-6 text-center space-y-3">
          <p className="text-destructive font-semibold">
            {error instanceof Error ? error.message : 'Có lỗi xảy ra'}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Thử lại
          </Button>
        </Card>
      )}

      {user && !isLoading && (
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full border shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{user.name || user.login}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  @{user.login}
                </Badge>
              </div>
              <CardDescription>{user.bio || 'Chưa có thông tin tiểu sử.'}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground text-xs block">Public Repos</span>
                <span className="font-bold text-lg">{user.public_repos}</span>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground text-xs block">Followers</span>
                <span className="font-bold text-lg">{user.followers}</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{isFetching ? '⚡ Đang cập nhật ngầm...' : '✓ Dữ liệu từ cache'}</span>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <User className="w-3.5 h-3.5" /> Xem trang cá nhân GitHub
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
