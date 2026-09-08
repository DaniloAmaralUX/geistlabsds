"use client";

import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavMainProps {
  items: {
    icon?: LucideIcon;
    title: string;
    url: string;
  }[];
}

/** Grupo principal da navegação, com rótulo "Início". */
export const NavMain = ({ items }: NavMainProps) => (
  <SidebarGroup>
    <SidebarGroupContent>
      <SidebarGroupLabel>Início</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon ? <item.icon aria-hidden="true" /> : null}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);
