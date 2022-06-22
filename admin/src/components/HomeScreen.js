import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@mui/material'
import { Title } from 'react-admin'
import UserService from '../services/UserService';

const token = localStorage.getItem("lbtoken");
const user = token ? JSON.parse(token) : undefined;
const userId = user?.value?.userId

const HomeScreen = () => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        bringUser()
    }, [])

    const bringUser = async () => {
        const res = await UserService.findById(userId)
        console.log(res.data, 'inicio')
        setUserInfo(res.data)
    }

    //bienvenido {nombre}
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
        }}>
            <Card style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Title title='Bienvenido' />
                <CardContent> Bienvenido {userInfo.firstName}-({userInfo.username}), seleccione una de las opciones de la izquierda</CardContent>
            </Card>
        </div>
    )
}

export default HomeScreen