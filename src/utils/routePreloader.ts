// Preloader inteligente para rotas críticas
export class RoutePreloader {
  private static preloadedRoutes = new Set<string>();
  private static preloadPromises = new Map<string, Promise<any>>();

  // Rotas críticas que devem ser precarregadas
  private static criticalRoutes = [
    'Dashboard',
    'Clients', 
    'Reports',
    'Goals'
  ];

  // Precarregar rotas baseado na prioridade
  static async preloadRoute(routeName: string): Promise<void> {
    if (this.preloadedRoutes.has(routeName)) {
      return;
    }

    if (this.preloadPromises.has(routeName)) {
      return this.preloadPromises.get(routeName);
    }

    const preloadPromise = this.importRoute(routeName);
    this.preloadPromises.set(routeName, preloadPromise);

    try {
      await preloadPromise;
      this.preloadedRoutes.add(routeName);
      console.log(`✅ Route preloaded: ${routeName}`);
    } catch (error) {
      console.warn(`⚠️ Failed to preload route: ${routeName}`, error);
      this.preloadPromises.delete(routeName);
    }
  }

  // Precarregar rotas críticas em background
  static preloadCriticalRoutes(): void {
    // Usar requestIdleCallback se disponível, senão setTimeout
    const preloadFn = () => {
      this.criticalRoutes.forEach(route => {
        this.preloadRoute(route);
      });
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => preloadFn(), { timeout: 5000 });
    } else {
      setTimeout(preloadFn, 1000);
    }
  }

  // Precarregar baseado na interação do usuário
  static preloadOnHover(routeName: string): void {
    // Precarregar quando o usuário passa o mouse sobre um link
    setTimeout(() => {
      this.preloadRoute(routeName);
    }, 200); // Debounce para evitar preloads desnecessários
  }

  private static async importRoute(routeName: string): Promise<any> {
    const routeMap: Record<string, () => Promise<any>> = {
      'Dashboard': () => import('../pages/App'),
      'Clients': () => import('../pages/Clients'),
      'Reports': () => import('../pages/Reports'),
      'Goals': () => import('../pages/Goals'),
      'Contracts': () => import('../pages/Contracts'),
      'Services': () => import('../pages/Services'),
      'NPS': () => import('../pages/NPS'),
      'LTVCAC': () => import('../pages/LTVCAC'),
      'Strategies': () => import('../pages/Strategies'),
      'Automation': () => import('../pages/Automation'),
      'Admin': () => import('../pages/Admin'),
      'SuperAdmin': () => import('../pages/SuperAdmin'),
    };

    const importFn = routeMap[routeName];
    if (!importFn) {
      throw new Error(`Route not found: ${routeName}`);
    }

    return importFn();
  }

  // Limpar cache quando necessário
  static clearCache(): void {
    this.preloadedRoutes.clear();
    this.preloadPromises.clear();
  }

  // Verificar se rota está precarregada
  static isPreloaded(routeName: string): boolean {
    return this.preloadedRoutes.has(routeName);
  }
}

// Hook para usar o preloader em componentes
export const useRoutePreloader = () => {
  return {
    preloadRoute: RoutePreloader.preloadRoute.bind(RoutePreloader),
    preloadOnHover: RoutePreloader.preloadOnHover.bind(RoutePreloader),
    isPreloaded: RoutePreloader.isPreloaded.bind(RoutePreloader)
  };
};

