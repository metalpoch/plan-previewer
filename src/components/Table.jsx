import { useRef } from "react";
import { downloadExcel, useDownloadExcel } from "react-export-table-to-excel";

export default function Table({ planBase, state, data }) {
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Cambio de planes ${state} ${planBase} Mbps`,
    sheet: `Plan base ${planBase} Mbps`,
  });

  const handleDownloadSummaryExcel = () => {
    const header = [
      "Estado",
      "IP",
      "Agregador",
      "Modelo",
      "Central",
      "Clientes Activos",
      "Clientes Cortados",
      "Clientes Suspendidos",
      "Switch",
      "Tráfico Teórico (Mbps)",
      "Tráfico Medido (Mbps)",
      "Capacidad (Mbps)",
      "Media",
      "Factor",
      "Plan Propuesto",
      "Clientes Migrados",
      "Nuevo Tráfico (Mbps)",
      "Tráfico Estimado (Mbps)",
    ];
    const body = data.map(([base, upgrated]) => [
      base.state.replace("-", " "),
      base.ip,
      base.bras,
      base.model,
      base.central,
      base.clients_active,
      base.clients_cut_off,
      base.clients_suspended,
      base.element,
      base.theoretical_traffic_mbps,
      Math.max(base.in_avg_mbps, base.out_avg_mbps).toFixed(2),
      base.bandwidth_mbps.toFixed(),
      base.media.toFixed(2),
      base.factor.toFixed(2),
      upgrated?.planIdeal,
      upgrated?.benefited_clients,
      (
        upgrated?.new_traffic_mbps -
        Math.max(base.in_avg_mbps, base.out_avg_mbps)
      ).toFixed(2),
      upgrated?.new_traffic_mbps?.toFixed(2),
    ]);

    downloadExcel({
      fileName: `Resumen de cambio de planes ${state} ${planBase} Mbps`,
      sheet: `Plan base ${planBase} Mbps`,
      tablePayload: {
        header,
        body,
      },
    });
  };

  return (
    <>
      <div className="flex gap-1">
        <button
          onClick={onDownload}
          className="bg-[#E85D04] rounded-sm rounded-b-none px-2 py-1 font-bold w-44 hover:brightness-110 duration-100"
        >
          Descargar Detalle
        </button>
        <button
          onClick={handleDownloadSummaryExcel}
          className="bg-[#E85D04] rounded-sm rounded-b-none px-2 py-1 font-bold w-44 hover:brightness-110 duration-100"
        >
          Descargar Resumen
        </button>
      </div>
      <article className="overflow-y-auto h-[calc(100vh-200px)]">
        <table ref={tableRef} className="table-fixed text-slate-700 text-sm">
          <thead className="bg-slate-500 text-white sticky top-0 z-10">
            <tr>
              <th colSpan="8">Data Nodo</th>
              <th hidden colSpan="17">
                Clientes Por Plan
              </th>
              <th hidden colSpan="17">
                Factor Por Plan
              </th>
              <th colSpan="5">Consumo</th>
              <th hidden colSpan="17">
                Clientes Por Plan (Migración {planBase} Mbps)
              </th>
              <th hidden colSpan="17">
                Factor Por Plan (Migración {planBase} Mbps)
              </th>
              <th colSpan="4">Resumen Migración {planBase} Mbps</th>
            </tr>
            <tr>
              {/* Data Nodo */}
              <th className="px-2 font-normal">Estado</th>
              <th className="px-2 font-normal">IP</th>
              <th className="px-2 font-normal">Modelo</th>
              <th className="px-2 font-normal">Central</th>
              <th className="px-2 font-normal">Clientes Activos</th>
              <th className="px-2 font-normal">Clientes Cortados</th>
              <th className="px-2 font-normal">Clientes Suspendidos</th>
              <th className="px-2 font-normal">Switch</th>

              {/* Clientes Por Plan */}
              <th hidden>0.25 Mbps</th>
              <th hidden>0.5 Mbps</th>
              <th hidden>0.75 Mbps</th>
              <th hidden>1 Mbps</th>
              <th hidden>1.5 Mbps</th>
              <th hidden>2 Mbps</th>
              <th hidden>3 Mbps</th>
              <th hidden>4 Mbps</th>
              <th hidden>6 Mbps</th>
              <th hidden>8 Mbps</th>
              <th hidden>10 Mbps</th>
              <th hidden>14 Mbps</th>
              <th hidden>18 Mbps</th>
              <th hidden>20 Mbps</th>
              <th hidden>22 Mbps</th>
              <th hidden>30 Mbps</th>
              <th hidden>50 Mbps</th>

              {/* Factor Por Plan */}
              <th hidden>0.25 Mbps</th>
              <th hidden>0.5 Mbps</th>
              <th hidden>0.75 Mbps</th>
              <th hidden>1 Mbps</th>
              <th hidden>1.5 Mbps</th>
              <th hidden>2 Mbps</th>
              <th hidden>3 Mbps</th>
              <th hidden>4 Mbps</th>
              <th hidden>6 Mbps</th>
              <th hidden>8 Mbps</th>
              <th hidden>10 Mbps</th>
              <th hidden>14 Mbps</th>
              <th hidden>18 Mbps</th>
              <th hidden>20 Mbps</th>
              <th hidden>22 Mbps</th>
              <th hidden>30 Mbps</th>
              <th hidden>50 Mbps</th>

              {/* Consumo */}
              <th className="px-2 font-normal">Tráfico Teórico (Mbps)</th>
              <th className="px-2 font-normal">Tráfico Medido (Mbps)</th>
              <th className="px-2 font-normal">Capacidad (Mbps)</th>
              <th className="px-2 font-normal">Media</th>
              <th className="px-2 font-normal">Factor</th>

              {/* Clientes Por Plan (migrados) */}
              <th hidden>0.25 Mbps</th>
              <th hidden>0.5 Mbps</th>
              <th hidden>0.75 Mbps</th>
              <th hidden>1 Mbps</th>
              <th hidden>1.5 Mbps</th>
              <th hidden>2 Mbps</th>
              <th hidden>3 Mbps</th>
              <th hidden>4 Mbps</th>
              <th hidden>6 Mbps</th>
              <th hidden>8 Mbps</th>
              <th hidden>10 Mbps</th>
              <th hidden>14 Mbps</th>
              <th hidden>18 Mbps</th>
              <th hidden>20 Mbps</th>
              <th hidden>22 Mbps</th>
              <th hidden>30 Mbps</th>
              <th hidden>50 Mbps</th>

              {/* Factor Por Plan (migrados) */}
              <th hidden>0.25 Mbps</th>
              <th hidden>0.5 Mbps</th>
              <th hidden>0.75 Mbps</th>
              <th hidden>1 Mbps</th>
              <th hidden>1.5 Mbps</th>
              <th hidden>2 Mbps</th>
              <th hidden>3 Mbps</th>
              <th hidden>4 Mbps</th>
              <th hidden>6 Mbps</th>
              <th hidden>8 Mbps</th>
              <th hidden>10 Mbps</th>
              <th hidden>14 Mbps</th>
              <th hidden>18 Mbps</th>
              <th hidden>20 Mbps</th>
              <th hidden>22 Mbps</th>
              <th hidden>30 Mbps</th>
              <th hidden>50 Mbps</th>

              {/* Resumen Migración */}
              <th className="px-2 font-normal">Plan Propuesto</th>
              <th className="px-2 font-normal">Clientes Migrados</th>
              <th className="px-2 font-normal">Nuevo Tráfico (Mbps)</th>
              <th className="px-2 font-normal">Tráfico Estimado (Mbps)</th>
            </tr>
          </thead>
          {data.length > 0 && (
            <tbody>
              {data.map(([base, upgrated]) => (
                <tr
                  key={base.ip}
                  className="odd:bg-slate-100 hover:brightness-90 even:bg-white duration-100 text-center"
                >
                  <td>{base.state.replace("-", " ")}</td>
                  <td>{base.ip}</td>
                  <td>{base.model}</td>
                  <td>{base.central}</td>
                  <td>{base.clients_active}</td>
                  <td>{base.clients_cut_off}</td>
                  <td>{base.clients_suspended}</td>
                  <td>{base.element}</td>

                  <td hidden>{base["clients_0.25_mbps"]}</td>
                  <td hidden>{base["clients_0.5_mbps"]}</td>
                  <td hidden>{base["clients_0.75_mbps"]}</td>
                  <td hidden>{base.clients_1_mbps}</td>
                  <td hidden>{base["clients_1.5_mbps"]}</td>
                  <td hidden>{base.clients_2_mbps}</td>
                  <td hidden>{base.clients_3_mbps}</td>
                  <td hidden>{base.clients_4_mbps}</td>
                  <td hidden>{base.clients_6_mbps}</td>
                  <td hidden>{base.clients_8_mbps}</td>
                  <td hidden>{base.clients_10_mbps}</td>
                  <td hidden>{base.clients_14_mbps}</td>
                  <td hidden>{base.clients_18_mbps}</td>
                  <td hidden>{base.clients_20_mbps}</td>
                  <td hidden>{base.clients_22_mbps}</td>
                  <td hidden>{base.clients_30_mbps}</td>
                  <td hidden>{base.clients_50_mbps}</td>

                  <td hidden>{base["factor_0.25_mbps"]}</td>
                  <td hidden>{base["factor_0.5_mbps"]}</td>
                  <td hidden>{base["factor_0.75_mbps"]}</td>
                  <td hidden>{base.factor_1_mbps}</td>
                  <td hidden>{base["factor_1.5_mbps"]}</td>
                  <td hidden>{base.factor_2_mbps}</td>
                  <td hidden>{base.factor_3_mbps}</td>
                  <td hidden>{base.factor_4_mbps}</td>
                  <td hidden>{base.factor_6_mbps}</td>
                  <td hidden>{base.factor_8_mbps}</td>
                  <td hidden>{base.factor_10_mbps}</td>
                  <td hidden>{base.factor_14_mbps}</td>
                  <td hidden>{base.factor_18_mbps}</td>
                  <td hidden>{base.factor_20_mbps}</td>
                  <td hidden>{base.factor_22_mbps}</td>
                  <td hidden>{base.factor_30_mbps}</td>
                  <td hidden>{base.factor_50_mbps}</td>

                  <td>{base.theoretical_traffic_mbps}</td>
                  <td>
                    {Math.max(base.in_avg_mbps, base.out_avg_mbps).toFixed(2)}
                  </td>
                  <td>{base.bandwidth_mbps.toFixed()}</td>
                  <td>{base.media.toFixed(2)}</td>
                  <td>{base.factor.toFixed(2)}</td>

                  <td hidden>{upgrated["clients_0.25_mbps"]}</td>
                  <td hidden>{upgrated["clients_0.5_mbps"]}</td>
                  <td hidden>{upgrated["clients_0.75_mbps"]}</td>
                  <td hidden>{upgrated.clients_1_mbps}</td>
                  <td hidden>{upgrated["clients_1.5_mbps"]}</td>
                  <td hidden>{upgrated.clients_2_mbps}</td>
                  <td hidden>{upgrated.clients_3_mbps}</td>
                  <td hidden>{upgrated.clients_4_mbps}</td>
                  <td hidden>{upgrated.clients_6_mbps}</td>
                  <td hidden>{upgrated.clients_8_mbps}</td>
                  <td hidden>{upgrated.clients_10_mbps}</td>
                  <td hidden>{upgrated.clients_14_mbps}</td>
                  <td hidden>{upgrated.clients_18_mbps}</td>
                  <td hidden>{upgrated.clients_20_mbps}</td>
                  <td hidden>{upgrated.clients_22_mbps}</td>
                  <td hidden>{upgrated.clients_30_mbps}</td>
                  <td hidden>{upgrated.clients_50_mbps}</td>

                  <td hidden>{upgrated["factor_0.25_mbps"]}</td>
                  <td hidden>{upgrated["factor_0.5_mbps"]}</td>
                  <td hidden>{upgrated["factor_0.75_mbps"]}</td>
                  <td hidden>{upgrated.factor_1_mbps}</td>
                  <td hidden>{upgrated["factor_1.5_mbps"]}</td>
                  <td hidden>{upgrated.factor_2_mbps}</td>
                  <td hidden>{upgrated.factor_3_mbps}</td>
                  <td hidden>{upgrated.factor_4_mbps}</td>
                  <td hidden>{upgrated.factor_6_mbps}</td>
                  <td hidden>{upgrated.factor_8_mbps}</td>
                  <td hidden>{upgrated.factor_10_mbps}</td>
                  <td hidden>{upgrated.factor_14_mbps}</td>
                  <td hidden>{upgrated?.factor_18_mbps}</td>
                  <td hidden>{upgrated?.factor_20_mbps}</td>
                  <td hidden>{upgrated?.factor_22_mbps}</td>
                  <td hidden>{upgrated?.factor_30_mbps}</td>
                  <td hidden>{upgrated?.factor_50_mbps}</td>

                  <td>{upgrated?.planIdeal}</td>
                  <td>{upgrated?.benefited_clients}</td>
                  <td>
                    {(
                      upgrated?.new_traffic_mbps -
                      Math.max(base.in_avg_mbps, base.out_avg_mbps)
                    ).toFixed(2)}
                  </td>
                  <td>{upgrated?.new_traffic_mbps?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </article>
    </>
  );
}
