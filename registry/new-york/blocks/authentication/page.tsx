import Link from "next/link";

import { Button } from "@/components/ui/button";

import { UserAuthForm } from "./components/user-auth-form";

/**
 * Autenticação: painel de marca com depoimento à esquerda e formulário de
 * criação de conta à direita. O painel usa um gradiente dos tokens no lugar
 * de imagem de fundo.
 */
export default function Page() {
  return (
    <div className="container relative flex-1 shrink-0 items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Button
        asChild
        variant="tertiary"
        className="absolute top-4 right-4 md:top-8 md:right-8"
      >
        <Link href="#">Entrar</Link>
      </Button>
      <div className="relative hidden h-full flex-col p-10 text-background lg:flex dark:border-r">
        <div className="absolute inset-0 bg-linear-to-br from-foreground via-foreground/90 to-muted-foreground" />
        <div className="relative z-20 flex items-center text-lg font-medium text-background/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mr-2 size-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto max-w-3xl text-background/70">
          <blockquote className="leading-normal text-balance">
            &ldquo;Esta biblioteca me poupou incontáveis horas de trabalho e me
            ajudou a entregar designs impecáveis aos meus clientes mais rápido
            do que nunca.&rdquo; - Sofia Davis
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center lg:min-h-svh lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Informe seu e-mail abaixo para criar sua conta
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao clicar em continuar, você concorda com nossos{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </Link>{" "}
            e nossa{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
