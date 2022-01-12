import * as React from 'react';
import { useSelector } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';


const customRoutes = [
    {
        name: 'User quiz',
        path: 'userQuiz'
    }
];

export const Menu = (props) => {
    const resources = useSelector(getResources);
    const [open, setOpen] = React.useState(false);

    const handleClick = (e) => {
        setOpen(!open)
    };

    return (
        <>
            {
                resources.map(r => {
                    return (
                        <MenuItemLink
                            key={r.name}
                            to={`/${r.name}`}
                            primaryText={
                                (r.options && r.options.label) ||
                                r.name
                            }
                            leftIcon={
                                r.icon ? <r.icon /> : <DefaultIcon />
                            }
                            onClick={handleClick}
                            sidebarIsOpen={open}
                        />
                    )
                })
            }
            {
                customRoutes.map(r => {
                    return (
                        <MenuItemLink
                        key={r.name}
                        to={`/${r.path}`}
                        primaryText={
                            (r.options && r.options.label) ||
                            r.name
                        }
                        leftIcon={
                            r.icon ? <r.icon /> : <DefaultIcon />
                        }
                        onClick={handleClick}
                        sidebarIsOpen={open}
                    />
                    )
                })
            }
        </>
    )
};