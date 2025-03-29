import { HeaderLogin } from "../components";

export const LandingWrapperLogin = ({ children }) => {
  return (
    <div className="flex flex-wrap align-items-center justify-content-center">
      <HeaderLogin />
      <div className="flex align-items-center justify-content-center"> {children} </div>
    </div>
  );
};
