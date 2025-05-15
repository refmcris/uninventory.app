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
        EquipmentId: 13,
        UserId: 3,
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

  useEffect(() => {
    console.log("selectedEquipment", selectedEquipment);
  }, [selectedEquipment]);

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      header="Solicitar Préstamo"
      className="w-6 md:w-4"
      draggable={false}
      footer={bodyFooter}
    >
      <form className="w-full flex flex-column gap-2">
        <LabelInputRow label="Codigo Estudiante">
          <InputText className="w-full" value="TO DO" />
        </LabelInputRow>
        <LabelInputRow label="Nombre de estudiante">
          <InputText className="w-full" value="TO DO" />
        </LabelInputRow>
        <LabelInputRow label="Equipo">
          <InputText
            className="w-full"
            value={selectedEquipment?.name || ""}
            readOnly
          />
        </LabelInputRow>
        <LabelInputRow label="Descripción del equipo">
          <InputText
            className="w-full"
            value={selectedEquipment?.specifications || ""}
            readOnly
          />
        </LabelInputRow>
        <LabelInputRow label="Fechas de préstamo">
          <Calendar
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
        </LabelInputRow>
      </form>
    </Dialog>
  );
};
