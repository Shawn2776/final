import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex items-center justify-center w-full">
        <ExclamationTriangleIcon className="w-5 h-5 text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
