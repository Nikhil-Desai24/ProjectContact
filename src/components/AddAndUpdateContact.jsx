import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import {addDoc, collection, doc} from "firebase/firestore";
import { toast } from 'react-toastify';
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape
({
    name:Yup.string().required("name is required"),
    email:Yup.string().email("Invalid Email").required("email is required"),

})

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact}) => {

    const addContact = async (contact) =>
    {
        try 
        {
           const contactRef = collection(db,"contacts"); 
           await addDoc(contactRef,contact);
           toast.success("Added Successfully");

           onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact = async (contact, id) =>
    {
        try 
        {
           const contactRef = doc(db,"contacts", id); 
           await updateDoc(contactRef,contact);
           toast.success("Updated Successfully");

           onClose();
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik 
      validationSchema={contactSchemaValidation}
      initialValues={isUpdate ?{
         name:contact.name,
         email:contact.email,
      }:
        {
        name:"",
        email:"",
        }}
        onSubmit={(values)=>{
              console.log(values);
              isUpdate ? updateContact(values,id) :
              addContact(values);
        }}
    >
        <Form className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="h-10 border" />
            <div className="">
             <ErrorMessage name="name"/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field  name="email" className="h-10 border" />
          </div>
          <button className="self-end border bg-orange px-3 py-2">{isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
