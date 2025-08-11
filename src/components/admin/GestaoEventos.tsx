// Gestão completa de eventos para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
// removed unused Badge, Input, Label and Dialog-related imports after refactor
import { 
  Calendar, 
  Users, 
  CheckCircle,
  Lightning,
  Plus,
  PencilSimple,
  
  Archive
} from 'phosphor-react';
import { eventos } from '../../data/mockData';
import PageHeader from '../common/PageHeader';
import EmptyState from '../common/EmptyState';
import ModalFormLayout from './components/ModalFormLayout';
import EventoForm, { EventoFormState } from './components/EventoForm';
import EventoCard from './components/EventoCard';

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
    { value: 'todos', label: 'Todos' },
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

  // utilitários agora centralizados

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
    <div className="space-y-3 sm:space-y-6 animate-fade-in px-1">
      <PageHeader
        title="Gestão de Eventos"
        description="Crie e gerencie eventos do time"
        stats={[
          { title: 'Total', value: estatisticas.total, icon: Calendar as any, color: 'blue' },
          { title: 'Próximos', value: estatisticas.proximosEventos, icon: CheckCircle as any, color: 'green' },
          { title: 'Média Confirmações', value: `${estatisticas.mediaConfirmacoes}%`, icon: Users as any, color: 'blue' },
          { title: 'Realizados', value: estatisticas.eventosPassados, icon: Archive as any, color: 'yellow' },
        ]}
      />

      {/* Controles */}
      <div className="flex justify-center">
        <Card className="bg-white shadow-card">
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
              
              <div className="w-full">
                <Button 
                  className="bg-gradient-to-r from-[#4C1D95] to-[#3B82F6] text-white shadow-lg hover:shadow-xl w-full"
                  onClick={handleCriarEvento}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="text-sm">Criar Evento</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Eventos */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl w-full">
          {eventosFiltrados.map((evento, index) => (
            <EventoCard
              key={evento.id}
              evento={evento}
              index={index}
              onEdit={handleEditarEvento}
              onDelete={handleExcluirEvento}
              onConfirmations={handleVerConfirmacoes}
              onReminder={(e) => alert(`Lembrete enviado para o evento "${e.nome}"!`)}
            />
          ))}
        </div>
      </div>

      {eventosFiltrados.length === 0 && (
        <EmptyState
          type="search"
          title="Nenhum evento encontrado"
          description={filterType === 'todos' ? 'Crie o primeiro evento do time' : `Nenhum evento do tipo "${filterType}" encontrado`}
          actionButton={{ label: 'Criar Evento', onClick: handleCriarEvento, icon: Plus }}
        />
      )}

      {/* Modal Criar Evento */}
      <ModalFormLayout
        open={isCriarEventoOpen}
        onOpenChange={setIsCriarEventoOpen}
        icon={Lightning}
        title="Criar Novo Evento"
        description="Preencha as informações para criar um novo evento"
        onCancel={handleCancelarCriacao}
        onConfirm={handleSubmitNovoEvento}
        confirmLabel="Criar Evento"
      >
        <EventoForm value={novoEvento as EventoFormState} onChange={(v) => setNovoEvento(v)} />
      </ModalFormLayout>

      {/* Modal Editar Evento */}
      <ModalFormLayout
        open={isEditarEventoOpen}
        onOpenChange={setIsEditarEventoOpen}
        icon={PencilSimple}
        title="Editar Evento"
        description="Edite as informações do evento"
        onCancel={handleCancelarEdicao}
        onConfirm={handleSalvarEdicao}
        confirmLabel="Salvar Alterações"
      >
        {eventoEmEdicao && (
          <EventoForm value={eventoEmEdicao as EventoFormState} onChange={(v) => setEventoEmEdicao(v)} />
        )}
      </ModalFormLayout>
    </div>
  );
};

export default GestaoEventos;