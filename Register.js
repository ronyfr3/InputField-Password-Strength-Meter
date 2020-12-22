//https://github.com/upmostly/password-strength-meter/blob/master/src/App.js
import React,{ useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useOnclickOutside from "react-cool-onclickoutside";
import PasswordStrengthMeter from './PasswordStrengthMeter'
import {Link} from 'react-router-dom'
import './Login.css'

export default function Register() {
    const [ show , setShow ] = useState(false)
    const ref = useOnclickOutside(() => {
        setShow(false);
      })

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(25, "Maximum 25 characters")
        .required("This Field is Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("This Field is Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("This Field is Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("This Field is Required!")
    }),
    onSubmit: (values,{resetForm}) => { 
            console.log(values)    
            resetForm({values:''}) 
    }
  });

  //after render password field will be focused
//   const inputRef = useRef()
//   useEffect(() => {
//     inputRef.current.focus();
//   })
   return (
    <div className="login">
      <h1>Sign Up</h1>

      <form onSubmit={formik.handleSubmit}>

        <div className='full_name'>
            <label>Full Name :</label>
            <input
                type="text"
                name="full_name"
                value={formik.values.full_name}
                onChange={formik.handleChange}
            />
            {formik.errors.full_name && formik.touched.full_name && (
                <p>{formik.errors.full_name}</p>
            )}
        </div>

        <div className='email'>
            <label>Email :</label>
            <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
            )}
        </div>

        <div className='password'>
            <label>Password :</label>
            <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                // ref={inputRef}
                onClick={()=> setShow(true)}
                ref={ref}
            />
            {
              show ? 
              <span className='progressBar'>
                 <PasswordStrengthMeter password={formik.values.password}/>
              </span>
               :''
            }
            {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
            )}
        </div>

        <div className='password'>
            <label>Confirm Password :</label>
            <input
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
            />
            {formik.errors.confirm_password && formik.touched.confirm_password && (
                <p>{formik.errors.confirm_password}</p>
            )}
        </div>

        <div className='btn'>
           <button type="submit">Create Your Account</button>
             <div className='link_signIn'>
                <h4>Do You Have Already An Account ?</h4>
                <Link to='/login'>Sign In</Link>
             </div>
        </div>

      </form>
    </div>
  );
}