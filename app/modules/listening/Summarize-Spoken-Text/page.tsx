import QuestionHeader from "@/app/components/QuestionHeader";
import TextContentArea from "@/app/components/TestContentArea";
import { useEffect } from "react";

const SummariseSpokenText = () => {



    return (
      <main>
        <QuestionHeader
            initial="SP"
            description="Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud."
            title="Summarise Spoken Text"
        />
        <div className="mt-10">
            <h2 className="text-2xl">#1443 Extracting Carbon Dioxide</h2>
            <TextContentArea className="mt-10">
                Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.
            </TextContentArea>
        </div>
     </main>
    )
}

export default SummariseSpokenText;