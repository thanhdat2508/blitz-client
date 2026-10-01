import * as React from "react";
import { useLeaderboardTierList } from "../api/get-leaderboard";
import { LeaderboardSidebar } from "./leaderboard-sidebar";
import { LeaderboardTable } from "./leaderboard-table";
import { LeaderboardGrouped } from "./leaderboard-grouped";
import { LeaderboardPagination } from "./leaderboard-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  LeaderboardRole,
  LeaderboardTier,
  LeaderboardRank,
  LeaderboardSortBy,
  LeaderboardViewMode,
} from "../types/leaderboard.types";
import {
  Flame,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  RotateCcw,
} from "lucide-react";

export function LeaderboardPage() {
  const [role, setRole] = React.useState<LeaderboardRole>("all");
  const [tier, setTier] = React.useState<LeaderboardTier>("all");
  const [rank, setRank] = React.useState<LeaderboardRank>("emerald");
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState<LeaderboardSortBy>("winRate");
  const [order] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [viewMode, setViewMode] = React.useState<LeaderboardViewMode>("table");
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  // Query parameter preparation
  const queryParams = React.useMemo(() => {
    return {
      role,
      tier: tier !== "all" ? tier : undefined,
      rank,
      search: debouncedSearch.trim() || undefined,
      sortBy,
      order,
      page: viewMode === "table" ? page : undefined,
      limit: viewMode === "table" ? pageSize : 200,
    };
  }, [
    role,
    tier,
    rank,
    debouncedSearch,
    sortBy,
    order,
    page,
    pageSize,
    viewMode,
  ]);

  const { data, isLoading, isError, error, refetch } =
    useLeaderboardTierList(queryParams);

  // Reset to page 1 on filter changes
  const handleRoleChange = (newRole: LeaderboardRole) => {
    setRole(newRole);
    setPage(1);
  };

  const handleTierChange = (newTier: LeaderboardTier) => {
    setTier(newTier);
    setPage(1);
  };

  const handleRankChange = (newRank: LeaderboardRank) => {
    setRank(newRank);
    setPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handleResetFilters = () => {
    setRole("all");
    setTier("all");
    setRank("emerald");
    setSearch("");
    setSortBy("winRate");
    setPage(1);
    setIsMobileSheetOpen(false);
  };

  // Compute tier distribution counts from items (use server-calculated total counts if available)
  const tierCounts = React.useMemo(() => {
    if (data?.tierCounts) return data.tierCounts;
    if (!data?.data) return undefined;
    const counts: Record<string, number> = { S: 0, A: 0, B: 0, C: 0, D: 0 };
    data.data.forEach((item) => {
      const t = item.tier?.toUpperCase();
      if (counts[t] !== undefined) counts[t]++;
    });
    return counts;
  }, [data?.tierCounts, data?.data]);

  const champions = data?.data || [];
  const totalItems = data?.total || champions.length;
  const totalPages = data?.totalPages || Math.ceil(totalItems / pageSize) || 1;
  const patchVersion = data?.patch || "15.5";

  // Count active filters for badge
  const activeFiltersCount =
    (role !== "all" ? 1 : 0) +
    (tier !== "all" ? 1 : 0) +
    (rank !== "emerald" ? 1 : 0) +
    (search ? 1 : 0);

  const roleLabels: Record<LeaderboardRole, string> = {
    all: "All Roles",
    top: "Top",
    jungle: "Jungle",
    mid: "Mid",
    ad: "ADC",
    sp: "Support",
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/10 border-rose-500/30 text-rose-400"
            >
              <Flame className="w-3 h-3 mr-1" /> Patch {patchVersion}
            </Badge>
            <Badge
              variant="secondary"
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300"
            >
              Rank: {rank === "all" ? "ALL RANKS" : rank.toUpperCase()}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            LoL Champion Tier List &amp; Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
            Live meta analytics sourced from millions of ranked matches worldwide.
            Explore win rates, pick rates, ban rates, and tier rankings for
            every role.
          </p>
        </div>

        {/* Total Champions badge */}
        <div className="self-start md:self-auto shrink-0 text-right">
          <Badge
            variant="outline"
            className="border-neutral-800 bg-[#12141f] text-neutral-400 font-mono text-xs py-1 px-3"
          >
            Total:{" "}
            <span className="font-bold text-white text-sm ml-1">
              {totalItems}
            </span>{" "}
            champions
          </Badge>
        </div>
      </div>

      {/* 2. Responsive Layout: Left Sidebar + Right Main Content */}
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* === LEFT COLUMN (Desktop Sidebar Filter: >= lg) === */}
        <aside className="hidden lg:block w-72 shrink-0">
          <Card className="bg-[#10121a] border-neutral-800 p-5 rounded-2xl shadow-xl">
            <LeaderboardSidebar
              role={role}
              tier={tier}
              rank={rank}
              search={search}
              sortBy={sortBy}
              onRoleChange={handleRoleChange}
              onTierChange={handleTierChange}
              onRankChange={handleRankChange}
              onSearchChange={setSearch}
              onSortByChange={setSortBy}
              onResetFilters={handleResetFilters}
              tierCounts={tierCounts}
            />
          </Card>
        </aside>

        {/* === RIGHT COLUMN (Main Content Area) === */}
        <main className="flex-1 min-w-0 w-full space-y-4">
          {/* Top Control Bar for Mobile Filters & View Mode */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#12141e] border border-neutral-800/70">
            {/* Mobile Filter Button (Sheet Drawer) */}
            <div className="flex items-center gap-2">
              <div className="lg:hidden">
                <Sheet
                  open={isMobileSheetOpen}
                  onOpenChange={setIsMobileSheetOpen}
                >
                  <SheetTrigger
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 gap-2 bg-[#171924] border-neutral-800 text-white rounded-xl"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
                        <span>Filters</span>
                        {activeFiltersCount > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-rose-600 text-white text-[10px] h-4 px-1.5"
                          >
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    }
                  />
                  <SheetContent
                    side="left"
                    className="bg-[#10121a] border-neutral-800 text-white w-80 p-5 overflow-y-auto no-scrollbar"
                  >
                    <SheetTitle className="text-white text-base font-bold">
                      Leaderboard Filters
                    </SheetTitle>
                    <SheetDescription className="text-xs text-neutral-400 -mt-2">
                      Filter by role, rank tier, and tier list ratings
                    </SheetDescription>
                    <div className="mt-4">
                      <LeaderboardSidebar
                        role={role}
                        tier={tier}
                        rank={rank}
                        search={search}
                        sortBy={sortBy}
                        onRoleChange={(r) => {
                          handleRoleChange(r);
                          setIsMobileSheetOpen(false);
                        }}
                        onTierChange={(t) => {
                          handleTierChange(t);
                          setIsMobileSheetOpen(false);
                        }}
                        onRankChange={handleRankChange}
                        onSearchChange={setSearch}
                        onSortByChange={setSortBy}
                        onResetFilters={handleResetFilters}
                        tierCounts={tierCounts}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Active Filter summary pill */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span className="hidden sm:inline">Viewing:</span>
                <Badge
                  variant="outline"
                  className="border-neutral-800 bg-[#171924] text-neutral-200 text-xs"
                >
                  {roleLabels[role]}
                </Badge>
                {tier !== "all" && (
                  <Badge
                    variant="outline"
                    className="border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs"
                  >
                    Tier {tier}
                  </Badge>
                )}
                {search && (
                  <Badge
                    variant="outline"
                    className="border-neutral-800 bg-[#171924] text-neutral-300 text-xs truncate max-w-32"
                  >
                    "{search}"
                  </Badge>
                )}
              </div>
            </div>

            {/* View Mode & Reset Controls */}
            <div className="flex items-center gap-2 ml-auto">
              {activeFiltersCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={handleResetFilters}
                  className="text-neutral-400 hover:text-white h-7 text-xs hidden sm:flex"
                >
                  <RotateCcw className="w-3 h-3 mr-1" /> Reset filters
                </Button>
              )}

              {/* View Mode Toggle: Table vs Grouped */}
              <div className="flex items-center rounded-xl bg-[#171924] border border-neutral-800 p-0.5">
                <Button
                  type="button"
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="icon-xs"
                  onClick={() => setViewMode("table")}
                  className={`h-7 w-7 rounded-lg ${
                    viewMode === "table"
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="Table view (paginated)"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                </Button>
                <Button
                  type="button"
                  variant={viewMode === "grouped" ? "default" : "ghost"}
                  size="icon-xs"
                  onClick={() => setViewMode("grouped")}
                  className={`h-7 w-7 rounded-lg ${
                    viewMode === "grouped"
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  title="Tier group view (S, A, B, C, D)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main List Rendering */}
          {isLoading ? (
            <div className="space-y-3 p-6 rounded-2xl bg-[#10121a] border border-neutral-800">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <Skeleton className="h-6 w-48 bg-neutral-800" />
                <Skeleton className="h-6 w-24 bg-neutral-800" />
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 py-2"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-xl bg-neutral-800 shrink-0" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-28 bg-neutral-800" />
                      <Skeleton className="h-3 w-16 bg-neutral-800" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-12 rounded-lg bg-neutral-800" />
                  <Skeleton className="h-4 w-28 bg-neutral-800 hidden sm:block" />
                  <Skeleton className="h-4 w-16 bg-neutral-800" />
                  <Skeleton className="h-4 w-16 bg-neutral-800 hidden md:block" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="py-16 text-center bg-destructive/10 border border-destructive/30 rounded-2xl p-6 text-neutral-200">
              <p className="text-sm font-semibold text-rose-400">
                Failed to load leaderboard data.
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                {(error as any)?.message ||
                  "Please verify your backend connection and try again."}
              </p>
              <Button
                type="button"
                onClick={() => refetch()}
                className="mt-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold"
              >
                Try Again
              </Button>
            </div>
          ) : viewMode === "grouped" ? (
            <LeaderboardGrouped items={champions} />
          ) : (
            <div className="space-y-4">
              <LeaderboardTable items={champions} />
              <LeaderboardPagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default LeaderboardPage;
