import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/utils";

export default function FilterMenuBar({ filterMenus }) {
  const router=useRouter();
  const searchParams=useSearchParams();
  const [filterParams, setFilterParams] = useState({});
  function handlefilter(getSectionID, getCurrentOption) {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(getSectionID);
    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [getSectionID]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilterParams[getSectionID].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        cpyFilterParams[getSectionID].push(getCurrentOption);
      else cpyFilterParams[getSectionID].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));
  }
  useEffect(()=>{
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  },[]);
  useEffect(()=>{
    if(filterParams && Object.keys(filterParams).length>0){
      let url='';
      url=formUrlQuery({
        params:searchParams.toString(),
        dataToAdd:filterParams,
      })
      router.push(url,{scroll:false});
    }
    
  },[filterParams,searchParams])
  return (
    <Menubar>
      {filterMenus.map((filtermenu, indexofmenu) => (
        <MenubarMenu key={filtermenu.id} label={filtermenu.name}>
          <MenubarTrigger>{filtermenu.name}</MenubarTrigger>
          <MenubarContent>
            {filtermenu.options.map((option, index) => (
              <MenubarItem
                key={index}
                className="flex items-center"
                onClick={() => handlefilter(filtermenu.id, option)}
              >
                <div
                  className={`h-4 w-4 dark:border-white border rounded border-gray-900 ${
                    filterParams &&
                    Object.keys(filterParams).length > 0 &&
                    filterParams[filtermenu.id] &&
                    filterParams[filtermenu.id].indexOf(option) > -1
                      ? "bg-black dark:bg-white"
                      : ""
                  } `}
                />
                <Label className="ml-4 w-8 cursor-pointer text-sm text-gray-600 ">
                  {option}
                </Label>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
