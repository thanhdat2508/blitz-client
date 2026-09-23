export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export const siteConfig = {
  name: 'React Starter Kit',
  description: 'Boilerplate React 19 + Shadcn UI + TanStack Router & Query',
  navItems: [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản phẩm (Feature mẫu)', href: '/products' },
    { title: 'Giới thiệu', href: '/about' },
  ] satisfies NavItem[],
}
