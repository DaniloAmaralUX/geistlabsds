import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCard {
  delta: string;
  description: string;
  footer: string;
  note: string;
  trend: "down" | "up";
  value: string;
}

const CARDS: SectionCard[] = [
  {
    delta: "+12,5%",
    description: "Receita total",
    footer: "Em alta neste mês",
    note: "Visitantes dos últimos 6 meses",
    trend: "up",
    value: "R$ 1.250,00",
  },
  {
    delta: "-20%",
    description: "Novos clientes",
    footer: "Queda de 20% no período",
    note: "A aquisição precisa de atenção",
    trend: "down",
    value: "1.234",
  },
  {
    delta: "+12,5%",
    description: "Contas ativas",
    footer: "Retenção forte de usuários",
    note: "Engajamento acima das metas",
    trend: "up",
    value: "45.678",
  },
  {
    delta: "+4,5%",
    description: "Taxa de crescimento",
    footer: "Aumento constante de desempenho",
    note: "Dentro das projeções de crescimento",
    trend: "up",
    value: "4,5%",
  },
];

/** Quatro cartões de indicadores com variação e nota de contexto. */
export const SectionCards = () => (
  <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
    {CARDS.map((card) => {
      const TrendIcon = card.trend === "up" ? TrendingUpIcon : TrendingDownIcon;

      return (
        <Card className="@container/card" key={card.description}>
          <CardHeader>
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge appearance="subtle" color="gray">
                <TrendIcon aria-hidden="true" />
                {card.delta}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer} <TrendIcon aria-hidden="true" className="size-4" />
            </div>
            <div className="text-muted-foreground">{card.note}</div>
          </CardFooter>
        </Card>
      );
    })}
  </div>
);
