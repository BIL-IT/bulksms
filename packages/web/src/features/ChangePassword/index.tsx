import * as Lucide from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ChangePasswordComponent() {
  return (
    <div className="flex justify-center items-center h-screen w-screen  md:bg-[#a5a3a3]">
      <div className="w-auto	 p-6 shadow-lg bg-white rounded-md pl-8">
        <h1 className="text-zinc-900 text-center	">Set New password</h1>
        <div className="mt-10 flex flex-col gap-4">
          {/* Oldpassword */}
          <label
            htmlFor="Old password"
            className="text-sm font-semibold text-primary"
          >
            Old password
          </label>
          <div className="relative flex items-center">
           
            <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
            <Lucide.LockIcon
                className="text-primary"
                width={16}
                height={16}
                
              />
               <input className="outline-none " placeholder="Old password">
               </input>
            </div>
          </div>
          {/* New password */}
          <label
            htmlFor="New password"
            className="text-sm font-semibold text-primary"
          >
            New Password
          </label>
          <div className="relative flex items-center">
           
            <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
            <Lucide.LockIcon
                className="text-primary"
                width={16}
                height={16}
                
              />
               <input className="outline-none" placeholder="New Password">
               </input>
            </div>
          </div>
          {/* Confirmpassword */}
          <label
            htmlFor="Confirm password"
            className="text-sm font-semibold text-primary"
          >
           Confirm Password
          </label>
          <div className="relative flex items-center">
           
            <div className="flex flex-row border-2 h-10 rounded-md items-center px-4 gap-3 w-96">
            <Lucide.LockIcon
                className="text-primary"
                width={16}
                height={16}
                
              />
               <input className="outline-none" placeholder="Confirm Password">
               </input>
               
            </div>
           
          </div>

          <Button  type="submit" className="mt-4 py-5 w-96">
         Submit
        </Button>
          
        </div>
       
      </div>
    </div>
  );
}
