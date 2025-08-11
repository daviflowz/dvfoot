// Gestão completa de jogos para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Plus, Calendar, Clock, Trophy, CheckCircle } from 'phosphor-react';
import { jogos } from '../../data/mockData';
// import PageHeader from '../common/PageHeader';
import EmptyState from '../common/EmptyState';
import ModalFormLayout from './components/ModalFormLayout';
import JogoForm, { JogoFormState } from './components/JogoForm';
import JogoCard from './components/JogoCard';

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
    { value: 'todos', label: 'Todos' },
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

  // ícones por status agora centralizados



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
    <div className="space-y-3 sm:space-y-6 animate-fade-in px-1">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl font-bold text-[#1E293B] bg-gradient-to-r from-[#4C1D95] to-[#3B82F6] bg-clip-text text-transparent">
            Gestão de Jogos
          </h1>
          <p className="text-sm text-[#1E293B]/70 mt-1">
            Agende jogos e registre resultados
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <Card className="bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl border border-gray-100/50 hover:border-gray-200 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-3 sm:p-4 relative overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                <div className="p-1.5 sm:p-2 bg-[#4C1D95]/10 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#4C1D95] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B] group-hover:text-[#4C1D95] transition-colors duration-300">{estatisticas.total}</p>
                  <p className="text-xs text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors duration-300">Total</p>
                </div>
              </div>
              
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Calendar className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl border border-gray-100/50 hover:border-gray-200 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-3 sm:p-4 relative overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                <div className="p-1.5 sm:p-2 bg-[#3B82F6]/10 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B] group-hover:text-[#3B82F6] transition-colors duration-300">{estatisticas.agendados}</p>
                  <p className="text-xs text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors duration-300">Próximos</p>
                </div>
              </div>
              
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Clock className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl border border-gray-100/50 hover:border-gray-200 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-3 sm:p-4 relative overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                <div className="p-1.5 sm:p-2 bg-[#22C55E]/10 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B] group-hover:text-[#22C55E] transition-colors duration-300">{estatisticas.finalizados}</p>
                  <p className="text-xs text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors duration-300">Finalizados</p>
                </div>
              </div>
              
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <CheckCircle className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-50/50 shadow-lg hover:shadow-xl border border-gray-100/50 hover:border-gray-200 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-3 sm:p-4 relative overflow-hidden">
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                <div className="p-1.5 sm:p-2 bg-[#F59E0B]/10 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-[#1E293B] group-hover:text-[#F59E0B] transition-colors duration-300">{estatisticas.vitorias}</p>
                  <p className="text-xs text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors duration-300">Vitórias</p>
                </div>
              </div>
              
              {/* Decoração de fundo */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Trophy className="w-full h-full" />
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
            <JogoCard
              key={jogo.id}
              jogo={jogo}
              index={index}
              onEdit={handleEditarJogo}
              onDelete={handleExcluirJogo}
              onConfirmations={handleVerConfirmacoes}
              onRegister={handleRegistrarJogo}
            />
          ))}
        </div>
      </div>

      {jogosFiltrados.length === 0 && (
        <EmptyState
          type="search"
          title="Nenhum jogo encontrado"
          description={filterStatus === 'todos' ? 'Agende o primeiro jogo do time' : `Nenhum jogo ${filterStatus} encontrado`}
          actionButton={{ label: 'Agendar Jogo', onClick: handleAgendarJogo, icon: Plus }}
        />
      )}

      {/* Modal Agendar Jogo */}
      <ModalFormLayout
        open={isAgendarJogoOpen}
        onOpenChange={setIsAgendarJogoOpen}
        icon={Trophy}
        title="Agendar Novo Jogo"
        description="Preencha as informações para agendar um novo jogo"
        onCancel={handleCancelarAgendamento}
        onConfirm={handleSubmitNovoJogo}
        confirmLabel="Agendar Jogo"
      >
        <JogoForm value={novoJogo as JogoFormState} onChange={(v) => setNovoJogo(v)} />
      </ModalFormLayout>
    </div>
  );
};

export default GestaoJogos;