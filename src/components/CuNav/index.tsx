import * as React from 'react';
import {View, Text, Image, navigateBack} from 'remax/wechat';
import styles from './index.scss';
import {Component, useContext, useState} from "react";
import {DataContext} from "@/globalData";


const Comp: React.FC<{ bgImg?: string }> = (props) => {
    const context = useContext(DataContext);
    const capsule = context.capsule.CustomBar
    // const [perBgImg, setPerBgImg] = useState<string|undefined>('');

    return (
        <View className={styles.main} style={props.bgImg != undefined ?
            {
                backgroundImage: `url(${props.bgImg})`,
            } : {
                minHeight: capsule.height * 2 + 'px',
                paddingTop: capsule.top * 2 + 'px',
            }}>
            <View className={styles.blur}
                  style={props.bgImg != undefined ? {paddingTop: capsule.top * 2 + 'px',} : {}}
            >
                {props.children}
            </View>
        </View>
    );
};

class CuNav extends Component<{ bgImg?: string }> {

    constructor(props: any) {
        super(props);
    }

    static Back: React.FC<{ bgColor?: string }> = (props) => {
        const {bgColor} = props
        const context = useContext(DataContext);
        const capsule = context.capsule.CustomBar


        return <View className={styles.back}
                     style={{
                         height: capsule.height * 2 + 'px',
                         lineHeight: capsule.height * 2 + 'px',
                         width: capsule.left * 2,
                         backgroundColor: bgColor
                     }}>
            <Text className="iconfont icon-fanhui"
                  onClick={() => {
                      navigateBack().then()
                  }}
                  style={{margin: '0 20px'}}
            ></Text>
            <View className={styles.name}
                  style={{fontSize: "inherit", width: '100%'}}>
                <View className={styles.NameScroll}>
                    {props.children}
                </View>
            </View>
        </View>
    }

    render() {
        return (
            <Comp bgImg={this.props.bgImg}>
                {this.props.children}
            </Comp>
        );
    }
}

export default CuNav
