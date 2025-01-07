import { Button } from "../components/Button"
import { InputComponent } from "../components/InputComponent"
export const Signin = () => {

       return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
           <div className="bg-white rounded-xl border min-w-48 p-8">
               <InputComponent  placeholder="Username" />
               <InputComponent  placeholder="Password" />
               <div className="flex justify-center pt-4">
                   <Button  loading={false} variant="primary" title="Signin" fullWidth={true} />
               </div>
           </div>
       </div>
   }