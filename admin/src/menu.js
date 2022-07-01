import * as React from 'react';
import { useSelector } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import { useState } from 'react';
import { useEffect } from 'react';
import UserService from './services/UserService';

export const Menu = (props) => {
    const [type, setType] = useState(localStorage.getItem("userType"))
    const resources = useSelector(getResources);
    const [open, setOpen] = useState(false)

    const customRoutes = [
        {
            name: 'Resultados',
            path: 'userQuiz'
        }
    ];
    
    const allItems = [
        'Areas',
        'Quizzes',
        'BTModules',
        'CustomUsers',
        'Resultados'
    ]
    
    const all = [...resources, ...customRoutes]
    
    const routes = {
        
        '1': ['Quizzes', 'CustomUsers', 'Resultados'],
        '2': allItems
    }

    
    console.log(type)
    const handleClick = (e) => {
        setOpen(!open)
    };

    return (
        <>
        {all.map((r) => (
            routes[type]?.includes(r.name) ? 
            <MenuItemLink
                            key={r.name}
                            to={! r.path? `/${r.name}` : `/${r.path}`}
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
            : null
        ))}
            {/* {
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
            } */}
        </>
    )
};