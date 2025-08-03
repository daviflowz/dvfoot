import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import SelecaoPerfil from '../components/SelecaoPerfil';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import LoadingTransition from '../components/ui/loading-transition';
import PageTransition from '../components/ui/page-transition';
import ScrollToTop from '../components/ScrollToTop';

// Lazy loading dos componentes
const DashboardAdmin = React.lazy(() => import('../components/admin/DashboardAdmin'));
const DashboardJogador = React.lazy(() => import('../components/player/DashboardJogador'));
const GestaoJogadores = React.lazy(() => import('../components/admin/GestaoJogadores'));
const GestaoJogos = React.lazy(() => import('../components/admin/GestaoJogos'));
const GestaoEventos = React.lazy(() => import('../components/admin/GestaoEventos'));
const GestaoNoticias = React.lazy(() => import('../components/admin/GestaoNoticias'));
const JogosJogador = React.lazy(() => import('../components/player/JogosJogador'));
const EventosJogador = React.lazy(() => import('../components/player/EventosJogador'));
const NoticiasJogador = React.lazy(() => import('../components/player/NoticiasJogador'));
const PerfilJogador = React.lazy(() => import('../components/player/PerfilJogador'));

// Componente de loading otimizado
const PageLoading = ({ text }: { text: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    <PageTransition delay={0.1}>
      <LoadingTransition 
        text={text} 
        size="lg" 
        variant="soccer"
        className="text-slate-700"
      />
    </PageTransition>
  </div>
);

// Componente de rota pública
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { usuario, perfilSelecionado, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading text="Inicializando..." />;
  }

  if (usuario && perfilSelecionado) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Rotas do administrador
const AdminRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <DashboardAdmin />
        </ProtectedRoute>
      } />
      <Route path="/admin/elenco" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <GestaoJogadores />
        </ProtectedRoute>
      } />
      <Route path="/admin/jogos" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <GestaoJogos />
        </ProtectedRoute>
      } />
      <Route path="/admin/eventos" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <GestaoEventos />
        </ProtectedRoute>
      } />
      <Route path="/admin/noticias" element={
        <ProtectedRoute allowedRoles={['administrador']}>
          <GestaoNoticias />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  </>
);

// Rotas do jogador
const PlayerRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/jogador" element={
        <ProtectedRoute allowedRoles={['jogador']}>
          <DashboardJogador />
        </ProtectedRoute>
      } />
      <Route path="/jogador/jogos" element={
        <ProtectedRoute allowedRoles={['jogador']}>
          <JogosJogador />
        </ProtectedRoute>
      } />
      <Route path="/jogador/eventos" element={
        <ProtectedRoute allowedRoles={['jogador']}>
          <EventosJogador />
        </ProtectedRoute>
      } />
      <Route path="/jogador/noticias" element={
        <ProtectedRoute allowedRoles={['jogador']}>
          <NoticiasJogador />
        </ProtectedRoute>
      } />
      <Route path="/jogador/perfil" element={
        <ProtectedRoute allowedRoles={['jogador']}>
          <PerfilJogador />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/jogador" replace />} />
    </Routes>
  </>
);

// Componente principal de rotas
const AppRoutes = () => {
  const { usuario, perfilSelecionado, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoading text="Inicializando..." />;
  }

  if (!usuario) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </>
    );
  }

  if (!perfilSelecionado) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/selecao-perfil" element={<SelecaoPerfil />} />
          <Route path="*" element={<Navigate to="/selecao-perfil" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <Layout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <PageTransition delay={0.05}>
            <LoadingTransition 
              text="Carregando página..." 
              size="md" 
              variant="minimal"
              className="text-slate-600"
            />
          </PageTransition>
        </div>
      }>
        {usuario.tipo === 'administrador' ? <AdminRoutes /> : <PlayerRoutes />}
      </Suspense>
    </Layout>
  );
};

export default AppRoutes; 