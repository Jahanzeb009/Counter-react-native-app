import React, { Fragment } from 'react';
import { LayoutAnimation, Text, View } from 'react-native';



export const If = ({ condition1, condition2, condition3, firstComponent, secondComponent, thirdComponent, forthComponent }) => {

    return <>{condition1 ? firstComponent : condition2 ? secondComponent : condition3 ? thirdComponent : forthComponent}</>
};

// just for setting
export const If_Setting = ({ condition1, condition2, firstComponent }) => {
    return condition1 ? firstComponent : condition2 ? firstComponent : null
}

