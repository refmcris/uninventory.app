import React, { useEffect } from "react";
import { DashboardLayout } from "../../layouts";
import {
  ctc,
  exportExcel,
  GetLoans,
  handleToastDone,
  PutLoan
} from "../../helpers";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
export const LoansManagement = () => {
  const [loans, setLoans] = useState([]);
  const [hasActiveLoan, setHasActiveLoan] = useState(false);
  const [loaders, setLoaders] = useState({
    exportExcel: false
  });

  const sessionData = JSON.parse(localStorage.getItem("session"));

  const toastRef = useRef();

  const handleUpdateLoan = async (rowData) => {
    try {
      await PutLoan(rowData?.loanId);
      handleToastDone({
        msg: "Prestamo actualizado correctamente",
        toastRef
      });
    } catch (error) {
      ctc({ msg: "Error al actualizar el prestamo", toastRef });
    } finally {
      handleGetLoans();
    }
  };

  const handleGetLoans = async () => {
    try {
      const response = await GetLoans();
      setLoans(response);
      setHasActiveLoan(response.some((loan) => !loan.status));
    } catch (error) {
      ctc({
        msg: "Error al obtener los prestamos",
        toastRef
      });
    }
  };

  const onExportExcel = async () => {
    const cols = [
      { header: "Nombre Estudiante", key: "userName", width: 20 },
      { header: "Nombre Equipo", key: "equipmentName", width: 20 },
      { header: "Fecha de prestamo", key: "startDate", width: 20 },
      { header: "Fecha de devolucion", key: "endDate", width: 20 },
      { header: "Estado", key: "status", width: 20 }
    ];

    const statusMap = {
      true: "Devuelto",
      false: "En Préstamo"
    };

    const data = loans.map((item) => ({
      userName: item.userName,
      equipmentName: item.equipmentName,
      startDate: item.startDate,
      endDate: item.endDate,
      status: statusMap[item.status] || "Desconocido"
    }));

    try {
      await exportExcel({
        cols,
        data,
        sheetName: "Prestamos",
        creator: sessionData?.fullName,
        handleToastDone,
        handleLoading: setLoaders
      });
      handleToastDone({
        msg: "Prestamos exportados correctamente",
        toastRef
      });
    } catch (error) {
      console.log(error);
      ctc({
        msg: "Error al exportar los prestamos",
        toastRef
      });
    }
  };

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

  const editButtonTemplate = (rowData) => {
    if (!rowData.status) {
      return (
        <Button
          icon="pi pi-check"
          className="p-button-rounded mr-2"
          tooltip="Marcar como devuelto"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            handleUpdateLoan(rowData);
          }}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    handleGetLoans();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-column gap-2 p-2 md:p-4">
        <div className="flex justify-content-between align-items-center mb-4">
          <h1 className="text-2xl md:text-3xl">Prestamos Activos/Inactivos</h1>
          <div>
            <Button
              tooltip="Exportar a Excel"
              tooltipOptions={{ position: "top", showDelay: 500 }}
              icon="pi pi-file-excel"
              severity="success"
              className="ml-2"
              onClick={onExportExcel}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            value={loans}
            size="normal"
            showGridlines
            scrollHeight="70vh"
            emptyMessage="No hay prestamos"
            className="min-w-full"
          >
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Nombre Estudiante"
              rowSpan={3}
              align="center"
              field="userName"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Nombre Equipo"
              rowSpan={3}
              align="center"
              field="equipmentName"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Fecha de prestamo"
              rowSpan={3}
              align="center"
              field="startDate"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Fecha de devolucion"
              rowSpan={3}
              align="center"
              field="endDate"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Estado"
              field="status"
              align={"center"}
              body={(rowData) => renderTemplate(rowData.status)}
            />
            {hasActiveLoan && (
              <Column
                header="Cambiar Estado"
                body={editButtonTemplate}
                headerClassName="bg-gray-200 text-gray-900 font-bold w-7rem"
                align={"center"}
                style={{ minWidth: "7rem" }}
              />
            )}
          </DataTable>
        </div>
      </div>
      <Toast ref={toastRef} />
    </DashboardLayout>
  );
};
