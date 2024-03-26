import Recorder from "@/app/components/Recorder";
import TextContentArea from "@/app/components/TestContentArea";
import QuestionHeader from "@/app/components/QuestionHeader"



const readAloud = () => {
    return (
      <main>
        <QuestionHeader
            initial="RA"
            description="Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud."
            title="Read Aloud"
        />
        <div className="mt-10">
            <h2 className="text-2xl">#1443 Extracting Carbon Dioxide</h2>
            <TextContentArea className="mt-10">
                Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.
            </TextContentArea>
            <Recorder className="mt-3" time={40} />
        </div>
     </main>
    )
}


export default readAloud;