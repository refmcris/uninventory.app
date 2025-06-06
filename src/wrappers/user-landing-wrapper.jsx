import { HeaderUser } from "../components";

export const UserLandingWrapper = ({ children }) => {
  return (
    <div className="flex flex-column min-h-screen">
      <HeaderUser />
      <div className="flex-grow-1">{children}</div>
    </div>
  );
};
