import { epilogue, literata } from "./layout";


const Dashboard = () => {
    return (
        <main className="flex flex-col justify-start h-screen  ">
            <div className="h-[500px] bg-gradient-to-b from-indigo-300/20 to-indigo-50/20 w-full absolute top-0 z-0 w-full"></div>
             <div className="z-10 m-auto w-full lg:max-w-6xl">
              <div className=" mt-10 text-center leading-[100px] flex flex-col items-center">
                                <h2 className={`text-6xl font-[800] my-5 mb-3  ${epilogue.className}`}>Welcome to Score9, <br/> Let&apos;s get <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">learning</span>.</h2>            
                                <h3 className={`text-xl font-[500] my-5 mb-3  w-full lg:max-w-2xl ${epilogue.className}`}>Our clients are our partners, we work with them closely to create world class products and deliver top-notch services.</h3>            

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
                 

 <div className="flex flex-row justify-between mb-10">
            <div><img src="https://cdn.kastatic.org/images/lohp/hero_student_collage_US_2x.png" className="w-[400px]" /></div>
            <div className="flex flex-col items-start justify-center max-w-2xl">
                 <h2 className={`text-4xl font-[800] ${literata.className}`}>For every student, every classroom. Real results.</h2>            
                <div className="mt-5">We’re a nonprofit with the mission to provide a free, world-class education for anyone, anywhere.</div>
                <div className=" space-x-3 mt-2">
                  <button className="rounded-full bg-white border bg-zinc-100 text-zinc-600 font-[500] text-sm p-3 px-4  "> Students</button>
                  <button className="rounded-full bg-white border bg-zinc-100 text-zinc-600 font-[500] text-sm p-3 px-4 ">Teachers</button>
                  <button className=" rounded-full bg-white border bg-zinc-100 text-zinc-600 font-[500] text-sm p-3 px-4 ">Institute</button>
                </div>
            </div>
          </div>

            <span className={`text-5xl justify-center text-center font-[500] ${literata.className}`}>Learn the way <span className="italic text-orange-600">you</span> want</span>
            <div className="flex flex cmb-10 space-x-2 mt-10 mb-10">
                <div className="space-y-3  bg-[#f6f4ee] p-7 rounded-2xl text-black flex flex-col h-[320px] w-full max-w-sm justify-center items-start">
                    <h3 className="bg-purple-300 text-purple-900 p-1 px-5 rounded-md">AI powered results</h3>
                    <span className={`text-2xl ${literata.className}`}>Get fast and accurate AI generated results in n time</span>
                    <button className={`bg-white text-black p-3 font-[500] text-center rounded-lg  ${epilogue.className}`}>Try AI generated results</button>
                </div>
                <div className="flex flex-row text-black   bg-[#f6f4ee] rounded-xl flex flex-col flex-1  justify-start relative">
                    <div className="flex flex-col w-full max-w-sm justify-center space-y-5 my-auto p-3">
                       <span className={`text-2xl ${literata.className}`}>PTE mock test.</span>
                       <span>Prepare for the PTE with mock test for free. Get the accurate results right away.</span>
                      <button className="bg-black text-white p-3 font-[500] text-center w-56 rounded-lg">Explore plans</button>
                    </div>
                  <img className="absolute right-0 top-0 h-full rounded-r-xl" src="https://img.freepik.com/free-photo/indian-couple-planning-trip-concept_53876-42633.jpg?t=st=1715560537~exp=1715564137~hmac=d0f4f6e0871f7c8c282e5fcfe0d9f139ffc184aa56c5d9f8bfe48fbea00d5f05&w=826" />

                </div>
             </div>
             </div>
           <div className="flex flex-col justify-center items-center mb-10">
            <div className={`flex flex-col text-center leading-[70px]  ${epilogue.className}`}>
              <h3 className="text-4xl text-bold font-[600] mb-4"><span className="bg-gradient-to-r from-pink-500  to-indigo-500 bg-clip-text text-transparent  [text-wrap:balance]">Supercharge</span> your Institute</h3>
              <h3 className="text-4xl text-bold font-[600]"><span className="bg-gradient-to-r from-pink-500  to-indigo-500 bg-clip-text text-transparent  [text-wrap:balance]">Smart</span> features leads to better results</h3>
            </div>
           </div>
        </main>
    )
}
export default Dashboard;