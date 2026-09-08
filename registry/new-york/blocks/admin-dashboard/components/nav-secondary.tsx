"use client";

import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavSecondaryProps = ComponentProps<typeof SidebarGroup> & {
  items: {
    icon: LucideIcon;
    title: string;
    url: string;
  }[];
};

/** Atalhos secundários (configurações, ajuda, busca), no fim da barra. */
export const NavSecondary = ({ items, ...props }: NavSecondaryProps) => (
  <SidebarGroup {...props}>
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon aria-hidden="true" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);
