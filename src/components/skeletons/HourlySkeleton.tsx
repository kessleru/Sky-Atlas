import Card from '../cards/Card'
import { Skeleton } from "@/components/ui/skeleton"

export default function HourlyForecastSkeleton() {
  // Geramos 12 itens para preencher bem a largura horizontal do card
  const skeletonHours = Array.from({ length: 12 });

  return (
    <Card title="Previsão horária" childrenClassName="p-0">
      <div className="flex gap-4 overflow-x-auto px-6 py-6 [&::-webkit-scrollbar]:hidden">
        {skeletonHours.map((_, index) => (
          <div
            key={index}
            className={`
              shrink-0 flex flex-col items-center justify-between
              min-w-20 p-4 rounded-full border border-slate-200 dark:border-slate-700
              bg-slate-50/50 dark:bg-slate-800/30
              ${index === 0 ? 'scale-105 border-slate-300 dark:border-slate-600' : ''}
            `}
          >
            {/* Hora */}
            <Skeleton className="h-3 w-8 mb-2" />

            {/* Ícone */}
            <Skeleton className="size-10 my-2 rounded-full" />

            {/* Temperatura */}
            <Skeleton className="h-6 w-8 mt-1" />
          </div>
        ))}
      </div>
    </Card>
  )
}