"use client";
import { CardWrapper } from "@/components/auth/CardWrapper";

import { BeatLoader} from "react-spinners"
import { useSearchParams } from "next/navigation";

import { useCallback,useEffect, useState } from "react";
import  NewVerification from "@/actions/NewVerification";
import { FormError } from "@/components/FormError";
import { FormSuccess } from "@/components/FormSuccess";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("missing token");
      return
    }

    console.log(token);
    NewVerification(token)
      .then((data) => {
          setError(data.error);
          setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong")
      })
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verfication"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
     <div className="flex items-center w-full justify-center">
      {!success && !error && (
        <BeatLoader />
      )}

      <FormSuccess message={success} />
      {!success && (
        <FormError message={success} />
      )}

     </div>
    </CardWrapper>
  )
}