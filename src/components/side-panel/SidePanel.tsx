import { getAirPollution } from "@/api"
import type { Coords } from "@/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense, useState } from "react"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import Information from "/src/assets/icons/information.svg?react"
import Chevron from "/src/assets/icons/chevron-left.svg?react"
import SidePanelSkeleton from "../skeletons/SidePanelSkeleton"

type Props = {
  coords: Coords
}

export default function SidePanel({ coords }: Props) {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  return (
    <>
      {/* Botão flutuante para abrir o painel */}
      <button
        onClick={() => setIsSidePanelOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-1000 p-4 rounded-full bg-linear-to-br from-card to-card/60 shadow-lg hover:scale-105 transition-all duration-300 lg:hidden",
          isSidePanelOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Abrir painel de qualidade do ar"
      >
        <Information className="size-6" />
      </button>

      {/* Overlay para fechar o painel ao clicar fora */}
      {isSidePanelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-1000 lg:hidden"
          onClick={() => setIsSidePanelOpen(false)}
        />
      )}

      {/* Painel lateral */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-xl bg-linear-to-b from-sidebar to-sidebar/95 z-1001 py-6 px-4 overflow-y-auto overflow-x-hidden transition-transform duration-300 lg:translate-x-0 border-l border-border",
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header com botão de fechar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Qualidade do Ar</h1>
          <button
            onClick={() => setIsSidePanelOpen(false)}
            className="p-2 rounded-lg hover:bg-card/50 transition-colors lg:hidden"
            aria-label="Fechar painel"
          >
            <Chevron className="size-6 rotate-180" />
          </button>
        </div>

        <Suspense fallback={<SidePanelSkeleton />}>
          <AirPollution coords={coords} />
        </Suspense>
      </div>
    </>
  )
}

function AirPollution({ coords }: { coords: Coords }) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coords],
    queryFn: () => getAirPollution(coords),
  })

  return (
    <div className="flex flex-col">
      {/* Header: IQA Principal */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-6xl font-bold tracking-tighter text-foreground">
          {data.list[0].main.aqi}
        </h2>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-muted-foreground">IQA</span>
          <Tooltip>
            <TooltipTrigger>
              <Information className="size-5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="z-2000">
              <div className="flex flex-col gap-2 p-1">
                <p className="font-semibold mb-1">Índice de Qualidade do Ar</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2"><span className="font-bold text-green-500">1</span> = Bom</li>
                  <li className="flex items-center gap-2"><span className="font-bold text-yellow-500">2</span> = Razoável</li>
                  <li className="flex items-center gap-2"><span className="font-bold text-orange-500">3</span> = Moderado</li>
                  <li className="flex items-center gap-2"><span className="font-bold text-red-500">4</span> = Ruim</li>
                  <li className="flex items-center gap-2"><span className="font-bold text-purple-500">5</span> = Muito Ruim</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Lista de Poluentes */}
      <div className="flex flex-col">
        {Object.entries(data.list[0].components).map(([key, value]) => {
          const pollutant =
            airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges]

          const max = Math.max(pollutant["Muito Ruim"].min, value)

          const currentLevel = (() => {
            for (const [level, range] of Object.entries(pollutant)) {
              if (
                value >= range.min &&
                (range.max === null || value <= range.max)
              )
                return level
            }
            return "Muito Ruim"
          })()

          const qualityColor = (() => {
            switch (currentLevel) {
              case "Bom":
                return "bg-green-500"
              case "Razoável":
                return "bg-yellow-500"
              case "Moderado":
                return "bg-orange-500"
              case "Ruim":
                return "bg-red-500"
              case "Muito Ruim":
                return "bg-purple-500"
              default:
                return "bg-zinc-500"
            }
          })()

          return (
            <div
              key={key}
              className="flex flex-col gap-3 py-5 border-b border-border last:border-0 hover:bg-muted/50 px-3 hover:rounded-lg transition-all"
            >
              {/* Header do poluente */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-muted-foreground uppercase">
                    {key}
                  </span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Information className="size-5 text-muted-foreground/60" />
                    </TooltipTrigger>
                    <TooltipContent className="z-2000">
                      <p className="max-w-xs">
                        Concentração de{" "}
                        {pollutantNameMapping[key.toUpperCase() as Pollutant]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-foreground block">
                    {value}
                  </span>
                  <span className={clsx("text-xs font-medium", qualityColor.replace('bg-', 'text-'))}>
                    {currentLevel}
                  </span>
                </div>
              </div>

              {/* Slider / Barra de Progresso */}
              <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden flex">
                {Object.keys(pollutant).map((quality) => {
                  const qColor = (() => {
                    switch (quality) {
                      case "Bom": return "bg-green-500";
                      case "Razoável": return "bg-yellow-500";
                      case "Moderado": return "bg-orange-500";
                      case "Ruim": return "bg-red-500";
                      case "Muito Ruim": return "bg-purple-500";
                      default: return "bg-zinc-500";
                    }
                  })();

                  return (
                    <div key={quality} className={clsx("h-full flex-1", qColor, quality === currentLevel ? "opacity-100" : "opacity-30")} />
                  )
                })}
                {/* Indicador de posição (opcional, pode ser simplificado só com a cor ativa acima) */}
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <p>0</p>
                <p>{max}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type AirQualityLevel = "Bom" | "Razoável" | "Moderado" | "Ruim" | "Muito Ruim"

interface Range {
  min: number
  max: number | null
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3"

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Bom: { min: 0, max: 20 },
    Razoável: { min: 20, max: 80 },
    Moderado: { min: 80, max: 250 },
    Ruim: { min: 250, max: 350 },
    "Muito Ruim": { min: 350, max: null },
  },
  NO2: {
    Bom: { min: 0, max: 40 },
    Razoável: { min: 40, max: 70 },
    Moderado: { min: 70, max: 150 },
    Ruim: { min: 150, max: 200 },
    "Muito Ruim": { min: 200, max: null },
  },
  PM10: {
    Bom: { min: 0, max: 20 },
    Razoável: { min: 20, max: 50 },
    Moderado: { min: 50, max: 100 },
    Ruim: { min: 100, max: 200 },
    "Muito Ruim": { min: 200, max: null },
  },
  PM2_5: {
    Bom: { min: 0, max: 10 },
    Razoável: { min: 10, max: 25 },
    Moderado: { min: 25, max: 50 },
    Ruim: { min: 50, max: 75 },
    "Muito Ruim": { min: 75, max: null },
  },
  O3: {
    Bom: { min: 0, max: 60 },
    Razoável: { min: 60, max: 100 },
    Moderado: { min: 100, max: 140 },
    Ruim: { min: 140, max: 180 },
    "Muito Ruim": { min: 180, max: null },
  },
  CO: {
    Bom: { min: 0, max: 4400 },
    Razoável: { min: 4400, max: 9400 },
    Moderado: { min: 9400, max: 12400 },
    Ruim: { min: 12400, max: 15400 },
    "Muito Ruim": { min: 15400, max: null },
  },
  NO: {
    Bom: { min: 0, max: 20 },
    Razoável: { min: 20, max: 40 },
    Moderado: { min: 40, max: 60 },
    Ruim: { min: 60, max: 80 },
    "Muito Ruim": { min: 80, max: null },
  },
  NH3: {
    Bom: { min: 0, max: 40 },
    Razoável: { min: 40, max: 70 },
    Moderado: { min: 70, max: 150 },
    Ruim: { min: 150, max: 200 },
    "Muito Ruim": { min: 200, max: null },
  },
}

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Dióxido de enxofre",
  NO2: "Dióxido de nitrogênio",
  PM10: "Material particulado 10",
  PM2_5: "Partículas finas",
  O3: "Ozônio",
  CO: "Monóxido de carbono",
  NO: "Monóxido de nitrogênio",
  NH3: "Amônia",
}