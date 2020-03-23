import { useState } from "react";

const useFormErrors = <ErrorsType>(
  input: any,
  requiredFields: any
): [
  ErrorsType,
  () => boolean,
  React.Dispatch<React.SetStateAction<ErrorsType>>
] => {
  const [errors, setErrors] = useState<ErrorsType>({} as ErrorsType);

  const isEntryInvalid = (entry: Array<any> | undefined) =>
    !entry || entry[1] === undefined || entry[1] === "";

  const isFormValid = () => {
    const invalidProperties = Object.keys(requiredFields)
      .filter(key =>
        isEntryInvalid(Object.entries(input).find(entry => entry[0] === key))
      )
      .map(el => [el, `The ${el} field is required`]);

    const validationErrors = Object.fromEntries(invalidProperties);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return [errors, isFormValid, setErrors];
};

export default useFormErrors;
