"use client";

import { LINK } from "@/constants/links";
import { SITE, UTM_PARAMS } from "@/constants/site";
import { useFeedback } from "@/hooks/use-feedback";
import { addQueryParams } from "@/lib/url";

const FooterLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <a
    href={addQueryParams(href, UTM_PARAMS)}
    target="_blank"
    rel="noreferrer"
    className="font-medium underline underline-offset-4"
    onClick={onClick}
  >
    {children}
  </a>
);

export const SiteFooter = () => {
  const playClick = useFeedback({ sound: "click" });

  return (
    <footer
      className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            {SITE.NAME} · referência visual no{" "}
            <FooterLink href={LINK.GEIST} onClick={playClick}>
              Geist
            </FooterLink>
            , sobre o template{" "}
            <FooterLink href={LINK.STARTERCN} onClick={playClick}>
              startercn
            </FooterLink>
            . Código no{" "}
            <FooterLink href={LINK.GITHUB} onClick={playClick}>
              GitHub
            </FooterLink>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};
