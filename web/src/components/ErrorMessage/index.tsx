interface ErrorMessageProps {
  validationMessage: string | null;
}

export function ErrorMessage({ validationMessage = "" }: ErrorMessageProps) {
  return (
    <>
      {validationMessage && (
        <div className="text-red-500 text-sm text-left">
          {validationMessage}
        </div>
      )}
    </>
  );
}
