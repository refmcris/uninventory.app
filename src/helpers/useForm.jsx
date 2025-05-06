import { useEffect, useState } from "react";

export const useForm = (initialForm, keys = []) => {
  const [formState, setFormState] = useState(initialForm);
  const [disabledButtonSave, setDisabledButtonSave] = useState(true);

  const resetFormState = () => setFormState(initialForm);
  const onChange = ({ target }) => {
    const { value, name } = target;
    setFormState((t) => ({ ...t, [name]: value }));
  };
  const onChangeManual = (value) => {
    setFormState((t) => ({ ...t, ...value }));
  };
  const setUpFormState = (newState) => setFormState(newState);

  const handleValidateDisabledButtonSave = () => {
    const k = keys?.length > 0 ? [...keys] : Object.keys(formState || {});
    for (const key in formState) {
      if (
        k.includes(key) &&
        ((Array.isArray(formState[key]) && formState[key]?.length == 0) ||
          !formState[key])
      )
        return true;
    }
  };

  useEffect(() => {
    setDisabledButtonSave(handleValidateDisabledButtonSave());
  }, [formState]);

  return {
    formState,
    disabledButtonSave,
    onChange,
    resetFormState,
    onChangeManual,
    setUpFormState,
    handleValidateDisabledButtonSave
  };
};
