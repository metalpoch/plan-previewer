import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function Table({ planBase, state, data }) {
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Cambio de planes ${state} ${planBase} Mbps`,
    sheet: `Plan base ${planBase} Mbps`,
  });

  return (
    <>
      <button
        onClick={onDownload}
        className="bg-[#E85D04] rounded-sm px-2 py-1 font-bold w-44 ms-auto"
      >
        Descargar
      </button>
      <table ref={tableRef} className="table-fixed text-slate-700 text-sm">
        <thead className="bg-slate-500 text-white">
          <tr>
            <th colSpan="5">Data Nodo</th>
            <th hidden colSpan="17">
              Clientes Por Plan
            </th>
            <th hidden colSpan="17">
              Factor Por Plan
            </th>
            <th colSpan="5">Tráfico</th>
            <th hidden colSpan="17">
              Clientes Por Plan (Migración {planBase} Mbps)
            </th>
            <th hidden colSpan="17">
              Factor Por Plan (Migración {planBase} Mbps)
            </th>
            <th colSpan="3">Resumen Migración {planBase} Mbps</th>
          </tr>
          <tr>
            <th className="px-2">Estado</th>
            <th className="px-2">IP</th>
            <th className="px-2">Central</th>
            <th className="px-2">Clientes</th>
            <th className="px-2">Switch</th>

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

            <th className="px-2">Tráfico Teórico (Mbps)</th>
            <th className="px-2">Tráfico (Mbps)</th>
            <th className="px-2">Capacidad (Mbps)</th>
            <th className="px-2">Media</th>
            <th className="px-2">Factor</th>

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

            <th className="px-2">Plan Ideal</th>
            <th className="px-2">Clientes Beneficiados</th>
            <th className="px-2">Nuevo Tráfico (Mbps)</th>
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
                <td>{base.central}</td>
                <td>{base.clients}</td>
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
                <td>{base.bandwidth_mbps.toFixed(2)}</td>
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
                <td>{upgrated?.new_traffic_mbps?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
