import React, { Fragment } from 'react';
import { Text, View } from 'react-native';



export const If = ({ c, v, n }) => {
    return <>{c ? v : n}</>
};

