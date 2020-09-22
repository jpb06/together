import { IResult, PasswordMeter } from "password-meter";
import React, { useEffect, useState } from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState<IResult>({
    percent: 0,
    score: 0,
    status: "",
  });

  useEffect(() => {
    setStrength(new PasswordMeter().getResult(password));
  }, [password]);

  if (password.length === 0) return null;

  return (
    <>
      Password strength {` - ${strength.status}`}
      <LinearProgress
        aria-label="password-strength"
        variant="determinate"
        color="primary"
        value={strength.percent}
      />
    </>
  );
};

export default PasswordStrength;
