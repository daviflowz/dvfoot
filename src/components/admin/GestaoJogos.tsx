// Gestão completa de jogos para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  Trophy,
  Target,
  PencilSimple,
  Trash,
  CheckCircle,
  WarningCircle,
  Lightning
} from 'phosphor-react';
import { jogos } from '../../data/mockData';

const GestaoJogos: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('todos');
  const [isAgendarJogoOpen, setIsAgendarJogoOpen] = useState(false);
  const [novoJogo, setNovoJogo] = useState({
    adversario: '',
    data: '',
    horario: '',
    local: ''
  });
  
  const statusOptions = [
    { value: 'todos', label: 'Todos os Jogos' },
    { value: 'agendado', label: 'Agendados' },
    { value: 'finalizado', label: 'Finalizados' }
  ];

  const jogosFiltrados = jogos.filter(jogo => 
    filterStatus === 'todos' || jogo.status === filterStatus
  );

  const estatisticas = {
    total: jogos.length,
    agendados: jogos.filter(j => j.status === 'agendado').length,
    finalizados: jogos.filter(j => j.status === 'finalizado').length,
    vitorias: jogos.filter(j => j.status === 'finalizado' && j.resultado && j.resultado.gols > j.resultado.golsAdversario).length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'agendado': return <Clock className="w-4 h-4" />;
      case 'finalizado': return <CheckCircle className="w-4 h-4" />;
      case 'cancelado': return <WarningCircle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };



  const handleAgendarJogo = () => {
    setIsAgendarJogoOpen(true);
  };

  const handleSubmitNovoJogo = () => {
    // Validar campos
    if (!novoJogo.adversario || !novoJogo.data || !novoJogo.horario || !novoJogo.local) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Criar novo jogo
    const jogoId = (jogos.length + 1).toString();
    const novoJogoCompleto = {
      id: jogoId,
      adversario: novoJogo.adversario,
      data: novoJogo.data,
      horario: novoJogo.horario,
      local: novoJogo.local,
      status: 'agendado' as const,
      presencas: []
    };

    // Em uma aplicação real, isso seria uma chamada para API
    console.log('Novo jogo agendado:', novoJogoCompleto);
    
    // Limpar formulário e fechar modal
    setNovoJogo({
      adversario: '',
      data: '',
      horario: '',
      local: ''
    });
    setIsAgendarJogoOpen(false);
    
    // Mostrar mensagem de sucesso
    alert('Jogo agendado com sucesso!');
  };

  const handleCancelarAgendamento = () => {
    setNovoJogo({
      adversario: '',
      data: '',
      horario: '',
      local: ''
    });
    setIsAgendarJogoOpen(false);
  };

  const handleEditarJogo = (jogo: any) => {
    console.log('Editar jogo:', jogo);
    alert(`Editando jogo vs ${jogo.adversario}`);
  };

  const handleExcluirJogo = (jogo: any) => {
    if (confirm(`Tem certeza que deseja excluir o jogo vs ${jogo.adversario}?`)) {
      console.log('Excluindo jogo:', jogo);
      alert(`Jogo vs ${jogo.adversario} excluído com sucesso!`);
    }
  };

  const handleVerConfirmacoes = (jogo: any) => {
    console.log('Ver confirmações do jogo:', jogo);
    alert(`Confirmações do jogo vs ${jogo.adversario}:\n${jogo.presencas.filter((p: any) => p.confirmou).length}/${jogo.presencas.length} confirmados`);
  };

  const handleRegistrarJogo = (jogo: any) => {
    console.log('Registrar resultado do jogo:', jogo);
    alert(`Registrando resultado do jogo vs ${jogo.adversario}`);
  };

  return (
    <div className="space-y-3 sm:space-y-6 animate-fade-in px-4">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-[#1E293B]">Gestão de Jogos</h1>
          <p className="text-sm sm:text-base text-[#1E293B]/70">
            Agende jogos e registre resultados
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <Card className="bg-white shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-[#4C1D95]/10 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95]" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B]">{estatisticas.total}</p>
                  <p className="text-xs text-[#1E293B]/70">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-[#3B82F6]/10 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B]">{estatisticas.agendados}</p>
                  <p className="text-xs text-[#1E293B]/70">Próximos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-[#22C55E]/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B]">{estatisticas.finalizados}</p>
                  <p className="text-xs text-[#1E293B]/70">Finalizados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-[#F59E0B]/10 rounded-lg">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B]">{estatisticas.vitorias}</p>
                  <p className="text-xs text-[#1E293B]/70">Vitórias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-center">
        <Card className="bg-white shadow-card">
          <CardContent className="p-3 sm:p-6">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-wrap gap-2 justify-center">
                {statusOptions.map(option => (
                  <Button
                    key={option.value}
                    variant={filterStatus === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(option.value)}
                    className={`text-xs sm:text-sm ${filterStatus === option.value ? "shadow-glow" : ""}`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              
              <Button 
                className="bg-gradient-to-r from-[#4C1D95] to-[#3B82F6] text-white shadow-lg hover:shadow-xl w-full sm:w-auto"
                onClick={handleAgendarJogo}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="text-sm">Agendar Jogo</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Jogos */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl w-full">
          {jogosFiltrados.map((jogo, index) => (
            <Card key={jogo.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-card md:hover:shadow-xl transition-all duration-300 animate-scale-in overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
              <CardContent className="p-0">
                {/* Header com gradiente */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 text-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-white/20 rounded-lg">
                        {getStatusIcon(jogo.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          vs {jogo.adversario}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {new Date(jogo.data).toLocaleDateString('pt-BR', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-1.5 h-7 w-7 hover:bg-blue-50"
                          onClick={() => handleEditarJogo(jogo)}
                        >
                          <PencilSimple className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-1.5 h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleExcluirJogo(jogo)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                        {jogo.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4 space-y-4">
                  {/* Informações do jogo */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="flex flex-col items-center space-y-1">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <p className="text-sm font-medium text-gray-900">{jogo.horario}</p>
                      <p className="text-xs text-gray-500">Horário</p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <p className="text-sm font-medium text-gray-900 truncate w-full">{jogo.local}</p>
                      <p className="text-xs text-gray-500">Local</p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-1">
                      <Users className="w-5 h-5 text-indigo-500" />
                      <p className="text-sm font-medium text-gray-900">
                        {jogo.presencas.filter(p => p.confirmou).length}/{jogo.presencas.length}
                      </p>
                      <p className="text-xs text-gray-500">Confirmados</p>
                    </div>
                  </div>

                  {/* Resultado (se finalizado) */}
                  {jogo.status === 'finalizado' && jogo.resultado && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">Resultado Final</h4>
                        <div className="text-3xl font-bold">
                          <span className={jogo.resultado.gols > jogo.resultado.golsAdversario ? 'text-green-600' : 
                                         jogo.resultado.gols < jogo.resultado.golsAdversario ? 'text-red-600' : 'text-yellow-600'}>
                            {jogo.resultado.gols} - {jogo.resultado.golsAdversario}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex gap-2">
                    {jogo.status === 'agendado' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                          onClick={() => handleVerConfirmacoes(jogo)}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Confirmações
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-200"
                          onClick={() => handleRegistrarJogo(jogo)}
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Registrar
                        </Button>
                      </>
                    )}
                    
                    {jogo.status === 'finalizado' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-purple-50 hover:border-purple-300"
                        onClick={() => alert(`Detalhes do jogo vs ${jogo.adversario}:\nResultado: ${jogo.resultado?.gols} - ${jogo.resultado?.golsAdversario}`)}
                      >
                        <Lightning className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {jogosFiltrados.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhum jogo encontrado</h3>
                <p className="text-muted-foreground">
                  {filterStatus === 'todos' 
                    ? 'Agende o primeiro jogo do time'
                    : `Nenhum jogo ${filterStatus} encontrado`
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Primeiro Jogo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal Agendar Jogo */}
      <Dialog open={isAgendarJogoOpen} onOpenChange={setIsAgendarJogoOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Agendar Novo Jogo</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                Preencha as informações para agendar um novo jogo
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="adversario" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Adversário
                    </Label>
                    <Input
                      id="adversario"
                      placeholder="Nome do time adversário"
                      value={novoJogo.adversario}
                      onChange={(e) => setNovoJogo(prev => ({ ...prev, adversario: e.target.value }))}
                      className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="local" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Local
                    </Label>
                    <Input
                      id="local"
                      placeholder="Local do jogo"
                      value={novoJogo.local}
                      onChange={(e) => setNovoJogo(prev => ({ ...prev, local: e.target.value }))}
                      className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="data" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Data
                    </Label>
                    <Input
                      id="data"
                      type="date"
                      value={novoJogo.data}
                      onChange={(e) => setNovoJogo(prev => ({ ...prev, data: e.target.value }))}
                      className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="horario" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Horário
                    </Label>
                    <Input
                      id="horario"
                      type="time"
                      value={novoJogo.horario}
                      onChange={(e) => setNovoJogo(prev => ({ ...prev, horario: e.target.value }))}
                      className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={handleCancelarAgendamento}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmitNovoJogo}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Trophy className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                Agendar Jogo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoJogos;