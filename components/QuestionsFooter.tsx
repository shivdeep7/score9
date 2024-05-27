import {
  SparklesIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon

} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const QuestionFooter = ({currentPage,  disabled, submit = true, onSubmit}: {currentPage: string,  disabled?: boolean, submit?: boolean, onSubmit?: () => void }) => {

        const router = useRouter(); 

    return (
           <div className="flex justify-between items-center mt-5 fixed bottom-0 w-full p-3 bg-[#f6f4ee]">
            
            <div className="flex flex-row items-center space-x-3">
                {
                   ( currentPage!== "1") && (
                         <button className="p-3 px-5 bg-zinc-200  rounded-full  text-black font-[600] flex space-x-2" onClick={() => { router.replace((Number(currentPage)-1).toString()) }} >
                              <ArrowLongLeftIcon className="h-6 w-6" />

                                <span>Previous</span>
                        </button>
                    )
                }
            </div>
                 
              <div className='flex space-x-3' onClick={onSubmit}>
                 {submit &&  <button className="p-3 px-5 bg-[#fe4d00]  rounded-full  text-white font-[600] flex space-x-2 disabled:opacity-25" disabled={disabled}>
                    <SparklesIcon  className="h-6 w-6" />
                    <span>Submit</span>
                </button>}
                
                {
                          <button className="p-3 px-5 bg-zinc-200  rounded-full  text-black font-[600] flex space-x-2" onClick={() =>{ router.replace((Number(currentPage)+1).toString()) }} >
                            <span>Next</span>
                            <ArrowLongRightIcon className="h-6 w-6" />
                        </button>
                
                }
               </div>
           </div>
    )
}

export default QuestionFooter;