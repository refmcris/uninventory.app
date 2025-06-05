import { HeaderLogin } from "../components";

export const LandingWrapperLogin = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-column bg-gray-50">
      <HeaderLogin />
      <main
        className="flex-grow flex align-items-center justify-content-center w-full px-2 md:px-0"
        style={{ paddingTop: "5rem" }}
      >
        {children}
      </main>
    </div>
  );
};
