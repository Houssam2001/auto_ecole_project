import Head from 'next/head'
import {
    BsExclamationCircleFill,
    BsPeopleFill,
    BsPlusCircleFill,
    BsCashCoin,
    BsCarFrontFill,
    BsFileTextFill,
    BsDatabaseFillDash,
    BsFillWalletFill,
    BsPersonBoundingBox,
    BsFillPersonBadgeFill
} from 'react-icons/bs'

const sidebarItems = [
    {
        title: 'Condidats/المرشحين', sub: [
            { text: 'Condidats', icon: <BsPeopleFill /> ,linkTo: "/clients"},
            { text: 'Ajouter condidat', icon: <BsPlusCircleFill/> ,linkTo: "/new"},
            { text: 'Suivi des examens', icon: <BsExclamationCircleFill/>,linkTo: "/examens" },
            { text: 'Registre', icon: <BsFileTextFill/> ,linkTo: "/registre"},
        ],
    },
    {
        title: 'Comptabilitée/المحاسبة', sub: [
            { text: "paiement", icon: <BsCashCoin />, linkTo: "/paiement" },
            { text: 'depenses', icon: <BsDatabaseFillDash />,linkTo: "/depenses" },
            // { text: 'recettes', icon: <BsFillWalletFill />, linkTo: "/" },
        ],
    },
    {
        title: 'Ecole/المؤسسة', sub: [
            { text: "Auto", icon: <BsFillPersonBadgeFill />, linkTo: "/auto" },
            { text: 'Moniteurs', icon: <BsPersonBoundingBox /> ,linkTo: "/moniteurs"},
            { text: 'Voitures', icon: <BsCarFrontFill />,linkTo: "/voitures" },
        ],
    }
];
export default sidebarItems