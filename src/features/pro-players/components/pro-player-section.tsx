import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProPlayers } from '../services/pro-player.service';
import { ProPlayerCard } from './pro-player-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Trophy } from 'lucide-react';

export const ProPlayerSection: React.FC = () => {
  const { data: players, isLoading } = useQuery({
    queryKey: ['pro-players-highlights'],
    queryFn: fetchProPlayers,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="space-y-6 my-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>FEATURED ROSTER & PROFILES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            Pro Player Highlights
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Player profiles, champion performance, runes, and item builds from the latest ranked match.
          </p>
        </div>

        <div className="text-xs text-muted-foreground font-mono">
          Featured: <span className="text-primary font-bold">3 Players</span>
        </div>
      </div>

      {/* Grid 3 Cột Card Tuyển Thủ */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 p-4 space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players?.map((player) => (
            <ProPlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </section>
  );
};
