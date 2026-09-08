"use client";

import { DownloadIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { toast } from "sonner";

import { LogoMark, getLogoMarkSVG } from "@/components/logo";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export const BrandContextMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { resolvedTheme } = useTheme();
  const { copyToClipboard } = useCopyToClipboard();

  const logoMarkSvgString = getLogoMarkSVG(
    resolvedTheme === "light" ? "#000" : "#fff"
  );

  const handleCopy = useCallback(() => {
    copyToClipboard(logoMarkSvgString);
    toast.success("Marca copiada como SVG");
  }, [logoMarkSvgString, copyToClipboard]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([logoMarkSvgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "icon.svg";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Marca baixada como SVG");
  }, [logoMarkSvgString]);

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem onClick={handleCopy}>
          <LogoMark />
          Copiar como SVG
        </ContextMenuItem>

        <ContextMenuItem onClick={handleDownload}>
          <DownloadIcon /> Baixar como SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
