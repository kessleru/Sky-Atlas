import Card from '../cards/Card'
import { Skeleton } from "@/components/ui/skeleton"

export default function CurrentSkeleton() {
  return (
    <Card title="Tempo Atual" childrenClassName="p-6">
      {/* Header: Skeleton da Temperatura e Ícone */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <Skeleton className="size-22 rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2">
          {/* Simula a Temperatura Grande */}
          <Skeleton className="h-16 w-32" /> 
          {/* Simula a Descrição */}
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      {/* Horário Local com Badge (Skeleton) */}
      <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-3 px-6 mb-8 border border-slate-100 dark:border-slate-700">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
          Horário Local
        </p>
        <Skeleton className="h-7 w-28" />
      </div>

      {/* Grid de Detalhes Adicionais */}
      <div className="grid grid-cols-2 border-t border-slate-100 dark:border-slate-800 mt-6">
        {/* Sensação */}
        <div className="flex flex-col items-center text-center py-6 border-b border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-tight">
            Sensação
          </span>
          <Skeleton className="h-6 w-12" />
        </div>

        {/* Umidade */}
        <div className="flex flex-col items-center text-center py-6 border-l border-b border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-tight">
            Umidade
          </span>
          <Skeleton className="h-6 w-12" />
        </div>

        {/* Vento */}
        <div className="flex flex-col items-center text-center py-6">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-tight">
            Vento
          </span>
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Chuva */}
        <div className="flex flex-col items-center text-center py-6 border-l border-slate-100 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-tight">
            Chuva
          </span>
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </Card>
  )
}