import { literata } from "../layout";

const Dashboard = () => {
    return (
        <main className="flex flex-col justify-start  h-screen ">
            <div className="h-[800px] bg-gradient-to-b from-blue-300/20 to-blue-50/20 w-full absolute top-0 z-[-1]"></div>
            <h2 className={` text-3xl font-[500] my-5 mb-8  m-auto w-full lg:max-w-7xl mt-10 ${literata.className}`}>Let's start <span className="text-orange-500 ">Learning</span></h2>
            <hr/>
            <div className="py-10">
                <div className="grid grid-cols-4 gap-4    m-auto w-full lg:max-w-7xl">
                <div className=" bg-rose-50 bg-cover rounded-xl  flex flex-col justify-between  h-[320px]">
                    <div className="flex flex-col justify-start items-start p-4">
                         <img src="/icons/speaking.png" className="w-[100px]" />
                         <span className="text-black font-[600] text-2xl ">Speaking</span>
                         <span className="text-black font-[300] text-md  ">Use the AI powered speaking assistance to enhance your learning experiance.</span>
                    </div>
                    <button className="bg-rose-500  rounded-b-xl text-white font-[500] p-2">Start Module</button>
                </div>
                  <div className=" bg-indigo-50 bg-cover rounded-xl  flex flex-col justify-between">
                    <div className="flex flex-col items-start justify-start p-4">
                         <img src="/icons/books.png" className="w-[100px]" />
                       <span className="text-black font-[600] text-2xl ">Reading</span>
                          <span className="text-black font-[300] text-md  ">Use the AI powered speaking assistance to enhance your learning experiance.</span>
                    </div>
                    <button className="bg-indigo-500  rounded-b-xl text-white font-[500] p-2">Start Modules</button>
                </div>
            <div className=" bg-teal-50 bg-cover rounded-xl  flex flex-col justify-between ">
                    <div className="flex flex-col items-start justify-start p-4">
                         <img src="/icons/headphones.png" className="w-[100px]" />
                       <span className="text-black font-[600] text-2xl ">Listening</span>
                          <span className="text-black font-[300] text-md  ">Use the AI powered speaking assistance to enhance your learning experiance.</span>
                    </div>
                    <button className="bg-teal-500  rounded-b-xl text-white font-[500] p-2">Start Modules</button>
                </div>
                   <div className=" bg-yellow-50 bg-cover rounded-xl  flex flex-col justify-between ">
                    <div className="flex flex-col items-start justify-start p-4">
                         <img src="/icons/books.png" className="w-[100px]" />
                       <span className="text-black font-[600] text-2xl ">Listening</span>
                          <span className="text-black font-[300] text-md  ">Use the AI powered speaking assistance to enhance your learning experiance.</span>
                    </div>
                    <button className="bg-yellow-500 rounded-b-xl text-white font-[500] p-2">Start Modules</button>
                </div>
                </div>
            </div>
        </main>
    )
}
export default Dashboard;