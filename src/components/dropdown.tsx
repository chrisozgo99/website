import Link from 'next/link';
import Dropdown from 'rc-dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';

interface DropdownProps {
  dropdownItems: any[];
}

export function DropdownMenu(props: DropdownProps) {
  const { dropdownItems } = props;

  const menu = (
    <Menu>
      {dropdownItems?.map((item: any) => {
        if (item === 'divider') {
          return <Divider key={item} />;
        }
        return (
          <MenuItem
            key={item}
            className="items-center py-1 text-center hover:bg-gray-400"
          >
            <Link
              href={`/${item.toLowerCase()}`}
              className="items-center px-6 font-avenir text-[16px] font-light text-gray-700 hover:text-gray-900"
            >
              {item}
            </Link>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div className="relative inline-block bg-white text-left">
      <Dropdown overlay={menu}>{menu}</Dropdown>
    </div>
  );
}
