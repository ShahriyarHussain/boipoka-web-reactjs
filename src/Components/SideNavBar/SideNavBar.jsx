import { AiFillHome } from "react-icons/ai";
import { RiExchangeDollarFill, RiLogoutBoxRLine } from "react-icons/ri";
import { BsCartCheckFill, BsFillBookmarkHeartFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdContactSupport, MdGroups } from "react-icons/md";
import logo from "../../Assets/boipoka_logo.svg";
import "./SideNavBar.css";
import SideNavBarIcon from "./SideNavBarIcon";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const SideNavBar = () => {
  const [page, setPage] = useState(0);
  let navigate = useNavigate();
  return (
    <div>
      <div
        className='fixed top-0 left-0 h-screen w-16 m-0 flex flex-col
        bg-darkblue text-white shadow-lg'>
        <img src={logo} alt='logo' />
        <Link
          onClick={() => {
            setPage(0);
          }}
          to='/'>
          <SideNavBarIcon
            isSelected={page === 0}
            icon={<AiFillHome size='48' />}
            text={"Home"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            setPage(1);
          }}
          to='/listings'>
          <SideNavBarIcon
            isSelected={page === 1 ? true : false}
            icon={<RiExchangeDollarFill size='48' />}
            text={"Trade"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            setPage(2);
          }}
          to='/community'>
          <SideNavBarIcon
            isSelected={page === 2}
            icon={<MdGroups size='48' />}
            text={"Community"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            setPage(3);
          }}
          to='/wishlist'>
          <SideNavBarIcon
            isSelected={page === 3}
            icon={<BsFillBookmarkHeartFill size='48' />}
            text={"Wishlist"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            setPage(4);
          }}
          to='/cart'>
          <SideNavBarIcon
            isSelected={page === 4}
            icon={<BsCartCheckFill size='48' />}
            text={"Cart"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            setPage(5);
          }}
          to='/account'>
          <SideNavBarIcon
            isSelected={page === 5}
            icon={<FaUserCircle size='48' />}
            text={"Account"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            setPage(6);
          }}
          to='/support'>
          <SideNavBarIcon
            isSelected={page === 6}
            icon={<MdContactSupport size='48' />}
            text={"Support"}></SideNavBarIcon>
        </Link>
        <Link
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          to='/login'>
          <SideNavBarIcon
            isSelected={false}
            icon={<RiLogoutBoxRLine size='48' />}
            text={"Logout"}></SideNavBarIcon>
        </Link>
      </div>
    </div>
  );
};

export default SideNavBar;
