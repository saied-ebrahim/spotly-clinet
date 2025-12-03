import Link from "next/link";
import { FaBuilding, FaUser } from "react-icons/fa";
import { register } from "@/svg/register";
import TypewriterText from "@/components/auth/TypewriterText";
import AttendeeRegisterForm from "@/components/forms/AttendeeRegisterForm";

export default function RegisterIndexPage() {
  
  const getIcon = () => {
    switch (true) {
      
      default:
        return <FaUser className="text-3xl text-white" />;
    }
  };



  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#2B293D] via-[#3a3850] to-[#2B293D] flex items-center justify-center p-4">
         <div className="w-full max-w-3xl">
           {/* Logo/Brand Section */}
           <div className="flex flex-col items-center mb-8">
             <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white/10 rounded-full p-4">
               {getIcon()}
             </div>
             
             <TypewriterText />
           </div>
   
           {/* Registration Form Card */}
           <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
             
               <AttendeeRegisterForm />
             
           </div>
         </div>
       </div>
  );
}
