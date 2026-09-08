import type { CSSProperties } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./components/app-sidebar";
import { ChartAreaInteractive } from "./components/chart-area-interactive";
import { DataTable } from "./components/data-table";
import { SectionCards } from "./components/section-cards";
import { SiteHeader } from "./components/site-header";
import data from "./data.json";

/**
 * Painel administrativo — LAB / DESIGN.
 *
 * Barra lateral de navegação, cabeçalho, cartões de indicadores, gráfico de
 * área interativo e tabela de dados com arrastar e soltar, seleção e
 * paginação. Base: `shadcn-examples` (shadcn/ui, MIT), adaptado.
 *
 * As ações de salvar da tabela usam `toast` do sonner: o app que recebe o
 * bloco precisa montar um `<Toaster />` uma vez, no layout.
 */
export default function Page() {
  return (
    <SidebarProvider
      className="min-h-auto"
      style={
        {
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
          "--sidebar-width": "calc(var(--spacing) * 64)",
        } as CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
