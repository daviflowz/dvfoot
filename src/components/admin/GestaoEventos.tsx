// Gestão completa de eventos para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle,
  Clock,
  WarningCircle,
  Lightning,
  Plus,
  PencilSimple,
  Trash,
  Archive
} from 'phosphor-react';
import { eventos } from '../../data/mockData';

const GestaoEventos: React.FC = () => {
  const [filterType, setFilterType] = useState('todos');
  const [isCriarEventoOpen, setIsCriarEventoOpen] = useState(false);
  const [isEditarEventoOpen, setIsEditarEventoOpen] = useState(false);
  const [eventoEmEdicao, setEventoEmEdicao] = useState<any>(null);
  const [novoEvento, setNovoEvento] = useState({
    nome: '',
    descricao: '',
    data: '',
    horario: '',
    local: '',
    tipo: 'social'
  });
  
  const tiposEventos = [
    { value: 'todos', label: 'Todos os Eventos' },
    { value: 'social', label: 'Sociais' },
    { value: 'treino', label: 'Treinos' },
    { value: 'reuniao', label: 'Reuniões' }
  ];

  const eventosFiltrados = eventos.filter(evento => 
    filterType === 'todos' || evento.tipo === filterType
  );

  const estatisticas = {
    total: eventos.length,
    proximosEventos: eventos.filter(e => new Date(e.data) > new Date()).length,
    eventosPassados: eventos.filter(e => new Date(e.data) <= new Date()).length,
    mediaConfirmacoes: Math.round(
      eventos.reduce((acc, e) => acc + (e.presencas.filter(p => p.confirmou).length / e.presencas.length * 100), 0) / eventos.length
    )
  };

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'social': return <Lightning className="w-5 h-5" />;
      case 'treino': return <Lightning className="w-5 h-5" />;
      case 'reuniao': return <Lightning className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'social': return 'text-purple-600 bg-purple-100';
      case 'treino': return 'text-blue-600 bg-blue-100';
      case 'reuniao': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isEventoPendente = (data: string) => new Date(data) > new Date();

  const handleCriarEvento = () => {
    setIsCriarEventoOpen(true);
  };

  const handleSubmitNovoEvento = () => {
    // Validar campos
    if (!novoEvento.nome || !novoEvento.data || !novoEvento.horario || !novoEvento.local) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Criar novo evento
    const eventoId = (eventos.length + 1).toString();
    const novoEventoCompleto = {
      id: eventoId,
      nome: novoEvento.nome,
      descricao: novoEvento.descricao,
      data: novoEvento.data,
      horario: novoEvento.horario,
      local: novoEvento.local,
      tipo: novoEvento.tipo as 'social' | 'treino' | 'reuniao',
      presencas: []
    };

    // Em uma aplicação real, isso seria uma chamada para API
    console.log('Novo evento criado:', novoEventoCompleto);
    
    // Limpar formulário e fechar modal
    setNovoEvento({
      nome: '',
      descricao: '',
      data: '',
      horario: '',
      local: '',
      tipo: 'social'
    });
    setIsCriarEventoOpen(false);
    
    // Mostrar mensagem de sucesso
    alert('Evento criado com sucesso!');
  };

  const handleCancelarCriacao = () => {
    setNovoEvento({
      nome: '',
      descricao: '',
      data: '',
      horario: '',
      local: '',
      tipo: 'social'
    });
    setIsCriarEventoOpen(false);
  };

  const handleEditarEvento = (evento: any) => {
    setEventoEmEdicao(evento);
    setIsEditarEventoOpen(true);
  };

  const handleExcluirEvento = (evento: any) => {
    if (confirm(`Tem certeza que deseja excluir o evento "${evento.nome}"?`)) {
      console.log('Excluindo evento:', evento);
      alert(`Evento "${evento.nome}" excluído com sucesso!`);
    }
  };

  const handleVerConfirmacoes = (evento: any) => {
    const confirmados = evento.presencas.filter((p: any) => p.confirmou).length;
    const total = evento.presencas.length;
    const percentual = total > 0 ? Math.round((confirmados / total) * 100) : 0;
    
    console.log('Ver confirmações do evento:', evento);
    alert(`Confirmações do evento "${evento.nome}":\n${confirmados}/${total} confirmados (${percentual}%)`);
  };

  const handleSalvarEdicao = () => {
    if (!eventoEmEdicao) return;
    
    // Validar campos
    if (!eventoEmEdicao.nome || !eventoEmEdicao.data || !eventoEmEdicao.horario || !eventoEmEdicao.local) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Em uma aplicação real, isso seria uma chamada para API
    console.log('Evento editado:', eventoEmEdicao);
    
    // Fechar modal
    setIsEditarEventoOpen(false);
    setEventoEmEdicao(null);
    
    // Mostrar mensagem de sucesso
    alert('Evento editado com sucesso!');
  };

  const handleCancelarEdicao = () => {
    setIsEditarEventoOpen(false);
    setEventoEmEdicao(null);
  };

  return (
    <div className="space-y-3 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold">Gestão de Eventos</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Crie e gerencie eventos do time
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.proximosEventos}</p>
                  <p className="text-xs text-muted-foreground">Próximos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-info/10 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-info" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.mediaConfirmacoes}%</p>
                  <p className="text-xs text-muted-foreground">Média Confirmações</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card shadow-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 bg-warning/10 rounded-lg">
                  <Archive className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold">{estatisticas.eventosPassados}</p>
                  <p className="text-xs text-muted-foreground">Realizados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <div className="flex justify-center">
        <Card className="shadow-card">
          <CardContent className="p-3 sm:p-6">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-wrap gap-2 justify-center">
                {tiposEventos.map(tipo => (
                  <Button
                    key={tipo.value}
                    variant={filterType === tipo.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(tipo.value)}
                    className={`text-xs sm:text-sm ${filterType === tipo.value ? "shadow-glow" : ""}`}
                  >
                    {tipo.label}
                  </Button>
                ))}
              </div>
              
              <Button 
                className="gradient-primary shadow-glow"
                onClick={handleCriarEvento}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="text-sm">Criar Evento</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Eventos */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
          {eventosFiltrados.map((evento, index) => {
            const confirmacoes = evento.presencas.filter(p => p.confirmou).length;
            const totalJogadores = evento.presencas.length;
            const percentualConfirmacoes = (confirmacoes / totalJogadores) * 100;
            const isPendente = isEventoPendente(evento.data);

            return (
              <Card key={evento.id} className="bg-white/95 backdrop-blur-sm border-0 shadow-card md:hover:shadow-xl transition-all duration-300 animate-scale-in overflow-hidden" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-0">
                  {/* Header com gradiente */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 text-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 bg-white/20 rounded-lg ${getEventColor(evento.tipo)}`}>
                          {getEventIcon(evento.tipo)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            {evento.nome}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {new Date(evento.data).toLocaleDateString('pt-BR', { 
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
                            onClick={() => handleEditarEvento(evento)}
                          >
                            <PencilSimple className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-1.5 h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleExcluirEvento(evento)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">
                          {evento.tipo}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4 space-y-4">
                    {/* Descrição */}
                    <p className="text-sm text-gray-600">{evento.descricao}</p>

                    {/* Informações do evento */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center space-y-1">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <p className="text-sm font-medium text-gray-900">{evento.horario}</p>
                        <p className="text-xs text-gray-500">Horário</p>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-1">
                        <MapPin className="w-5 h-5 text-green-500" />
                        <p className="text-sm font-medium text-gray-900 truncate w-full">{evento.local}</p>
                        <p className="text-xs text-gray-500">Local</p>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-1">
                        <Users className="w-5 h-5 text-indigo-500" />
                        <p className="text-sm font-medium text-gray-900">
                          {confirmacoes}/{totalJogadores}
                        </p>
                        <p className="text-xs text-gray-500">Confirmados</p>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Confirmações</span>
                        <span className="text-gray-900 font-medium">{Math.round(percentualConfirmacoes)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentualConfirmacoes}%` }}
                        />
                      </div>
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => handleVerConfirmacoes(evento)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Ver Confirmações
                      </Button>
                      {isPendente && (
                        <Button 
                          size="sm" 
                          className="flex-1 bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg transition-all duration-200"
                          onClick={() => alert(`Lembrete enviado para o evento "${evento.nome}"!`)}
                        >
                          <WarningCircle className="w-4 h-4 mr-2" />
                          Enviar Lembrete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {eventosFiltrados.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lightning className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhum evento encontrado</h3>
                <p className="text-muted-foreground">
                  {filterType === 'todos' 
                    ? 'Crie o primeiro evento do time'
                    : `Nenhum evento do tipo "${filterType}" encontrado`
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Evento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal Criar Evento */}
      <Dialog open={isCriarEventoOpen} onOpenChange={setIsCriarEventoOpen}>
        <DialogContent className="w-[95vw] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] rounded-xl bg-white border-0 shadow-2xl backdrop-blur-sm mx-auto my-auto">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="text-center pb-2 pt-3 sm:pt-4 md:pt-6 flex-shrink-0">
              <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <Lightning className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <DialogTitle className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Criar Novo Evento</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-4">
                Preencha as informações para criar um novo evento
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 pb-4">
              <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="nome" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Nome do Evento
                    </Label>
                    <Input
                      id="nome"
                      placeholder="Nome do evento"
                      value={novoEvento.nome}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, nome: e.target.value }))}
                      className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="descricao" className="text-xs sm:text-sm font-semibold text-gray-700">
                      Descrição
                    </Label>
                    <Input
                      id="descricao"
                      placeholder="Descrição do evento (opcional)"
                      value={novoEvento.descricao}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, descricao: e.target.value }))}
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
                      value={novoEvento.data}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, data: e.target.value }))}
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
                      value={novoEvento.horario}
                      onChange={(e) => setNovoEvento(prev => ({ ...prev, horario: e.target.value }))}
                      className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="local" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Local
                  </Label>
                  <Input
                    id="local"
                    placeholder="Local do evento"
                    value={novoEvento.local}
                    onChange={(e) => setNovoEvento(prev => ({ ...prev, local: e.target.value }))}
                    className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="tipo" className="text-xs sm:text-sm font-semibold text-gray-700">
                    Tipo de Evento
                  </Label>
                  <select
                    id="tipo"
                    value={novoEvento.tipo}
                    onChange={(e) => setNovoEvento(prev => ({ ...prev, tipo: e.target.value }))}
                    className="w-full h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  >
                    <option value="social">Social</option>
                    <option value="treino">Treino</option>
                    <option value="reuniao">Reunião</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 lg:pt-6 mt-2 sm:mt-3 md:mt-4 lg:mt-6 border-t border-gray-100 px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={handleCancelarCriacao}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmitNovoEvento}
                className="flex-1 h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Lightning className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4 mr-1 sm:mr-1 md:mr-2" />
                Criar Evento
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Evento */}
      <Dialog open={isEditarEventoOpen} onOpenChange={setIsEditarEventoOpen}>
        <DialogContent className="w-full h-full max-w-none max-h-none rounded-none bg-gradient-to-br from-white to-gray-50 border-0 shadow-none">
          <DialogHeader className="text-center pb-6 pt-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <PencilSimple className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-3xl font-bold text-gray-900">Editar Evento</DialogTitle>
            <DialogDescription className="text-gray-600 mt-3 text-lg">
              Edite as informações do evento
            </DialogDescription>
          </DialogHeader>
          
          {eventoEmEdicao && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-nome" className="text-sm font-semibold text-gray-700">
                    Nome do Evento
                  </Label>
                  <Input
                    id="edit-nome"
                    placeholder="Nome do evento"
                    value={eventoEmEdicao.nome}
                    onChange={(e) => setEventoEmEdicao(prev => ({ ...prev, nome: e.target.value }))}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-descricao" className="text-sm font-semibold text-gray-700">
                    Descrição
                  </Label>
                  <Input
                    id="edit-descricao"
                    placeholder="Descrição do evento (opcional)"
                    value={eventoEmEdicao.descricao || ''}
                    onChange={(e) => setEventoEmEdicao(prev => ({ ...prev, descricao: e.target.value }))}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-data" className="text-sm font-semibold text-gray-700">
                    Data
                  </Label>
                  <Input
                    id="edit-data"
                    type="date"
                    value={eventoEmEdicao.data}
                    onChange={(e) => setEventoEmEdicao(prev => ({ ...prev, data: e.target.value }))}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-horario" className="text-sm font-semibold text-gray-700">
                    Horário
                  </Label>
                  <Input
                    id="edit-horario"
                    type="time"
                    value={eventoEmEdicao.horario}
                    onChange={(e) => setEventoEmEdicao(prev => ({ ...prev, horario: e.target.value }))}
                    className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-local" className="text-sm font-semibold text-gray-700">
                  Local
                </Label>
                <Input
                  id="edit-local"
                  placeholder="Local do evento"
                  value={eventoEmEdicao.local}
                  onChange={(e) => setEventoEmEdicao(prev => ({ ...prev, local: e.target.value }))}
                  className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-tipo" className="text-sm font-semibold text-gray-700">
                  Tipo de Evento
                </Label>
                <select
                  id="edit-tipo"
                  value={eventoEmEdicao.tipo}
                  onChange={(e) => setEventoEmEdicao(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full h-11 px-3 py-2 border border-gray-200 rounded-md focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                >
                  <option value="social">Social</option>
                  <option value="treino">Treino</option>
                  <option value="reuniao">Reunião</option>
                </select>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-6 mt-6 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={handleCancelarEdicao}
              className="h-11 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSalvarEdicao}
              className="h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <PencilSimple className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestaoEventos;