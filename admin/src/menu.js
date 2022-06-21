import * as React from 'react';
import { useSelector } from 'react-redux';
import { MenuItemLink, getResources } from 'react-admin';
import DefaultIcon from '@material-ui/icons/ViewList';
import { useState } from 'react';
import { useEffect } from 'react';
import UserService from './services/UserService';

const token = localStorage.getItem("lbtoken");
const user = token ? JSON.parse(token) : undefined;
const userId = user?.value?.userId


export const Menu = (props) => {
    const [type, setType] = useState({})
    const resources = useSelector(getResources);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      bringUserInfo()
    },
     [])
    

    const bringUserInfo = async () => {
        const res = await UserService.findById(userId)
    
        setType(res.data.type)
      }

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
        
        'Admin': ['Quizzes', 'CustomUsers', 'Resultados'],
        'Super Admin': allItems
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