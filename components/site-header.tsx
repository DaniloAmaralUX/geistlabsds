import Link from "next/link";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { CommandMenu } from "@/components/command-menu";
import { GithubIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeSwitcher } from "@/components/mode-switcher";
import { PaletteMenu } from "@/components/palette-menu";
import { SiteSettings } from "@/components/site-settings";
import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { source } from "@/lib/source";

const navItems = [
  { href: ROUTES.DOCS, label: "Docs" },
  { href: ROUTES.DOCS_FOUNDATIONS, label: "Fundamentos" },
  { href: ROUTES.DOCS_COMPONENTS, label: "Componentes" },
  { href: ROUTES.DOCS_BLOCKS, label: "Blocos" },
  { href: ROUTES.DOCS_THEMES, label: "Temas" },
  { href: ROUTES.DOCS_ROADMAP, label: "Roteiro" },
  { href: ROUTES.PESQUISA, label: "Pesquisa" },
];

export const SiteHeader = () => (
  <header
    className="bg-background sticky top-0 z-50 w-full"
    style={{ viewTransitionName: "site-header" }}
  >
    <div className="container-wrapper 3xl:fixed:px-0 px-6">
      <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2">
        <MobileNav
          items={navItems}
          tree={source.pageTree}
          className="flex lg:hidden"
        />
        <BrandContextMenu>
          <Button
            asChild
            variant="tertiary"
            shape="square"
            size="sm"
            className="hidden lg:flex"
            sound="click"
          >
            <Link href={ROUTES.HOME} transitionTypes={["nav-back"]}>
              <LogoMark className="size-5" />
              <span className="sr-only">{SITE.NAME}</span>
            </Link>
          </Button>
        </BrandContextMenu>
        <MainNav items={navItems} className="hidden lg:flex" />
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
            <CommandMenu navItems={navItems} tree={source.pageTree} />
          </div>
          <Button
            asChild
            variant="tertiary"
            shape="square"
            size="sm"
            className="extend-touch-target"
            sound="click"
          >
            <a href={LINK.GITHUB} target="_blank" rel="noreferrer">
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <PaletteMenu />
          <ModeSwitcher />
          <SiteSettings />
        </div>
      </div>
    </div>
  </header>
);
