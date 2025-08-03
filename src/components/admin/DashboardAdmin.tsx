// Dashboard do Administrador
import React from 'react';
import { Trophy, Calendar, Users, TrendUp, Plus, UserPlus, Bell } from 'phosphor-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useNavigation } from '../../hooks/use-navigation';
  
const estatisticas = [
  { label: 'Total de Jogadores', valor: 4, icon: Users, color: 'blue' },
  { label: 'Próximos Jogos', valor: 1, icon: Calendar, color: 'info' },
      { label: 'Eventos Ativos', valor: 2, icon: Calendar, color: 'success' },
  { label: 'Presença Média', valor: '88%', icon: TrendUp, color: 'warning' },
];

const DashboardAdmin: React.FC = () => {
  const { navigateTo } = useNavigation();
  
  // Estados dos modais
  const [isCriarEventoOpen, setIsCriarEventoOpen] = React.useState(false);
  const [isAdicionarJogadorOpen, setIsAdicionarJogadorOpen] = React.useState(false);
  const [isAgendarJogoOpen, setIsAgendarJogoOpen] = React.useState(false);

  const getIconColor = (color: string) => {
    const colors = {
      'blue': 'bg-primary/10 text-primary',
      'info': 'bg-info/10 text-info',
      'success': 'bg-success/10 text-success',
      'warning': 'bg-warning/10 text-warning',
      'purple': 'bg-purple-100 text-purple-600',
      'red': 'bg-red-100 text-red-600',
      'gray': 'bg-gray-100 text-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const handleCriarEvento = () => {
    setIsCriarEventoOpen(true);
  };

  const handleAdicionarJogador = () => {
    setIsAdicionarJogadorOpen(true);
  };

  const handleAgendarJogo = () => {
    setIsAgendarJogoOpen(true);
  };

  const handleEnviarNotificacao = () => {
    alert('Funcionalidade de notificação será implementada em breve!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between animate-fade-in">
      {/* Header */}
      <header className="w-full bg-[#F8FAFC] px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-xl sm:text-3xl font-bold text-[#1E293B]">Gestão do Time</h1>
          <span className="text-sm sm:text-base text-[#1E293B]/70 font-medium">Dashboard administrativo completo</span>
        </div>
      </header>

      {/* Cards de Resumo */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 mt-4">
        {estatisticas.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.label} className="bg-white shadow-card animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${getIconColor(stat.color)}`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-[#1E293B]">{stat.valor}</p>
                    <p className="text-xs text-[#1E293B]/70">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Ações Rápidas */}
      <section className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-[#1E293B] mb-3">Ações Rápidas</h2>
        <div className="grid grid-cols-2 gap-2">
          <div 
            className="bg-white rounded-xl shadow-card border border-gray-100 p-2 md:hover:shadow-md transition-all duration-300 cursor-pointer group animate-scale-in"
            style={{ animationDelay: '200ms' }}
            onClick={handleCriarEvento}
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-1.5 bg-[#4C1D95]/10 rounded-lg group-hover:bg-[#4C1D95]/20 transition-colors">
                <Plus className="w-4 h-4 text-[#4C1D95]" />
              </div>
              <span className="font-medium text-[#1E293B] text-xs text-center">Criar Evento</span>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl shadow-card border border-gray-100 p-2 md:hover:shadow-md transition-all duration-300 cursor-pointer group animate-scale-in"
            style={{ animationDelay: '250ms' }}
            onClick={handleAgendarJogo}
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-1.5 bg-[#EF4444]/10 rounded-lg group-hover:bg-[#EF4444]/20 transition-colors">
                <Calendar className="w-4 h-4 text-[#EF4444]" />
              </div>
              <span className="font-medium text-[#1E293B] text-xs text-center">Agendar Jogo</span>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl shadow-card border border-gray-100 p-2 md:hover:shadow-md transition-all duration-300 cursor-pointer group animate-scale-in"
            style={{ animationDelay: '300ms' }}
            onClick={handleAdicionarJogador}
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-1.5 bg-[#22C55E]/10 rounded-lg group-hover:bg-[#22C55E]/20 transition-colors">
                <UserPlus className="w-4 h-4 text-[#22C55E]" />
              </div>
              <span className="font-medium text-[#1E293B] text-xs text-center">Adicionar Jogador</span>
            </div>
          </div>
          
          <div 
            className="bg-white rounded-xl shadow-card border border-gray-100 p-2 md:hover:shadow-md transition-all duration-300 cursor-pointer group animate-scale-in"
            style={{ animationDelay: '350ms' }}
            onClick={handleEnviarNotificacao}
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="p-1.5 bg-[#3B82F6]/10 rounded-lg group-hover:bg-[#3B82F6]/20 transition-colors">
                <Bell className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <span className="font-medium text-[#1E293B] text-xs text-center">Enviar Notificação</span>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Jogos */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1E293B]">Próximos Jogos</h2>
          <Button 
            size="sm" 
            variant="link" 
            className="text-[#4C1D95] px-0"
            onClick={() => navigateTo('/admin/jogos')}
          >
            Ver todos
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-card p-5 flex flex-col items-center gap-1 animate-scale-in" style={{ animationDelay: '400ms' }}>
          <Trophy className="w-8 h-8 text-[#4C1D95] mb-1" />
          <span className="font-bold text-[#1E293B]">vs FC Rivais</span>
          <span className="text-xs text-[#1E293B] font-normal">24/07/2024 • 15:00</span>
          <span className="text-xs text-[#1E293B] font-normal">Estádio Municipal</span>
          <Badge className="bg-[#3B82F6] text-white mt-2 rounded-full px-3 py-0.5">Agendado</Badge>
        </div>
      </section>

      {/* Linha divisória */}
      <div className="border-t border-gray-200 my-6 mx-4" />

      {/* Próximos Eventos */}
      <section className="px-4 mb-24">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1E293B]">Próximos Eventos</h2>
          <Button 
            size="sm" 
            variant="link" 
            className="text-[#4C1D95] px-0"
            onClick={() => navigateTo('/admin/eventos')}
          >
            Ver todos
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-card p-5 flex flex-col items-center gap-1 animate-scale-in" style={{ animationDelay: '450ms' }}>
          <Calendar className="w-8 h-8 text-[#4C1D95] mb-1" />
          <Badge className="bg-[#22C55E] text-white mt-2 rounded-full px-3 py-0.5">Confirmado</Badge>
          <span className="font-bold text-[#1E293B]">Treino Técnico</span>
          <span className="text-xs text-[#1E293B] font-normal">25/07/2024 • 19:00</span>
          <span className="text-xs text-[#1E293B] font-normal">Campo Municipal</span>
        </div>
      </section>

      {/* Modal Criar Evento */}
      <Dialog open={isCriarEventoOpen} onOpenChange={setIsCriarEventoOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Criar Novo Evento</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                Preencha as informações para criar um novo evento
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="nomeEvento" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Nome do Evento
                  </Label>
                  <Input
                    id="nomeEvento"
                    placeholder="Nome do evento"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="dataEvento" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Data
                  </Label>
                  <Input
                    id="dataEvento"
                    type="date"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="localEvento" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Local
                  </Label>
                  <Input
                    id="localEvento"
                    placeholder="Local do evento"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setIsCriarEventoOpen(false)}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  alert('Evento criado com sucesso!');
                  setIsCriarEventoOpen(false);
                }}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                Criar Evento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Adicionar Jogador */}
      <Dialog open={isAdicionarJogadorOpen} onOpenChange={setIsAdicionarJogadorOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Adicionar Novo Jogador</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                Preencha as informações para adicionar um novo jogador
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="nomeJogador" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Nome Completo
                  </Label>
                  <Input
                    id="nomeJogador"
                    placeholder="Nome do jogador"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="posicaoJogador" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Posição
                  </Label>
                  <select
                    id="posicaoJogador"
                    className="w-full h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  >
                    <option value="atacante">Atacante</option>
                    <option value="meio-campo">Meio-campo</option>
                    <option value="defensor">Defensor</option>
                    <option value="goleiro">Goleiro</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setIsAdicionarJogadorOpen(false)}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  alert('Jogador adicionado com sucesso!');
                  setIsAdicionarJogadorOpen(false);
                }}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <UserPlus className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                Adicionar Jogador
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Agendar Jogo */}
      <Dialog open={isAgendarJogoOpen} onOpenChange={setIsAgendarJogoOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Agendar Novo Jogo</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                Preencha as informações para agendar um novo jogo
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="adversario" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Adversário
                  </Label>
                  <Input
                    id="adversario"
                    placeholder="Nome do time adversário"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="dataJogo" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Data
                  </Label>
                  <Input
                    id="dataJogo"
                    type="date"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="localJogo" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Local
                  </Label>
                  <Input
                    id="localJogo"
                    placeholder="Local do jogo"
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setIsAgendarJogoOpen(false)}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  alert('Jogo agendado com sucesso!');
                  setIsAgendarJogoOpen(false);
                }}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Calendar className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                Agendar Jogo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAdmin;