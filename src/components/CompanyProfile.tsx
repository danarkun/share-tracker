import React, { FC } from 'react';
import { CompanyInfo } from "../types/types"

interface CompanyProfileProps {
    info: CompanyInfo;
}

export const CompanyProfile:FC<CompanyProfileProps> = (props) => {
    return (
        <div>
            {props.info.name == "" ? "" : (<p><b>Company: </b>{props.info.name}</p>)}
            {props.info.sector == "" ? "" : (<p><b>Sector: </b>{props.info.sector}</p>)}
            {props.info.address == "" ? "" : (<p><b>Address: </b>{props.info.address}</p>)}
        </div>
    )
}
