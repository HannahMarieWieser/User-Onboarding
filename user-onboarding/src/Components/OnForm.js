import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field } from "formik";
import axios from 'axios';
import * as Yup from 'yup';

// [x] Name
// -[x] Email
// -[x] Password
// -[x] Terms of Service (checkbox)
// -[x] A Submit button to send our form data to the server.



const OnboardForm = ({values, errors, handleSubmit, touched, status}) => {
    const [users, setUsers] = useState([])
    console.log('state -users', users)

    useEffect(() => {
        if (status){
            setUsers([...users, status])
        }
    }, [status]);

    return (
        <>
            <ul>

                {users.map(user => (
                    <li > {user.name} </li>
                ))} 

            </ul> 

            <Form>
                <div>
                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field type = 'text' name='name' placeholder= 'Firstname Lastname'/>
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
                    {touched.role && errors.role && <p>{errors.role}</p>}
                    <Field component="select" className="role" name="role">
                        <option>Please Choose your Role</option>
                        <option value="juniordev">Junior Dev</option>
                        <option value="seniordev">Senior Dev</option>
                        <option value="teamlead">Team Lead</option>
                        <option value="juniordev">None of the Above</option>
                    </Field>
                </div>

                <div>
                    {touched.terms && errors.terms && <p>{errors.terms}</p>}
                    <label className="checkbox-container"> 
                        Terms of Service 
                        <Field type="checkbox" name="terms" checked={values.terms}
                        />
                    </label>
                </div>


                <button type= 'submit'>Submit!</button>
            </Form>
        </>
    )
}  


const OnForm = withFormik({

    mapPropsToValues({name, email, password, terms, role}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
            role: role || ''
        };
    },

    //======VALIDATION SCHEMA==========
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .required('Full name is required')
        .matches(/[ ]/,'Please enter first and last name'),

        email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),

        password: Yup.string()
        .min(6, 'Password must be 6 characters or longer')
        .matches(/[0-9]/, 'Needs at least one number')
        .matches(/[~*.,&^%$#@!()><?/]/, 'Needs at least one special character')
        .required('Password is required'),

        terms: Yup.bool()
        .oneOf([true], 'Field must be checked'),

    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}){
        console.log(values)
        
        if(values.email === 'waffle@syrup.com'){
            setErrors({email:'That email is already taken'})
        }
        else{
            axios
            .post('https://reqres.in/api/users', values)
            .then(res =>{
                console.log('res', res)//console log response
                resetForm();
                setSubmitting(false)
                setStatus(res.data)
            })
            .catch(err =>{
                console.log('err', err)//console log error
                setSubmitting(false)
            })
        }
    }

})(OnboardForm);

export default OnForm;