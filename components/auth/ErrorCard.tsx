import { CardWrapper } from "@/components/auth/CardWrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex flex-col items-center justify-center">
        <ExclamationTriangleIcon />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard;