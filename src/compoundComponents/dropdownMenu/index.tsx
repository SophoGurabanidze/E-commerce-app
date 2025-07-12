import BaseMenuDropdown from './Dropdown';
import Content from './Content';
import Trigger from './Trigger';
import Item from './Item';

type CompoundMenuDropdown = typeof BaseMenuDropdown & {
  Trigger: typeof Trigger;
  Content: typeof Content;
  Item: typeof Item;
};

const MenuDropdown = BaseMenuDropdown as CompoundMenuDropdown;

MenuDropdown.Trigger = Trigger;
MenuDropdown.Content = Content;
MenuDropdown.Item = Item;

export default MenuDropdown;
