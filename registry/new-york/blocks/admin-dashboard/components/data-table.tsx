"use client";

import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnVisibilityState,
  Row,
  SortingState,
} from "@tanstack/react-table";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleCheckIcon,
  Columns3Icon,
  EllipsisVerticalIcon,
  GripVerticalIcon,
  LoaderIcon,
  PlusIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export const schema = z.object({
  header: z.string(),
  id: z.number(),
  limit: z.string(),
  reviewer: z.string(),
  status: z.string(),
  target: z.string(),
  type: z.string(),
});

type Item = z.infer<typeof schema>;

/** Recursos do TanStack Table v9 usados pela tabela, com seus modelos de linha. */
const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});

type Features = typeof features;

const DONE_STATUS = "Concluído";
const UNASSIGNED_REVIEWER = "Atribuir revisor";

const SECTION_TYPES = [
  "Capa",
  "Sumário",
  "Conteúdo técnico",
  "Narrativa",
  "Planejamento",
  "Pesquisa",
  "Jurídico",
  "Linguagem simples",
  "Visual",
  "Financeiro",
];

const STATUSES = [DONE_STATUS, "Em andamento", "Não iniciado"];

const REVIEWERS = ["Eddie Lake", "Jamik Tashpulatov", "Emily Whalen"];

/** Rótulos em pt-BR das colunas que podem ser ocultadas. */
const COLUMN_LABELS: Record<string, string> = {
  limit: "Limite",
  reviewer: "Revisor",
  status: "Status",
  target: "Meta",
  type: "Tipo de seção",
};

const PAGE_SIZES = [10, 20, 30, 40, 50];

const chartData = [
  { desktop: 186, mobile: 80, month: "Janeiro" },
  { desktop: 305, mobile: 200, month: "Fevereiro" },
  { desktop: 237, mobile: 120, month: "Março" },
  { desktop: 73, mobile: 190, month: "Abril" },
  { desktop: 209, mobile: 130, month: "Maio" },
  { desktop: 214, mobile: 140, month: "Junho" },
];

const chartConfig = {
  desktop: {
    color: "var(--primary)",
    label: "Computador",
  },
  mobile: {
    color: "var(--primary)",
    label: "Celular",
  },
} satisfies ChartConfig;

/** Simula o salvamento de uma seção e avisa pelo sonner. */
const simulateSave = (header: string) => {
  const id = toast.loading(`Salvando ${header}`);
  setTimeout(() => {
    toast.success("Concluído", { id });
  }, 1000);
};

/** Abre o item numa gaveta lateral (inferior no celular) com gráfico e formulário. */
const TableCellViewer = ({ item }: { item: Item }) => {
  const isMobile = useIsMobile();
  const formId = useId();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button
          className="h-auto w-fit px-0 text-left text-foreground hover:bg-transparent hover:underline"
          variant="tertiary"
        >
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Total de visitantes nos últimos 6 meses
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {isMobile ? null : (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{ left: 0, right: 10 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value: string) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 font-medium leading-none">
                  Alta de 5,2% neste mês{" "}
                  <TrendingUpIcon aria-hidden="true" className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Total de visitantes nos últimos 6 meses. Este é apenas um
                  texto de exemplo para testar o layout: ocupa mais de uma linha
                  e deve quebrar naturalmente.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              simulateSave(item.header);
            }}
          >
            <Input
              defaultValue={item.header}
              id={`${formId}-header`}
              label="Título"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${formId}-type`}>Tipo</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger className="w-full" id={`${formId}-type`}>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor={`${formId}-status`}>Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger className="w-full" id={`${formId}-status`}>
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                defaultValue={item.target}
                id={`${formId}-target`}
                label="Meta"
              />
              <Input
                defaultValue={item.limit}
                id={`${formId}-limit`}
                label="Limite"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor={`${formId}-reviewer`}>Revisor</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger className="w-full" id={`${formId}-reviewer`}>
                  <SelectValue placeholder="Selecione um revisor" />
                </SelectTrigger>
                <SelectContent>
                  {REVIEWERS.map((reviewer) => (
                    <SelectItem key={reviewer} value={reviewer}>
                      {reviewer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button variant="primary">Enviar</Button>
          <DrawerClose asChild>
            <Button variant="secondary">Concluir</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

/** Alça de arrastar da linha; recebe os atributos e ouvintes do dnd-kit. */
const DragHandle = ({ id }: { id: number }) => {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      aria-label="Arrastar para reordenar"
      className="size-7 text-muted-foreground hover:bg-transparent"
      shape="square"
      size="sm"
      variant="tertiary"
    >
      <GripVerticalIcon
        aria-hidden="true"
        className="size-3 text-muted-foreground"
      />
    </Button>
  );
};

/** Campo numérico editável na célula, salvo ao pressionar Enter. */
const EditableCell = ({
  field,
  item,
  label,
}: {
  field: "limit" | "target";
  item: Item;
  label: string;
}) => {
  const inputId = `${item.id}-${field}`;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        simulateSave(item.header);
      }}
    >
      <Label className="sr-only" htmlFor={inputId}>
        {label}
      </Label>
      <Input
        className="text-right"
        defaultValue={item[field]}
        id={inputId}
        size="sm"
        wrapperClassName="w-16 *:data-[slot=input-wrapper]:border-transparent *:data-[slot=input-wrapper]:bg-transparent *:data-[slot=input-wrapper]:hover:bg-muted/40 *:data-[slot=input-wrapper]:focus-within:border-input *:data-[slot=input-wrapper]:focus-within:bg-background"
      />
    </form>
  );
};

const columns: ColumnDef<Features, Item>[] = [
  {
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    header: () => null,
    id: "drag",
  },
  {
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          aria-label={`Selecionar ${row.original.header}`}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(value === true)}
        />
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => {
      const allSelected = table.getIsAllPageRowsSelected();
      let checked: boolean | "indeterminate" = allSelected;
      if (!allSelected && table.getIsSomePageRowsSelected()) {
        checked = "indeterminate";
      }

      return (
        <div className="flex items-center justify-center">
          <Checkbox
            aria-label="Selecionar todas as linhas da página"
            checked={checked}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(value === true)
            }
          />
        </div>
      );
    },
    id: "select",
  },
  {
    accessorKey: "header",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
    header: "Título",
  },
  {
    accessorKey: "type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge appearance="subtle" color="gray">
          {row.original.type}
        </Badge>
      </div>
    ),
    header: "Tipo de seção",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge appearance="subtle" color="gray">
        {row.original.status === DONE_STATUS ? (
          <CircleCheckIcon
            aria-hidden="true"
            className="text-green-600 dark:text-green-400"
          />
        ) : (
          <LoaderIcon aria-hidden="true" />
        )}
        {row.original.status}
      </Badge>
    ),
    header: "Status",
  },
  {
    accessorKey: "target",
    cell: ({ row }) => (
      <EditableCell field="target" item={row.original} label="Meta" />
    ),
    header: () => <div className="w-full text-right">Meta</div>,
  },
  {
    accessorKey: "limit",
    cell: ({ row }) => (
      <EditableCell field="limit" item={row.original} label="Limite" />
    ),
    header: () => <div className="w-full text-right">Limite</div>,
  },
  {
    accessorKey: "reviewer",
    cell: ({ row }) => {
      if (row.original.reviewer !== UNASSIGNED_REVIEWER) {
        return row.original.reviewer;
      }

      const selectId = `${row.original.id}-reviewer`;

      return (
        <>
          <Label className="sr-only" htmlFor={selectId}>
            Revisor
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={selectId}
            >
              <SelectValue placeholder={UNASSIGNED_REVIEWER} />
            </SelectTrigger>
            <SelectContent align="end">
              {REVIEWERS.slice(0, 2).map((reviewer) => (
                <SelectItem key={reviewer} value={reviewer}>
                  {reviewer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    },
    header: "Revisor",
  },
  {
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={`Ações de ${row.original.header}`}
            className="size-8 text-muted-foreground data-[state=open]:bg-muted"
            shape="square"
            size="sm"
            variant="tertiary"
          >
            <EllipsisVerticalIcon aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Duplicar</DropdownMenuItem>
          <DropdownMenuItem>Favoritar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    id: "actions",
  },
];

/** Linha da tabela que pode ser arrastada verticalmente. */
const DraggableRow = ({ row }: { row: Row<Features, Item> }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() ? "selected" : undefined}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

/**
 * Tabela de seções com abas, seleção, colunas ocultáveis, reordenação por
 * arrastar e soltar e paginação.
 */
export const DataTable = ({ data: initialData }: { data: Item[] }) => {
  const [data, setData] = useState(() => initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data]
  );

  const table = useTable({
    columns,
    data,
    enableRowSelection: true,
    features,
    getRowId: (row) => String(row.id),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((current) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(current, oldIndex, newIndex);
      });
    }
  };

  const { rows } = table.getRowModel();
  const { pageIndex, pageSize } = table.state.pagination;

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          Visualização
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Selecione uma visualização" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Estrutura</SelectItem>
            <SelectItem value="past-performance">
              Desempenho anterior
            </SelectItem>
            <SelectItem value="key-personnel">Equipe-chave</SelectItem>
            <SelectItem value="focus-documents">Documentos em foco</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="hidden @4xl/main:flex">
          <TabsTrigger value="outline">Estrutura</TabsTrigger>
          <TabsTrigger value="past-performance">
            Desempenho anterior{" "}
            <Badge appearance="subtle" color="gray" shape="pill" size="sm">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Equipe-chave{" "}
            <Badge appearance="subtle" color="gray" shape="pill" size="sm">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Documentos em foco</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                prefix={<Columns3Icon aria-hidden="true" />}
                size="sm"
                suffix={<ChevronDownIcon aria-hidden="true" />}
                variant="secondary"
              >
                <span className="hidden lg:inline">Personalizar colunas</span>
                <span className="lg:hidden">Colunas</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    column.accessorFn !== undefined && column.getCanHide()
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(value === true)
                    }
                  >
                    {COLUMN_LABELS[column.id] ?? column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            aria-label="Adicionar seção"
            prefix={<PlusIcon aria-hidden="true" />}
            size="sm"
            variant="secondary"
          >
            <span className="hidden lg:inline">Adicionar seção</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {rows.length > 0 ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-muted-foreground text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Linhas por página
              </Label>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {PAGE_SIZES.map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Página {pageIndex + 1} de {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                aria-label="Ir para a primeira página"
                className="hidden lg:inline-flex"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.setPageIndex(0)}
                shape="square"
                size="sm"
                variant="secondary"
              >
                <ChevronsLeftIcon aria-hidden="true" />
              </Button>
              <Button
                aria-label="Página anterior"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                shape="square"
                size="sm"
                variant="secondary"
              >
                <ChevronLeftIcon aria-hidden="true" />
              </Button>
              <Button
                aria-label="Próxima página"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                shape="square"
                size="sm"
                variant="secondary"
              >
                <ChevronRightIcon aria-hidden="true" />
              </Button>
              <Button
                aria-label="Ir para a última página"
                className="hidden lg:inline-flex"
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                shape="square"
                size="sm"
                variant="secondary"
              >
                <ChevronsRightIcon aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed" />
      </TabsContent>
    </Tabs>
  );
};
