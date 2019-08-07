import React from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';

// [x] Name
// -[x] Email
// -[x] Password
// -[x] Terms of Service (checkbox)
// -[x] A Submit button to send our form data to the server.



function OnboardForm({values, errors, touched}){
    return (
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type = 'text' name='name' placeholder= 'Full Name'/>
            </div>

            <div>
                {touched.email && errors.email && <p>{errors.email}</p>} 
                {/* if there is an error, this shows you the errors message. */}
                <Field type = 'email' name='email' placeholder= 'Email'/>
            </div>

            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type = 'password' name='password' placeholder= 'Password'/>
            </div>

            <div>
                {touched.terms && errors.terms && <p>{errors.terms}</p>}
                <label className="checkbox-container"> 
                    Terms of Service 
                    <Field type="checkbox" name="terms" checked={values.terms}
                    />
                </label>
            </div>


            <button>Submit!</button>
        </Form>
    )
}  


const OnForm = withFormik({

    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },

    //======VALIDATION SCHEMA==========
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .required('Full name is required'),

        email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),

        password: Yup.string()
        .min(6, 'Password must be 6 characters or longer')
        .required('Password is required'),

        terms: Yup.bool()
        .oneOf([true], 'Field must be checked')
    }),
    //==============

    handleSubmit(values){
        console.log(values)
        //form submissoon gode..GET/REQUEST
    }

})(OnboardForm);

export default OnForm