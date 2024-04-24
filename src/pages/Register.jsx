import Wrapper from "../assets/wrappers/RegisterPage";
import Logo from "../components/Logo";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      console.log("Please, fill out all the fields!");
      toast.warn("Please, fill out all the fields!");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

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
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
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
