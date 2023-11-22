import Link from 'next/link';
import Dropdown from 'rc-dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';

interface DropdownProps {
  children: React.ReactNode;
  dropdownItems: any;
}

export function DropdownMenu(props: DropdownProps) {
  const { children, dropdownItems } = props;

  const menu = (
    <Menu>
      {dropdownItems.map((item: any) => {
        if (item === 'divider') {
          return <Divider key={item} />;
        }
        return (
          <MenuItem key={item}>
            <Link href={`/${item.toLowerCase()}`}>{item}</Link>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div className="relative inline-block text-left">
      <Dropdown overlay={menu}>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {children}
        </button>
      </Dropdown>
    </div>
  );
}
