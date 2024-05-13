import {
  SparklesIcon,
  SpeakerWaveIcon,
  BookOpenIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import Ai from "@/components/Ai";
import Link from "next/link";

export interface MenuTypes {
  name: String;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  AI?: Boolean;
  onPress?: () => void;
  subMenu?: SubMenuTypes[];
}

interface SubMenuTypes extends MenuTypes {
  link?: any;
}

const MenuContent = (item: SubMenuTypes) => {
  return (
    <div className="menu-link dropdown dropdown-hover mr-5 ">
      <div
        role="button"
        className="flex flex-row items-center space-x-1 text-sm font-[400]"
      >
       
        <span className="text-md font-[poppins] font-[600]">{item.name}</span>
        {item.AI && <Ai />}
      </div>
      {item.subMenu && (
        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow">
          {item.subMenu.map((subItem, index) => {
            return (
              <Link
                href={subItem.link}
                key={index}
                className="border-b border-zinc-100 p-3"
              >
                <MenuContent {...subItem} />
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const MenuComposer = (menu: MenuTypes[]) => {
  return menu.map((item, index) => {
    return <MenuContent {...item} key={index} />;
  });
};

const menuItems: MenuTypes[] = [
  {
    name: "Speaking",
    Icon: SparklesIcon,
    AI: true,
    subMenu: [
      {
        name: "Answer short question",
        AI: true,
        link: "/speaking/practice/answer-short-question/1",
      },
      {
        name: "Describe Image",
        AI: true,
        link: "/speaking/practice/describe-image/1",
      },
      {
        name: "Read aloud",
        AI: true,
        link: "/speaking/practice/read-aloud/1",
      },
      {
        name: "Repeat Sentence",
        AI: true,
        link: "/speaking/practice/repeat-sentence/1",
      },
      {
        name: "Retel Lecture",
        AI: true,
        link: "/speaking/practice/retel-lecture/1",
      },
    ],
  },
  {
    name: "Listening",
    Icon: SpeakerWaveIcon,
    subMenu: [
      {
        name: "Summarize Spoken Text",
        AI: true,
        link: "/listening/practice/summerize-spoken-types/1",
      },
      {
        name: "Multiple Choice",
        link: "/listening/practice/multiple-choice/1",
      },
      {
        name: "Multiple Choice Single Answer",
        link: "/listening/practice/multiple-choice-single-answer/1",
      },
      {
        name: "Fill in the blanks",
        link: "/listening/practice/fill-in-the-blanks/1",
      },
      {
        name: "Hightlight Correct Summary",
        link: "/listening/practice/highlist-correct-summary/1",
      },
      {
        name: "Select missing word",
        link: "/listening/practice/select-missing-word/1",
      },
      {
        name: "Hightlist incorrect word",
        link: "/listening/practice/highlight-incorrect-words/1",
      },
      {
        name: "Write form Dictation",
        link: "/listening/practice/write-form-dictation/1",
      },
    ],
  },
  {
    name: "Reading",
    Icon: BookOpenIcon,
    subMenu: [
      {
        name: "Multiple choice multiple answers",
        link: "/reading/practice/multiple-choice-multiple-answers/1",
      },
      {
        name: "Multiple choice single answers",
        link: "/reading/practice/multiple-choice-single-answer/1",
      },
      {
        name: "Reading re order paragraphs",
        link: "/reading/practice/reading-re-order-paragraphs/1",
      },
      {
        name: "Reading fill in the blanks",
        link: "/reading/practice//reading-fill-in-the-blanks/1",
      },
      {
        name: "reading and writing fill in the blanks",
        link: "/reading/practice/reading-and-writing-fill-in-the-blanks/1",
      },
    ],
  },
  {
    name: "Writing",
    Icon: DocumentTextIcon,
    AI: true,
    subMenu: [
      {
        name: "Summerize Written text",
        AI: true,
        link: "/writing/practice/summerize-written-text/1",
      },
      {
        name: "Written Essay",
        AI: true,
        link: "/writing/practice/written-essay/1",
      },
    ],
  },
];

const Menu = () => {
  return <div className="ml-10">{MenuComposer(menuItems)}</div>;
};

export default Menu;
