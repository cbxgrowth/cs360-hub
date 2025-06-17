
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Lock, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function SuperAdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, profile, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast({
        title: 'Erro no login',
        description: error.message || 'Falha ao realizar login.',
        variant: 'destructive'
      });
      return;
    }
    // Super Admin profile checagem
    if (profile?.user_type === 'super_admin' || profile?.plan_type === 'super_admin') {
      navigate('/super-admin');
    } else {
      toast({
        title: 'Acesso não autorizado',
        description: 'Seu usuário não possui privilégios de Super Admin.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-slate-900">
      <Card className="w-full max-w-md shadow-2xl border-red-200 border bg-white/95 dark:bg-slate-900/90">
        <CardHeader className="space-y-2">
          <div className="flex justify-center mb-2">
            <span className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-red-600 to-pink-500 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </span>
          </div>
          <CardTitle className="text-center text-2xl text-red-600 font-bold">Super Admin</CardTitle>
          <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
            Login exclusivo para administradores do sistema
          </p>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                autoFocus
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="superadmin@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Sua senha super admin"
              />
            </div>
            <Button type="submit" className="w-full py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                  Entrando...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Entrar como Super Admin
                </>
              )}
            </Button>
            <div className="flex justify-between text-xs mt-3">
              <Link className="text-blue-700 hover:underline" to="/login">
                Voltar ao login comum
              </Link>
              <span className="text-slate-400 italic">Acesso restrito</span>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
