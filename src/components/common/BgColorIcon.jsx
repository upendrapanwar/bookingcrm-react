import { Avatar } from "flowbite-react";

const BgColorIconComponent = ({icon, status}) => {
  return (
    <div className="flex items-center"><div className={`h-2.5 w-2.5 rounded-full ${icon} mr-2`}></div><span>{status}</span></div>
  );
}

export default BgColorIconComponent;

