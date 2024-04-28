import { SparklesIcon, SpeakerWaveIcon, BookOpenIcon, DocumentTextIcon  } from '@heroicons/react/24/outline'

import Ai from '@/components/Ai';
import Link from 'next/link';

export interface MenuTypes {
  name: String;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  AI?: Boolean;
  onPress?: () => void;
  subMenu?:  SubMenuTypes[];
}

interface SubMenuTypes extends MenuTypes {
    link?: any;
}




const MenuContent = (item: SubMenuTypes) => {
  return (
    <div className="menu-link dropdown dropdown-hover mr-5 ">
       <div
          role="button"
          className="flex flex-row items-center space-x-1 m-1 font-[500]"
        >
          {item.Icon && <item.Icon className=" h-6 w-6" />}
          <span>{item.name}</span>
          {item.AI && <Ai />}
        </div>
        {item.subMenu && (
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[300px]">
            {
                item.subMenu.map((subItem) => {
                    return (
                      <Link href={subItem.link} className="p-3 border-b border-zinc-100">
                         <MenuContent {...subItem} />
                      </Link>
                    )
              })
            }
          </ul>
        )}
    </div>
  )
}

const MenuComposer = (menu: MenuTypes[]) => {
  return menu.map((item, index) => {
   return <MenuContent {...item} />
  });
};


const menuItems: MenuTypes[] = [
  {
    name: "Speaking",
    Icon: SparklesIcon,
    AI: true,
    subMenu: [
      {
        name: "Read Aloud",
        AI: true,
        link: "/practice",
      },
      {
        name: "Read Aloud",
        AI: true,
        link: "https://google.com",
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
      }
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
       link: "/reading/practice/multiple-choice-single-answers/1",

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

      }
    ]
  },
  {
    name: "Writing",
    Icon: DocumentTextIcon,
  },
];


 const Menu = () => {
  
  return (
    <div>
      {MenuComposer(menuItems)}
    </div>
  )
}


export default Menu;
