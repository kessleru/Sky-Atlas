import Card from '../cards/Card'
import { Skeleton } from "@/components/ui/skeleton"

const labels = [
  'Nascer do sol',
  'Pôr do sol',
  'Chuva (1h)',
  'Índice UV',
  'Direção do vento',
  'Pressão atmosférica',
  'Ponto de orvalho',
  'Nebulosidade',
];

export default function AdditionalInfoSkeleton() {
  return (
    <Card title="Informações Adicionais" childrenClassName="p-4">
      <div className="flex flex-col">
        {labels.map((label, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 px-2"
          >
            {/* Label estático */}
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
              {label}
            </span>

            {/* Container do Valor + Ícone */}
            <div className="flex items-center gap-2">
              {/* Skeleton do Ícone */}
              <Skeleton className="size-4 rounded-full" />

              {/* Skeleton do Valor */}
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}