import Head from 'next/head'
import {
    BsPlus,
    BsSearch,
    BsEyeFill,
    BsBookmarkFill,
    BsFillArrowLeftSquareFill,
    BsExclamationCircleFill,
    BsPeopleFill,
    BsPlusCircleFill,
    BsCashCoin,
    BsTerminalFill,
    BsCarFrontFill,
    BsFileTextFill,
    BsDatabaseFillDash,
    BsFillWalletFill,
    BsPersonBoundingBox,
    BsBadge3D,
    BsBadge3DFill,
    BsFillPersonBadgeFill
} from 'react-icons/bs'

import BadgeIcon from '@mui/icons-material/Badge';
import { AiFillFire, AiFillMessage, AiOutlineHome, } from 'react-icons/ai'


const sidebarItems = [
    {
        title: 'Condidats/المرشحين', sub: [
            { text: 'Condidats', icon: <BsPeopleFill /> ,linkTo: "/clients"},
            { text: 'Ajouter condidat', icon: <BsPlusCircleFill/> ,linkTo: "/new"},
            { text: 'Suivi des examens', icon: <BsExclamationCircleFill/>,linkTo: "/" },
            { text: 'Registre', icon: <BsFileTextFill/> ,linkTo: "/"},
        ],
    },
    {
        title: 'Comptabilitée/المحاسبة', sub: [
            { text: "paiement", icon: <BsCashCoin />, linkTo: "/" },
            { text: 'depenses', icon: <BsDatabaseFillDash />,linkTo: "/" },
            { text: 'recettes', icon: <BsFillWalletFill />, linkTo: "/" },
        ],
    },
    {
        title: 'Ecole/المؤسسة', sub: [
            { text: "Auto", icon: <BsFillPersonBadgeFill />, linkTo: "/" },
            { text: 'Moniteurs', icon: <BsPersonBoundingBox /> ,linkTo: "/moniteurs"},
            { text: 'Voitures', icon: <BsCarFrontFill />,linkTo: "/voitures" },
        ],
    }
];
export default sidebarItems