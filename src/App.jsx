import Navbar from "./components/Navbar";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import UseDisclose from "./hooks/UseDisclose";
import {FiSearch} from "react-icons/fi";
import ContactCart from "./components/ContactCart";
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useEffect, useState } from "react";
import {collection, doc, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";


export default function App() {
  const [contacts, setContacts] = useState([]);
  const {isOpen,onOpen,onClose} = UseDisclose();


  useEffect(()=> {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db,"contacts");
        // const contactSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef,(snapshot)=>{
             
        const contactLists = snapshot.docs.map((doc) => 
        ({
          id: doc.id,
          data: doc.data()
        }));
          setContacts(contactLists);
          return contactLists
        })

      } catch (error) {
        console.log(error);
      }
    } 
    getContacts();
  },[]);

  const filterContacts = (e) =>
  {
        const value= e.target.value;
        const contactsRef = collection(db,"contacts");
        // const contactSnapshot = await getDocs(contactsRef);
        onSnapshot(contactsRef,(snapshot)=>{
             
        const contactLists = snapshot.docs.map((doc) => 
        ({
          id: doc.id,
          data: doc.data()
        }));
        const filteredContacts = contactLists.filter(contact =>
          contact.name.toLowerCase().includes(value.toLowerCase()));
          setContacts(filteredContacts);
          return filteredContacts;
        })
        
  }
  return (
    <>
    <div className="mx-auto max-w-[370px] px-4 ">
      <Navbar/>
      <div className="flex gap-2">
      <div className="relative flex items-center flex-grow">
      <FiSearch className="absolute ml-1 text-3xl text-white"/>
        <input onChange={filterContacts} type="text" 
        className=" flex-grow   h-10 border bg-transparent border-white rounded-md text-white pl-9" />
      </div>
      <AiOutlinePlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer"/>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {
          contacts.length<= 0 ?(<NotFoundContact/>) : (contacts.map(contact=>(
            <ContactCart key={contact.id} contact={contact}/>
          
          ))
          
          )}
      </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer
    position="bottom-center"/>

     </>
    
  )
}