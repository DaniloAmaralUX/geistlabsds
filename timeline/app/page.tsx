import { Lifeline } from "@/components/lifeline/lifeline"
import {
  LifelineFooter,
  LifelineNav,
  LifelineShell,
  LifelineStage,
} from "@/components/lifeline-shell"
import { LabDesignLogo } from "@/components/lab-design-logo"
import { ThemeSwitcher } from "@/components/theme-switcher"
import {
  PESQUISA_PRESENT_STEP,
  pesquisaLifeline,
} from "@/lib/lifeline-pesquisa"

/**
 * A página da pesquisa: uma única trilha, do ponto de partida ao próximo
 * experimento. A abertura desenha a linha e para no presente (Geist Labs
 * DS); o que vem depois fica à direita, como continuidade.
 *
 * A nav não é decoração: a trilha mede início e fim por ela. Ver
 * components/lifeline-shell.tsx.
 */
export default function PesquisaPage() {
  return (
    <LifelineShell>
      <LifelineNav
        logo={
          <span className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <LabDesignLogo className="h-5 w-5" />
            LAB / DESIGN
          </span>
        }
        logoLabel="LAB / DESIGN — Pesquisa"
      >
        <span className="hidden text-sm text-zinc-500 sm:inline">Pesquisa</span>
        <a
          href="https://geistlabsds.vercel.app/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 transition-colors duration-300 hover:text-black dark:hover:text-white"
        >
          Geist Labs DS →
        </a>
      </LifelineNav>

      <LifelineStage>
        <Lifeline
          markers={pesquisaLifeline.markers}
          birthYear={pesquisaLifeline.birthYear}
          title={pesquisaLifeline.name}
          settleAt={PESQUISA_PRESENT_STEP - pesquisaLifeline.birthYear}
          className="h-full"
        />
      </LifelineStage>

      <LifelineFooter>
        <div className="flex items-center gap-6">
          <ThemeSwitcher />
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-zinc-500">
            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                aria-hidden="true"
              />
              <span>Agora: Geist Labs DS</span>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600"
                aria-hidden="true"
              />
              <span>Depois: continuidade</span>
            </li>
          </ul>
        </div>
        <p className="hidden text-[13px] text-zinc-500 md:block" aria-hidden="true">
          Role, arraste ou use ← → para percorrer
        </p>
      </LifelineFooter>
    </LifelineShell>
  )
}
