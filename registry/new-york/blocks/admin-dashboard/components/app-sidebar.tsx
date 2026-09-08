"use client";

import {
  ChartBarIcon,
  CircleHelpIcon,
  CommandIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileTextIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavDocuments } from "./nav-documents";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
  documents: [
    { icon: DatabaseIcon, name: "Biblioteca de dados", url: "#" },
    { icon: FileChartColumnIcon, name: "Relatórios", url: "#" },
    { icon: FileTextIcon, name: "Assistente de texto", url: "#" },
  ],
  navMain: [
    { icon: LayoutDashboardIcon, title: "Painel", url: "#" },
    { icon: ListChecksIcon, title: "Ciclo de vida", url: "#" },
    { icon: ChartBarIcon, title: "Análises", url: "#" },
    { icon: FolderIcon, title: "Projetos", url: "#" },
    { icon: UsersIcon, title: "Equipe", url: "#" },
  ],
  navSecondary: [
    { icon: SettingsIcon, title: "Configurações", url: "#" },
    { icon: CircleHelpIcon, title: "Ajuda", url: "#" },
    { icon: SearchIcon, title: "Buscar", url: "#" },
  ],
  user: {
    email: "ana@exemplo.com",
    name: "Ana Souza",
  },
};

/** Barra lateral fixa com navegação principal, documentos, atalhos e usuário. */
export const AppSidebar = (props: ComponentProps<typeof Sidebar>) => (
  <Sidebar collapsible="none" className="h-auto border-r" {...props}>
    <SidebarHeader className="border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <Link href="#">
              <CommandIcon aria-hidden="true" className="!size-5" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain items={data.navMain} />
      <NavDocuments items={data.documents} />
      <NavSecondary items={data.navSecondary} className="mt-auto" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
  </Sidebar>
);
