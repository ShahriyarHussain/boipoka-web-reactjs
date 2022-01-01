import "./SideNavBar.css";

let selected = "";

const SidebarIcon = (props) => {
  let isSelected = props.isSelected;

  if (isSelected) selected = " bg-mildorange text-gray-800 rounded-xl";
  else selected = " bg-gray-600 text-white rounded-3xl";

  return (
    <div className={"sidebar-icon group".concat(selected)}>
      {props.icon}
      <span className='sidebar-tip group-hover:scale-100'>{props.text}</span>
    </div>
  );
};

export default SidebarIcon;
