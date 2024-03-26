import { SparklesIcon, SpeakerWaveIcon, BookOpenIcon, DocumentTextIcon  } from '@heroicons/react/24/outline'

import Ai from './Ai';
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
    <div className="menu-link dropdown dropdown-hover mr-5">
       <div
          role="button"
          className="flex flex-row items-center space-x-1 m-1 font-[500]"
        >
          {item.Icon && <item.Icon className=" h-6 w-6" />}
          <span>{item.name}</span>
          {item.AI && <Ai />}
        </div>
        {item.subMenu && (
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">
            {
                item.subMenu.map((subItem) => {
                    return (
                      <Link href={subItem.link}>
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
  },
  {
    name: "Reading",
    Icon: BookOpenIcon,
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
