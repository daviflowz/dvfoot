/**
 * Utilitário para debugar o problema do scroll
 */

// Função para forçar scroll ao topo
export const forceScrollToTop = () => {
  console.log('forceScrollToTop: Executando scroll para o topo');
  
  // Método 1: window.scrollTo
  window.scrollTo(0, 0);
  console.log('forceScrollToTop: window.scrollTo(0, 0) executado');
  
  // Método 2: document.documentElement
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
    console.log('forceScrollToTop: document.documentElement.scrollTop = 0 executado');
  }
  
  // Método 3: document.body
  if (document.body) {
    document.body.scrollTop = 0;
    console.log('forceScrollToTop: document.body.scrollTop = 0 executado');
  }
  
  // Verificar se funcionou
  setTimeout(() => {
    console.log('forceScrollToTop: Verificação - window.scrollY:', window.scrollY);
    console.log('forceScrollToTop: Verificação - document.documentElement.scrollTop:', document.documentElement.scrollTop);
    console.log('forceScrollToTop: Verificação - document.body.scrollTop:', document.body.scrollTop);
  }, 100);
};

// Listener global para detectar mudanças de rota
export const initScrollDebug = () => {
  let currentPath = window.location.pathname;
  
  console.log('initScrollDebug: Inicializando, path atual:', currentPath);
  
  // Listener para mudanças de popstate
  window.addEventListener('popstate', () => {
    const newPath = window.location.pathname;
    console.log('initScrollDebug: popstate detectado, nova rota:', newPath);
    if (newPath !== currentPath) {
      currentPath = newPath;
      forceScrollToTop();
    }
  });
  
  // Listener para mudanças de pushstate
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    const newPath = window.location.pathname;
    console.log('initScrollDebug: pushState detectado, nova rota:', newPath);
    if (newPath !== currentPath) {
      currentPath = newPath;
      forceScrollToTop();
    }
  };
  
  // Listener para mudanças de replaceState
  const originalReplaceState = history.replaceState;
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    const newPath = window.location.pathname;
    console.log('initScrollDebug: replaceState detectado, nova rota:', newPath);
    if (newPath !== currentPath) {
      currentPath = newPath;
      forceScrollToTop();
    }
  };
  
  // Verificar mudanças a cada 100ms
  setInterval(() => {
    const newPath = window.location.pathname;
    if (newPath !== currentPath) {
      console.log('initScrollDebug: Mudança de rota detectada por setInterval:', newPath);
      currentPath = newPath;
      forceScrollToTop();
    }
  }, 100);
}; 