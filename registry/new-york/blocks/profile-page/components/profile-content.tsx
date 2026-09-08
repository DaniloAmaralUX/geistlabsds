import { KeyIcon, ShieldIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function ProfileContent() {
  return (
    <Tabs className="space-y-6" defaultValue="personal">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Pessoal</TabsTrigger>
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
      </TabsList>

      {/* Informações pessoais */}
      <TabsContent className="space-y-6" value="personal">
        <Card>
          <CardHeader>
            <CardTitle>Informações pessoais</CardTitle>
            <CardDescription>
              Atualize seus dados pessoais e as informações do perfil.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input defaultValue="John" id="firstName" label="Nome" />
              <Input defaultValue="Doe" id="lastName" label="Sobrenome" />
              <Input
                defaultValue="john.doe@example.com"
                id="email"
                label="E-mail"
                type="email"
              />
              <Input
                defaultValue="+55 (11) 91234-5678"
                id="phone"
                label="Telefone"
                type="tel"
              />
              <Input
                defaultValue="Designer de produto sênior"
                id="jobTitle"
                label="Cargo"
              />
              <Input defaultValue="Acme Ltda." id="company" label="Empresa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                defaultValue="Designer de produto com mais de 8 anos de experiência criando experiências digitais centradas nas pessoas. Gosto de resolver problemas complexos e transformar ideias em produtos bonitos e funcionais."
                id="bio"
                placeholder="Conte um pouco sobre você..."
                rows={4}
              />
            </div>
            <Input
              defaultValue="São Paulo, SP"
              id="location"
              label="Localização"
            />
          </CardContent>
        </Card>
      </TabsContent>

      {/* Configurações da conta */}
      <TabsContent className="space-y-6" value="account">
        <Card>
          <CardHeader>
            <CardTitle>Configurações da conta</CardTitle>
            <CardDescription>
              Gerencie as preferências da conta e a assinatura.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Status da conta</Label>
                <p className="text-muted-foreground text-sm">
                  Sua conta está ativa no momento
                </p>
              </div>
              <Badge appearance="subtle" color="green">
                Ativa
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Plano de assinatura</Label>
                <p className="text-muted-foreground text-sm">
                  Plano Pro — R$ 149/mês
                </p>
              </div>
              <Button variant="secondary">Gerenciar assinatura</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base" htmlFor="account-visibility">
                  Visibilidade da conta
                </Label>
                <p className="text-muted-foreground text-sm">
                  Torne seu perfil visível para outros usuários
                </p>
              </div>
              <Switch defaultChecked id="account-visibility" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Exportação de dados</Label>
                <p className="text-muted-foreground text-sm">
                  Baixe uma cópia dos seus dados
                </p>
              </div>
              <Button variant="secondary">Exportar dados</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Zona de perigo</CardTitle>
            <CardDescription>Ações irreversíveis e destrutivas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base">Excluir conta</Label>
                <p className="text-muted-foreground text-sm">
                  Exclui permanentemente sua conta e todos os dados
                </p>
              </div>
              <Button
                prefix={<Trash2Icon aria-hidden="true" />}
                variant="error"
              >
                Excluir conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Configurações de segurança */}
      <TabsContent className="space-y-6" value="security">
        <Card>
          <CardHeader>
            <CardTitle>Configurações de segurança</CardTitle>
            <CardDescription>
              Gerencie a segurança e a autenticação da conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Senha</Label>
                  <p className="text-muted-foreground text-sm">
                    Alterada há 3 meses
                  </p>
                </div>
                <Button
                  prefix={<KeyIcon aria-hidden="true" />}
                  variant="secondary"
                >
                  Alterar senha
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">
                    Autenticação em duas etapas
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Adicione uma camada extra de segurança à conta
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge appearance="subtle" color="green">
                    Ativada
                  </Badge>
                  <Button size="sm" variant="secondary">
                    Configurar
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base" htmlFor="login-notifications">
                    Notificações de acesso
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receba um aviso quando alguém entrar na sua conta
                  </p>
                </div>
                <Switch defaultChecked id="login-notifications" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Sessões ativas</Label>
                  <p className="text-muted-foreground text-sm">
                    Gerencie os dispositivos conectados à sua conta
                  </p>
                </div>
                <Button
                  prefix={<ShieldIcon aria-hidden="true" />}
                  variant="secondary"
                >
                  Ver sessões
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Preferências de notificação */}
      <TabsContent className="space-y-6" value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Preferências de notificação</CardTitle>
            <CardDescription>
              Escolha quais notificações deseja receber.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base" htmlFor="email-notifications">
                    Notificações por e-mail
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receba notificações por e-mail
                  </p>
                </div>
                <Switch defaultChecked id="email-notifications" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base" htmlFor="push-notifications">
                    Notificações push
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receba notificações push no navegador
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base" htmlFor="marketing-emails">
                    E-mails de marketing
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receba e-mails sobre novidades e atualizações
                  </p>
                </div>
                <Switch defaultChecked id="marketing-emails" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base" htmlFor="weekly-summary">
                    Resumo semanal
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Receba um resumo semanal da sua atividade
                  </p>
                </div>
                <Switch defaultChecked id="weekly-summary" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base" htmlFor="security-alerts">
                    Alertas de segurança
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Notificações de segurança importantes (sempre ativas)
                  </p>
                </div>
                <Switch checked disabled id="security-alerts" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
