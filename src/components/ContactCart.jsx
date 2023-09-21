import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import { useState } from "react";
import UseDisclose from "../hooks/UseDisclose"; // Import as a default export
import { toast } from "react-toastify";

const ContactCart = ({ contact }) => {
  const { isOpen, onOpen, onClose } = UseDisclose(); // Use as a default import

  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await deleteDoc(contactRef);
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div key={contact.id} className="bg-yellow flex p-2 justify-around rounded-lg items-center">
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div className="">
            <h2 className="font-medium">{contact.data.name}</h2>
            <p className="text-sm">{contact.data.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine className=" cursor-pointer"  />
          <IoMdTrash onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer" />
        </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default ContactCart;
