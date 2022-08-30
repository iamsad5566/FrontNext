import React from "react";

const PostmanRegister = () => {
  const [agree, setAgree] = useState(false);

  const handleAgreement = () => {
    setAgree(true);
  };

  return (
    <React.Fragment>
      {agree ? <RegisterPage /> : <Notice handleAgreement={handleAgreement} />}
    </React.Fragment>
  );
};

export default PostmanRegister;
