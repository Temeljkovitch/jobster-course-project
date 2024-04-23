import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import { useState } from "react";
import { FormRow } from "../components";
import { toast } from "react-toastify";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !values.email ||
      !values.password ||
      (!values.isMember && !values.name)
    ) {
      console.log("Please, fill out all the fields!");
      toast.warn("Please, fill out all the fields!");
      return;
    }
    setValues({ ...values, name: "", email: "", password: "" });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "login" : "register"}</h3>
        {/* Name */}
        {values.isMember || (
          <FormRow
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* Email */}
        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Password */}
        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        {/* Button */}
        <button type="submit" className="btn btn-block">
          {values.isMember ? "login" : "register"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "register" : "login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
