/**
 * @file 工具函数
 */
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as THREE from 'three';
import NormalIcon from '../assets/imgs/idc/idc_status_normal.png?url';
import WarningIcon from '../assets/imgs/idc/idc_status_warning.png?url';

export const IDC_ICON_MAP = {
    normal: {
        icon: NormalIcon,
        color: '#3AFDFF',
        width: 92,
        height: 120
    },
    warning: {
        icon: WarningIcon,
        color: '#FD7236',
        width: 100,
        height: 120
    },
};

export interface CSS2DObjectLabel extends CSS2DObject{
    changeTextContent?: (title: string) => void;
    changeIdcStatus?: (isWarning: boolean) => void;
    addEntranceAnimate?: () => void;
    addExitAnimate?: () => void;
}

export function createIdcIcon(isWarning: boolean, title: string, onClickMap: (title: string) => void) {
    const iconType = isWarning ? IDC_ICON_MAP.warning : IDC_ICON_MAP.normal;
    const parentDiv = document.createElement('div');
    const aspect = iconType.height / iconType.width; // 高:宽

    const idcImg = document.createElement('img');
    idcImg.src = iconType.icon;
    idcImg.width = 28;
    idcImg.height = 28 * aspect;
    idcImg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;
    parentDiv.appendChild(idcImg);

    parentDiv.style.cssText = `
        width: 28px;
        height:  ${aspect * 28}px;
        z-index: 9;
        cursor: pointer;
        position: relative;
    `;

    parentDiv.setAttribute('data-id', title);

    const childDiv = document.createElement('div');
    childDiv.style.cssText = `
        width: max-content;
        padding: 0 12px;
        box-sizing: border-box;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        text-align: center;
        background: ${iconType.color};
        font-family: AlimamaShuHeiTi;
        font-size: 16px;
        color: #001A2A;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        top: -90%;
    `;

    childDiv.textContent = title;

    parentDiv.appendChild(childDiv);

    parentDiv.addEventListener('click', ev => {
        onClickMap(ev.currentTarget.getAttribute('data-id'));
    });

    const idcIcon: CSS2DObjectLabel = new CSS2DObject(parentDiv);

    idcIcon.changeTextContent = (title: string) => {
        childDiv.textContent = title;
        parentDiv.setAttribute('data-id', title);
    };

    idcIcon.changeIdcStatus = (isWarning: boolean) => {
        const idcIcon = isWarning ? IDC_ICON_MAP.warning : IDC_ICON_MAP.normal;
        idcImg.style.src = idcIcon.icon;
        childDiv.style.background = idcIcon.color;
    };

    idcIcon.addEntranceAnimate = () => {
        // TODO
    };
    idcIcon.addExitAnimate = () => {
        // TODO
    };

    return idcIcon;
}

export function coordinateTransform(point: THREE.Vector3, camera: THREE.Camera) {
    const standardVector = point.project(camera);
    const innerWidth = window.innerWidth / 2;
    const innerHeight = window.innerHeight / 2;
    const x = Math.round((standardVector.x * innerWidth) + innerWidth);
    const y = Math.round(-(standardVector.y * innerHeight) + innerHeight);
    return { x, y };
}
