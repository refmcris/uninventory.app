import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import react, { useState } from "react";
import { LabelInputRow } from "../../common";
import { Button } from "primereact/button";

import { Calendar } from 'primereact/calendar';
        

export const AddLoan = ({
    onHide,
    visible,
    loaders
}) => {
    const [dates, setDates] = useState(null);

    let today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);


    //handlers

    const handleHide = () => {
        onHide && onHide();
    }

    const handleSubmit = async () => {
        //TODO

        handleHide();
    }

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
                //onClick={handleSubmit}
                form="add-tenant-form"

            />
        </div>
    )

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
            
            <LabelInputRow label= "Codigo Estudiante">
                <InputText className="w-full" value="TO DO"/>
            </LabelInputRow>
            <LabelInputRow label= "Nombre de estudiante">
                <InputText className="w-full" value="TO DO"/>
            </LabelInputRow>
            <LabelInputRow label= "Equipo">
                <InputText className="w-full" value="TO DO"/>
            </LabelInputRow>
            <LabelInputRow label= "Fecha de devolucion">
                <Calendar  value={dates}onChange={(e) => setDates(e.value)} showIcon className="w-full" selectionMode="range" hideOnRangeSelection maxDate={maxDate} minDate={today}/>
            </LabelInputRow>
          </form>

          
        </Dialog>
    )
  
};