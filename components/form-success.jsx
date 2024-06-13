import { CheckCircledIcon } from "@radix-ui/react-icons";

const FormSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center p-3 text-sm rounded-md bg-emerald-500/15 gap-x-2 text-emerald-500">
      <CheckCircledIcon className="w-5 h-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
