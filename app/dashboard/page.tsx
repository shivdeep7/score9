import { epilogue, literata } from "../layout";
import { SparklesIcon } from "@heroicons/react/24/outline";


const Dashboard = () => {
    return (
        <main className="flex flex-col justify-start  h-screen ">
            <div className="h-[800px] bg-gradient-to-b from-orange-300/20 to-orange-50/20 w-full absolute top-0 z-[-10px]"></div>
             <div className="z-10">
              <div className="m-auto w-full lg:max-w-2xl mt-10 text-center leading-[100px] flex flex-col items-center">
                                <h2 className={`text-6xl font-[800] my-5 mb-3  ${epilogue.className}`}>Welcome to Score9, <br/> Let's get <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">learning</span>.</h2>            
                                <h3 className={`text-xl font-[500] my-5 mb-3  ${epilogue.className}`}>Our clients are our partners, we work with them closely to create world class products and deliver top-notch services.</h3>            

                  <div className="flex space-x-2 mt-5">
                    <button className="flex flex-row space-x-2 justify-center  items-center 0 p-2 rounded-full bg-black text-white font-[500] text-sm px-4">
                <span>Speaking</span>
            </button>
              <button className="flex flex-row space-x-2 justify-center  items-center 0 p-2 rounded-full bg-white border bg-zinc-100 text-zinc-600 font-[500] text-sm px-4 ">
                <span>Listening</span>
            </button>
            <button className="flex flex-row space-x-2 justify-center  items-center 0 p-2 rounded-full bg-white border bg-zinc-100 text-zinc-600 font-[500] text-sm px-4 ">
                <span>Reading</span>
            </button>
             <button className="flex flex-row space-x-2 justify-center  items-center 0 p-2 rounded-full bg-white border bg-zinc-100 text-zinc-600 font-[500] text-sm px-4 ">
                <span>Writing</span>
            </button>
                  </div>
              </div>
                 
               
            <div className="grid grid-cols-2 gap-4 py-10  m-auto w-full lg:max-w-6xl">
                   <div className="w-full h-[220px] bg-[#fffbf4] mb-5 rounded-md  flex flex-col  relative border border-zinc-200">
                              <div className=" flex flex-col  justify-between p-6  h-full">
                              <h2 className={` text-3xl font-[500] my-5 mb-8  m-auto w-full lg:max-w-6xl mt-10 ${literata.className}`}>Welcome to  <span className="text-orange-500 ">Score9</span></h2>
                                <button className=" bg-orange-500 text-white rounded-full font-bold py-2 w-36">Start Random</button>
                              </div>
                                <div className="absolute right-0 bottom-0">
                                  <svg width="160" height="171" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#graphic-courses-level_svg__clip0_2260_23037)"><path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M233.172-34.331c43.398 17.584 34.502 79.508 68.596 111.608 30.239 28.472 81.581 15.004 103.408 50.342 20.519 33.222-10.959 74.92-23.946 111.747-13.629 38.65-12.781 101.59-53.34 107.422-47.837 6.879-67.018-73.33-114.304-83.315-35.683-7.534-64.026 45.749-99.692 38.13-39.028-8.337-69.327-42.182-86.945-77.998C6.845 182.735-10.55 137.568 9.377 96.61c19.78-40.655 80.034-38.564 119.407-60.779 36.748-20.734 65.283-86.006 104.388-70.162z" fill="#E8DDFB"></path><rect width="25" height="75" rx="2" transform="matrix(-1 0 0 1 144 80)" fill="#3728AA"></rect><rect width="25" height="52" rx="2" transform="matrix(-1 0 0 1 113 103)" fill="#8686DF"></rect><rect x="-0.5" y="0.5" width="24" height="34" rx="1.5" transform="matrix(-1 0 0 1 81 120)" fill="#fff" stroke="#140B41"></rect><path d="M129.056 55.867c-7.701 11.777-18.518 12.021-27.152 8.316m0 0c-9.96-4.275-17.014-13.807-13.023-16.95 6.312-4.97 11.647 5.336 13.023 16.95zm0 0c1.061 8.95-.23 18.677-5.237 22.785-5.793 4.752-13.48 4.273-19.02 1.95m0 0c-5.545-2.325-8.941-6.497-6.144-9.122 3.367-3.16 6.103 2.518 6.143 9.122zm0 0c.03 5.214-1.62 11.006-5.967 13.477-5.095 2.895-10.71.089-14.456-1.927" stroke="#140B41" stroke-linecap="round"></path><path d="M119.916 57.848c2.43-.965 7.654-2.711 9.119-1.977 1.464.734 1.562 7.925.969 11.058" stroke="#140B41" stroke-linecap="round"></path></g><defs><clipPath id="graphic-courses-level_svg__clip0_2260_23037"><path fill="#fff" d="M0 0h160v171H0z"></path></clipPath></defs></svg>
                                </div>
                              </div>

                                <div className="w-full h-[220px] bg-[#fffbf4] mb-5 rounded-md  flex flex-col  relative border border-zinc-200">
                              <div className=" flex flex-col  justify-between p-6  h-full">
                              <h2 className={` text-3xl font-[500] my-5 mb-8  m-auto w-full lg:max-w-6xl mt-10 ${literata.className}`}>Welcome to  <span className="text-orange-500 ">Score9</span></h2>
                                <button className=" bg-orange-500 text-white rounded-full font-bold py-2 w-36">Start Random</button>
                              </div>
                                <div className="absolute right-0 bottom-0">
                                  <svg width="160" height="171" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#graphic-courses-level_svg__clip0_2260_23037)"><path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M233.172-34.331c43.398 17.584 34.502 79.508 68.596 111.608 30.239 28.472 81.581 15.004 103.408 50.342 20.519 33.222-10.959 74.92-23.946 111.747-13.629 38.65-12.781 101.59-53.34 107.422-47.837 6.879-67.018-73.33-114.304-83.315-35.683-7.534-64.026 45.749-99.692 38.13-39.028-8.337-69.327-42.182-86.945-77.998C6.845 182.735-10.55 137.568 9.377 96.61c19.78-40.655 80.034-38.564 119.407-60.779 36.748-20.734 65.283-86.006 104.388-70.162z" fill="#E8DDFB"></path><rect width="25" height="75" rx="2" transform="matrix(-1 0 0 1 144 80)" fill="#3728AA"></rect><rect width="25" height="52" rx="2" transform="matrix(-1 0 0 1 113 103)" fill="#8686DF"></rect><rect x="-0.5" y="0.5" width="24" height="34" rx="1.5" transform="matrix(-1 0 0 1 81 120)" fill="#fff" stroke="#140B41"></rect><path d="M129.056 55.867c-7.701 11.777-18.518 12.021-27.152 8.316m0 0c-9.96-4.275-17.014-13.807-13.023-16.95 6.312-4.97 11.647 5.336 13.023 16.95zm0 0c1.061 8.95-.23 18.677-5.237 22.785-5.793 4.752-13.48 4.273-19.02 1.95m0 0c-5.545-2.325-8.941-6.497-6.144-9.122 3.367-3.16 6.103 2.518 6.143 9.122zm0 0c.03 5.214-1.62 11.006-5.967 13.477-5.095 2.895-10.71.089-14.456-1.927" stroke="#140B41" stroke-linecap="round"></path><path d="M119.916 57.848c2.43-.965 7.654-2.711 9.119-1.977 1.464.734 1.562 7.925.969 11.058" stroke="#140B41" stroke-linecap="round"></path></g><defs><clipPath id="graphic-courses-level_svg__clip0_2260_23037"><path fill="#fff" d="M0 0h160v171H0z"></path></clipPath></defs></svg>
                                </div>
                              </div>

                                                                       <h2 className={`text-2xl font-[800] my-5 mb-3  ${epilogue.className}`}>Popular Practice Questions</h2>            

            
            </div>

             </div>
             
        </main>
    )
}
export default Dashboard;