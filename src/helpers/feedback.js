import { getErrorMsg } from "./utils";

export const ctc = ({
  error = null,
  msg = "",
  toastRef = null,
  handler = null
}) => {
  const err = `${msg?.endsWith(".") ? msg : `${msg}.`} ${getErrorMsg(error)}`;
  console.error(err);
  console.error(error);
  handleToastError({ toastRef, msg: err });
  handler && handler();
};

export const handleToastError = ({
  toastRef = null,
  msg,
  duration = 10000,
  title = "¡Error!"
}) => {
  const data = {
    duration,
    detail: msg,
    summary: title,
    severity: "error"
  };

  if (toastRef?.current) {
    toastRef?.current?.show(data);
    return;
  }

  toastRef?.show(data);
};
export const handleToastWarn = ({
  toastRef = null,
  msg,
  duration = 5000,
  title = "Ojo!"
}) => {
  const data = {
    duration,
    detail: msg,
    summary: title,
    severity: "warn"
  };

  if (toastRef?.current) {
    toastRef?.current?.show(data);
    return;
  }

  toastRef?.show(data);
};
export const handleToastDone = ({
  toastRef = null,
  msg,
  duration = 5000,
  title = "Hecho!"
}) => {
  const data = {
    duration,
    detail: msg,
    summary: title,
    severity: "success"
  };

  if (toastRef?.current) {
    toastRef?.current?.show(data);
    return;
  }

  toastRef?.show(data);
};
