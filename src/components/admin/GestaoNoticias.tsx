// Gestão completa de notícias para administradores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
// removed unused avatar imports
import { Chats, Eye, Heart, CaretDown, MagnifyingGlass, Plus } from 'phosphor-react';
import { noticias } from '../../data/mockData';
import PageHeader from '../common/PageHeader';
import NoticiaCard from './components/NoticiaCard';

const GestaoNoticias: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mostrar apenas uma notícia como exemplo
  const noticiasFiltradas = [noticias[0]].filter(noticia => 
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.conteudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.autorNome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const estatisticas = {
    totalNoticias: 1,
    totalVisualizacoes: noticias[0]?.visualizacoes || 0,
    mediaVisualizacoes: noticias[0]?.visualizacoes || 0,
    noticiaRecente: noticias[0] ? new Date(noticias[0].dataPublicacao).getTime() : 0
  };

  // removed unused formatarData

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Gestão da Central"
        description="Publique e gerencie conteúdo da central do time"
        stats={[
          { title: 'Publicações da Central', value: estatisticas.totalNoticias, icon: Chats as any, color: 'blue' },
          { title: 'Total de Views', value: estatisticas.totalVisualizacoes, icon: Eye as any, color: 'info' },
          { title: 'Média por Notícia', value: estatisticas.mediaVisualizacoes, icon: CaretDown as any, color: 'success' },
          { title: 'Total de Likes', value: noticias[0]?.likes || 0, icon: Heart as any, color: 'warning' },
        ]}
      />

      {/* Controles */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar na central..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button className="gradient-primary shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              Nova Notícia
            </Button>
          </div>
        </CardContent>
      </Card>

              {/* Lista da Central */}
      <div className="grid gap-6">
        {noticiasFiltradas.map((noticia, index) => (
          <NoticiaCard key={noticia.id} noticia={noticia} index={index} />
        ))}
      </div>

      {noticiasFiltradas.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Chats className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhuma publicação encontrada</h3>
                <p className="text-muted-foreground">
                  {searchTerm 
                    ? 'Tente ajustar o termo de busca'
                    : 'Publique o primeiro conteúdo da central'
                  }
                </p>
              </div>
              <Button className="gradient-primary shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                {searchTerm ? 'Limpar Busca' : 'Publicar Primeiro Conteúdo'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GestaoNoticias;