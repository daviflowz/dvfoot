// Visualização de notícias para jogadores
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
  Calendar,
  Eye,
  ThumbsUp,
  ChatCircle,
  Heart,
  BookmarkSimple,
  ShareNetwork,
  CaretDown,
  TrendingUp
} from 'phosphor-react';
import { noticias } from '../../data/mockData';

const NoticiasJogador: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  
  const categorias = [
    'todas',
    ...Array.from(new Set(noticias.map(n => n.categoria)))
  ];
  
  // Mostrar apenas uma notícia como exemplo
  const noticiasFiltradas = [noticias[0]].filter(noticia => {
    const matchSearch = noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       noticia.conteudo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;
    return matchSearch && matchCategory;
  }).sort((a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime());

  const formatarData = (data: string) => {
    const agora = new Date();
    const dataNoticia = new Date(data);
    const diferenca = agora.getTime() - dataNoticia.getTime();
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    
    if (horas < 1) return 'Agora há pouco';
    if (horas < 24) return `${horas}h atrás`;
    if (dias === 1) return 'Ontem';
    if (dias < 7) return `${dias} dias atrás`;
    return dataNoticia.toLocaleDateString('pt-BR');
  };

  const handleLike = (noticiaId: string) => {
    console.log(`Curtindo notícia ${noticiaId}`);
    // Implementar lógica de curtida
  };

  const handleShare = (noticiaId: string) => {
    console.log(`Compartilhando notícia ${noticiaId}`);
    // Implementar lógica de compartilhamento
  };

  const handleBookmark = (noticiaId: string) => {
    console.log(`Salvando notícia ${noticiaId}`);
    // Implementar lógica de bookmark
  };

  const estatisticas = {
    totalNoticias: 1,
    noticiasRecentes: noticias[0] ? 1 : 0,
    totalVisualizacoes: noticias[0]?.visualizacoes || 0
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Central do Time</h1>
          <p className="text-muted-foreground">
            Fique por dentro das últimas novidades
          </p>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalNoticias}</p>
                  <p className="text-xs text-muted-foreground">Total de Publicações</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.noticiasRecentes}</p>
                  <p className="text-xs text-muted-foreground">Nesta Semana</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card sm:shadow-card shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <Eye className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{estatisticas.totalVisualizacoes.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total de Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controles */}
      <Card className="sm:shadow-card shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar na central..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md text-sm bg-background min-w-[120px]"
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria === 'todas' ? 'Todas as Categorias' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

              {/* Feed da Central */}
      <div className="space-y-6">
        {noticiasFiltradas.map((noticia, index) => (
          <Card key={noticia.id} className="card-hover sm:shadow-card shadow-none animate-scale-in overflow-hidden md:flex md:flex-row" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-0 md:flex-1">
              {/* Imagem da Notícia */}
              {noticia.imagem && (
                <div className="relative h-48 md:h-auto md:w-1/3 md:max-w-[300px] overflow-hidden">
                  <img 
                    src={noticia.imagem} 
                    alt={noticia.titulo}
                    className="w-full h-full object-cover md:absolute md:inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge de destaque */}
                  {noticia.destaque && (
                    <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 text-xs gradient-warning text-white shadow-glow">
                      Destaque
                    </Badge>
                  )}
                  
                  {/* Categoria */}
                  <Badge variant="secondary" className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xs bg-white/90 text-black">
                    {noticia.categoria}
                  </Badge>
                </div>
              )}

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* Header da Notícia */}
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                    {noticia.titulo}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                        <AvatarImage src={noticia.autorFoto} alt={noticia.autorNome} />
                        <AvatarFallback className="text-xs">
                          {noticia.autorNome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{noticia.autorNome}</span>
                    </div>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {formatarData(noticia.dataPublicacao)}
                    </span>
                  </div>
                </div>

                {/* Conteúdo da Notícia */}
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {noticia.conteudo.length > 200 
                      ? `${noticia.conteudo.substring(0, 200)}...` 
                      : noticia.conteudo
                    }
                  </p>
                  
                  {noticia.conteudo.length > 200 && (
                    <Button variant="link" className="p-0 h-auto text-xs sm:text-sm text-primary">
                      Ler mais
                      <CaretDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </Button>
                  )}
                </div>

                {/* Estatísticas e Ações */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-border">
                  <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors cursor-pointer">
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{noticia.visualizacoes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-red-600 transition-colors cursor-pointer">
                      <ThumbsUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{noticia.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-green-600 transition-colors cursor-pointer">
                      <ChatCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{noticia.comentarios}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(noticia.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(noticia.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <BookmarkSimple className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(noticia.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-info transition-colors"
                    >
                      <ShareNetwork className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>

                {/* Engajamento Visual */}
                <div className="bg-accent/20 rounded-lg p-3 sm:p-4">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                      <p className="text-base sm:text-lg font-bold text-primary">{noticia.visualizacoes}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Visualizações</p>
                    </div>
                    <div className="hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                      <p className="text-base sm:text-lg font-bold text-destructive">{noticia.likes}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Curtidas</p>
                    </div>
                    <div className="hover:bg-accent/30 rounded-md p-1.5 transition-colors cursor-pointer">
                      <p className="text-base sm:text-lg font-bold text-info">{noticia.comentarios}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Comentários</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {noticiasFiltradas.length === 0 && (
        <Card className="sm:shadow-card shadow-none">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Nenhuma notícia encontrada</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory !== 'todas'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Não há publicações disponíveis no momento'
                  }
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todas');
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NoticiasJogador;