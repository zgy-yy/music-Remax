import * as React from 'react';
import {View, Text, Image} from 'remax/wechat';
import styles from './index.scss';
import CuNav from "@/components/CuNav";


const Index: React.FC = () => {
    return (
        <View className={styles.page}>
            <CuNav/>
            <View className={styles.main}>
            </View>
        </View>
    );
};

export default Index
