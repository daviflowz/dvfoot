import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../hooks/use-navigation';
import { Button } from '../ui/button';
import {
  House,
  Users,
  SoccerBall,
  Calendar,
  Chats,
  User,
  SignOut,
  Bell,
  MagnifyingGlass
} from 'phosphor-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';

const Sidebar: React.FC = () => {
  const { usuario, logout } = useAuth();
  const { navigateTo, isActiveRoute } = useNavigation();

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
    { id: '/jogador/perfil', label: 'Perfil', icon: User },
  ];

  const menuItems = usuario?.tipo === 'administrador' ? menuAdministrador : menuJogador;

  const handleLogout = () => {
    logout();
    navigateTo('/login');
  };

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed left-0 top-16 z-40 shadow-md">
      {/* Menu de Navegação */}
      <nav className="flex-1 p-4 space-y-2 pt-6">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = isActiveRoute(item.id);
          const isDisabled = item.disabled;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              disabled={isDisabled}
              className={`w-full justify-start h-12 px-4 rounded-xl transition-all duration-300 ${
                isDisabled
                  ? 'text-gray-400 cursor-not-allowed opacity-50'
                  : isActive 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
              onClick={() => !isDisabled && navigateTo(item.id)}
              title={isDisabled ? 'Funcionalidade em desenvolvimento' : ''}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </nav>

      {/* Footer com Perfil e Logout */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* Notificações e Busca */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="flex-1 p-2">
            <MagnifyingGlass className="w-4 h-4" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <span className="absolute w-4 h-4 flex items-center justify-center rounded-full bg-[#EF4444] text-white text-xs font-bold border-2 border-white" 
                  style={{top: 0, right: 0, transform: 'translate(20%, -20%)'}}>
              3
            </span>
          </div>
        </div>

        {/* Perfil do Usuário */}
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
          {usuario?.tipo === 'administrador' ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center space-x-3 cursor-pointer flex-1">
                  <img
                    src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                    alt={usuario?.nome}
                    className="w-10 h-10 rounded-xl object-cover border-2"
                    style={{ borderColor: '#1E293B' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{usuario?.nome}</p>
                    <p className="text-xs text-primary font-medium capitalize">{usuario?.tipo}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Perfil</DialogTitle>
                  <DialogDescription>Informações do perfil do administrador e opção para sair da conta.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-2 mt-2">
                  <img
                    src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                    alt={usuario?.nome}
                    className="w-16 h-16 rounded-xl object-cover border-2"
                    style={{ borderColor: '#1E293B' }}
                  />
                  <span className="text-lg font-semibold text-[#1E293B]">{usuario?.nome}</span>
                  <span className="text-sm text-primary font-medium capitalize">{usuario?.tipo}</span>
                  <Button variant="destructive" className="mt-4 w-full" onClick={handleLogout}>
                    <SignOut className="w-4 h-4 mr-2" /> Sair da Conta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <div className="flex items-center space-x-3 flex-1">
              <img
                src={usuario?.foto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                alt={usuario?.nome}
                className="w-10 h-10 rounded-xl object-cover border-2"
                style={{ borderColor: '#1E293B' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{usuario?.nome}</p>
                <p className="text-xs text-primary font-medium capitalize">{usuario?.tipo}</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <SignOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 