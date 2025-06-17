
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  UserPlus, 
  Mail, 
  Gift,
  CheckCircle,
  Clock,
  Users,
  Share2,
  Copy,
  Award
} from 'lucide-react';

interface Referral {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'signed_up' | 'converted';
  sentAt: string;
  signedUpAt?: string;
  convertedAt?: string;
  reward?: string;
}

export const ReferralProgram = () => {
  const { toast } = useToast();
  const [isInviting, setIsInviting] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    emails: '',
    personalMessage: ''
  });

  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: '1',
      email: 'joao@empresa.com',
      name: 'João Silva',
      status: 'converted',
      sentAt: '2024-05-15',
      signedUpAt: '2024-05-16',
      convertedAt: '2024-05-20',
      reward: '30 dias grátis'
    },
    {
      id: '2',
      email: 'maria@startup.com',
      name: 'Maria Santos',
      status: 'signed_up',
      sentAt: '2024-06-01',
      signedUpAt: '2024-06-02'
    },
    {
      id: '3',
      email: 'pedro@tech.com',
      name: 'Pedro Costa',
      status: 'pending',
      sentAt: '2024-06-10'
    }
  ]);

  const referralLink = `https://cs360.com.br/signup?ref=${btoa('user123')}`;

  const handleSendInvites = async () => {
    setIsInviting(true);
    
    try {
      const emails = inviteForm.emails.split(',').map(email => email.trim()).filter(Boolean);
      
      if (emails.length === 0) {
        toast({
          title: "Erro",
          description: "Adicione pelo menos um email",
          variant: "destructive"
        });
        return;
      }

      // Simular envio de convites
      const newReferrals = emails.map(email => ({
        id: Date.now() + Math.random().toString(),
        email,
        name: email.split('@')[0],
        status: 'pending' as const,
        sentAt: new Date().toISOString().split('T')[0]
      }));

      setReferrals([...referrals, ...newReferrals]);
      
      toast({
        title: "Convites enviados!",
        description: `${emails.length} convite(s) enviado(s) com sucesso`
      });

      setInviteForm({ emails: '', personalMessage: '' });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar convites. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsInviting(false);
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copiado!",
      description: "Link de indicação copiado para a área de transferência"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'converted':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Convertido</Badge>;
      case 'signed_up':
        return <Badge className="bg-blue-100 text-blue-800"><Users className="w-3 h-3 mr-1" />Cadastrado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    totalReferrals: referrals.length,
    pending: referrals.filter(r => r.status === 'pending').length,
    converted: referrals.filter(r => r.status === 'converted').length,
    totalRewards: referrals.filter(r => r.status === 'converted').length * 30 // 30 dias por conversão
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Programa de Indicações</h2>
          <p className="text-muted-foreground">Indique colegas e ganhe benefícios exclusivos</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-2">
          <Gift className="w-4 h-4" />
          <span>30 dias grátis por conversão</span>
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Indicações</p>
                <p className="text-2xl font-bold">{stats.totalReferrals}</p>
              </div>
              <Share2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Convertidas</p>
                <p className="text-2xl font-bold">{stats.converted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dias Ganhos</p>
                <p className="text-2xl font-bold">{stats.totalRewards}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Invites */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Enviar Convites</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Emails (separados por vírgula)</label>
              <Textarea
                placeholder="joao@empresa.com, maria@startup.com"
                value={inviteForm.emails}
                onChange={(e) => setInviteForm({ ...inviteForm, emails: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mensagem pessoal (opcional)</label>
              <Textarea
                placeholder="Olá! Gostaria de indicar esta ferramenta incrível..."
                value={inviteForm.personalMessage}
                onChange={(e) => setInviteForm({ ...inviteForm, personalMessage: e.target.value })}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleSendInvites} 
              disabled={isInviting}
              className="w-full"
            >
              <Mail className="w-4 h-4 mr-2" />
              {isInviting ? 'Enviando...' : 'Enviar Convites'}
            </Button>
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>Link de Indicação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Seu link personalizado</label>
              <div className="flex space-x-2">
                <Input value={referralLink} readOnly className="flex-1" />
                <Button variant="outline" onClick={copyReferralLink}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Compartilhe seu link ou envie convites</li>
                <li>• Quando alguém se cadastrar, você recebe notificação</li>
                <li>• A cada conversão, ganhe 30 dias grátis</li>
                <li>• Sem limite de indicações!</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Indicações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Convite</TableHead>
                <TableHead>Recompensa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map(referral => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.name}</TableCell>
                  <TableCell>{referral.email}</TableCell>
                  <TableCell>{getStatusBadge(referral.status)}</TableCell>
                  <TableCell>{new Date(referral.sentAt).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    {referral.reward ? (
                      <Badge variant="outline" className="text-green-600">
                        {referral.reward}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
