"use client";

import {
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MicIcon,
  PlusIcon,
} from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/**
 * PromptInput — LAB / DESIGN.
 *
 * Compositor de prompt para conversas com IA: área de texto que cresce com o
 * conteúdo, menu de ações à esquerda, chip de agente, menu de configurações
 * da requisição, botão de voz e botão de enviar. Opcionalmente mostra o
 * histórico do que já foi enviado acima do compositor.
 *
 * Os menus vêm do `DropdownMenu` do radix-ui (teclado, ARIA, posicionamento
 * com colisão, portal e fechar ao clicar fora). Implementação própria do
 * LAB / DESIGN a partir de uma especificação funcional.
 */

/** Uma escolha em qualquer lista do compositor (agentes, configurações). */
export interface PromptChoice {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface PromptMessage {
  id: string;
  text: string;
}

/** Uma configuração da requisição: um id, um rótulo e as escolhas possíveis. */
export interface PromptSetting {
  /** Chave no mapa de configurações. */
  id: string;
  label: string;
  choices: PromptChoice[];
  /**
   * `highlight` (padrão) mostra as escolhas à vista, sob o rótulo do grupo;
   * `list` mostra uma linha que abre as escolhas num submenu.
   */
  variant?: "highlight" | "list";
  /**
   * Só em `highlight`: deixa à vista apenas a escolha atual e acrescenta um
   * submenu com este rótulo para trocar.
   */
  moreLabel?: string;
}

/** Comando avulso no rodapé do menu de configurações. */
export interface PromptCommand {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export type PromptMenuItemType = "action" | "toggle" | "separator" | "submenu";

export interface PromptMenuItem {
  value: string;
  type?: PromptMenuItemType;
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  /** Só para `toggle`. */
  defaultChecked?: boolean;
  checked?: boolean;
  /** Só para `submenu`; um nível apenas. */
  items?: PromptMenuItem[];
}

/** Evento único do menu "mais": escolha de ação ou mudança de alternância. */
export type PromptMenuChange =
  | { type: "select"; value: string }
  | { checked: boolean; type: "toggle"; value: string };

export type PromptSettings = Record<string, string>;

/** O que sai em `onSend`: texto aparado e contexto vigente. */
export interface PromptSubmission {
  text: string;
  agent?: string;
  settings: PromptSettings;
}

type EffortLevel = "high" | "low" | "medium";

const EFFORT_FILL: Record<EffortLevel, string> = {
  high: "100%",
  low: "34%",
  medium: "67%",
};

/* -------------------------------------------------------------------------- */
/* Utilitários                                                                */
/* -------------------------------------------------------------------------- */

const useControllableState = <T,>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void
): [T, (next: T) => void] => {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const set = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternal(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );
  return [current, set];
};

/**
 * Menus fechados pelo teclado (Esc, Enter, Espaço) devolvem o foco ao gatilho,
 * que é o padrão do radix-ui. Quando a interação inteira foi com o mouse, o
 * foco volta à área de texto para o usuário continuar digitando.
 */
const useMenuFocusReturn = (
  composerRef: React.RefObject<HTMLTextAreaElement | null>
) => {
  const byPointer = useRef(false);
  return useMemo(() => {
    const markKeyboard = () => {
      byPointer.current = false;
    };
    return {
      contentProps: { onKeyDown: markKeyboard },
      onCloseAutoFocus: (event: Event) => {
        if (byPointer.current) {
          event.preventDefault();
          composerRef.current?.focus();
        }
      },
      triggerProps: {
        onKeyDown: markKeyboard,
        onPointerDown: () => {
          byPointer.current = true;
        },
      },
    };
  }, [composerRef]);
};

const resolveSettings = (
  items: PromptSetting[],
  settings: PromptSettings
): PromptSettings => {
  const resolved: PromptSettings = {};
  for (const setting of items) {
    const candidate = settings[setting.id];
    const valid = setting.choices.some((choice) => choice.value === candidate);
    resolved[setting.id] = valid
      ? (candidate as string)
      : (setting.choices[0]?.value ?? "");
  }
  return resolved;
};

const firstChoiceValue = (choices: PromptChoice[]) => choices[0]?.value ?? "";

const choiceLabel = (choices: PromptChoice[], value: string) =>
  choices.find((choice) => choice.value === value)?.label ?? value;

const isEffortLevel = (value: string | undefined): value is EffortLevel =>
  value !== undefined && value in EFFORT_FILL;

const collectDefaultChecked = (
  items: PromptMenuItem[],
  into: Record<string, boolean> = {}
) => {
  for (const entry of items) {
    if (entry.type === "toggle") {
      into[entry.value] = Boolean(entry.defaultChecked);
    }
    if (entry.items) {
      collectDefaultChecked(entry.items, into);
    }
  }
  return into;
};

/* -------------------------------------------------------------------------- */
/* Classes compartilhadas                                                     */
/* -------------------------------------------------------------------------- */

const focusRingClass =
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const iconButtonClass = cn(
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  "transition-colors duration-150 motion-reduce:transition-none",
  focusRingClass
);

const menuContentClass =
  "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[10rem] max-w-[calc(100vw-1rem)] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border bg-background p-1 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 motion-reduce:data-[state=open]:animate-none";

const menuExitClass =
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:data-[state=closed]:animate-none";

const menuItemClass =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-muted data-[highlighted]:text-foreground motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0";

const menuLabelClass =
  "px-2 pt-1.5 pb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground";

const menuSeparatorClass = "-mx-1 my-1 h-px bg-border";

const menuShortcutClass = "text-xs text-muted-foreground";

/* -------------------------------------------------------------------------- */
/* Peças                                                                      */
/* -------------------------------------------------------------------------- */

/** Medidor vertical: o preenchimento sobe com o nível de esforço. */
const EffortGauge = ({ level }: { level: EffortLevel }) => (
  <span
    aria-hidden="true"
    data-slot="prompt-input-effort"
    data-level={level}
    className="flex h-4 w-1.5 shrink-0 items-end overflow-hidden rounded-full bg-current/20"
  >
    <span
      className="w-full rounded-full bg-current transition-[height] duration-200 motion-reduce:transition-none"
      style={{ height: EFFORT_FILL[level] }}
    />
  </span>
);

const ChoiceItem = ({ description, disabled, label, value }: PromptChoice) => (
  <DropdownMenuPrimitive.RadioItem
    value={value}
    disabled={disabled}
    className={cn(
      menuItemClass,
      "text-muted-foreground data-[state=checked]:text-foreground"
    )}
  >
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="truncate">{label}</span>
      {description ? (
        <span className="text-xs text-muted-foreground">{description}</span>
      ) : null}
    </span>
    <DropdownMenuPrimitive.ItemIndicator className="animate-in fade-in-0 zoom-in-75 motion-reduce:animate-none">
      <CheckIcon aria-hidden="true" />
    </DropdownMenuPrimitive.ItemIndicator>
  </DropdownMenuPrimitive.RadioItem>
);

/** Alternância decorativa: o estado acessível vem do `menuitemcheckbox`. */
const MenuSwitch = ({ checked }: { checked: boolean }) => {
  const state = checked ? "checked" : "unchecked";
  return (
    <span
      aria-hidden="true"
      data-state={state}
      className="ml-auto inline-flex h-4 w-7 shrink-0 items-center rounded-full bg-muted-foreground transition-colors duration-150 data-[state=checked]:bg-foreground motion-reduce:transition-none"
    >
      <span
        data-state={state}
        className="block size-3 translate-x-0.5 rounded-full bg-background transition-transform duration-150 data-[state=checked]:translate-x-3.5 motion-reduce:transition-none"
      />
    </span>
  );
};

/* ---------------------------- Menu do agente ------------------------------ */

interface PromptAgentMenuProps {
  agents: PromptChoice[];
  contentProps?: React.ComponentProps<"div">;
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  onCloseAutoFocus?: (event: Event) => void;
  triggerProps?: React.ComponentProps<"button">;
  value: string;
}

const PromptAgentMenu = ({
  agents,
  contentProps,
  disabled,
  label,
  onChange,
  onCloseAutoFocus,
  triggerProps,
  value,
}: PromptAgentMenuProps) => {
  const currentLabel = choiceLabel(agents, value);

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="prompt-input-agent"
          aria-label={`${label}: ${currentLabel}`}
          disabled={disabled}
          className={cn(
            "inline-flex h-8 max-w-32 shrink items-center gap-1 rounded-md border border-border bg-background px-2.5 text-[13px] font-medium text-foreground outline-none hover:bg-accent disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent",
            "transition-colors duration-150 motion-reduce:transition-none",
            focusRingClass
          )}
          {...triggerProps}
        >
          <span className="truncate">{currentLabel}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground"
          />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          aria-label={label}
          align="start"
          sideOffset={6}
          collisionPadding={8}
          onCloseAutoFocus={onCloseAutoFocus}
          className={cn(menuContentClass, menuExitClass, "w-48")}
          {...contentProps}
        >
          <DropdownMenuPrimitive.RadioGroup
            value={value}
            onValueChange={onChange}
          >
            {agents.map((agent) => (
              <ChoiceItem key={agent.value} {...agent} />
            ))}
          </DropdownMenuPrimitive.RadioGroup>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

/* ------------------------- Menu de configurações -------------------------- */

/**
 * Submenu com as escolhas de uma configuração. Esc fecha só o submenu e
 * devolve o foco à linha que o abriu; Seta ← faz o mesmo (nativo do radix-ui).
 */
const ChoiceSubmenu = ({
  label,
  onChange,
  setting,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  setting: PromptSetting;
  value: string;
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <DropdownMenuPrimitive.Sub open={open} onOpenChange={setOpen}>
      <DropdownMenuPrimitive.SubTrigger
        ref={triggerRef}
        className={cn(menuItemClass, "data-[state=open]:bg-muted")}
      >
        <span className="flex-1 truncate">{label}</span>
        <span className="max-w-24 truncate text-xs text-muted-foreground">
          {choiceLabel(setting.choices, value)}
        </span>
        <ChevronRightIcon
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted-foreground"
        />
      </DropdownMenuPrimitive.SubTrigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent
          aria-label={setting.label}
          sideOffset={6}
          collisionPadding={8}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
            setOpen(false);
            triggerRef.current?.focus();
          }}
          className={cn(menuContentClass, menuExitClass, "w-56")}
        >
          <DropdownMenuPrimitive.RadioGroup
            value={value}
            onValueChange={onChange}
          >
            {setting.choices.map((choice) => (
              <ChoiceItem key={choice.value} {...choice} />
            ))}
          </DropdownMenuPrimitive.RadioGroup>
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Sub>
  );
};

/** Um grupo do painel: rótulo, escolhas à vista ou linha com submenu. */
const SettingGroup = ({
  onChange,
  setting,
  value,
}: {
  onChange: (value: string) => void;
  setting: PromptSetting;
  value: string;
}) => {
  if (setting.variant === "list") {
    return (
      <DropdownMenuPrimitive.Group aria-label={setting.label}>
        <ChoiceSubmenu
          label={setting.label}
          onChange={onChange}
          setting={setting}
          value={value}
        />
      </DropdownMenuPrimitive.Group>
    );
  }

  const visible = setting.moreLabel
    ? setting.choices.filter((choice) => choice.value === value)
    : setting.choices;

  return (
    <DropdownMenuPrimitive.Group aria-label={setting.label}>
      <DropdownMenuPrimitive.Label className={menuLabelClass}>
        {setting.label}
      </DropdownMenuPrimitive.Label>
      <DropdownMenuPrimitive.RadioGroup value={value} onValueChange={onChange}>
        {visible.map((choice) => (
          <ChoiceItem key={choice.value} {...choice} />
        ))}
      </DropdownMenuPrimitive.RadioGroup>
      {setting.moreLabel ? (
        <ChoiceSubmenu
          label={setting.moreLabel}
          onChange={onChange}
          setting={setting}
          value={value}
        />
      ) : null}
    </DropdownMenuPrimitive.Group>
  );
};

const CommandItem = ({
  disabled,
  icon,
  label,
  onSelect,
  shortcut,
}: PromptCommand) => (
  <DropdownMenuPrimitive.Item
    disabled={disabled}
    onSelect={() => onSelect()}
    className={menuItemClass}
  >
    {icon}
    <span className="flex-1 truncate">{label}</span>
    {shortcut ? <span className={menuShortcutClass}>{shortcut}</span> : null}
  </DropdownMenuPrimitive.Item>
);

export interface PromptSettingsMenuProps {
  /** Comandos avulsos no rodapé do painel. */
  commands?: PromptCommand[];
  contentProps?: React.ComponentProps<"div">;
  disabled?: boolean;
  /** Id da configuração cujo valor (`low` | `medium` | `high`) move o medidor. */
  effortSetting?: string;
  items: PromptSetting[];
  /** Prefixo do rótulo acessível do gatilho. */
  label?: string;
  onChange: (values: PromptSettings) => void;
  onCloseAutoFocus?: (event: Event) => void;
  triggerProps?: React.ComponentProps<"button">;
  /** Mapa id-da-configuração → valor, já resolvido. */
  values: PromptSettings;
}

/**
 * Gatilho que resume o estado (medidor de esforço, escolha principal e
 * contador das demais) e painel com um grupo por configuração e comandos
 * no rodapé.
 */
const PromptSettingsMenu = ({
  commands = [],
  contentProps,
  disabled,
  effortSetting = "effort",
  items,
  label = "Configurações do prompt",
  onChange,
  onCloseAutoFocus,
  triggerProps,
  values,
}: PromptSettingsMenuProps) => {
  const hasEffort = items.some((setting) => setting.id === effortSetting);
  const effort = values[effortSetting];
  const [primary] = items;
  const primaryLabel = primary
    ? choiceLabel(primary.choices, values[primary.id] ?? "")
    : "";
  const others = Math.max(items.length - 1, 0);
  const summary = others > 0 ? `${primaryLabel} (+${others})` : primaryLabel;

  const pick = (settingId: string) => (value: string) =>
    onChange({ ...values, [settingId]: value });

  const sections = items.map((setting) => ({
    key: setting.id,
    node: (
      <SettingGroup
        onChange={pick(setting.id)}
        setting={setting}
        value={values[setting.id] ?? ""}
      />
    ),
  }));
  if (commands.length > 0) {
    sections.push({
      key: "commands",
      node: (
        <DropdownMenuPrimitive.Group aria-label="Comandos">
          {commands.map((command) => (
            <CommandItem key={command.label} {...command} />
          ))}
        </DropdownMenuPrimitive.Group>
      ),
    });
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="prompt-input-settings"
          aria-label={summary ? `${label}: ${summary}` : label}
          disabled={disabled}
          className={cn(
            "inline-flex h-8 min-w-0 items-center gap-2 rounded-md px-2 text-[13px] text-muted-foreground outline-none hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-foreground",
            "transition-colors duration-150 motion-reduce:transition-none",
            focusRingClass
          )}
          {...triggerProps}
        >
          {hasEffort && isEffortLevel(effort) ? (
            <EffortGauge level={effort} />
          ) : null}
          <span className="max-w-32 truncate">{primaryLabel}</span>
          {others > 0 ? <span className="tabular-nums">+{others}</span> : null}
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        {/* Sem animação de saída: a escolha "confirma e some". */}
        <DropdownMenuPrimitive.Content
          aria-label={label}
          align="end"
          sideOffset={6}
          collisionPadding={8}
          onCloseAutoFocus={onCloseAutoFocus}
          className={cn(menuContentClass, "w-64")}
          {...contentProps}
        >
          {sections.map((section, index) => (
            <Fragment key={section.key}>
              {index > 0 ? (
                <DropdownMenuPrimitive.Separator
                  className={menuSeparatorClass}
                />
              ) : null}
              {section.node}
            </Fragment>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

/* ----------------------------- Menu "mais" -------------------------------- */

interface PromptActionsMenuProps {
  backLabel: string;
  checked: Record<string, boolean>;
  contentProps?: React.ComponentProps<"div">;
  disabled?: boolean;
  items: PromptMenuItem[];
  label: string;
  onCloseAutoFocus?: (event: Event) => void;
  onItemCheckedChange: (item: PromptMenuItem, checked: boolean) => void;
  onItemSelect: (item: PromptMenuItem) => void;
  triggerProps?: React.ComponentProps<"button">;
}

const PromptActionsMenu = ({
  backLabel,
  checked,
  contentProps,
  disabled,
  items,
  label,
  onCloseAutoFocus,
  onItemCheckedChange,
  onItemSelect,
  triggerProps,
}: PromptActionsMenuProps) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<PromptMenuItem | null>(null);
  const [direction, setDirection] = useState<"back" | "forward">("forward");
  const contentRef = useRef<HTMLDivElement>(null);
  const pageChanged = useRef(false);
  const lastOpened = useRef<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setPage(null);
      setDirection("forward");
      lastOpened.current = null;
    }
  };

  const goTo = (next: PromptMenuItem | null) => {
    pageChanged.current = true;
    if (next) {
      lastOpened.current = next.value;
    }
    setDirection(next ? "forward" : "back");
    setPage(next);
  };

  // Ao entrar numa página, o foco vai ao primeiro item; ao voltar, à linha
  // que abriu a página.
  useEffect(() => {
    if (!(open && pageChanged.current)) {
      return;
    }
    pageChanged.current = false;
    const content = contentRef.current;
    const opener =
      page === null && lastOpened.current
        ? content?.querySelector<HTMLElement>(
            `[data-value="${lastOpened.current}"]`
          )
        : null;
    const target =
      opener ?? content?.querySelector<HTMLElement>('[role^="menuitem"]');
    target?.focus();
  }, [open, page]);

  const visible = page?.items ?? items;

  const renderItem = (item: PromptMenuItem) => {
    if (item.type === "separator") {
      return (
        <DropdownMenuPrimitive.Separator
          key={item.value}
          className={menuSeparatorClass}
        />
      );
    }
    if (item.type === "toggle") {
      const isChecked = checked[item.value] ?? false;
      return (
        <DropdownMenuPrimitive.CheckboxItem
          key={item.value}
          data-value={item.value}
          disabled={item.disabled}
          checked={isChecked}
          onCheckedChange={(next) => onItemCheckedChange(item, next === true)}
          onSelect={(event) => event.preventDefault()}
          className={menuItemClass}
        >
          {item.icon}
          <span className="flex-1 truncate">{item.label}</span>
          <MenuSwitch checked={isChecked} />
        </DropdownMenuPrimitive.CheckboxItem>
      );
    }
    if (item.type === "submenu") {
      return (
        <DropdownMenuPrimitive.Item
          key={item.value}
          data-value={item.value}
          disabled={item.disabled}
          aria-haspopup="menu"
          aria-expanded={false}
          onSelect={(event) => {
            event.preventDefault();
            goTo(item);
          }}
          className={menuItemClass}
        >
          {item.icon}
          <span className="flex-1 truncate">{item.label}</span>
          <ChevronRightIcon
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground"
          />
        </DropdownMenuPrimitive.Item>
      );
    }
    return (
      <DropdownMenuPrimitive.Item
        key={item.value}
        data-value={item.value}
        disabled={item.disabled}
        onSelect={() => onItemSelect(item)}
        className={menuItemClass}
      >
        {item.icon}
        <span className="flex-1 truncate">{item.label}</span>
        {item.shortcut ? (
          <span className={menuShortcutClass}>{item.shortcut}</span>
        ) : null}
      </DropdownMenuPrimitive.Item>
    );
  };

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          data-slot="prompt-input-add"
          aria-label={label}
          disabled={disabled}
          className={cn(iconButtonClass, "data-[state=open]:bg-accent")}
          {...triggerProps}
        >
          <PlusIcon aria-hidden="true" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={contentRef}
          aria-label={page?.label ?? label}
          align="start"
          sideOffset={6}
          collisionPadding={8}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={(event) => {
            if (page) {
              event.preventDefault();
              goTo(null);
            }
          }}
          className={cn(menuContentClass, menuExitClass, "w-56")}
          {...contentProps}
        >
          <div
            key={page?.value ?? "root"}
            className={cn(
              "flex flex-col animate-in fade-in-0 duration-150 motion-reduce:animate-none",
              direction === "forward"
                ? "slide-in-from-right-2"
                : "slide-in-from-left-2"
            )}
          >
            {page ? (
              <>
                <DropdownMenuPrimitive.Item
                  onSelect={(event) => {
                    event.preventDefault();
                    goTo(null);
                  }}
                  className={cn(menuItemClass, "text-muted-foreground")}
                >
                  <ChevronLeftIcon aria-hidden="true" />
                  <span className="flex-1 truncate">{backLabel}</span>
                </DropdownMenuPrimitive.Item>
                <DropdownMenuPrimitive.Separator
                  className={menuSeparatorClass}
                />
              </>
            ) : null}
            {visible.map(renderItem)}
          </div>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

/* -------------------------------------------------------------------------- */
/* Peças do compositor                                                        */
/* -------------------------------------------------------------------------- */

const SWEEP_KEYFRAMES =
  "@keyframes lab-prompt-input-sweep{from{transform:translateX(-100%);opacity:0}25%{opacity:1}to{transform:translateX(400%);opacity:0}}";

/**
 * Brilho breve na base do cartão. Cada envio gera um novo `id`, o que
 * remonta o traço e reinicia a animação; ela se encerra pelo `animationend`.
 */
const useSendSweep = (enabled: boolean) => {
  const [sweep, setSweep] = useState({ active: false, id: 0 });

  const trigger = useCallback(() => {
    if (!enabled) {
      return;
    }
    setSweep((current) => ({ active: true, id: current.id + 1 }));
  }, [enabled]);

  const finish = useCallback(() => {
    setSweep((current) => ({ ...current, active: false }));
  }, []);

  return { finish, sweep, trigger };
};

/** Estado interno das alternâncias do menu "mais", com `checked` por item. */
const useMenuToggles = (
  items: PromptMenuItem[],
  onMenuChange: ((change: PromptMenuChange) => void) | undefined
) => {
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    collectDefaultChecked(items)
  );

  const resolved = useMemo(() => {
    const merged = { ...checked };
    const apply = (entries: PromptMenuItem[]) => {
      for (const entry of entries) {
        if (entry.type === "toggle" && entry.checked !== undefined) {
          merged[entry.value] = entry.checked;
        }
        if (entry.items) {
          apply(entry.items);
        }
      }
    };
    apply(items);
    return merged;
  }, [checked, items]);

  const onItemCheckedChange = useCallback(
    (item: PromptMenuItem, next: boolean) => {
      setChecked((current) => ({ ...current, [item.value]: next }));
      onMenuChange?.({ checked: next, type: "toggle", value: item.value });
    },
    [onMenuChange]
  );

  return { checked: resolved, onItemCheckedChange };
};

const isSubmitKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) =>
  event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing;

const SendSweep = ({
  active,
  id,
  onFinish,
}: {
  active: boolean;
  id: number;
  onFinish: () => void;
}) =>
  active ? (
    <>
      <style href="lab-prompt-input-sweep" precedence="default">
        {SWEEP_KEYFRAMES}
      </style>
      <span
        key={id}
        aria-hidden="true"
        data-slot="prompt-input-sweep"
        className="pointer-events-none absolute inset-x-3 -bottom-px h-0.5 overflow-hidden rounded-full motion-reduce:hidden"
      >
        <span
          className="block h-full w-1/3 rounded-full bg-foreground/70"
          style={{ animation: "lab-prompt-input-sweep 0.8s ease-out both" }}
          onAnimationEnd={onFinish}
        />
      </span>
    </>
  ) : null;

const MessageLog = ({
  maxHeight,
  messages,
}: {
  maxHeight: string;
  messages: PromptMessage[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  // A lista rola até o fim quando entra uma nova mensagem e só entra na
  // ordem de Tab quando de fato tem o que rolar.
  useEffect(() => {
    const log = ref.current;
    if (!log) {
      return;
    }
    log.scrollTop = log.scrollHeight;
    const measure = () => setScrollable(log.scrollHeight > log.clientHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(log);
    return () => observer.disconnect();
  }, [messages.length]);

  return (
    <div
      ref={ref}
      data-slot="prompt-input-log"
      role="log"
      aria-live="polite"
      aria-label="Mensagens enviadas"
      tabIndex={scrollable ? 0 : -1}
      style={{ "--log-max": maxHeight } as React.CSSProperties}
      className={cn(
        "grid max-h-(--log-max) justify-items-end gap-1.5 overflow-auto scroll-smooth rounded-md p-1 outline-none motion-reduce:scroll-auto",
        focusRingClass
      )}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          data-slot="prompt-input-message"
          className="max-w-prose rounded-md border border-border bg-muted/60 px-3 py-2 text-sm wrap-break-word whitespace-pre-line animate-in fade-in-0 slide-in-from-bottom-1 duration-200 motion-reduce:animate-none"
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

const SendButton = ({
  canSend,
  label,
  loading,
  onClick,
}: {
  canSend: boolean;
  label: string;
  loading: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    data-slot="prompt-input-send"
    aria-label={label}
    aria-busy={loading || undefined}
    disabled={!canSend}
    onClick={onClick}
    className={cn(
      iconButtonClass,
      "disabled:cursor-default disabled:opacity-100",
      canSend
        ? "bg-foreground text-background hover:bg-foreground/85 hover:text-background"
        : "bg-muted text-muted-foreground"
    )}
  >
    {loading ? (
      <Loader2Icon
        aria-hidden="true"
        className="animate-spin motion-reduce:animate-pulse"
      />
    ) : (
      <ArrowUpIcon aria-hidden="true" />
    )}
  </button>
);

/* -------------------------------------------------------------------------- */
/* PromptInput                                                                */
/* -------------------------------------------------------------------------- */

export interface PromptInputProps extends Omit<
  React.ComponentProps<"div">,
  "onChange" | "onSubmit"
> {
  placeholder?: string;
  /** Texto do compositor (controlado). */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Recebe o texto aparado com o contexto vigente (agente e configurações). */
  onSend?: (submission: PromptSubmission) => void;
  /** Enter envia e Shift+Enter quebra linha. */
  submitOnEnter?: boolean;
  /** Linhas visíveis antes de rolar internamente. */
  maxRows?: number;
  /** Mostra o histórico de envios acima do compositor. */
  showHistory?: boolean;
  /** Histórico controlado; sem ele, o componente guarda o histórico. */
  history?: PromptMessage[];
  onHistoryChange?: (history: PromptMessage[]) => void;
  /** Altura máxima do histórico antes de rolar (qualquer valor CSS). */
  historyMaxHeight?: string;
  /** Opções do chip de agente; vazio oculta o chip. */
  agents?: PromptChoice[];
  agent?: string;
  defaultAgent?: string;
  onAgentChange?: (value: string) => void;
  /** Rótulo acessível do chip de agente. */
  agentLabel?: string;
  /** Configurações do menu à direita; vazio (e sem comandos) oculta o gatilho. */
  settingsMenu?: PromptSetting[];
  settings?: PromptSettings;
  defaultSettings?: PromptSettings;
  onSettingsChange?: (settings: PromptSettings) => void;
  /** Id da configuração que move o medidor de esforço (`low` | `medium` | `high`). */
  effortSetting?: string;
  /** Comandos avulsos no rodapé do menu de configurações. */
  commands?: PromptCommand[];
  /** Prefixo do rótulo acessível do gatilho de configurações. */
  settingsLabel?: string;
  /** Itens do menu "mais"; vazio faz o botão disparar `onAddClick`. */
  menu?: PromptMenuItem[];
  /** Um só evento para ações escolhidas e alternâncias mudadas no menu "mais". */
  onMenuChange?: (change: PromptMenuChange) => void;
  onAddClick?: () => void;
  /** Rótulo acessível do botão "mais". */
  addLabel?: string;
  /** Rótulo do item de voltar nos submenus do menu "mais". */
  backLabel?: string;
  /** Sem ele, o botão de voz não é renderizado. */
  onMicClick?: () => void;
  micLabel?: string;
  sendLabel?: string;
  /** Rótulo acessível da área de texto. */
  inputLabel?: string;
  /** Desabilita a área de texto e todos os controles. */
  disabled?: boolean;
  /** Resposta em andamento: o botão de enviar mostra progresso e desabilita. */
  loading?: boolean;
  /** Brilho breve na base do cartão após enviar; respeita reduced motion. */
  sendEffect?: boolean;
}

const EMPTY_HISTORY: PromptMessage[] = [];

const PROMPT_INPUT_DEFAULTS = {
  addLabel: "Mais ações",
  agentLabel: "Agente",
  agents: [] as PromptChoice[],
  backLabel: "Voltar",
  commands: [] as PromptCommand[],
  defaultSettings: {} as PromptSettings,
  defaultValue: "",
  disabled: false,
  effortSetting: "effort",
  historyMaxHeight: "16rem",
  inputLabel: "Mensagem para o agente",
  loading: false,
  maxRows: 6,
  menu: [] as PromptMenuItem[],
  micLabel: "Ditar por voz",
  placeholder: "Pergunte ou peça algo…",
  sendEffect: true,
  sendLabel: "Enviar",
  settingsLabel: "Configurações do prompt",
  settingsMenu: [] as PromptSetting[],
  showHistory: true,
  submitOnEnter: true,
} satisfies Partial<PromptInputProps>;

/** Aplica os padrões só onde a prop veio `undefined`. */
const withDefaults = <T extends object, D extends object>(
  props: T,
  defaults: D
): T & D => {
  const merged: Record<string, unknown> = { ...(defaults as object) };
  for (const [key, entry] of Object.entries(props)) {
    if (entry !== undefined) {
      merged[key] = entry;
    }
  }
  return merged as T & D;
};

const PromptInput = (rawProps: PromptInputProps) => {
  const {
    addLabel,
    agent: agentProp,
    agentLabel,
    agents,
    backLabel,
    className,
    commands,
    defaultAgent,
    defaultSettings,
    defaultValue,
    disabled,
    effortSetting,
    history: historyProp,
    historyMaxHeight,
    inputLabel,
    loading,
    maxRows,
    menu,
    micLabel,
    onAddClick,
    onAgentChange,
    onHistoryChange,
    onMenuChange,
    onMicClick,
    onSend,
    onSettingsChange,
    onValueChange,
    placeholder,
    sendEffect,
    sendLabel,
    settings: settingsProp,
    settingsLabel,
    settingsMenu,
    showHistory,
    submitOnEnter,
    value: valueProp,
    ...props
  } = withDefaults(rawProps, PROMPT_INPUT_DEFAULTS);
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const counter = useRef(0);

  const [value, setValue] = useControllableState(
    valueProp,
    defaultValue,
    onValueChange
  );
  const [history, setHistory] = useControllableState(
    historyProp,
    EMPTY_HISTORY,
    onHistoryChange
  );
  const [agent, setAgent] = useControllableState(
    agentProp,
    defaultAgent ?? firstChoiceValue(agents),
    onAgentChange
  );
  const [rawSettings, setRawSettings] = useControllableState(
    settingsProp,
    defaultSettings,
    onSettingsChange
  );
  const settings = useMemo(
    () => resolveSettings(settingsMenu, rawSettings),
    [rawSettings, settingsMenu]
  );

  const toggles = useMenuToggles(menu, onMenuChange);
  const {
    finish: finishSweep,
    sweep,
    trigger: triggerSweep,
  } = useSendSweep(sendEffect);
  const menuFocus = useMenuFocusReturn(textareaRef);

  const canSend = value.trim().length > 0 && !disabled && !loading;

  const send = () => {
    if (!canSend) {
      return;
    }
    const text = value.trim();
    counter.current += 1;
    setValue("");
    if (showHistory) {
      setHistory([...history, { id: `${id}-${counter.current}`, text }]);
    }
    onSend?.({
      agent: agents.length > 0 ? agent : undefined,
      settings,
      text,
    });
    triggerSweep();
    textareaRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (submitOnEnter && isSubmitKey(event)) {
      event.preventDefault();
      send();
    }
  };

  const showLog = showHistory && history.length > 0;
  const showSettings = settingsMenu.length > 0 || commands.length > 0;

  return (
    <div
      data-slot="prompt-input"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    >
      {showLog ? (
        <MessageLog maxHeight={historyMaxHeight} messages={history} />
      ) : null}

      <div
        data-slot="prompt-input-composer"
        data-disabled={disabled ? "true" : undefined}
        className={cn(
          "@container relative flex flex-col rounded-lg border border-border bg-background text-foreground shadow-sm transition-[border-color,box-shadow] duration-150 motion-reduce:transition-none",
          "has-[textarea:focus-visible]:border-ring has-[textarea:focus-visible]:ring-2 has-[textarea:focus-visible]:ring-ring/40",
          "data-[disabled=true]:bg-muted data-[disabled=true]:text-muted-foreground"
        )}
      >
        <SendSweep active={sweep.active} id={sweep.id} onFinish={finishSweep} />

        {/* `text-base` no viewport estreito evita o zoom do iOS ao focar. */}
        <textarea
          ref={textareaRef}
          id={`${id}-textarea`}
          data-slot="prompt-input-textarea"
          rows={1}
          aria-label={inputLabel}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          style={{ "--max-rows": maxRows } as React.CSSProperties}
          className="field-sizing-content max-h-[calc(var(--max-rows)*1.5rem+1.5rem)] min-h-10 w-full border-0 bg-transparent p-3 text-base/6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed sm:text-sm/6"
        />

        <div
          data-slot="prompt-input-toolbar"
          className="flex items-center gap-1 px-2 pb-2"
        >
          {menu.length > 0 ? (
            <PromptActionsMenu
              backLabel={backLabel}
              checked={toggles.checked}
              contentProps={menuFocus.contentProps}
              disabled={disabled}
              items={menu}
              label={addLabel}
              onCloseAutoFocus={menuFocus.onCloseAutoFocus}
              onItemCheckedChange={toggles.onItemCheckedChange}
              onItemSelect={(item) =>
                onMenuChange?.({ type: "select", value: item.value })
              }
              triggerProps={menuFocus.triggerProps}
            />
          ) : (
            <button
              type="button"
              data-slot="prompt-input-add"
              aria-label={addLabel}
              disabled={disabled}
              onClick={onAddClick}
              className={iconButtonClass}
            >
              <PlusIcon aria-hidden="true" />
            </button>
          )}

          {agents.length > 0 ? (
            <PromptAgentMenu
              agents={agents}
              contentProps={menuFocus.contentProps}
              disabled={disabled}
              label={agentLabel}
              onChange={setAgent}
              onCloseAutoFocus={menuFocus.onCloseAutoFocus}
              triggerProps={menuFocus.triggerProps}
              value={agent}
            />
          ) : null}

          <div className="ms-auto flex items-center gap-1">
            {showSettings ? (
              <PromptSettingsMenu
                commands={commands}
                contentProps={menuFocus.contentProps}
                disabled={disabled}
                effortSetting={effortSetting}
                items={settingsMenu}
                label={settingsLabel}
                onChange={setRawSettings}
                onCloseAutoFocus={menuFocus.onCloseAutoFocus}
                triggerProps={menuFocus.triggerProps}
                values={settings}
              />
            ) : null}

            {onMicClick ? (
              <button
                type="button"
                data-slot="prompt-input-mic"
                aria-label={micLabel}
                disabled={disabled}
                onClick={onMicClick}
                className={cn(iconButtonClass, "@max-md:hidden")}
              >
                <MicIcon aria-hidden="true" />
              </button>
            ) : null}

            <SendButton
              canSend={canSend}
              label={sendLabel}
              loading={loading}
              onClick={send}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PromptInput, PromptSettingsMenu };
