import * as React from 'react';
import {View, Text, Image, navigateBack} from 'remax/wechat';
import styles from './index.scss';


const Index: React.FC<{ style?: React.CSSProperties; }> = (props) => {
    const {style} = props
    return (
        <View className={styles.main}
              style={style}
        >
            <View className={styles.turn}>
                <Text className="iconfont icon-jiazaizhong"
                >
                </Text>
            </View>
        </View>
    );
};

export default Index
