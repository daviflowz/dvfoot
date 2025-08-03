// Gestão completa de jogadores para administradores
import React, { useState } from 'react';
import { Users, Plus, Trophy, Star, TrendUp } from 'phosphor-react';
import { usePlayersOptimized } from '../../hooks/use-players-optimized';
import PageHeader from '../common/PageHeader';
import SearchFilters from '../common/SearchFilters';
import PlayerCard from '../common/PlayerCard';
import EmptyState from '../common/EmptyState';
import { Jogador } from '../../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { UserPlus } from 'phosphor-react';

const GestaoJogadores: React.FC = () => {
  const {
    filteredPlayers,
    stats,
    error,
    filters,
    updateFilters,
    deletePlayer,
    isDataReady
  } = usePlayersOptimized();

  const [isCriarJogadorOpen, setIsCriarJogadorOpen] = useState(false);
  const [novoJogador, setNovoJogador] = useState({
    nome: '',
    posicao: 'atacante',
    idade: '',
    telefone: '',
    cpf: '',
    imagem: null as File | null
  });

  const handleSearchChange = (value: string) => {
    updateFilters({ searchTerm: value });
  };

  const handlePositionChange = (value: string) => {
    updateFilters({ position: value });
  };

  const handleSortChange = (value: string) => {
    updateFilters({ sortBy: value as 'nome' | 'presenca' | 'idade' });
  };

  const handleEditPlayer = (jogador: Jogador) => {
    // Implementar edição
    console.log('Editar jogador:', jogador);
  };

  const handleDeletePlayer = async (jogador: Jogador) => {
    if (confirm(`Tem certeza que deseja excluir ${jogador.nome}?`)) {
      await deletePlayer(jogador.id);
    }
  };

  const handleNewPlayer = () => {
    setIsCriarJogadorOpen(true);
  };

  const handleSubmitNovoJogador = () => {
    // Validar campos
    if (!novoJogador.nome || !novoJogador.posicao || !novoJogador.idade || !novoJogador.cpf) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Criar novo jogador
    const jogadorId = (filteredPlayers.length + 1).toString();
    const novoJogadorCompleto = {
      id: jogadorId,
      nome: novoJogador.nome,
      posicao: novoJogador.posicao as 'goleiro' | 'zagueiro' | 'lateral' | 'meio-campo' | 'atacante' | 'tecnico',
      idade: parseInt(novoJogador.idade),
      telefone: novoJogador.telefone,
      cpf: novoJogador.cpf,
      imagem: novoJogador.imagem,
      presenca: 0,
      jogos: 0,
      trofeus: 0,
      medalhas: 0,
      foto: novoJogador.imagem ? URL.createObjectURL(novoJogador.imagem) : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    };

    // Em uma aplicação real, isso seria uma chamada para API
    console.log('Novo jogador criado:', novoJogadorCompleto);
    
    // Limpar formulário e fechar modal
    setNovoJogador({
      nome: '',
      posicao: 'atacante',
      idade: '',
      telefone: '',
      cpf: '',
      imagem: null
    });
    setIsCriarJogadorOpen(false);
    
    // Mostrar mensagem de sucesso
    alert('Jogador adicionado com sucesso!');
  };

  const handleCancelarCriacao = () => {
    setNovoJogador({
      nome: '',
      posicao: 'atacante',
      idade: '',
      telefone: '',
      cpf: '',
      imagem: null
    });
    setIsCriarJogadorOpen(false);
  };

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNovoJogador({ ...novoJogador, imagem: file });
    }
  };

  // Estatísticas para o header
  const headerStats = stats ? [
    {
      title: 'Jogadores',
      value: stats!.totalJogadores,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Presença Média',
      value: `${stats!.presencaMedia}%`,
      icon: TrendUp,
      color: 'green'
    },
    {
      title: 'Troféus',
      value: stats!.totalTrofeus,
      icon: Trophy,
      color: 'yellow'
    },
    {
      title: 'Medalhas',
      value: stats!.totalMedalhas,
      icon: Star,
      color: 'purple'
    }
  ] : [];

  // Opções de filtro
  const filterOptions = [
    { value: 'todos', label: 'Todas Posições' },
    { value: 'goleiro', label: 'Goleiro' },
    { value: 'zagueiro', label: 'Zagueiro' },
    { value: 'lateral', label: 'Lateral' },
    { value: 'meio-campo', label: 'Meio-campo' },
    { value: 'atacante', label: 'Atacante' },
    { value: 'tecnico', label: 'Técnico' }
  ];

  // Opções de ordenação
  const sortOptions = [
    { value: 'nome', label: 'Nome' },
    { value: 'presenca', label: 'Presença' },
    { value: 'idade', label: 'Idade' }
  ];



  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-white text-center">
          <p className="text-red-200 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 space-y-6 animate-fade-in">
        {/* Header com estatísticas */}
        <div>
          <PageHeader
            title="Gestão do Elenco"
            description="Gerencie jogadores e comissão técnica"
            stats={headerStats}
            actionButton={isDataReady ? {
              label: "Novo Jogador",
              onClick: handleNewPlayer,
              icon: Plus
            } : undefined}
          />
        </div>

        {/* Filtros e Busca */}
        {isDataReady && (
          <div className="flex justify-center">
            <SearchFilters
              searchTerm={filters.searchTerm}
              onSearchChange={handleSearchChange}
              placeholder="Buscar jogadores..."
              filters={[
                {
                  label: 'Posição',
                  value: filters.position,
                  options: filterOptions,
                  onChange: handlePositionChange
                }
              ]}
              sortOptions={{
                value: filters.sortBy,
                options: sortOptions,
                onChange: handleSortChange
              }}
            />
          </div>
        )}

        {/* Lista de Jogadores */}
        <div>
          {!isDataReady ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando jogadores...</p>
              </div>
            </div>
          ) : filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
              {filteredPlayers.map((jogador, index) => (
                <div 
                  key={jogador.id} 
                  className="transition-smooth hover-lift w-full max-w-xl animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <PlayerCard
                    jogador={jogador}
                    onEdit={handleEditPlayer}
                    onDelete={handleDeletePlayer}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              type="search"
              title="Nenhum jogador encontrado"
              description="Tente ajustar os filtros ou termos de busca"
              suggestions={[
                'Verifique se o termo de busca está correto',
                'Tente usar filtros diferentes',
                'Adicione novos jogadores ao elenco'
              ]}
              actionButton={{
                label: 'Adicionar Jogador',
                onClick: handleNewPlayer,
                icon: Plus
              }}
            />
          )}
        </div>

        {/* Modal para criar novo jogador */}
        <Dialog open={isCriarJogadorOpen} onOpenChange={setIsCriarJogadorOpen}>
          <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
            <div className="flex flex-col h-full max-h-[90vh]">
              <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Adicionar Novo Jogador</DialogTitle>
                <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                  Preencha as informações para adicionar um novo jogador ao elenco
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
                <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="nome" className="text-xs sm:text-sm font-semibold text-gray-700">
                        Nome Completo
                      </Label>
                      <Input
                        id="nome"
                        placeholder="Nome do jogador"
                        value={novoJogador.nome}
                        onChange={(e) => setNovoJogador({ ...novoJogador, nome: e.target.value })}
                        className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="cpf" className="text-xs sm:text-sm font-semibold text-gray-700">
                        CPF
                      </Label>
                      <Input
                        id="cpf"
                        type="text"
                        placeholder="CPF do jogador"
                        value={novoJogador.cpf}
                        onChange={(e) => setNovoJogador({ ...novoJogador, cpf: e.target.value })}
                        className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="imagem" className="text-xs sm:text-sm font-semibold text-gray-700">
                        Foto do Jogador
                      </Label>
                      <div className="space-y-2">
                        <Input
                          id="imagem"
                          type="file"
                          accept="image/*"
                          onChange={handleImagemChange}
                          className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                        {novoJogador.imagem && (
                          <div className="mt-2">
                            <img
                              src={URL.createObjectURL(novoJogador.imagem)}
                              alt="Preview"
                              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="posicao" className="text-xs sm:text-sm font-semibold text-gray-700">
                        Posição
                      </Label>
                      <select
                        id="posicao"
                        value={novoJogador.posicao}
                        onChange={(e) => setNovoJogador({ ...novoJogador, posicao: e.target.value })}
                        className="w-full h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100"
                      >
                        <option value="goleiro">Goleiro</option>
                        <option value="zagueiro">Zagueiro</option>
                        <option value="lateral">Lateral</option>
                        <option value="meio-campo">Meio-campo</option>
                        <option value="atacante">Atacante</option>
                        <option value="tecnico">Técnico</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="idade" className="text-xs sm:text-sm font-semibold text-gray-700">
                        Idade
                      </Label>
                      <Input
                        id="idade"
                        type="number"
                        placeholder="Idade"
                        value={novoJogador.idade}
                        onChange={(e) => setNovoJogador({ ...novoJogador, idade: e.target.value })}
                        className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100"
                      />
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="telefone" className="text-xs sm:text-sm font-semibold text-gray-700">
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        placeholder="Telefone (opcional)"
                        value={novoJogador.telefone}
                        onChange={(e) => setNovoJogador({ ...novoJogador, telefone: e.target.value })}
                        className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
                <Button 
                  variant="outline" 
                  onClick={handleCancelarCriacao}
                  className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-100"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmitNovoJogador}
                  className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-100"
                >
                  <UserPlus className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                  Adicionar Jogador
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default GestaoJogadores;