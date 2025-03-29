import { HeaderLogin } from "../components";

export const LandingWrapperLogin = ({ children }) => {
  return (
    <div className="max-w-full max-h-full flex flex-wrap align-items-center justify-content-center">
      <HeaderLogin />
      <div className="flex align-items-center justify-content-center"> {children} </div>
    </div>
  );
};
