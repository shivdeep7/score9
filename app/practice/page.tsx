import { SparklesIcon } from "@heroicons/react/24/outline";
import Ai from '../components/Ai';

const Questions = () => {
    return (
      <main>
            <div className="flex items-center space-x-2 mb-8">
                    <span className="text-2xl font-[600]">Speaking - Read Aloud</span>
                <Ai />
            </div>
            <div className="grid grid-cols-4 gap-6 ">
            {
                new Array(10).fill(0).map(() => {
                    return (
                        <div className="flex card w-72 bg-base-100 shadow-md border border-zinc-100">
                                <div className="card-body">
                                <h2 className="card-title">#1433 Black Hole!</h2>
                                <p className="truncate">According to are cent study, as tar located near</p>
                                <div className="card-actions justify-start mt-2">
                                <button className="flex flex-row space-x-2 justify-center items-center shadow-md p-2 rounded-md bg-red-400 text-white text-sm px-4">
                                    <SparklesIcon className="w-4 h-4" />
                                    <span>Start Test</span>
                                </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
            </div>
      </main>
    )
}

export default Questions;