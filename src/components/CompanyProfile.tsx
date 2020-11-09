import React, { FC } from 'react';
import { CompanyInfo } from "../types/types"

interface CompanyProfileProps {
    info: CompanyInfo;
}

export const CompanyProfile:FC<CompanyInfo> = (props) => {
    return (
        <div>
            {props.name == "" ? "" : (<p><b>Company: </b>{props.name}</p>)}
            {props.sector == "" ? "" : (<p><b>Sector: </b>{props.sector}</p>)}
            {props.address == "" ? "" : (<p><b>Address: </b>{props.address}</p>)}
        </div>
    )
}
