type TModalDetail = {
  label: string;
  value: string;
};

export const ModalDetail = ({ label, value }: TModalDetail) => {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <p className="text-xs text-gray-500 uppercase">{label}</p>
      <p className="text-sm font-semibold text-gray-700">{value}</p>
    </div>
  );
};
