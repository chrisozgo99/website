import Link from 'next/link';
import Dropdown from 'rc-dropdown';
import Menu, { Divider, Item as MenuItem } from 'rc-menu';

interface DropdownProps {
  // children: React.ReactNode;
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
          <MenuItem key={item}>
            <Link href={`/${item.toLowerCase()}`}>{item}</Link>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <div className="relative inline-block bg-green-400 text-left">
      <Dropdown overlay={menu}>{menu}</Dropdown>
    </div>
  );
}
