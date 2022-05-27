import React from 'react'
import { OkIcon, NoIcon } from '../Graphic/Icons';
import { StatusIcon } from './ApplicationsPageStyled';

export default function ApplicationStatusIcon({ status }) {

    const Raspberry = "#D8002A";
    const Green = "#53A548";
    const Blue = "#0B5ED7";

    switch (status) {
        case 1:
            return (
                <><StatusIcon background={Raspberry} disabled>
                    <NoIcon />
                </StatusIcon>
                Odrzucono</>
            )
        case 2:
            return (
                <><StatusIcon background={Green} disabled>
                    <OkIcon />
                </StatusIcon>
                Zaakceptowano</>
            )
        case 3:
            return (
                <><StatusIcon background={Green} disabled>
                    <OkIcon />
                </StatusIcon>
                Odrzucono</>
            )
        default:
            return (
                <><StatusIcon background={Blue} disabled>
                    <OkIcon />
                </StatusIcon>
                Czeka na decyzję</>
            )
    }
}