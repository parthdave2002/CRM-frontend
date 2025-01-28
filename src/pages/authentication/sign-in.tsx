/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label } from "flowbite-react";
import type { FC } from "react";
import LOGO from "../../img/logo.png";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form, Input, FormFeedback } from "reactstrap";
import { insertlogin, resetinsertlogin} from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ToastMessage from "../../components/ToastMessage";

const SignInPage: FC = function () {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Username"),
      password: Yup.string().required("Please Enter Password"),
    }),
    onSubmit: (values) => {
      // dispatch(insertlogin(values));
      validation.resetForm();
    },
  });

  const [Login, setLogin] = useState(false);
  const [LoginRols, setLoginRols] = useState([]);

  const { login } = useSelector((state:any) => ({
    login: state.Login.Logincode,
    // loginlaravel: state.LaravelLogin.Logincode
  }));

  const AcccessData = LoginRols && LoginRols.map((item:any) => ( item.role_title ));

  useEffect(() => {
    setLogin(login ? login.success : null);
    setLoginRols(login.data ? login.data.roles : null);
  }, [login]);

  useEffect(() => {

    // if(Login == true){
    //   const socket = new WebSocket('ws://192.168.0.22:8000');
        
    //   const authUser = localStorage.getItem("authUser");
    //   const UserData = authUser ? JSON.parse(authUser) : null;
    //   let Userid = UserData ? UserData.data.id : null;

    //   socket.onopen = function () {
    //     console.log('WebSocket connected');
        
    //     // Send a message to the server once connection is open
    //     try {
    //       socket.send(JSON.stringify({ type: "subscribe", requestId: Userid}));
    //     } catch (error) {
    //       console.error("Error occurred while sending message:", error);
    //       // Handle the error appropriately, e.g., display a message to the user
    //     }
    //   };
    // }

    if (Login == true) {  
      if(AcccessData?.includes("Team Leader")){
        navigation("/playlist");
        location.reload();
      }
      else if (AcccessData?.includes("CSR") || AcccessData?.includes("Sales Executive")) {
        navigation("/dialer");
        location.reload();
      }
      else{
        navigation("/dashboard");
        location.reload();
      }
    }
    // dispatch(resetinsertlogin());
  }, [Login]); 

  //--------------  if User Alredy login redirect to their page code start --------------
    useEffect(() =>{
      const id = localStorage.getItem("user");
      const jsonObject = id ? JSON.parse(id): null;
      let roleTitle = jsonObject ? jsonObject[0].role_title : null;
      if (roleTitle) {  
        if(roleTitle?.includes("Team Leader")){
          navigation("/playlist");
          location.reload();
        }
        else if (roleTitle?.includes("CSR") || roleTitle?.includes("Sales Executive")) {
          navigation("/dialer");
          location.reload();
        }
        else{
          navigation("/dashboard");
          location.reload();
        }
      }
    },[])
  //--------------  if User Alredy login redirect to their page code end --------------

  const LostPassword = () => {
    alert("Please contact your Admin");
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0"> <img alt="Flowbite logo" src={LOGO} className="mr-3 h-12" /> </div>

      <Card horizontal imgSrc="/images/authentication/login_6.png" imgAlt=""  className="w-full lg:max-w-screen-lg md:max-w-screen-md [&>img]:hidden md:[&>img]:w-[31rem] md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block" >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl"> Sign in </h1>

        <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
          <div className="mb-4 flex flex-col gap-y-2">
            <Label htmlFor="username">Your Username</Label>

            <Input
              name="username"
              className="bg-gray-50 border border-gray-300  disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
              placeholder="Enter username"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.username || ""}
              invalid={ validation.touched.username && validation.errors.username  ? true : false }
            />
            {validation.touched.username && validation.errors.username ? (
              <FormFeedback type="invalid" className="text-Red">
                {validation.errors.username}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-6 flex flex-col gap-y-2">
            <Label htmlFor="password">Your password</Label>
            <Input
              id="password"
              className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
              name="password"
              placeholder="Enter Password"
              type="password"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.password || ""}
              invalid={ validation.touched.password && validation.errors.password ? true : false }
            />
            {validation.touched.password && validation.errors.password ? ( <FormFeedback type="invalid" className="text-Red"> {validation.errors.password} </FormFeedback>) : null}
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3"> <Checkbox id="rememberMe" name="rememberMe" /> <Label htmlFor="rememberMe">Remember me</Label>  </div>
            <a onClick={() => { LostPassword() }} className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300 cursor-pointer"  > Lost Password? </a>
          </div>

          <div className="mb-6">  <Button type="submit" className="w-full ">  Login to your account  </Button> </div>
        </Form>

      </Card>
      <ToastMessage />
    </div>
  );
};

export default SignInPage;
