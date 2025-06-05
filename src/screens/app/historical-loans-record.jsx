import React, { useEffect, useState, useRef } from "react";
import { UserLandingWrapper } from "../../wrappers";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { GetLoansById } from "../../helpers/api";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";

export const HistoricalLoans = () => {
  const [loaders, setLoaders] = useState({});
  const [loans, setLoans] = useState([]);

  const sessionData = JSON.parse(localStorage.getItem("session"));

  const toastRef = useRef();

  const handleLoaders = (value) => setLoaders((t) => ({ ...t, ...value }));

  const handleGetLoans = async () => {
    handleLoaders({ getLoans: true });
    try {
      const response = await GetLoansById(sessionData?.userId);
      setLoans(response);
    } catch (error) {
      ctc({
        msg: "Error al obtener los préstamos",
        toastRef
      });
    } finally {
      handleLoaders({ getLoans: false });
    }
  };
  const HeaderBodyGroup = (
    <ColumnGroup>
      <Row>
        <Column
          headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
          style={{ minWidth: "12rem" }}
          align="center"
          header="Nombre del equipo"
          rowSpan={2}
        />
        <Column
          headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
          style={{ minWidth: "12rem" }}
          align="center"
          header="Fecha de inicio"
          rowSpan={2}
        />
        <Column
          headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
          style={{ minWidth: "12rem" }}
          align="center"
          header="Fecha finalizacion"
          rowSpan={2}
        />
        <Column
          headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
          style={{ minWidth: "12rem" }}
          align="center"
          header="Estado"
          rowSpan={2}
        />
      </Row>
    </ColumnGroup>
  );

  const renderTemplate = (status) => {
    let icon = "pi pi-question-circle";
    let color = "text-gray-500";
    let tooltipText = "Desconocido";

    switch (status) {
      case true:
        icon = "pi pi-check-circle";
        color = "text-green-500";
        tooltipText = "Devuelto";
        break;
      case false:
        icon = "pi pi-exclamation-triangle";
        color = "text-orange-500";
        tooltipText = "En Préstamo";
        break;
      default:
        break;
    }

    return (
      <>
        <i
          id={`status-icon-${status}`}
          className={`${icon} ${color} text-xl`}
          data-pr-tooltip={tooltipText}
          data-pr-position="top"
        />
        <Tooltip target={`#status-icon-${status}`} />
      </>
    );
  };

  useEffect(() => {
    handleGetLoans();
  }, []);
  return (
    <UserLandingWrapper>
      <div className=" justify-content-center p-6">
        <div className="flex justify-content-center">
          <h1>Prestamos realizados</h1>
        </div>
        <DataTable
          value={loans}
          headerColumnGroup={HeaderBodyGroup}
          className="w-full"
          scrollable
          showGridlines
          emptyMessage="No hay préstamos realizados"
        >
          <Column
            field="equipmentName"
            header="Nombre del equipo"
            align={"center"}
          />
          <Column
            field="startDate"
            header="Fecha de inicio"
            align="center"
            body={(rowData) =>
              new Date(rowData.startDate)
                .toISOString()
                .replace("T", " ")
                .substring(0, 16)
            }
          />
          <Column
            field="endDate"
            header="Fecha finalización"
            align="center"
            body={(rowData) =>
              new Date(rowData.endDate)
                .toISOString()
                .replace("T", " ")
                .substring(0, 16)
            }
          />

          <Column
            field="status"
            header="Estado"
            align={"center"}
            body={(rowData) => renderTemplate(rowData.status)}
          />
        </DataTable>
      </div>
      <Toast ref={toastRef} />
    </UserLandingWrapper>
  );
};
