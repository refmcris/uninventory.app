import { ColumnGroup } from "primereact/columngroup";
import { UserLandingWrapper } from "../../wrappers";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import {
  AddCategory,
  AddEquipment,
  EditEquipment,
  exportExcel,
  GetEquipment,
  handleToastDone,
  useForm
} from "../../helpers";
import { Button } from "primereact/button";
import { AddEquipmentDialog } from "../../components/equipments/add-equipment-dialog";
import { Toast } from "primereact/toast";
import { EditEquipmentDialog } from "../../components/equipments/edit-equipment-dialog";
import { Tooltip } from "primereact/tooltip";
import { DashboardLayout } from "../../layouts";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const EquipmentManagementScreen = () => {
  const [equipments, setEquipments] = useState([]);
  const [addEquipment, setAddEquipment] = useState(false);
  const [editEquipment, setEditEquipment] = useState(false);
  const [loaders, setLoaders] = useState({});
  const [addCategory, setAddCategory] = useState(false);

  const sessionData = JSON.parse(localStorage.getItem("session"));

  const { formState, onChange, handleValidateDisabledButtonSave } = useForm({
    name: ""
  });

  //refs
  const toastRef = useRef();

  const handleLoaders = (value) => setLoaders((t) => ({ ...t, ...value }));

  const handleAddCategory = async (e) => {
    try {
      await AddCategory(formState);
      setAddCategory(false);
      handleToastDone({
        msg: "Categoría agregada",
        toastRef
      });
      HandleGetEquipments();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  const HandleGetEquipments = async () => {
    try {
      const response = await GetEquipment();
      setEquipments(response);
    } catch (error) {
      console.error("Error fetching equipments data:", error);
    }
  };

  const onAddEquipment = async (body) => {
    try {
      await AddEquipment(body);
      setAddEquipment(false);
      handleToastDone({
        msg: "Equipo agreado",
        toastRef
      });

      HandleGetEquipments();
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };
  const onEditEquipment = async (body) => {
    try {
      await EditEquipment(body);
      handleToastDone({
        msg: "Equipo editado",
        toastRef
      });

      HandleGetEquipments();
    } catch (error) {
      console.error("Error editing equipment:", error);
    }
  };

  const onExportExcel = async () => {
    const cols = [
      { header: "Nombre", key: "name", width: 20 },
      { header: "Numero de serie", key: "serialNumber", width: 20 },
      { header: "Modelo", key: "model", width: 20 },
      { header: "Ubicación", key: "location", width: 20 },
      { header: "Estado", key: "status", width: 20 },
      { header: "Fecha de compra", key: "purchaseDate", width: 20 },
      { header: "Fecha de garantía", key: "warrantyDate", width: 20 }
    ];

    const statusMap = {
      available: "Disponible",
      inactive: "Inactivo",
      repairing: "En reparación",
      in_warranty: "En garantía",
      in_loan: "En préstamo"
    };

    const data = equipments.map((item) => ({
      name: item.name,
      serialNumber: item.serialNumber,
      model: item.model,
      location: item.location,
      status: statusMap[item.status] || "Desconocido",
      purchaseDate: new Date(item.purchaseDate).toLocaleDateString("es-ES"),
      warrantyDate: new Date(item.warrantyDate).toLocaleDateString("es-ES")
    }));

    try {
      await exportExcel({
        cols,
        data: data,
        sheetName: "Equipos",
        creator: sessionData?.fullName,
        handleToastDone,
        handleLoading: handleLoaders
      });
      handleToastDone({
        msg: "Excel exportado",
        toastRef
      });
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  //bodys
  const editButtonTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded  mr-2"
        onClick={() => {
          editButtonTemplate(true);
          setEditEquipment(rowData);
        }}
      />
    );
  };
  const renderTemplate = (status) => {
    let icon = "pi pi-question-circle";
    let color = "text-gray-500";
    let tooltipText = "Desconocido";

    switch (status) {
      case "available":
        icon = "pi pi-check-circle";
        color = "text-green-500";
        tooltipText = "Disponible";
        break;
      case "inactive":
        icon = "pi pi-ban";
        color = "text-gray-500";
        tooltipText = "Inactivo";
        break;
      case "repairing":
        icon = "pi pi-wrench";
        color = "text-yellow-500";
        tooltipText = "En reparación";
        break;
      case "in_warranty":
        icon = "pi pi-shield";
        color = "text-blue-500";
        tooltipText = "En garantía";
        break;
      case "in_loan":
        icon = "pi pi-exclamation-triangle";
        color = "text-orange-500";
        tooltipText = "En préstamo";
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
    HandleGetEquipments();
  }, []);
  return (
    <DashboardLayout>
      <div className="w-full p-2 md:p-4">
        <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4 gap-2 md:gap-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Gestión de equipos
          </h1>
          <div className="flex flex-column md:flex-row gap-2 md:gap-0">
            <Button
              label="Agregar equipo"
              icon="pi pi-plus"
              onClick={() => setAddEquipment(true)}
              className="w-full md:w-auto"
            />
            <Button
              icon="pi pi-plus"
              onClick={() => setAddCategory(true)}
              className="w-full md:w-auto  ml-0 md:ml-2 p-2"
              tooltip="Agregar Categoría"
              tooltipOptions={{ position: "top", showDelay: 500 }}
            />
            <Button
              tooltip="Exportar a Excel"
              tooltipOptions={{ position: "top", showDelay: 500 }}
              icon="pi pi-file-excel"
              severity="success"
              className="ml-0 md:ml-2"
              onClick={onExportExcel}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            value={equipments}
            size="normal"
            showGridlines
            scrollHeight="70vh"
            emptyMessage="No hay equipos registrados"
            className="min-w-full"
          >
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Nombre"
              rowSpan={3}
              align="center"
              field="name"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Numero de serie"
              rowSpan={3}
              align="center"
              field="serialNumber"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Ubicación"
              rowSpan={3}
              align="center"
              field="location"
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-12rem"
              style={{ minWidth: "12rem" }}
              header="Estado"
              rowSpan={3}
              align="center"
              field="status"
              body={(rowData) => {
                return renderTemplate(rowData.status);
              }}
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-7rem"
              style={{ minWidth: "7rem" }}
              header="Fecha de compra"
              rowSpan={3}
              align="center"
              field="purchaseDate"
              body={(rowData) => {
                const date = new Date(rowData.purchaseDate);
                return (
                  <div>
                    <div>{date.toLocaleDateString("es-ES")}</div>
                    {date.toLocaleTimeString("es-ES")}
                  </div>
                );
              }}
            />
            <Column
              headerClassName="bg-gray-200 text-gray-900 font-bold w-7rem"
              style={{ minWidth: "7rem" }}
              header="Fecha de garantía"
              rowSpan={3}
              align="center"
              field="warrantyDate"
              body={(rowData) => {
                const date = new Date(rowData.purchaseDate);
                return (
                  <div>
                    <div>{date.toLocaleDateString("es-ES")}</div>
                    {date.toLocaleTimeString("es-ES")}
                  </div>
                );
              }}
            />
            <Column
              header="Editar"
              body={editButtonTemplate}
              headerClassName="bg-gray-200 text-gray-900 font-bold w-7rem"
              align={"center"}
              style={{ minWidth: "7rem" }}
            />
          </DataTable>
        </div>
        <AddEquipmentDialog
          visible={addEquipment}
          onHide={() => setAddEquipment(false)}
          onAddEquipment={onAddEquipment}
        />
        <EditEquipmentDialog
          visible={editEquipment}
          onHide={() => setEditEquipment(false)}
          onEditEquipment={onEditEquipment}
          selectedEquipment={editEquipment}
        />
        <Dialog
          visible={addCategory}
          onHide={() => setAddCategory(false)}
          header="Agregar Categoría"
          footer={
            <div className="flex flex-row gap-2">
              <Button
                label="Cancelar"
                onClick={() => setAddCategory(false)}
                className="w-full"
              />
              <Button
                label="Agregar"
                onClick={handleAddCategory}
                className="w-full"
                disabled={handleValidateDisabledButtonSave()}
              />
            </div>
          }
        >
          <form onSubmit={handleAddCategory}>
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <InputText
                id="name"
                name="name"
                className="w-full"
                value={formState?.name}
                onChange={onChange}
              />
            </div>
          </form>
        </Dialog>
      </div>
      <Toast ref={toastRef} />
    </DashboardLayout>
  );
};
