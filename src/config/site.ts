export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export const siteConfig = {
  name: 'React Starter Kit',
  description: 'Boilerplate React 19 + Shadcn UI + TanStack Router & Query',
  navItems: [
    { title: 'Home', href: '/' },
    { title: 'Products', href: '/products' },
    { title: 'About', href: '/about' },
  ] satisfies NavItem[],
}
