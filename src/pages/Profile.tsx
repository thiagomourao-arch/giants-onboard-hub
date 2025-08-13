import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/providers/AuthProvider";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      const updateData: any = {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };

      await updateProfile(updateData);
      form.reset({
        ...data,
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  return (
    <div className="space-y-6">
      <SEO title="Giants OnBoard — Meu Perfil" description="Visualize e edite suas informações pessoais." />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e configurações da conta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Atuais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Atuais
            </CardTitle>
            <CardDescription>
              Seus dados cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Nome
              </label>
              <p className="text-sm text-muted-foreground">{user?.name}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                E-mail
              </label>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Telefone
              </label>
              <p className="text-sm text-muted-foreground">
                {user?.phone || "Não informado"}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-1">
              <label className="text-sm font-medium">Método de Login</label>
              <p className="text-sm text-muted-foreground capitalize">
                {user?.provider === "password" ? "E-mail e senha" : user?.provider}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Edição */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Editar Informações</CardTitle>
            <CardDescription>
              Atualize seus dados pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Alterar Senha
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Deixe em branco se não quiser alterar a senha
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha atual</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Senha atual"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Nova senha"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                              >
                                {showNewPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}