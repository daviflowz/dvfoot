// Componente de navegação responsiva
import React, { useState } from 'react';
import { 
  House, 
  Users, 
  Calendar, 
  SoccerBall, 
  Chats, 
  Bell,
  MagnifyingGlass,
  Trophy
} from 'phosphor-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../hooks/use-navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const Navigation: React.FC = () => {
  const { usuario } = useAuth();
  const { navigateTo, isActiveRoute } = useNavigation();
  const [isNotificacoesOpen, setIsNotificacoesOpen] = useState(false);
  const [isConfiguracoesOpen, setIsConfiguracoesOpen] = useState(false);

  const menuAdministrador = [
    { id: '/admin', label: 'Início', icon: House },
    { id: '/admin/elenco', label: 'Elenco', icon: Users },
    { id: '/admin/jogos', label: 'Jogos', icon: SoccerBall },
    { id: '/admin/eventos', label: 'Eventos', icon: Calendar },
    { id: '/admin/noticias', label: 'Central', icon: Chats, disabled: true },
  ];

  const menuJogador = [
    { id: '/jogador', label: 'Início', icon: House },
    { id: '/jogador/jogos', label: 'Jogos', icon: SoccerBall },
    { id: '/jogador/eventos', label: 'Eventos', icon: Calendar },
    { id: '/jogador/noticias', label: 'Central', icon: Chats, disabled: true },
    { id: '/jogador/perfil', label: 'Perfil', icon: Users },
  ];

  const menuItems = usuario?.tipo === 'administrador' ? menuAdministrador : menuJogador;

  return (
    <>
      {/* Header Mobile-First - Apenas para mobile */}
      <header className="sticky top-0 z-40 glass-morphism animate-slide-in-bottom lg:hidden">
        <div className="flex h-12 sm:h-14 items-center justify-between px-2 sm:px-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#4C1D95] to-[#3B82F6] flex items-center justify-center shadow-card">
                <Trophy className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-xs sm:text-lg font-bold bg-gradient-to-r from-[#4C1D95] via-[#3B82F6] to-[#4C1D95] bg-clip-text text-transparent leading-tight">
                Jogo em Foco
              </h1>
              <p className="text-[10px] sm:text-xs text-[#1E293B] font-medium leading-tight">
                {usuario?.tipo === 'administrador' ? '⚡ Admin' : '🎯 Pro'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex p-2">
              <MagnifyingGlass className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="relative">
              <button 
                onClick={() => setIsNotificacoesOpen(true)}
                className="relative p-2 hover:bg-gray-100/80 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white text-[10px] font-bold shadow-lg border-2 border-white animate-pulse">
                  3
                </span>
              </button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 p-1 sm:p-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold leading-none text-[#1E293B]">{usuario?.nome}</p>
                <p className="text-[10px] text-[#4C1D95] font-medium capitalize">{usuario?.tipo}</p>
              </div>
              {usuario?.tipo === 'administrador' ? (
                <Dialog open={isConfiguracoesOpen} onOpenChange={setIsConfiguracoesOpen}>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4C1D95]/20 to-[#3B82F6]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-200"></div>
                      <img
                        src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                        alt={usuario?.nome}
                        className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22C55E] border-2 border-white rounded-full shadow-sm"></div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full h-full max-w-none max-h-none rounded-none bg-gradient-to-br from-white to-gray-50 border-0 shadow-none">
                    <div className="flex flex-col h-full">
                      <DialogHeader className="text-center pb-4 pt-6 flex-shrink-0">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">Configurações do Time</DialogTitle>
                        <DialogDescription className="text-gray-600 mt-2 text-base">
                          Gerencie as configurações e informações do seu time
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto px-6 py-4">
                        <div className="space-y-6">
                          {/* Informações Básicas */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Informações Básicas</h3>
                            
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="nomeTime" className="text-sm font-semibold text-gray-700">
                                  Nome do Time
                                </Label>
                                <Input
                                  id="nomeTime"
                                  placeholder="Nome do time"
                                  defaultValue="Jogo em Foco"
                                  className="h-12 text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100"
                                />
                              </div>
                              

                            </div>
                          </div>
                          
                          {/* Logo do Time */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Logo do Time</h3>
                            
                            <div className="space-y-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
                                  <Trophy className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1">
                                  <Label htmlFor="logoTime" className="text-sm font-semibold text-gray-700">
                                    Upload da Logo
                                  </Label>
                                  <Input
                                    id="logoTime"
                                    type="file"
                                    accept="image/*"
                                    className="h-12 text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Formatos aceitos: PNG, JPG, SVG (máx. 2MB)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          

                          

                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-gray-100 px-6 pb-6 flex-shrink-0">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsConfiguracoesOpen(false)}
                          className="flex-1 h-12 text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-100"
                        >
                          Cancelar
                        </Button>
                        <Button 
                          onClick={() => {
                            alert('Configurações salvas com sucesso!');
                            setIsConfiguracoesOpen(false);
                          }}
                          className="flex-1 h-12 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-100"
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          Salvar Configurações
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/20 to-[#4C1D95]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-200"></div>
                  <img
                    src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                    alt={usuario?.nome}
                    className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-white shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3B82F6] border-2 border-white rounded-full shadow-sm"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Barra de navegação inferior mobile */}
      <nav className="fixed bottom-[-1px] left-0 right-0 w-full z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-around lg:hidden">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveRoute(item.id);
          const isDisabled = item.disabled;
          
          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && navigateTo(item.id)}
              disabled={isDisabled}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-100 ${
                isDisabled 
                  ? 'text-gray-400 cursor-not-allowed opacity-50' 
                  : isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
              }`}
              style={{ minWidth: 0 }}
              title={isDisabled ? 'Funcionalidade em desenvolvimento' : ''}
            >
              <IconComponent className="w-6 h-6 mb-0.5" />
              <span className="text-xs font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal de Notificações */}
      <Dialog open={isNotificacoesOpen} onOpenChange={setIsNotificacoesOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Notificações</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                Suas notificações mais recentes
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
              <div className="space-y-3 sm:space-y-4">
                {/* Notificação 1 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">Novo jogo agendado</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Jogo vs FC Rivais foi agendado para 24/07/2024 às 15:00</p>
                      <span className="text-xs text-gray-500 mt-2 block">Há 2 horas</span>
                    </div>
                  </div>
                </div>

                {/* Notificação 2 */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">Treino confirmado</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Treino técnico confirmado para 25/07/2024 às 19:00</p>
                      <span className="text-xs text-gray-500 mt-2 block">Há 4 horas</span>
                    </div>
                  </div>
                </div>

                {/* Notificação 3 */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">Novo jogador adicionado</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">João Silva foi adicionado ao elenco como atacante</p>
                      <span className="text-xs text-gray-500 mt-2 block">Ontem</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setIsNotificacoesOpen(false)}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-100"
              >
                Fechar
              </Button>
              <Button 
                onClick={() => {
                  alert('Todas as notificações foram marcadas como lidas!');
                  setIsNotificacoesOpen(false);
                }}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-100"
              >
                <Bell className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                Marcar como lidas
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation; 