import type { Task } from "../types";
import { cargaPorResponsavel, indicadoresDePrazo, totalConcluidas } from "../kpis";

type Props = { tasks: Task[] };

export function Dashboard({ tasks }: Props) {
  const carga = cargaPorResponsavel(tasks);
  const prazo = indicadoresDePrazo(tasks);
  const concluidas = totalConcluidas(tasks);
  const maxCarga = Math.max(...carga.map((c) => c.quantidade), 1);

  return (
    <div className="dashboard">
      <div className="kpis-numeros">
        <div className="kpi alerta">
          <span className="numero">{prazo.atrasadas}</span>
          <span className="rotulo">Atrasadas</span>
        </div>
        <div className="kpi atencao">
          <span className="numero">{prazo.venceEm3Dias}</span>
          <span className="rotulo">Vencem em 3 dias</span>
        </div>
        <div className="kpi ok">
          <span className="numero">{concluidas}</span>
          <span className="rotulo">Concluídas</span>
        </div>
      </div>

      <div className="carga">
        <h3>Carga por responsável</h3>
        {carga.map((c) => (
          <div key={c.nome} className="barra-linha">
            <span className="barra-nome">{c.nome}</span>
            <div className="barra-trilho">
              <div className="barra-fill" style={{ width: `${(c.quantidade / maxCarga) * 100}%` }} />
            </div>
            <span className="barra-valor">{c.quantidade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}