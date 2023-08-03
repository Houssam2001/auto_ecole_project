import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import { useContext} from "react";
import { DarkModeContext} from "../../context/darkModeContext";
import Link from "next/link";


const Sidebar = () => {


  return (
    <div className="sidebar"> 
    <div className="top">
      <Link  href="/" style={{textDecoration: "none"}}>

     <span className="logo">Auto Ecole </span>
     </Link>
    </div>
    <hr />
    <div className="center">
        <ul>
           <p className="title">MAIN</p>
            <Link href="/" style={{textDecoration: "none"}}>
          <li>
            
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            
            </li>
            </Link>
            <p className="title">LISTS</p>
            <Link href="/clients" style={{textDecoration: "none"}}>
            <li>
              <PersonOutlineOutlinedIcon className="icon" />
            <span>Clients</span>
            </li>
            </Link>
            <Link href="/products" style={{textDecoration: "none"}}>
            <li>
              <StoreIcon className="icon" />
            <span>Products</span>
            </li>
            </Link>
            <li>
              <CreditCardIcon className="icon" />
            <span>Orders</span>
            </li>
            <li>
              <LocalShippingIcon className="icon" />
            <span>Delivery</span>
            </li>
            <p className="title">USEFUL LINKS</p>
            <li>
              <AnalyticsIcon className="icon" />
            <span>Stats</span>
            </li>
            <li>
              <NotificationsNoneOutlinedIcon className="icon" />
            <span>Notifications</span>
            </li>
            <p className="title">SERVICE</p>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
            </li>
            <li>
              <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
            </li>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
            <span>Settings</span>
            </li>
            <p className="title">USER</p>
            <li>
              <SettingsOutlinedIcon className="icon" />
            <span>Profile</span>
            </li>
            <li>
              <InputOutlinedIcon className="icon" />
            <span>Logout</span>
            </li>
        </ul>

    </div>
    {/* <div className="bottom"> */}
        {/* <div className="colorOption" 
        onClick={() => dispatch({ type : "LIGHT"})}>
        </div>

          <div className="colorOption"
        onClick={() => dispatch({ type : "DARK"})}>
        </div> */}
      {/* <p>Dark mode: {darkMode ? "On" : "Off"}</p>
      <button onClick={handleToggleDarkMode}>Toggle Dark Mode</button>
    </div> */}
    </div>
  )
}

export default Sidebar
