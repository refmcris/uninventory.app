export const LabelInputRow = ({ label, children }) => (
  <div className="w-full flex flex-column md:flex-row align-items-center gap-2 md:gap-0">
    <span className="w-full md:w-2 mb-1 md:mb-0">{label}</span>
    <div className="w-full md:w-10">{children}</div>
  </div>
);
