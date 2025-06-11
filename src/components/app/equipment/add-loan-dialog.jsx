import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import react, { use, useEffect, useState } from "react";
import { LabelInputRow } from "../../common";
import { Button } from "primereact/button";

import { Calendar } from "primereact/calendar";
import { useForm } from "../../../helpers";

export const AddLoan = ({
  onHide,
  visible,
  loaders,
  selectedEquipment,
  handleAddLoan
}) => {
  const [dates, setDates] = useState(null);
  const [hours, setHours] = useState(null);

  const sessionData = JSON.parse(localStorage.getItem("session"));

  let today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  //hooks
  const { formstate, onChange, onChangeManual, disabledButtonSave } = useForm();

  //handlers

  const handleHide = () => {
    onHide && onHide();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    await handleAddLoan({
      body: {
        EquipmentId: selectedEquipment?.equipmentId,
        UserId: sessionData?.userId,
        StartDate: dates[0],
        EndDate: dates[1]
      }
    });
  };

  const bodyFooter = (
    <div className="w-full flex gap-2">
      <Button
        type="button"
        label="Cancelar"
        icon="pi pi-times"
        className="w-full mx-0"
        severity="secondary"
        onClick={handleHide}
      />
      <Button
        type="submit"
        label="Guardar"
        icon="pi pi-save"
        className="w-full mx-0"
        style={{ backgroundColor: "#cd1f32" }}
        onClick={handleSubmit}
        form="add-tenant-form"
      />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      header="Solicitar Préstamo"
      draggable={false}
      footer={bodyFooter}
      breakpoints={{ "960px": "75vw", "640px": "95vw" }}
      style={{ width: "50vw", maxHeight: "90vh" }}
      contentStyle={{ overflow: "auto" }}
    >
      <form id="add-loan-form" className="w-full flex flex-column gap-3">
        <div className="flex flex-column gap-1">
          <label htmlFor="studentCode">Código Estudiante</label>
          <InputText
            id="studentCode"
            className="w-full"
            value={sessionData?.studentCode}
            disabled
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="studentName">Nombre de Estudiante</label>
          <InputText
            id="studentName"
            className="w-full"
            value={sessionData?.fullName}
            disabled
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="equipment">Equipo</label>
          <InputText
            id="equipment"
            className="w-full"
            value={selectedEquipment?.name || ""}
            disabled
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="description">Descripción del equipo</label>
          <InputText
            id="description"
            className="w-full"
            value={selectedEquipment?.specifications || ""}
            disabled
          />
        </div>

        <div className="flex flex-column gap-1">
          <label htmlFor="loanDates">Fechas de préstamo</label>
          <Calendar
            id="loanDates"
            value={dates}
            onChange={(e) => setDates(e.value)}
            showIcon
            className="w-full"
            selectionMode="range"
            hideOnRangeSelection={true}
            maxDate={maxDate}
            minDate={today}
            showTime
            hourFormat="12"
            minTime={new Date(0, 0, 0, 7, 0)}
            maxTime={new Date(0, 0, 0, 19, 0)}
          />
        </div>
      </form>
    </Dialog>
  );
};
