import Card from '../cards/Card'
import { Skeleton } from "@/components/ui/skeleton"

export default function DailyForecastSkeleton() {
  const skeletonRows = Array.from({ length: 8 });

  return (
    <Card title="Previsão diária" childrenClassName="p-0">
      <div className="p-4">
        <div className="grid grid-cols-5 mb-2 px-2 text-xs uppercase tracking-wider font-bold text-slate-400">
          <p className="text-left pl-2">Dia</p>
          <p className="text-center">Clima</p>
          <p className="text-center">Méd</p>
          <p className="text-center">Máx</p>
          <p className="text-center">Min</p>
        </div>

        <div className="flex flex-col">
          {skeletonRows.map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-5 items-center py-3 px-2 border-b border-slate-100 last:border-0 dark:border-slate-800"
            >
              {/* Nome do Dia */}
              <div className="pl-2">
                <Skeleton className="h-4 w-10" />
              </div>

              {/* Ícone */}
              <div className="flex justify-center">
                <Skeleton className="size-8 rounded-full" />
              </div>

              {/* Temperatura Média */}
              <div className="flex justify-center">
                <Skeleton className="h-4 w-6" />
              </div>

              {/* Máxima */}
              <div className="flex justify-center">
                <Skeleton className="h-4 w-6" />
              </div>

              {/* Mínima */}
              <div className="flex justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
