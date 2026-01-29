import { Skeleton } from "@/components/ui/skeleton";

export default function SidePanelSkeleton() {
    return (
        <div className="flex flex-col gap-6">
            {/* Header: IQA Principal Skeleton */}
            <div className="flex items-center gap-3 mb-6">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-12" />
                </div>
            </div>

            {/* Lista de Poluentes Skeleton - Simula 5 itens */}
            <div className="flex flex-col">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-3 py-5 border-b border-border last:border-0 px-3"
                    >
                        {/* Header do Poluente */}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-10" /> {/* Nome: CO, NO2... */}
                                <Skeleton className="size-5 rounded-full" /> {/* Ícone Info */}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <Skeleton className="h-6 w-16" /> {/* Valor */}
                                <Skeleton className="h-4 w-20" /> {/* Status: "Muito Ruim" */}
                            </div>
                        </div>

                        {/* Barra de Progresso Segmentada */}
                        <div className="flex gap-1 h-2 w-full">
                            <Skeleton className="flex-1 h-full rounded-l-full" />
                            <Skeleton className="flex-1 h-full" />
                            <Skeleton className="flex-1 h-full" />
                            <Skeleton className="flex-1 h-full" />
                            <Skeleton className="flex-1 h-full rounded-r-full" />
                        </div>

                        {/* Min/Max values */}
                        <div className="flex justify-between">
                            <Skeleton className="h-4 w-4" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
