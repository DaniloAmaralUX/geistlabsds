import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CodeViewer = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="secondary">Ver código</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ver código</DialogTitle>
        <DialogDescription>
          Use o código abaixo para começar a integrar o prompt e as
          configurações atuais à sua aplicação.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="rounded-md bg-neutral-950 p-6">
          <pre>
            <code className="grid gap-1 text-neutral-50 text-sm [&_span]:h-4">
              <span>
                <span className="text-sky-300">import</span> os
              </span>
              <span>
                <span className="text-sky-300">import</span> openai
              </span>
              <span />
              <span>
                openai.api_key = os.getenv(
                <span className="text-green-300">
                  &quot;OPENAI_API_KEY&quot;
                </span>
                )
              </span>
              <span />
              <span>response = openai.Completion.create(</span>
              <span>
                {" "}
                model=
                <span className="text-green-300">&quot;davinci&quot;</span>,
              </span>
              <span>
                {" "}
                prompt=<span className="text-amber-300">&quot;&quot;</span>,
              </span>
              <span>
                {" "}
                temperature=<span className="text-amber-300">0.9</span>,
              </span>
              <span>
                {" "}
                max_tokens=<span className="text-amber-300">5</span>,
              </span>
              <span>
                {" "}
                top_p=<span className="text-amber-300">1</span>,
              </span>
              <span>
                {" "}
                frequency_penalty=<span className="text-amber-300">0</span>,
              </span>
              <span>
                {" "}
                presence_penalty=<span className="text-green-300">0</span>,
              </span>
              <span>)</span>
            </code>
          </pre>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Sua chave de API fica nas configurações da conta. Exponha a chave às
            aplicações por variáveis de ambiente ou por um gerenciador de
            segredos.
          </p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
