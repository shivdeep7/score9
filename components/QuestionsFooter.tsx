import {
  SparklesIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon

} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const QuestionFooter = ({currentPage, disabled}: {currentPage: string, disabled?: boolean}) => {

        const router = useRouter(); 

    return (
           <div className="flex justify-between items-center mt-5">
            
            <div className="flex flex-row items-center space-x-3">
                {
                   ( currentPage!== "1") && (
                         <button className="p-3 bg-rose-400 shadow-lg rounded-md  text-white flex space-x-2" onClick={() => { router.push((Number(currentPage)-1).toString()) }} >
                                <span>Previous</span>
                                <ArrowLongLeftIcon className="h-6 w-6" />
                        </button>
                    )
                }
            </div>
                 
               <div className='flex space-x-3' >
                 <button className="p-3 bg-indigo-400 shadow-lg rounded-md text-white flex space-x-2 disabled:opacity-25" disabled={disabled}>
                    <SparklesIcon  className="h-6 w-6" />
                    <span>Submit</span>
                </button>
                
                {
                          <button className="p-3 bg-teal-500 shadow-lg rounded-md  text-white flex space-x-2" onClick={() =>{ router.push((Number(currentPage)+1).toString()) }} >
                            <span>Next</span>
                            <ArrowLongRightIcon className="h-6 w-6" />
                        </button>
                
                }
               </div>
           </div>
    )
}

export default QuestionFooter;