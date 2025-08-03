import { Jogador } from '../types';
import { jogadores } from '../data/mockData';

export interface PlayerFilters {
  searchTerm: string;
  position: string;
  sortBy: 'nome' | 'presenca' | 'idade';
}

export interface PlayerStats {
  totalJogadores: number;
  presencaMedia: number;
  totalTrofeus: number;
  totalMedalhas: number;
}

class PlayerService {
  // Buscar todos os jogadores
  getAllPlayers(): Jogador[] {
    return jogadores;
  }

  // Filtrar e ordenar jogadores
  getFilteredPlayers(filters: PlayerFilters): Jogador[] {
    const filtered = jogadores.filter(jogador => {
      const matchSearch = jogador.nome.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         jogador.posicao.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchPosition = filters.position === 'todos' || jogador.posicao.toLowerCase() === filters.position;
      return matchSearch && matchPosition;
    });

    // Ordenação
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'nome':
          return a.nome.localeCompare(b.nome);
        case 'presenca':
          return b.percentualPresenca - a.percentualPresenca;
        case 'idade':
          return b.idade - a.idade;
        default:
          return 0;
      }
    });

    return filtered;
  }

  // Buscar jogador por ID
  getPlayerById(id: string): Jogador | undefined {
    return jogadores.find(jogador => jogador.id === id);
  }

  // Buscar jogadores por posição
  getPlayersByPosition(position: string): Jogador[] {
    return jogadores.filter(jogador => 
      jogador.posicao.toLowerCase() === position.toLowerCase()
    );
  }

  // Obter estatísticas gerais
  getPlayerStats(): PlayerStats {
    const totalJogadores = jogadores.length;
    const presencaMedia = Math.round(
      jogadores.reduce((acc, j) => acc + j.percentualPresenca, 0) / totalJogadores
    );
    const totalTrofeus = jogadores.reduce((acc, j) => acc + j.trofeus.length, 0);
    const totalMedalhas = jogadores.reduce((acc, j) => acc + j.medalhas.length, 0);

    return {
      totalJogadores,
      presencaMedia,
      totalTrofeus,
      totalMedalhas
    };
  }

  // Obter posições disponíveis
  getAvailablePositions(): string[] {
    const positions = jogadores.map(j => j.posicao);
    return ['todos', ...Array.from(new Set(positions))];
  }

  // Simular criação de jogador
  async createPlayer(playerData: Omit<Jogador, 'id'>): Promise<Jogador> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPlayer: Jogador = {
      id: Date.now().toString(),
      ...playerData
    };

    // Em um app real, isso seria uma chamada para API
    // jogadores.push(newPlayer);
    
    return newPlayer;
  }

  // Simular atualização de jogador
  async updatePlayer(id: string, playerData: Partial<Jogador>): Promise<Jogador | null> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const playerIndex = jogadores.findIndex(j => j.id === id);
    if (playerIndex === -1) return null;

    const updatedPlayer = { ...jogadores[playerIndex], ...playerData };
    // jogadores[playerIndex] = updatedPlayer;
    
    return updatedPlayer;
  }

  // Simular exclusão de jogador
  async deletePlayer(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const playerIndex = jogadores.findIndex(j => j.id === id);
    if (playerIndex === -1) return false;

    // jogadores.splice(playerIndex, 1);
    return true;
  }
}

export const playerService = new PlayerService(); 