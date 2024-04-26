interface QuestionHeaderPropsTypes {
    initial: string; 
    title: string;
    description: string;
}

const QuestionHeader = ({initial, title, description}: QuestionHeaderPropsTypes) => {
    return (
         <div className="flex flex-row w-full space-x-3 border-b border-zinc-200 pb-6 justify-center items-center ">
            <div className=" bg-red-400 rounded-full text-white p-4">
                <span>{initial}</span>
            </div>
            <div className="flex flex-col">
                <h2 className="font-[600] text-xl">{title}</h2>
            <p>{description}</p>
            </div>
        </div>
    )
}

export default QuestionHeader;