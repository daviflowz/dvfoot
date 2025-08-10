// Dashboard do Jogador
import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  SoccerBall, 
  Trophy,
  TrendUp,
  Medal,
  Star,
  Calendar
} from 'phosphor-react';
import { jogadores, jogos, eventos } from '../../data/mockData';
import { useCascadeAnimation } from '../../hooks/use-cascade-animation';

const DashboardJogador: React.FC = () => {
  const { getAnimationStyle } = useCascadeAnimation({ delay: 100, stagger: 50 });
  
  // Encontrar dados do jogador (para demo, usar o primeiro jogador)
  const jogadorData = jogadores[0];
  
  const proximosJogos = jogos.filter(j => j.status === 'agendado').slice(0, 3);
  const proximosEventos = eventos.slice(0, 1);

  const getTwoPartName = (fullName: string): string => {
    const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1]}`;
  };

  const getIconColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-primary/20 text-primary',
      info: 'bg-info/20 text-info',
      success: 'bg-success/20 text-success',
      warning: 'bg-warning/20 text-warning',
      purple: 'bg-purple-200 text-purple-700',
      red: 'bg-red-200 text-red-700',
      gray: 'bg-gray-200 text-gray-700'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between px-1">
      {/* App Bar */}
      <header className="w-full bg-[#F8FAFC] px-1 pt-3 pb-1 flex items-center justify-between" style={getAnimationStyle(0)}>
        {/* Header content */}
      </header>

      {/* Card de Perfil Principal */}
      <section className="flex flex-col items-center justify-center px-1 mt-2" style={getAnimationStyle(1)}>
        <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/50 rounded-2xl border border-white/80 ring-1 ring-white/60 backdrop-blur-sm p-4 w-full max-w-xl flex flex-col items-center py-6 px-4 sm:py-8 sm:px-8 overflow-hidden shadow-[0_10px_30px_rgba(8,_112,_184,_0.18),_0_30px_60px_rgba(15,_23,_42,_0.12)] animate-float-y">
          {/* Efeito de brilho 3D */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl" />
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-200/40 to-transparent rounded-full blur-lg" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-white/40 opacity-50 blur-md" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-indigo-200/20 blur-md" />
          
          {/* Conteúdo principal */}
          <div className="relative z-10 w-full flex flex-col items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1E293B] font-inter mb-1 text-center drop-shadow-sm">
              Olá, {getTwoPartName(jogadorData.nome)}!
            </h1>
            <span className="text-[#1E293B] font-inter mb-1 text-center text-sm sm:text-base drop-shadow-sm">
              {jogadorData.posicao}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1 mb-2">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#4C1D95]/10 border border-gray-100 text-[#1E293B] text-xs sm:text-base">
              <TrendUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />
              {jogadorData.percentualPresenca}% de presença
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#3B82F6]/10 border border-gray-100 text-[#1E293B] text-xs sm:text-base">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />
              {jogadorData.trofeus.length} troféus
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#8B5CF6]/10 border border-gray-100 text-[#1E293B] text-xs sm:text-base">
              <Medal className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />
              {jogadorData.medalhas.length} medalhas
            </div>
            </div>
            {/* Cards de Estatísticas */}
            <div className="w-full border-t border-indigo-100 mt-3 pt-3" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full mt-2">
            {[
              { icon: TrendUp, value: `${jogadorData.percentualPresenca}%`, label: 'Presença', color: 'warning' },
              { icon: Trophy, value: jogadorData.trofeus.length, label: 'Troféus', color: 'primary' },
              { icon: Medal, value: jogadorData.medalhas.length, label: 'Medalhas', color: 'purple' },
              { icon: SoccerBall, value: proximosJogos.length, label: 'Jogos', color: 'info' }
            ].map((stat, index) => {
              const IconComponent = stat.icon as any;
              return (
                  <Card 
                    key={stat.label}
                    className="bg-gradient-to-br from-white to-gray-50/50 shadow-lg border border-gray-100/50 transition-none group"
                  style={getAnimationStyle(2 + index)}
                >
                  <CardContent className="p-3 sm:p-4 relative overflow-hidden h-20 sm:h-24 bg-white/85 backdrop-blur-[2px] rounded-xl shadow-[0_4px_12px_rgba(2,6,23,0.06)] ring-1 ring-white/60">
                    {/* Efeito de brilho no hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="flex items-center space-x-2 sm:space-x-3 relative z-10 h-full">
                      <div className={`p-1.5 sm:p-2 rounded-lg shadow ring-1 ring-black/5 ${getIconColor(stat.color)} bg-gradient-to-br from-white/40 to-transparent` }>
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg sm:text-2xl font-bold text-[#0F172A] drop-shadow-sm">{stat.value}</p>
                        <p className="text-xs text-[#334155] truncate">{stat.label}</p>
                      </div>
                    </div>

                    {/* Decoração de fundo (ícone duplicado) */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                      <IconComponent className="w-full h-full" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      

      {/* Próximos Jogos */}
      <section className="px-1 mt-8" style={getAnimationStyle(7)}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#1E293B]">Próximos Jogos</h2>
          <Button variant="link" className="text-[#4C1D95] px-0 text-sm">
            Ver todos
          </Button>
        </div>
        <div className="space-y-3">
            {proximosJogos.map((jogo, index) => {
            // const minhaPresenca = jogo.presencas.find(p => p.jogadorId === jogadorData.id);
            return (
              <div 
                key={jogo.id} 
                className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3"
                style={getAnimationStyle(8 + index)}
              >
                <div className="flex-shrink-0">
                  <Trophy className="w-8 h-8 text-[#4C1D95]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#1E293B] text-base">vs {jogo.adversario}</span>
                    <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">Agendado</Badge>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>{new Date(jogo.data).toLocaleDateString('pt-BR')} • {jogo.horario}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="px-1 mt-8" style={getAnimationStyle(10)}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[#1E293B]">Próximos Eventos</h2>
          <Button variant="link" className="text-[#4C1D95] px-0 text-sm">
            Ver todos
          </Button>
        </div>
        <div className="space-y-3">
          {proximosEventos.map((evento, index) => (
            <div 
              key={evento.id} 
              className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3"
              style={getAnimationStyle(11 + index)}
            >
              <div className="flex-shrink-0">
                <Calendar className="w-8 h-8 text-[#4C1D95]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#1E293B] text-base">{evento.nome}</span>
                  <Badge className="bg-green-600 text-white text-xs px-2 py-0.5">Confirmado</Badge>
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(evento.data).toLocaleDateString('pt-BR')} • {evento.horario}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conquistas */}
      <section className="px-1 mt-8" style={getAnimationStyle(13)}>
        <h2 className="text-lg font-bold text-[#1E293B] mb-1 text-left">Conquistas</h2>
        <p className="text-[#1E293B] mb-4 text-left">Troféus e medalhas</p>
        <h3 className="text-base font-bold text-[#1E293B] mb-2 text-left">Troféus Recentes</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {jogadorData.trofeus.slice(0, 4).map((trofeu, index) => (
            <div 
              key={trofeu.id} 
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
              style={getAnimationStyle(14 + index)}
            >
              <Star className="w-6 h-6 text-[#4C1D95] mb-1" />
              <span className="font-bold text-[#1E293B]">{trofeu.nome}</span>
              <span className="text-xs text-[#1E293B]">
                {new Date(trofeu.dataConquista).toLocaleDateString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
        <h3 className="text-base font-bold text-[#1E293B] mb-2 text-left">Medalhas</h3>
        <div className="space-y-3 mb-4">
          {jogadorData.medalhas.slice(0, 3).map((medalha, index) => (
            <div 
              key={medalha.id} 
              className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between"
              style={getAnimationStyle(18 + index)}
            >
              <div className="flex items-center gap-3">
                <Medal className="w-6 h-6 text-[#4C1D95]" />
                <div>
                  <span className="font-bold text-[#1E293B]">{medalha.nome}</span>
                  <p className="text-xs text-[#1E293B]">{medalha.descricao}</p>
                </div>
              </div>
              <Badge className="bg-[#4C1D95] text-white rounded-full px-3 py-0.5">{medalha.tipo}</Badge>
            </div>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="w-full text-[#4C1D95] border-[#4C1D95] font-medium rounded-full bg-white"
          style={getAnimationStyle(21)}
        >
          Ver Perfil Completo
        </Button>
      </section>

      
    </div>
  );
};

export default DashboardJogador;