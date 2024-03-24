import React from "react";
import Aba from './AbaOld';
import './nuvemView.js';

const Vgame = () => {
    return (
        <div className="containerGame">
            <Aba className="d-vgame" visibilidadeM={false} visibilidadeGame={true} />
        </div>
    );
}

export default Vgame;
