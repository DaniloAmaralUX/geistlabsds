"use client";

import { SquarePenIcon } from "lucide-react";

import { GITHUB, LINK } from "@/constants/links";
import { DOCS_DIR } from "@/lib/docs";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

const LINK_CLS =
  "transition-colors text-[0.8rem] hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center";

export const DocsTocFooter = ({
  docId,
  className,
}: {
  docId: string;
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {docId && (
      <a
        href={`${LINK.GITHUB}/edit/${GITHUB.branch}/${DOCS_DIR}/${docId}`}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLS}
        onClick={() =>
          trackEvent({
            name: "click_edit_page",
            properties: { doc: docId },
          })
        }
      >
        <SquarePenIcon />
        Editar esta página
      </a>
    )}
  </div>
);
