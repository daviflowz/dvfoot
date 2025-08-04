import { useState, useCallback, useMemo } from 'react';
import { Jogador } from '../types';
import { playerService, PlayerFilters, PlayerStats } from '../services/playerService';

interface LoadingState {
  header: boolean;
  filters: boolean;
  stats: boolean;
  players: boolean;
}

export const usePlayersOptimized = () => {
  // Carregar dados síncronamente na inicialização
  const initialStats = playerService.getPlayerStats();
  const initialPlayers = playerService.getAllPlayers();
  
  const [players, setPlayers] = useState<Jogador[]>(initialPlayers);
  const [stats, setStats] = useState<PlayerStats | null>(initialStats);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    header: false,
    filters: false,
    stats: false,
    players: false
  });
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<PlayerFilters>({
    searchTerm: '',
    position: 'todos',
    sortBy: 'nome'
  });

  // Dados já carregados síncronamente na inicialização

  // Filtrar jogadores quando filtros mudarem (otimizado)
  const filteredPlayersMemo = useMemo(() => {
    if (!players.length) return [];
    
    let filtered = [...players];

    // Filtrar por termo de busca
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(player =>
        player.nome.toLowerCase().includes(searchTerm) ||
        player.posicao.toLowerCase().includes(searchTerm)
      );
    }

    // Filtrar por posição
    if (filters.position && filters.position !== 'todos') {
      filtered = filtered.filter(player => player.posicao === filters.position);
    }

    // Ordenar
    switch (filters.sortBy) {
      case 'nome':
        filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case 'presenca':
        filtered.sort((a, b) => b.percentualPresenca - a.percentualPresenca);
        break;
      case 'idade':
        filtered.sort((a, b) => a.idade - b.idade);
        break;
    }

    return filtered;
  }, [players, filters]);

  // Atualizar filtros (debounced)
  const updateFilters = useCallback((newFilters: Partial<PlayerFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Buscar jogador por ID
  const getPlayerById = useCallback((id: string): Jogador | undefined => {
    return players.find(player => player.id === id);
  }, [players]);

  // Criar jogador
  const createPlayer = useCallback(async (playerData: Omit<Jogador, 'id'>): Promise<Jogador | null> => {
    try {
      setLoadingState(prev => ({ ...prev, players: true }));
      const newPlayer = await playerService.createPlayer(playerData);
      setPlayers(prev => [...prev, newPlayer]);
      
      // Atualizar estatísticas
      const newStats = playerService.getPlayerStats();
      setStats(newStats);
      
      return newPlayer;
    } catch (err) {
      setError('Erro ao criar jogador');
      console.error('Erro ao criar jogador:', err);
      return null;
    } finally {
      setLoadingState(prev => ({ ...prev, players: false }));
    }
  }, []);

  // Atualizar jogador
  const updatePlayer = useCallback(async (id: string, playerData: Partial<Jogador>): Promise<boolean> => {
    try {
      setLoadingState(prev => ({ ...prev, players: true }));
      const updatedPlayer = await playerService.updatePlayer(id, playerData);
      
      if (updatedPlayer) {
        setPlayers(prev => 
          prev.map(player => 
            player.id === id ? updatedPlayer : player
          )
        );
        
        // Atualizar estatísticas
        const newStats = playerService.getPlayerStats();
        setStats(newStats);
        
        return true;
      }
      return false;
    } catch (err) {
      setError('Erro ao atualizar jogador');
      console.error('Erro ao atualizar jogador:', err);
      return false;
    } finally {
      setLoadingState(prev => ({ ...prev, players: false }));
    }
  }, []);

  // Excluir jogador
  const deletePlayer = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoadingState(prev => ({ ...prev, players: true }));
      const success = await playerService.deletePlayer(id);
      
      if (success) {
        setPlayers(prev => prev.filter(player => player.id !== id));
        
        // Atualizar estatísticas
        const newStats = playerService.getPlayerStats();
        setStats(newStats);
        
        return true;
      }
      return false;
    } catch (err) {
      setError('Erro ao excluir jogador');
      console.error('Erro ao excluir jogador:', err);
      return false;
    } finally {
      setLoadingState(prev => ({ ...prev, players: false }));
    }
  }, []);

  // Obter posições disponíveis
  const getAvailablePositions = useCallback(() => {
    return playerService.getAvailablePositions();
  }, []);

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Estados de loading específicos
  const isLoading = loadingState.header || loadingState.filters || loadingState.stats || loadingState.players;
  const isHeaderLoading = loadingState.header;
  const isFiltersLoading = loadingState.filters;
  const isStatsLoading = loadingState.stats;
  const isPlayersLoading = loadingState.players;
  
  // Verificar se os dados estão prontos
  const isDataReady = !isLoading && players.length > 0 && stats !== null;

  return {
    // Estado
    players,
    filteredPlayers: filteredPlayersMemo,
    stats,
    loading: isLoading,
    error,
    filters,
    
    // Estados de loading específicos
    isHeaderLoading,
    isFiltersLoading,
    isStatsLoading,
    isPlayersLoading,
    isDataReady,
    
    // Ações
    updateFilters,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    getAvailablePositions,
    clearError
  };
}; 