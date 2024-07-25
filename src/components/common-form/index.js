import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function CommonForm({action,buttonText,isBtnDisabled,formcontrols,btnType,formData,setFormData,handleFileChange}){

    function renderInputByComponentType(control,key){
        let content=null;
        switch(control.componentType){
            case 'input':
                content=<div className="relative flex items-center mt-8">
                    <Input type="text" disabled={control.disabled} 
                    placeholder={control.placeholder} 
                    value={formData[control.name]} 
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
                    name={control.name}
                    id={control.name} 
                    className="w-full h-[60px] px-4 border bg-gray-100 rounded-md text-lg  drop-shadow-sm transition-all duration-200 ease-in-out focus-visible:outline-none focus:border-primary-500
                     focus:bg-white focus:drop-shadow-lg focus-visible:ring-offset-0 focus-visible:ring-0" />
                </div>
                break;
            case 'textarea':
                content=<div className="relative flex items-center mt-8">
                    <textarea disabled={control.disabled} 
                    placeholder={control.placeholder} 
                    value={formData[control.name]} 
                    onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
                    name={control.name}
                    id={control.name} 
                    className="w-full h-[60px] px-4 border bg-gray-100 rounded-md text-lg  drop-shadow-sm transition-all duration-200 ease-in-out focus-visible:outline-none focus:border-primary-500
                     focus:bg-white focus:drop-shadow-lg focus-visible:ring-offset-0 focus-visible:ring-0" />
                </div>
                break;
            case 'file':
               content=<Label for={control.name} className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer">
                <h2>{control.label}</h2>
                <Input onChange={handleFileChange} id={control.name} type='file'></Input>
               </Label>
                break;
            default:
                content=<div className="relative flex items-center mt-8">
                <textarea disabled={control.disabled} 
                placeholder={control.placeholder} 
                value={formData[control.name]} 
                onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
                name={control.name}
                id={control.name} 
                className="w-full h-[60px] px-4 border bg-gray-100 rounded-md text-lg  drop-shadow-sm transition-all duration-200 ease-in-out focus-visible:outline-none focus:border-primary-500
                 focus:bg-white focus:drop-shadow-lg focus-visible:ring-offset-0 focus-visible:ring-0" />
            </div> 
            break;
        }
        return content;
    }

    return(
        <form action={action}>
            {
                formcontrols.map((control,key)=>
                    renderInputByComponentType(control,key)
                )
            }
            <div className="mt-6 w-full">
                <Button type={btnType||'submit'} className="disabled:opacity-60 flex h-11 items-center justify-center "disabled={isBtnDisabled}>
                    {buttonText}</Button>
            </div>
        </form>
    )
}