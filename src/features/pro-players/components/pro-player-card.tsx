import React from 'react';
import type { ProPlayer } from '../types/pro-player.types';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Swords, Shield, Clock, Crosshair } from 'lucide-react';

interface ProPlayerCardProps {
  player: ProPlayer;
}

export const ProPlayerCard: React.FC<ProPlayerCardProps> = ({ player }) => {
  const { lastMatch } = player;

  // Cấu hình theme màu sắc theo từng đội
  const themeStyles = {
    blue: {
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      glow: 'shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)]',
      gradient: 'from-cyan-950/40 via-background/80 to-background',
      accent: 'text-cyan-400',
      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      tag: 'bg-cyan-950/80 text-cyan-200 border-cyan-500/40',
    },
    gold: {
      border: 'border-amber-500/30 hover:border-amber-400/60',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]',
      gradient: 'from-amber-950/40 via-background/80 to-background',
      accent: 'text-amber-400',
      badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      tag: 'bg-amber-950/80 text-amber-200 border-amber-500/40',
    },
    red: {
      border: 'border-rose-500/30 hover:border-rose-400/60',
      glow: 'shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)]',
      gradient: 'from-rose-950/40 via-background/80 to-background',
      accent: 'text-rose-400',
      badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      tag: 'bg-rose-950/80 text-rose-200 border-rose-500/40',
    },
  }[player.themeColor || 'blue'];

  // Tạo mảng 6 ô trang bị + 1 ô mắt
  const itemSlots = Array.from({ length: 6 }).map((_, idx) => {
    return lastMatch.items[idx] || null;
  });
  const trinket = lastMatch.items[6] || null;

  return (
    <TooltipProvider delay={100}>
      <article
        className={`group relative flex flex-col rounded-2xl border bg-card/60 backdrop-blur-xl p-4 transition-all duration-300 ${themeStyles.border} ${themeStyles.glow}`}
      >
        {/* 1. KHUNG ẢNH TUYỂN THỦ (Tỷ lệ 3:4 chuẩn thẻ bài) */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-muted/40 shadow-inner">
          <img
            src={player.playerImageUrl}
            alt={`${player.name} - ${player.team}`}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = '/players/player1.png';
            }}
          />

          {/* Lớp phủ Gradient mờ tối phía dưới ảnh để hiện tên */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Badge Vị trí & Đội tuyển trên đầu ảnh */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border backdrop-blur-md uppercase tracking-wider ${themeStyles.tag}`}>
              <Shield className="w-3 h-3" />
              {player.team}
            </span>
            <Badge variant="outline" className={`font-mono text-xs font-semibold ${themeStyles.badge}`}>
              {player.role}
            </Badge>
          </div>

          {/* Player name & Ingame Riot ID */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
                {player.name || player.riotGameName || 'Player'}
              </h3>
              <span className={`text-xs font-semibold drop-shadow ${themeStyles.accent}`}>
                "{player.nickname}"
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono mt-0.5">
              <Crosshair className="w-3 h-3 text-zinc-400" />
              <span>{player.riotGameName}</span>
              <span className="text-zinc-500">#{player.riotTagLine}</span>
            </div>
          </div>
        </div>

        {/* 2. KHỐI THÔNG TIN VÁN ĐẤU GẦN NHẤT */}
        <div className="mt-4 flex-1 flex flex-col justify-between rounded-xl bg-muted/30 border border-white/5 p-3.5 space-y-3">
          {/* Header ván đấu: Tướng + Trạng thái Thắng/Thua */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={lastMatch.championIcon}
                  alt={lastMatch.championName}
                  className="w-11 h-11 rounded-lg border border-white/20 object-cover shadow-sm"
                />
                <span className="absolute -bottom-1 -right-1 text-[10px] font-bold px-1 rounded bg-zinc-900 border border-white/10 text-white">
                  {lastMatch.championName}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <p className="text-xs font-bold text-foreground leading-tight">
                    {lastMatch.championName}
                  </p>
                  {lastMatch.championTitle && (
                    <span className="text-[10px] text-muted-foreground font-medium">
                      "{lastMatch.championTitle}"
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {lastMatch.timeAgo} • {lastMatch.gameDuration}
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={
                lastMatch.win
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 text-xs font-bold'
                  : 'bg-rose-500/15 text-rose-400 border-rose-500/40 text-xs font-bold'
              }
            >
              {lastMatch.win ? 'VICTORY' : 'DEFEAT'}
            </Badge>
          </div>

          {/* Thống kê KDA + CS */}
          <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-background/60 border border-white/5">
            <div>
              <div className="text-base font-black text-foreground tracking-wide font-mono">
                <span className="text-emerald-400">{lastMatch.kills}</span>
                <span className="text-muted-foreground mx-1">/</span>
                <span className="text-rose-400">{lastMatch.deaths}</span>
                <span className="text-muted-foreground mx-1">/</span>
                <span className="text-blue-400">{lastMatch.assists}</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                KDA Ratio: <strong className={themeStyles.accent}>{lastMatch.kdaRatio}</strong>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold font-mono text-zinc-300">
                {lastMatch.cs} CS
              </p>
              <p className="text-[10px] text-muted-foreground">
                ({lastMatch.csPerMinute} CS/m)
              </p>
            </div>
          </div>

          {/* Summoner Spells & Runes */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
            {/* Summoner Spells */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold mr-0.5">
                Spells:
              </span>
              {lastMatch.spells.map((spell, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <img
                      src={spell.icon}
                      alt={spell.name}
                      className="w-6 h-6 rounded border border-white/10 hover:border-primary/60 transition-colors cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="text-xs font-medium">{spell.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Primary & Secondary Runes */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold mr-0.5">
                Runes:
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <div className="p-0.5 rounded-full bg-zinc-900 border border-amber-500/40 cursor-pointer">
                    <img
                      src={lastMatch.runes.primary.icon}
                      alt={lastMatch.runes.primary.name}
                      className="w-5 h-5 rounded-full object-contain"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs font-medium">Primary: {lastMatch.runes.primary.name}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <div className="p-0.5 rounded-full bg-zinc-900 border border-white/20 cursor-pointer">
                    <img
                      src={lastMatch.runes.secondary.icon}
                      alt={lastMatch.runes.secondary.name}
                      className="w-5 h-5 rounded-full object-contain"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-xs font-medium">Secondary: {lastMatch.runes.secondary.name}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Items (6 Slots + 1 Trinket) */}
          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                <Swords className="w-3 h-3" /> Match Items:
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {itemSlots.map((item, idx) => (
                <div key={idx} className="aspect-square">
                  {item ? (
                    <Tooltip>
                      <TooltipTrigger className="w-full h-full block">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-full h-full rounded-md border border-white/15 bg-zinc-950 object-cover hover:border-primary transition-all cursor-pointer"
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs font-medium">{item.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <div className="w-full h-full rounded-md border border-dashed border-white/10 bg-zinc-900/30" />
                  )}
                </div>
              ))}

              {/* Trinket Slot */}
              <div className="aspect-square">
                {trinket ? (
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full block">
                      <img
                        src={trinket.icon}
                        alt={trinket.name}
                        className="w-full h-full rounded-md border border-amber-500/30 bg-zinc-950 object-cover hover:border-amber-400 transition-all cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs font-medium">{trinket.name} (Trinket)</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div className="w-full h-full rounded-md border border-dashed border-amber-500/20 bg-zinc-900/30" />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </TooltipProvider>
  );
};
