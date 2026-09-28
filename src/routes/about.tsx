import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderTree, Terminal, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

function AboutComponent() {
  const structure = [
    {
      path: "src/routes/__root.tsx",
      desc: "Root layout",
    },
    {
      path: "src/routes/index.tsx",
      desc: "Homepage",
    },
    {
      path: "src/components/ui/*",
      desc: "Shadcn UI components (Button, Card, Input, Badge...)",
    },
    {
      path: "src/lib/utils.ts",
      desc: "Utility helper cn (clsx + tailwind-merge)",
    },
    {
      path: "src/main.tsx",
      desc: "Initialize QueryClient, RouterProvider and mount React",
    },
    {
      path: "vite.config.ts",
      desc: "Configured TanStackRouterVite + Tailwind v4 + React",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Architecture</h1>
        <p className="text-muted-foreground text-sm">
          Overview of architecture and directory conventions established in this project.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">
              File-based Routing Conventions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Any file created in the{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
              src/routes
            </code>{" "}
            directory is automatically tracked by TanStack Router to generate type-safe route trees in{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
              src/routeTree.gen.ts
            </code>
            .
          </p>

          <div className="border rounded-lg divide-y text-sm">
            {structure.map((item) => (
              <div
                key={item.path}
                className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
              >
                <p className="font-mono text-xs font-semibold text-primary">
                  {item.path}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Useful Commands</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-muted rounded">npm run dev</div>
            <div className="p-2 bg-muted rounded">npm run build</div>
            <div className="p-2 bg-muted rounded">
              npx shadcn@latest add dialog
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">
                Engineering Standards
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>✓ 100% Type-safe routes & params</p>
            <p>✓ Bundle optimization with Auto Code Splitting</p>
            <p>✓ TanStack Query cache for instant data reuse</p>
            <p>✓ Dark mode ready with CSS variables</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
